// Make a cloud-free Landsat 8 TOA composite (from raw imagery).
var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1');

var image = ee.Algorithms.Landsat.simpleComposite({
  collection: l8.filterDate('2018-01-01', '2018-12-31'),
  asFloat: true
});

// Use these bands for prediction.
var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B10', 'B11'];

// Load training points. The numeric property 'class' stores known labels.
var points = ee.FeatureCollection('GOOGLE/EE/DEMOS/demo_landcover_labels');

// This property stores the land cover labels as consecutive
// integers starting from zero.
var label = 'landcover';

// Overlay the points on the imagery to get training.
var training = image.select(bands).sampleRegions({
  collection: points,
  properties: [label],
  scale: 30
});

// Train a CART classifier with default parameters.
var trained = ee.Classifier.smileCart().train(training, label, bands);

// Classify the image with the same bands used for training.
var classified = image.select(bands).classify(trained);

// Display the inputs and the results.
Map.centerObject(points, 11);
Map.addLayer(image, {bands: ['B4', 'B3', 'B2'], max: 0.4}, 'image');
Map.addLayer(classified,
             {min: 0, max: 2, palette: ['red', 'green', 'blue']},
             'classification');
// Make a cloud-free Landsat 8 TOA composite (from raw imagery).
var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1');

var image = ee.Algorithms.Landsat.simpleComposite({
  collection: l8.filterDate('2018-01-01', '2018-12-31'),
  asFloat: true
});

// Use these bands for prediction.
var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B10', 'B11'];

// Manually created polygons.
var forest1 = ee.Geometry.Rectangle(-63.0187, -9.3958, -62.9793, -9.3443);
var forest2 = ee.Geometry.Rectangle(-62.8145, -9.206, -62.7688, -9.1735);
var nonForest1 = ee.Geometry.Rectangle(-62.8161, -9.5001, -62.7921, -9.4486);
var nonForest2 = ee.Geometry.Rectangle(-62.6788, -9.044, -62.6459, -8.9986);

// Make a FeatureCollection from the hand-made geometries.
var polygons = ee.FeatureCollection([
  ee.Feature(nonForest1, {'class': 0}),
  ee.Feature(nonForest2, {'class': 0}),
  ee.Feature(forest1, {'class': 1}),
  ee.Feature(forest2, {'class': 1}),
]);

// Get the values for all pixels in each polygon in the training.
var training = image.sampleRegions({
  // Get the sample from the polygons FeatureCollection.
  collection: polygons,
  // Keep this list of properties from the polygons.
  properties: ['class'],
  // Set the scale to get Landsat pixels in the polygons.
  scale: 30
});

// Create an SVM classifier with custom parameters.
var classifier = ee.Classifier.libsvm({
  kernelType: 'RBF',
  gamma: 0.5,
  cost: 10
});

// Train the classifier.
var trained = classifier.train(training, 'class', bands);

// Classify the image.
var classified = image.classify(trained);

// Display the classification result and the input image.
Map.setCenter(-62.836, -9.2399, 9);
Map.addLayer(image, {bands: ['B4', 'B3', 'B2'], max: 0.5, gamma: 2});
Map.addLayer(polygons, {}, 'training polygons');
Map.addLayer(classified,
             {min: 0, max: 1, palette: ['red', 'green']},
             'deforestation');
             
// Define a region of interest as a point.  Change the coordinates
// to get a classification of any place where there is imagery.
var roi = ee.Geometry.Point(-122.3942, 37.7295);

// Load Landsat 5 input imagery.
var landsat = ee.Image(ee.ImageCollection('LANDSAT/LT05/C01/T1_TOA')
  // Filter to get only one year of images.
  .filterDate('2011-01-01', '2011-12-31')
  // Filter to get only images under the region of interest.
  .filterBounds(roi)
  // Sort by scene cloudiness, ascending.
  .sort('CLOUD_COVER')
  // Get the first (least cloudy) scene.
  .first());

