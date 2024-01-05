/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = /* color: #98ff00 */ee.Geometry.Point([86.39452556533537, 23.819372991483373]),
    geometry2 = /* color: #0b4a8b */ee.Geometry.Point([85.98116496963225, 23.84952113052561]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// Create a time series video.

// Petermann Glacier, Greenland.
var endDate = ee.Date('2019-09-17');
var startDate = endDate.advance(-300, 'days');
var geometry = geometry2;
var bufferRadius = 2.5e4;
var polarization = 'VH';
var vizMin = -25;
var vizMax = 0;
var framesPerSecond = 2;
var customFilter = ee.Filter.and(
  ee.Filter.date(startDate, endDate),
  // ee.Filter.eq('instrumentMode', 'EW'),
  // ee.Filter.equals('relativeOrbitNumber_start', 128),
  ee.Filter.eq('orbitProperties_pass', 'ASCENDING'),
  ee.Filter.listContains('transmitterReceiverPolarisation', polarization)
);

// // Hudson Bay, Canada.
// // https://www.nesdis.noaa.gov/content/ice-breakup-hudson-bay
// var endDate = ee.Date('2019-09-17');
// var startDate = endDate.advance(-1, 'year');
// // var startDate = ee.Date('2019');
// // var endDate = ee.Date('2020');
// var geometry = ee.Geometry.Point(-79.46, 56.25);
// var bufferRadius = 9e4;
// var polarization = 'HH';
// var vizMin = -25;
// var vizMax = -5;
// var framesPerSecond = 2;
// var customFilter = ee.Filter.and(
//   ee.Filter.date(startDate, endDate),
//   ee.Filter.eq('instrumentMode', 'EW'),
//   ee.Filter.equals('relativeOrbitNumber_start', 128),
//   ee.Filter.eq('orbitProperties_pass', 'ASCENDING'),
//   ee.Filter.listContains('transmitterReceiverPolarisation', polarization)
// );

// // Hurricane Dorian, Bahamas flooding example
// var endDate = ee.Date('2019-09-17');
// var startDate = endDate.advance(-60, 'days');
// var geometry = ee.Geometry.Point(-78.72, 26.57);
// var bufferRadius = 1e4;
// var polarization = 'VH';
// var vizMin = -25;
// var vizMax = -5;
// var framesPerSecond = 2;
// var customFilter = ee.Filter.and(
//   ee.Filter.date(startDate, endDate),
//   ee.Filter.eq('instrumentMode', 'IW'),
//   ee.Filter.eq('orbitProperties_pass', 'ASCENDING'),
//   ee.Filter.listContains('transmitterReceiverPolarisation', polarization)
// );


var collection = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filterBounds(geometry)
    .filter(customFilter)
    .sort('system:time_start')
    .select(polarization);
    
// Visualization and animation parameters.
var viewport = geometry.buffer(bufferRadius).bounds(1, 'EPSG:3857');
var params = {
  crs: 'EPSG:3857', // spherical mercator
  framesPerSecond: framesPerSecond,
  region: viewport,
  min: vizMin,
  max: vizMax,
  palette: ['black', 'white'],
  dimensions: 256,
};

// Preview the first frame on the map.
Map.centerObject(geometry.buffer(bufferRadius));
Map.addLayer(collection, params, 'collection');
Map.addLayer(viewport, {color:'red'}, 'viewport');
    
// Display the animation in the console.
// Append two blank images so you can tell when it repeats.
var collectionPadded = collection.merge(
  ee.ImageCollection.fromImages([ee.Image(0), ee.Image(0)]));

// Uncomment the following if you want to create a filmstrip.
//print('Filmstrip', collectionPadded.getFilmstripThumbURL(params));

print(ui.Thumbnail(collectionPadded, params));
print('geometry', geometry);
print('collection.size()', collection.size());
