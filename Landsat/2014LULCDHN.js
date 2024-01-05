/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var Studyarea = ee.FeatureCollection("projects/landsat-325606/assets/3catchment"),
    agriculture = ee.FeatureCollection("projects/landsat-325606/assets/Agriculture_Pt"),
    barren = ee.FeatureCollection("projects/landsat-325606/assets/Barren_Pt"),
    builtup = ee.FeatureCollection("projects/landsat-325606/assets/Built_up_Pt"),
    Densevege = ee.FeatureCollection("projects/landsat-325606/assets/Dense_Vegetation_Pt"),
    forestscrub = ee.FeatureCollection("projects/landsat-325606/assets/Forest_Scrub_Pt"),
    mining = ee.FeatureCollection("projects/landsat-325606/assets/Mining_Pt"),
    openscrub = ee.FeatureCollection("projects/landsat-325606/assets/Open_Scrub_Pt"),
    water = ee.FeatureCollection("projects/landsat-325606/assets/Water_Pt"),
    table = ee.FeatureCollection("projects/landsat-325606/assets/Built_up_Pt"),
    ZSXC = ee.FeatureCollection("projects/landsat-325606/assets/allinone1");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var lulc11 = ee.FeatureCollection(agriculture)
var lulc22 = ee.FeatureCollection(barren)
var lulc33 = ee.FeatureCollection(builtup)
var lulc44 = ee.FeatureCollection(Densevege)
var lulc55 = ee.FeatureCollection(forestscrub)
var lulc66 = ee.FeatureCollection(mining)
var lulc77 = ee.FeatureCollection(openscrub)
var lulc88 = ee.FeatureCollection(water)
// var classNames = barren1.merge(bamboo1).merge(cokeplant1).merge(fallow1).merge(grassland1).merge(mining1).merge(shrub1).merge(urban1).merge(water1);
// var classNames = lulc11.merge(lulc22).merge(lulc33).merge(lulc44).merge(lulc55).merge(lulc66).merge(lulc77).merge(lulc88)
var classNames = ee.FeatureCollection(ZSXC)
// var shape = ee.FeatureCollection("users/viveksinghenv/Damodar_Basin");
// var classNames = Water.merge(Urban).merge(Agriculture).merge(Fallowland).merge(Mining).merge(DenseVegetation).merge(Barren);
// //Visualize the data
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

// function applyScaleFactors(image) {
//   var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
//   var thermalBands = image.select('ST_B.*').multiply(0.00341802).add(149.0);
//   return image.addBands(opticalBands, null, true)
//               .addBands(thermalBands, null, true);
// }
// var image= collection.map(applyScaleFactors);
// This finds the median value of all the pixels which meet the criteria.
Map.addLayer(collection, {bands: ['SR_B4', 'SR_B3', 'SR_B2'], min: 7000, max: 30000, gamma:3}, 'TCC');
Map.addLayer(collection, {bands: ['SR_B5', 'SR_B4', 'SR_B3'], min: 7000, max: 30000, gamma:3}, 'SFC');
// Map.addLayer(medianpixels, {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000, gamma: 1.5}, 'Sentinel_2 TCC');
// Map.addLayer(medianpixels, {bands: ['B8', 'B4', 'B3'], min: 0, max: 3000, gamma: 1.5}, 'Sentinel_2 FCC');

// Map.addLayer(roi)
// print(classNames);
// Creating training data sets
var bands = ['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B6','SR_B7'];
var sample = classNames; 
// print(training);
var sample = sample.randomColumn();
print(sample)
var traininggcp = sample.filter(ee.Filter.lt('random', 0.70))// //70% training and 30% validation
var validation = sample.filter(ee.Filter.gte('random', 0.70));
print(traininggcp)
print(validation)
var training = collection.select(bands).sampleRegions({
  collection: traininggcp,
  properties: ['landcover'],
  scale: 20
});
var classifier = ee.Classifier.libsvm().train({ //ee.Classifier.decisionTree(treeString)
  features: training,
  classProperty: 'landcover',
  inputProperties: bands
});
//Run the classification
var classified = collection.select(bands).classify(classifier);
//Display classification
Map.centerObject(classNames, 10);
Map.addLayer(classified,
{min: 1, max: 8,palette: ['0cffff','27a910','81937e','d61717','f1fb5b','0cff08','cf1ad2','1EEAF9']},
'classification',0);

var test = classified.sampleRegions({
  collection: validation,
  properties: ['landcover'],
    scale:20 ,
});

var testConfusionMatrix = test.errorMatrix('landcover', 'classification')
// Printing of confusion matrix may time out. Alternatively, you can export it as CSV
print('Confusion Matrix', testConfusionMatrix);
print('Test Accuracy', testConfusionMatrix.accuracy());
Map.addLayer(classNames);
ui.Label(classNames)
Export.image.toDrive({
  image: classified,
  description: 'Landsat2014',
  scale: 15,
  maxPixels: 1e9,
  region: Studyarea
});
// var NDVI2020 = collection.expression(
//     "(NIR - RED) / (NIR + RED)",
//     {
//       RED: collection.select("B4"),    //  RED
//       NIR: collection.select("B8"),    // NIR
//       BLUE: collection.select("B2"),    // BLUE
//       SWIR: collection.select("B11")    //SWIR
//     });
// var NDBI2020 = collection.expression(
//       "(SWIR - NIR) / (SWIR + NIR)",
//       {
//       RED: collection.select("B4"),    //  RED
//       NIR: collection.select("B8"),    // NIR
//       BLUE: collection.select("B2"),    // BLUE
//       SWIR: collection.select("B11")    //SWIR
//     });
// Map.addLayer(NDVI2020,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"NDWI Nov32019",0)
// Map.addLayer(NDBI2020)
// // Export.image.toDrive({
// //   image: classified,
// //   description: 'Sentinel_2',
// //   scale: 15,
// //   maxPixels: 1e9,
// //   region: shape
// // });
// Map.addLayer(classNames,0)
// print(classNames)