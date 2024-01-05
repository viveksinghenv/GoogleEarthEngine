/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var India = ee.FeatureCollection("projects/landsat-325606/assets/INDIA_admin_boundary");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// print(gaul)
// var countries = ee.FeatureCollection("FAO/GAUL/2015/level0");
// var INDIA = countries.filter(ee.Filter.eq('ADM0_NAME', 'India'))
// var visParams = {'color': 'red'}
// Map.addLayer(INDIA, visParams, 'India wo Kashmir')
var India = India.geometry()
var dataset = ee.ImageCollection("ESA/WorldCover/v100").first()
var clipped = dataset.clip(India);

var visualization = {
  bands: ['Map'],
};
Map.centerObject(clipped);
Map.addLayer(clipped, visualization, "Landcover");