// Compute cloud score.
var cloudScore = ee.Algorithms.Landsat.simpleCloudScore(landsat).select('cloud');

// Mask the input for clouds.  Compute the min of the input mask to mask
// pixels where any band is masked.  Combine that with the cloud mask.
var input = landsat.updateMask(landsat.mask().reduce('min').and(cloudScore.lte(50)));

// Use MODIS land cover, IGBP classification, for training.
var modis = ee.Image('MODIS/051/MCD12Q1/2011_01_01')
    .select('Land_Cover_Type_1');

// Sample the input imagery to get a FeatureCollection of training data.
var training = input.addBands(modis).sample({
  numPixels: 5000,
  seed: 0
});

// Make a Random Forest classifier and train it.
var classifier = ee.Classifier.smileRandomForest(10)
    .train({
      features: training,
      classProperty: 'Land_Cover_Type_1',
      inputProperties: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7']
    });

// Classify the input imagery.
var classified = input.classify(classifier);

// Get a confusion matrix representing resubstitution accuracy.
var trainAccuracy = classifier.confusionMatrix();
print('Resubstitution error matrix: ', trainAccuracy);
print('Training overall accuracy: ', trainAccuracy.accuracy());

// Sample the input with a different random seed to get validation data.
var validation = input.addBands(modis).sample({
  numPixels: 5000,
  seed: 1
  // Filter the result to get rid of any null pixels.
}).filter(ee.Filter.neq('B1', null));

// Classify the validation data.
var validated = validation.classify(classifier);

// Get a confusion matrix representing expected accuracy.
var testAccuracy = validated.errorMatrix('Land_Cover_Type_1', 'classification');
print('Validation error matrix: ', testAccuracy);
print('Validation overall accuracy: ', testAccuracy.accuracy());

// Define a palette for the IGBP classification.
var igbpPalette = [
  'aec3d4', // water
  '152106', '225129', '369b47', '30eb5b', '387242', // forest
  '6a2325', 'c3aa69', 'b76031', 'd9903d', '91af40',  // shrub, grass
  '111149', // wetlands
  'cdb33b', // croplands
  'cc0013', // urban
  '33280d', // crop mosaic
  'd7cdcc', // snow and ice
  'f7e084', // barren
  '6f6f6f'  // tundra
];

// Display the input and the classification.
Map.centerObject(roi, 10);
Map.addLayer(input, {bands: ['B3', 'B2', 'B1'], max: 0.4}, 'landsat');
Map.addLayer(classified, {palette: igbpPalette, min: 0, max: 17}, 'classification');

var sample = input.addBands(modis).sample({
  numPixels: 5000,
  seed: 0
});

// The randomColumn() method will add a column of uniform random
// numbers in a column named 'random' by default.
sample = sample.randomColumn();

var split = 0.7;  // Roughly 70% training, 30% testing.
var training = sample.filter(ee.Filter.lt('random', split));
var validation = sample.filter(ee.Filter.gte('random', split));


// Sample the input imagery to get a FeatureCollection of training data.
var sample = input.addBands(modis).sample({
  region: landsat.geometry(),
  numPixels: 5000,
  seed: 0,
  geometries: true,
  tileScale: 16
});

// The randomColumn() method will add a column of uniform random
// numbers in a column named 'random' by default.
sample = sample.randomColumn();

var split = 0.7;  // Roughly 70% training, 30% testing.
var training = sample.filter(ee.Filter.lt('random', split));
print(training.size());
var validation = sample.filter(ee.Filter.gte('random', split));

// Spatial join.
var distFilter = ee.Filter.withinDistance({
  distance: 1000,
  leftField: '.geo',
  rightField: '.geo',
  maxError: 10
});

var join = ee.Join.inverted();

// Apply the join.
training = join.apply(training, validation, distFilter);
print(training.size());