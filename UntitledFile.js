/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var table = ee.FeatureCollection("users/viveksinghenv17dr000519/Basin_Damodar");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// Load four 2012 NAIP quarter quads, different locations.
var naip2012 = ee.ImageCollection('COPERNICUS/S2_SR')
  .filterBounds(table)
  .filterDate('2019-04-1' ,'2019-07-31');

// Spatially mosaic the images in the collection and display.
var mosaic = naip2012.mosaic();
Map.centerObject(table,7);
Map.addLayer(mosaic, {bands: ['B4', 'B3', 'B2'], min: 0, max: 30000, gamma: 1.5}, 'spatial mosaic');

// var ndvi = naip.normalizedDifference(['B8', 'B4']);
// var ndwi = naip.normalizedDifference(['B3', 'B8']);
// // Mask and mosaic visualization images.  The last layer is on top.
// var mosaic1 = ee.ImageCollection([
//   // NDWI > 0.5 is water.  Visualize it with a blue palette.
//   ndwi.updateMask(ndwi.gte(0.5)).visualize(ndwiViz),
//   // NDVI > 0.2 is vegetation.  Visualize it with a green palette.
//   ndvi.updateMask(ndvi.gte(0.2)).visualize(ndviViz),
//   // Visualize bare areas with shadow (bare2 but not bare1) as gray.
//   bare2.updateMask(bare2.and(bare1.not())).visualize({palette: ['AAAAAA']}),
//   // Visualize the other bare areas as white.
//   bare1.updateMask(bare1).visualize({palette: ['FFFFFF']}),
// ]).mosaic();
// Map.addLayer(mosaic1, {}, 'Visualization mosaic')