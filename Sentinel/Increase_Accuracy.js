/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var ZSXC = ee.FeatureCollection("projects/landsat-325606/assets/allinone1");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// var classNames = barren1.merge(bamboo1).merge(cokeplant1).merge(fallow1).merge(grassland1).merge(mining1).merge(shrub1).merge(urban1).merge(water1);
// var classNames = lulc11.merge(lulc22).merge(lulc33).merge(lulc44).merge(lulc55).merge(lulc66).merge(lulc77).merge(lulc88)
var classNames = ee.FeatureCollection(ZSXC)
// var shape = ee.FeatureCollection("users/viveksinghenv/Damodar_Basin");
// var classNames = Water.merge(Urban).merge(Agriculture).merge(Fallowland).merge(Mining).merge(DenseVegetation).merge(Barren);
// //Visualize the data
var gaul = ee.FeatureCollection("FAO/GAUL/2015/level2")
var Studyarea = gaul.filter(ee.Filter.eq('ADM2_NAME','Dhanbad'));
Map.centerObject(Studyarea,10);
Map.addLayer(Studyarea);

// print(classNames)
/////// ...............Landsat................
var collection = ee.ImageCollection("LANDSAT/LC08/C02/T1_L2")
    .filterDate('2015-01-01', '2015-11-30')
    .filterBounds(Studyarea)
    .filter(ee.Filter.lt("CLOUD_COVER", 10)) .median();
    // .sort('CLOUD_COVER').first();//... chooses only pixels between the dates you define here
  // ... that are within your aoi
print(collection); 
var collection05 = ee.ImageCollection(lNDVI.filterDate('1985-06-01', '2012-06-01'));

var clipped05 = collection05.mean().clip(region)

//Long-Term Time Series
var TS5 = Chart.image.seriesByRegion(collection05, region, ee.Reducer.mean(),'NDVI',
30, 'system:time_start').setOptions({
title: 'NDVI (Annual)',
vAxis: {title: 'NDVI'},
});
print(TS5);