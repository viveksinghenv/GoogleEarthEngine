/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var shape = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[84.20214946977342, 25.223713800653453],
          [84.20214946977342, 23.199836715745263],
          [87.02563579789842, 23.199836715745263],
          [87.02563579789842, 25.223713800653453]]], null, false),
    rice20 = ee.FeatureCollection("users/viveksinghenv17dr000519/Kharifrice2020"),
    lulc1 = ee.FeatureCollection("users/viveksinghenv17dr000519/lulc1"),
    lulc2 = ee.FeatureCollection("users/viveksinghenv17dr000519/lulc2"),
    lulc3 = ee.FeatureCollection("users/viveksinghenv17dr000519/lulc3"),
    lulc4 = ee.FeatureCollection("users/viveksinghenv17dr000519/Rabi"),
    table = ee.FeatureCollection("users/viveksinghenv17dr000519/Basin_Damodar");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var lulc11 = ee.FeatureCollection(lulc1)
var lulc22 = ee.FeatureCollection(lulc2)
var lulc33 = ee.FeatureCollection(lulc3)
var lulc44 = ee.FeatureCollection(lulc4)
// var classNames = barren1.merge(bamboo1).merge(cokeplant1).merge(fallow1).merge(grassland1).merge(mining1).merge(shrub1).merge(urban1).merge(water1);
var classNames = lulc11.merge(lulc22).merge(lulc33).merge(lulc44)
// var shape = ee.FeatureCollection("users/viveksinghenv/Damodar_Basin");
// var classNames = Water.merge(Urban).merge(Agriculture).merge(Fallowland).merge(Mining).merge(DenseVegetation).merge(Barren);
//Visualize the data
Map.centerObject(shape,8);
Map.addLayer(table);
///////// ...............Landsat................
// var collection = ee.ImageCollection('COPERNICUS/S2') // searches all sentinel 2 imagery pixels...
//   .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 0.001)) // ...filters on the metadata for pixels less than 10% cloud
//   .filterDate('2019-10-1' ,'2019-11-30') //... chooses only pixels between the dates you define here
//   .filterBounds(shape).mosaic(); // ... that are within your aoi
// print(collection); 
/////////////////...............Sentinel...............
var collection = ee.ImageCollection('COPERNICUS/S2') // searches all sentinel 2 imagery pixels...
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 0.001)) // ...filters on the metadata for pixels less than 10% cloud
  .filterDate('2019-10-1' ,'2019-11-30') //... chooses only pixels between the dates you define here
  .filterBounds(shape).median(); // ... that are within your aoi
print(collection);// this generates a JSON list of the images (and their metadata) which the filters found in the right-hand window.
// var medianpixels = collection.median();
// var medianpixels = medianpixels1
// This finds the median value of all the pixels which meet the criteria.
Map.addLayer(collection, {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000, gamma: 1.5}, 'Sentinel_2 TCC');
// Map.addLayer(medianpixels, {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000, gamma: 1.5}, 'Sentinel_2 TCC');
// Map.addLayer(medianpixels, {bands: ['B8', 'B4', 'B3'], min: 0, max: 3000, gamma: 1.5}, 'Sentinel_2 FCC');

// Map.addLayer(roi)
print(classNames)
// Creating training data sets
var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7','B8','B8A','B9','B11','B12'];
var training = collection.select(bands).sampleRegions({
  collection: classNames,
  properties: ['lulc'],
  scale: 40
});
print(training);

var classifier = ee.Classifier.libsvm().train({ //ee.Classifier.decisionTree(treeString)
  features: training,
  classProperty: 'lulc',
  inputProperties: bands
});
//Run the classification
var classified = collection.select(bands).classify(classifier);
//Display classification
Map.centerObject(classNames, 10);
Map.addLayer(classified,
{min: 1, max: 10,palette: ['ADFF2F', '8B4513', '778899','9ACD32','98FB98','808080','228B22','8FBC8F','0000FF','CD853F','BDB76B']},
'classification',0);
var NDVI2020 = collection.expression(
    "(NIR - RED) / (NIR + RED)",
    {
      RED: collection.select("B4"),    //  RED
      NIR: collection.select("B8"),    // NIR
      BLUE: collection.select("B2"),    // BLUE
      SWIR: collection.select("B11")    //SWIR
    });
var NDBI2020 = collection.expression(
      "(SWIR - NIR) / (SWIR + NIR)",
      {
      RED: collection.select("B4"),    //  RED
      NIR: collection.select("B8"),    // NIR
      BLUE: collection.select("B2"),    // BLUE
      SWIR: collection.select("B11")    //SWIR
    });
Map.addLayer(NDVI2020,{min: 0, max: 1, palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ]},"NDWI Nov32019",0)
Map.addLayer(NDBI2020)
// Export.image.toDrive({
//   image: classified,
//   description: 'Sentinel_2',
//   scale: 15,
//   maxPixels: 1e9,
//   region: shape
// });
Map.addLayer(classNames,0)
print(classNames)