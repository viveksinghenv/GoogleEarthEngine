//Create a cloud-free composite
var shape = ee.FeatureCollection("users/viveksinghenv17dr000519/Basin_Damodar");
// Load a raw Landsat 5 ImageCollection for a single year.
var collection = ee.ImageCollection("LANDSAT/LC08/C01/T1")
    .filterDate('2018-03-01', '2018-10-31')
    .filterBounds(shape);

// Create a cloud-free composite with default parameters.
var composite = ee.Algorithms.Landsat.simpleComposite(collection);

// Create a cloud-free composite with custom parameters for
// cloud score threshold and percentile.
var customComposite1 = ee.Algorithms.Landsat.simpleComposite({
  collection: collection,
  percentile: 50,
  cloudScoreRange: 0
});
// var customComposite1 = customComposite2.median();
var customComposite = customComposite1.clip(shape)//.divide(10000);
// Display the composites.
// Map.setCenter('shape');
// Map.addLayer(composite, {bands: ['B4', 'B3', 'B2'], max: 64000}, 'TOA composite');
Map.addLayer(customComposite, {bands: ['B4', 'B3', 'B2']},
    'Custom TOA composite');

Export.image.toDrive({
  image: customComposite,
description: 'Landsat_8_Damodar2',
  scale: 30,
  region: shape
});
