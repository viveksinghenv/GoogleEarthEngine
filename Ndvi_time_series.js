var gaul = ee.FeatureCollection("FAO/GAUL/2015/level1");
var gfsad = ee.Image("USGS/GFSAD1000_V0");
// Select 'landcover' band with pixel values 1 
// which represent Rice and Wheat Rainfed crops
var wheatrice = gfsad.select('landcover').eq(1)
// Uttar Pradesh is a large state in Indo-Gangetic Plain with
// a large agricultural output.
// We use the Global Administrative Unit Layers (GAUL) dataset to get the state boundary
var uttarpradesh = gaul.filter(ee.Filter.eq('ADM1_NAME', 'Uttar Pradesh'))
// wheatrice image contains 1 and 0 pixels. We want to generate points
// only in the pixels that are 1 (representing crop areas)
// selfMask() masks the pixels with 0 value.
var points = wheatrice.selfMask().stratifiedSample({numPoints:100, region:uttarpradesh, geometries: true} )
// We need a unique id for each point. We take the feature id and set it as
// a property so we can refer to each point easily
var points = points.map(function(feature) {
  return ee.Feature(feature.geometry(), {'id': feature.id()})
})
// Show the state polygon with a blue outline
var outline = ee.Image().byte().paint({
  featureCollection: uttarpradesh,
  color: 1,
  width: 3
});
Map.addLayer(outline, {palette: ['blue']}, 'AOI')
// Show the farm locations in green
Map.addLayer(points, {color: 'green'}, 'Farm Locations')

// Function to remove cloud and snow pixels
function maskCloudAndShadows(image) {
  var cloudProb = image.select('MSK_CLDPRB');
  var snowProb = image.select('MSK_SNWPRB');
  var cloud = cloudProb.lt(5);
  var snow = snowProb.lt(5);
  var scl = image.select('SCL'); 
  var shadow = scl.eq(3); // 3 = cloud shadow
  var cirrus = scl.eq(10); // 10 = cirrus
  // Cloud probability less than 5% or cloud shadow classification
  var mask = (cloud.and(snow)).and(cirrus.neq(1)).and(shadow.neq(1));
  return image.updateMask(mask);
}
// Adding a NDVI band
function addNDVI(image) {
  var ndvi = image.normalizedDifference(['B8', 'B4']).rename('ndvi')
  return image.addBands([ndvi])
}
var startDate = '2019-01-01'
var endDate = '2019-12-31'
// Use Sentinel-2 L2A data - which has better cloud masking
var collection = ee.ImageCollection('COPERNICUS/S2_SR')
    .filterDate(startDate, endDate)
    .map(maskCloudAndShadows)
    .map(addNDVI)
    .filter(ee.Filter.bounds(points))
// View the median composite
var vizParams = {bands: ['B4', 'B3', 'B2'], min: 0, max: 2000}
Map.addLayer(collection.median(), vizParams, 'collection')

var testPoint = ee.Feature(points.first())
//Map.centerObject(testPoint, 10)
var chart = ui.Chart.image.series({
    imageCollection: collection.select('ndvi'),
    region: testPoint.geometry()
    }).setOptions({
      interpolateNulls: true,
      lineWidth: 1,
      pointSize: 3,
      title: 'NDVI over Time at a Single Location',
      vAxis: {title: 'NDVI'},
      hAxis: {title: 'Date', format: 'YYYY-MMM', gridlines: {count: 12}}
    })
print(chart)
var chart = ui.Chart.image.seriesByRegion({
    imageCollection: collection.select('ndvi'),
    regions: points,
    reducer: ee.Reducer.mean()
})
// This doesn't work as the result is to large to print
print(chart)
