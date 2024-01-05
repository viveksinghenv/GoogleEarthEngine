/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var study = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[87.30327967688552, 23.231437282775076],
          [87.30327967688552, 21.871882839539776],
          [90.11577967688552, 21.871882839539776],
          [90.11577967688552, 23.231437282775076]]], null, false);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
Map.addLayer(study,{},'Sunderban')
Map.centerObject(study,4)
/****************MODIS  AOD*******************/
var yearStart = ee.Number(1992);
var sdate = ee.Date.fromYMD(yearStart,1,1);
var yearEnd = ee.Number(2020); // note that the year ending is the 10year + 1
var edate = ee.Date.fromYMD(yearEnd,1,1); 
// print(sdate);
// print(edate);

var getEVI57 = function(image) {
var evi = (image.expression(
  ' 2.5*((nir-red)/(nir + 6 * red - 7.5* blue +1))',
  {
    nir: image.select('B4'),
    red: image.select('B3'),
    blue: image.select('B1')}).rename ('nd'))
    .copyProperties(image, ['system:time_start']);
return (evi);
}
//EVI FUNCTIONS FOR LANDSAT 8//
var getEVI8 = function(image){ 
  var evi = (image.expression(
  ' 2.5*((nir-red)/(nir + 6 * red - 7.5* blue +1))',
  {
    nir: image.select('B5'),
    red: image.select('B4'),
    blue: image.select('B2')}).rename ('nd'))
    .copyProperties(image, ['system:time_start'])
  return(evi);
}
var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')  //Filter AOI (imported at the top)
      .filterBounds(study)
      // .filterDate(start, end)
      .map(getEVI8)

var l7 = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')  //Filter AOI (imported at the top)
      .filterBounds(study)
      // .filterDate(start, end)
      .map(getEVI57);  

var l5 = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR')  //Filter AOI (imported at the top)
      .filterBounds(study) 
      // .filterDate(start, end) 
      .map(getEVI57) 
print(l5)
var collection = ee.ImageCollection(l8.merge(l7).merge(l5));
var coll = collection//.select(nd)
// print(coll)
// create annual composites using the median() operator
var yearList = ee.List.sequence(yearStart, yearEnd.subtract(1));
var annualAOD = ee.ImageCollection(yearList.map(function(yr){
  var year = ee.Number(yr);
  var annual = coll.filterDate(year.format('%d').cat('-01-01'),year.add(1).format('%d').cat('-01-01'))
    .select('nd').median().clip(study)
  return annual.set('year',year);
}));

//print(annualNDVI)

// convert the image collection with 10 years of NDVI into a 10-band image
// and rename the bands
// var bandNames = annualNDVI.bandNames();
// print(coll)
var AOD19year = annualAOD.toBands().select([0,1,2,3,4,5,6,7,8,9,10,
11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27],
  ['EVI1','EVI2','EVI3','EVI4','EVI5','EVI6','EVI7','EVI8','EVI9','EVI10',
  'EVI11','EVI12','EVI13','EVI14','EVI15','EVI16','EVI17','EVI18','EVI19',
  'EVI20','EVI21','EVI22','EVI23','EVI24','EVI25','EVI26','EVI27','EVI28']);

var AOD19year = AOD19year.multiply(0.1)
print(AOD19year,'EVI_28year') 
var min =  AOD19year.reduceRegion(ee.Reducer.min(), study,500);
var max = AOD19year.reduceRegion(ee.Reducer.max(), study,500);
print('min',min)
print('max',max)
var AOD19year1=AOD19year.select('EVI8')
Map.addLayer(AOD19year1,{},'aod1')
Map.addLayer(AOD19year,{min:-1,max:5},'AOD19year')

// export 10-band ndvi image to your drive as a geotiff image
Export.image.toDrive({
  image: AOD19year,
  description: 'EVI28year',
  fileNamePrefix: 'EBI28year',
  region: study,
  scale: 500,
  crs: 'EPSG:4326',
  maxPixels: 1e13
})