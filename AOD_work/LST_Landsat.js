/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var study = ee.FeatureCollection("projects/landsat-325606/assets/INDIA_admin_boundary");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
/////*****************MODIS LST day*****************/////
var moLST= ee.ImageCollection("MODIS/061/MOD11A2")
                              .select('LST_Day_1km')
                              .filterBounds(study)
// Scale to Kelvin and convert to Celsius, set image acquisition time.
var moLST= moLST.map(function(img) {
  return img
    .multiply(0.02)
    .subtract(273.15)
    .copyProperties(img, ['system:time_start']);
});
Map.addLayer(moLST, {min: 2.0, max:56, palette: [
'040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
'0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
'3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
'ff0000', 'de0101', 'c21301', 'a71001', '911003'
 ]},'MOLST');

/*Cloud Mask function*/
function maskL8sr(col) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  // Get the pixel QA band.
  var qa = col.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return col.updateMask(mask);
}
var vizParams = {
bands: ['B5', 'B6', 'B4'],
min: 0,
max: 4000,
gamma: [1, 0.9, 1.1]
};
var vizParams2 = {
bands: ['B4', 'B3', 'B2'],
min: 0,
max: 3000,
gamma: 1.4,
};
var col = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
                  .map(maskL8sr)
                  .filterDate('2020-01-01', '2020-12-31')
                  .filterBounds(study).median();
print(col, 'collection');
Map.addLayer(col, vizParams2,'TCC',0);
Map.centerObject(study,4);
// var lst = dataset.select('B10','B11')
// // Map.addLayer(trueColor432, trueColor432Vis, 'True Color (432)');
// Map.addLayer(lst.select('B10'),{},'B10')
var ndvi = col.normalizedDifference(['B5', 
'B4']).rename('NDVI');
var ndviParams = {min: -1, max: 1, palette: ['blue', 'white', 
'green']};
print(ndvi,'ndvi');
Map.addLayer(ndvi, ndviParams, 'ndvi',0);
print(col.select('B10'),'Thermal')
var thermal= col.select('B10').multiply(0.1);
var b10Params = {min: 291.918, max: 305.382, palette: ['blue', 
'white', 'green']};
Map.addLayer(thermal, b10Params, 'thermal',0);
// find the min and max of NDVI
var min = ee.Number(ndvi.reduceRegion({
reducer: ee.Reducer.min(),
geometry: study,
scale: 500,
maxPixels: 1e10
}).values().get(0));
print(min, 'min');
var max = ee.Number(ndvi.reduceRegion({
reducer: ee.Reducer.max(),
geometry: study,
scale: 500,
maxPixels: 1e10
}).values().get(0));
print(max, 'max')
//fractional vegetation
var fv =(ndvi.subtract(min).divide(max.subtract(min))).pow(ee.Number(2)).rename('FV'); 
// print(fv, 'fv');
Map.addLayer(fv,{}, 'fractionalvegetation',0);
//Emissivity Driving from NDVI
var a= ee.Number(0.004);
var b= ee.Number(0.986);
var EM=fv.multiply(a).add(b).rename('EMM');
var imageVisParam3 = {min: 0.9865619146722164, max:0.989699971371314};
Map.addLayer(EM, imageVisParam3,'EMM',0);

//LST in Celsius Degree bring -273.15
//NB: In Kelvin don't bring -273.15
var LST = thermal.expression(
'(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
 'Tb': thermal.select('B10'),
'Ep': EM.select('EMM')
}).rename('LST');
Map.addLayer(LST, {min: -16.569706944223423, max:41.328077233404645, palette: [
'040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
'0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
'3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
'ff0000', 'de0101', 'c21301', 'a71001', '911003'
 ]},'LST');
