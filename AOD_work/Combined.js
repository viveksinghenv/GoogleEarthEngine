/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var study = ee.FeatureCollection("projects/landsat-325606/assets/India_shapefile_withkashmir");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
/********************AOD**********************/
Map.addLayer(study,{},'India')

var aod = ee.ImageCollection("MODIS/006/MCD19A2_GRANULES")
                      .select('Optical_Depth_047')
                      .filterDate('2020-01-01', '2020-01-15').mean()
print(aod)
var band_viz = {
  min: 0,
  max: 500,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
var Iaod = aod.clip(study)
Map.addLayer(Iaod, band_viz, 'Optical Depth 047');

// /*********************LST_Landsat 8****************/
// /*Cloud Mask function*/
// function maskL8sr(col) {
//   // Bits 3 and 5 are cloud shadow and cloud, respectively.
//   var cloudShadowBitMask = (1 << 3);
//   var cloudsBitMask = (1 << 5);
//   // Get the pixel QA band.
//   var qa = col.select('pixel_qa');
//   // Both flags should be set to zero, indicating clear conditions.
//   var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
//                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
//   return col.updateMask(mask);
// }
// var vizParams = {
// bands: ['B5', 'B6', 'B4'],
// min: 0,
// max: 4000,
// gamma: [1, 0.9, 1.1]
// };
// var vizParams2 = {
// bands: ['B4', 'B3', 'B2'],
// min: 0,
// max: 3000,
// gamma: 1.4,
// };
// var col = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
//                   .map(maskL8sr)
//                   .filterDate('2020-01-01', '2020-12-31')
//                   .filterBounds(study).median();
// print(col, 'collection');
// Map.addLayer(col, vizParams2,'TCC',0);
// Map.centerObject(study,4);
// // var lst = dataset.select('B10','B11')
// // // Map.addLayer(trueColor432, trueColor432Vis, 'True Color (432)');
// // Map.addLayer(lst.select('B10'),{},'B10')
// var ndvi = col.normalizedDifference(['B5', 
// 'B4']).rename('NDVI');
// var ndviParams = {min: -1, max: 1, palette: ['blue', 'white', 
// 'green']};
// print(ndvi,'ndvi');
// Map.addLayer(ndvi, ndviParams, 'ndvi',0);
// print(col.select('B10'),'Thermal')
// var thermal= col.select('B10').multiply(0.1);
// var b10Params = {min: 291.918, max: 305.382, palette: ['blue', 
// 'white', 'green']};
// Map.addLayer(thermal, b10Params, 'thermal',0);
// // find the min and max of NDVI
// var min = ee.Number(ndvi.reduceRegion({
// reducer: ee.Reducer.min(),
// geometry: study,
// scale: 500,
// maxPixels: 1e10
// }).values().get(0));
// print(min, 'min');
// var max = ee.Number(ndvi.reduceRegion({
// reducer: ee.Reducer.max(),
// geometry: study,
// scale: 500,
// maxPixels: 1e10
// }).values().get(0));
// print(max, 'max')
// //fractional vegetation
// var fv =(ndvi.subtract(min).divide(max.subtract(min))).pow(ee.Number(2)).rename('FV'); 
// // print(fv, 'fv');
// Map.addLayer(fv,{}, 'fractionalvegetation',0);
// //Emissivity Driving from NDVI
// var a= ee.Number(0.004);
// var b= ee.Number(0.986);
// var EM=fv.multiply(a).add(b).rename('EMM');
// var imageVisParam3 = {min: 0.9865619146722164, max:0.989699971371314};
// Map.addLayer(EM, imageVisParam3,'EMM',0);

// //LST in Celsius Degree bring -273.15
// //NB: In Kelvin don't bring -273.15
// var LST = thermal.expression(
// '(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
// 'Tb': thermal.select('B10'),
// 'Ep': EM.select('EMM')
// }).rename('LST');
// Map.addLayer(LST, {min: -16.569706944223423, max:41.328077233404645, palette: [
// '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
// '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
// '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
// 'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
// 'ff0000', 'de0101', 'c21301', 'a71001', '911003'
// ]},'LST');

/******************Global_Landuse_for_India*******************/
var lulc10 = ee.ImageCollection("projects/sat-io/open-datasets/landcover/ESRI_Global-LULC_10m");
var lulc10 = lulc10.mosaic()
var lulc10 = lulc10.clip(study)
var dict = {
  "names": [
    "Water", "Trees", "Grass","Flooded Vegetation","Crops","Scrub/Shrub",
    "Built Area","Bare Ground","Snow/Ice","Clouds"
  ],
  "colors": [
    "1A5BAB","358221","A7D282","87D19E","FFDB5C","EECFA8",
    "ED022A","EDE9E4","F2FAFF","C8C8C8"
  ]};
Map.addLayer(lulc10, {min:1, max:10, palette:dict['colors']}, 'India_LULC_2020 10m',0)
// Create a panel to hold the legend widget
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});

// Function to generate the legend
function addCategoricalLegend(panel, dict, title) {
  
  // Create and add the legend title.
  var legendTitle = ui.Label({
    value: title,
    style: {
      fontWeight: 'bold',
      fontSize: '18px',
      margin: '0 0 4px 0',
      padding: '0'
    }
  });
  panel.add(legendTitle);
  
  var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
  panel.add(loading);
  
  // Creates and styles 1 row of the legend.
  var makeRow = function(color, name) {
    // Create the label that is actually the colored box.
    var colorBox = ui.Label({
      style: {
        backgroundColor: color,
        // Use padding to give the box height and width.
        padding: '8px',
        margin: '0 0 4px 0'
      }
    });
  
    // Create the label filled with the description text.
    var description = ui.Label({
      value: name,
      style: {margin: '0 0 4px 6px'}
    });
  
    return ui.Panel({
      widgets: [colorBox, description],
      layout: ui.Panel.Layout.Flow('horizontal')
    });
  };
  
  // Get the list of palette colors and class names from the image.
  var palette = dict['colors'];
  var names = dict['names'];
  loading.style().set('shown', false);
  
  for (var i = 0; i < names.length; i++) {
    panel.add(makeRow(palette[i], names[i]));
  }
  
  Map.add(panel);
  
}

// var ur = lulc10.eq(7);
// var urban = lulc10.mask(ur)
// Map.addLayer(urban,{},'Urban')

// // Add the legend to the map
// addCategoricalLegend(legend, dict, 'ESRI 2020 Land Cover');

var cross_relation = ee.Algorithms.CrossCorrelation(Iaod, LST, 30, 3, 0)
print(cross_relation)
Map.addLayer(cross_relation,{},'correlation')
