/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[80.92483014536035, 24.634425199823497],
          [83.25393170786035, 20.24920040653834],
          [93.49318952036035, 21.215027875495878],
          [90.83449811411035, 26.635076045039852],
          [80.70510358286035, 26.850921457347518]]]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// Demonstrate the difference between optical imagery and radar backscatter.

// Define constants.
var MATCH_KEY = 'MATCHED';
var POLARIZATION = 'VV';

// // Hurricane Dorian, Bahamas flooding example
var startDate = ee.Date('2019-09-07');
var endDate = startDate.advance(6, 'days');
var geometry = ee.Geometry.Point(86.6608, 26.534);

// Chennai, India, flooding example.
// https://en.wikipedia.org/wiki/2015_South_Indian_floods
// var startDate = ee.Date('2015-11-25');
// var endDate = startDate.advance(12, 'days');
//var geometry = ee.Geometry.Point(80.1164, 12.852);

Map.centerObject(geometry, 10);

// Define the time interval for the baseline statistics.
var baselineStartDate = ee.Date('2017');
var baselineEndDate = ee.Date('2019');

var vis_params1 = {bands:POLARIZATION, min:-25, max:5};


var label1 = 'S1_GRD ';
var collection_base = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filterBounds(geometry)
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', POLARIZATION))
    .select([POLARIZATION,'angle']);

// Create a collection for developing historical statistics.
var historicalBaselineCollection = collection_base.filter(
    ee.Filter.date(baselineStartDate, baselineEndDate));

Map.addLayer(historicalBaselineCollection.select([POLARIZATION]), vis_params1, 'historicalBaselineCollection', false);

// Get a list of relative orbit numbers.
var relativeOrbitNumberList = ee.Dictionary(
    historicalBaselineCollection.aggregate_histogram('relativeOrbitNumber_start')
  ).keys()
  // Convert from strings to integers.
  .map(function (el) {return ee.Number.parse(el)});
print('relativeOrbitNumberList', relativeOrbitNumberList);

// Create a collection of images with percentile statistics for each relative orbit.
var groupedCollectionList = relativeOrbitNumberList.map(
  function (relativeOrbitNumber) {
    // Create a collection of images that matches the relative orbit number.
    var coll = historicalBaselineCollection.select([POLARIZATION])
        .filterMetadata('relativeOrbitNumber_start', 'equals', relativeOrbitNumber);
    // Calculate percentile values.
    var percentileImage = coll.reduce(ee.Reducer.percentile([1]));
    return percentileImage.set('relativeOrbitNumber_start', relativeOrbitNumber);
  });
//print('groupedCollectionList', groupedCollectionList);

// Convert the list of images to an image collection.
var historicalStatsCollection = ee.ImageCollection.fromImages(groupedCollectionList);
Map.addLayer(historicalStatsCollection, {bands:'VV_p1', min:-25, max:5}, 'historicalStatsCollection', false);


var collection1 = collection_base.filter(
    ee.Filter.date(startDate, endDate));
print('collection1.size()', collection1.size());


// For each image in the collection being analyzed, compare it to the historical statistics.
var relativeOrbitFilter = ee.Filter.equals({
  leftField: 'relativeOrbitNumber_start',
  rightField: 'relativeOrbitNumber_start'
});
var joined = ee.Join.saveFirst(MATCH_KEY)
               .apply(collection1, historicalStatsCollection, relativeOrbitFilter);

var anomalyCollection = ee.ImageCollection(joined.map(
  function (img) {
    img = ee.Image(img); 
    var statsImg = ee.Image(img.get(MATCH_KEY));
    var anomaly = statsImg.gt(img.select([POLARIZATION]));
    return anomaly;
  }));

// Create a land mask.
var hansen = ee.Image("UMD/hansen/global_forest_change_2018_v1_6");
var landMask = hansen.select('datamask').unmask().eq(1);

var anomalyMask = anomalyCollection.max().gt(0);

Map.addLayer(collection1.select(POLARIZATION), vis_params1, 'collection1');
//Map.addLayer(joined, vis_params1, 'joined', false);
//Map.addLayer(landMask, {min:0, max:1, palette:'blue,grey'}, 'landMask');
Map.addLayer(
    anomalyMask.updateMask(anomalyMask.and(landMask)),
    {min:0, max:1, palette:'red'},
    'anomaly');
