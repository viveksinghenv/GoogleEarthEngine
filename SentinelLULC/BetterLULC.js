/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var shape = ee.FeatureCollection("users/viveksinghenv17dr000519/Watershed");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// /Visualize the data
Map.centerObject(shape);
Map.addLayer(shape,undefined,"Damodar Basin");
var collectionJan2019 = ee.ImageCollection("COPERNICUS/S2_SR") // searches all sentinel 2 imagery pixels...
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 10)) // ...filters on the metadata for pixels less than 10% cloud
  .filterDate('2019-01-1' ,'2019-01-15') //... chooses only pixels between the dates you define here
  .filterBounds(shape); // ... that are within your aoi
print(collectionJan2019); // this generates a JSON list of the images (and their metadata) which the filters found in the right-hand window.
var medianpixelJan2019 = collectionJan2019.median(); // This finds the median value of all the pixels which meet the criteria. 

// var medianpixelsclipped = medianpixels.divide(10000); // this cuts up the result so that it fits neatly into your aoi
                                                                  // and divides so that values between 0 and 1    
Map.addLayer(medianpixelJan2019, {bands: ['B4', 'B3', 'B2'], min: 400, max: 3000, gamma: 2.5}, 'Sentinel_2 mosaic');


// Define visualization parameters in a JavaScript dictionary for true colour rendering. Bands 4,3 and 2 needed for RGB.
var trueColour = {
    bands: ["B4", "B3", "B2"],
    min: 0,
    max: 3000
    };

// Add the image to the map, using the visualization parameters.
Map.addLayer(medianpixelJan2019, trueColour, "True-colour image");
//Define false-colour visualization parameters.
var falseColour = {
    bands: ["B8", "B4", "B3"],
    min: 0,
    max: 3000
    };
Map.addLayer(medianpixelJan2019, falseColour, "False-colour composite");
//Define variable NDVI from equation
var NDVIJan2019 = medianpixelJan2019.expression(
    "(NIR - RED) / (NIR + RED)",
    {
      RED: medianpixelJan2019.select("B4"),    //  RED
      NIR: medianpixelJan2019.select("B8"),    // NIR
      BLUE: medianpixelJan2019.select("B2"),    // BLUE
      SWIR: medianpixelJan2019.select("B11")    //SWIR
    });
var NDBIJan2019 = medianpixelJan2019.expression(
      "(SWIR - NIR) / (SWIR + NIR)",
      {
      RED: medianpixelJan2019.select("B4"),    //  RED
      NIR: medianpixelJan2019.select("B8"),    // NIR
      BLUE: medianpixelJan2019.select("B2"),    // BLUE
      SWIR: medianpixelJan2019.select("B11")    //SWIR
    });
var NDWIJan2019 = medianpixelJan2019.expression(
      "(GREEN - NIR) / (GREEN + NIR)",
      {
      RED: medianpixelJan2019.select("B4"),    //  RED
      NIR: medianpixelJan2019.select("B8"),    // NIR
      BLUE: medianpixelJan2019.select("B2"),    // BLUE
      SWIR: medianpixelJan2019.select("B11"),    //SWIR
      GREEN: medianpixelJan2019.select("B3")    //GREEN
    });
Map.addLayer(NDVIJan2019,{},"NDVI Jan2019");
Map.addLayer(NDBIJan2019,{},"NDBI Jan2019");
Map.addLayer(NDWIJan2019,{},"NDWI Jan2019");
// Export.image.toDrive({
//   image: NDVIJan2019,
//   description: 'NDVIJan2019',
//   scale: 20,
//   maxPixels: 1e9,
//   region: shape
// });
// Export.image.toDrive({
//   image: NDBIJan2019,
//   description: 'NDBIJan2019',
//   scale: 20,
//   maxPixels: 1e9,
//   region: shape
// });Export.image.toDrive({
//   image: NDWIJan2019,
//   description: 'NDWIJan2019',
//   scale: 20,
//   maxPixels: 1e9,
//   region: shape
// });

// Filter the collection for the VV product from the descending track
var collectionVV = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
    .filterBounds(shape)
    .select(['VV']);
print(collectionVV);

// Filter the collection for the VH product from the descending track
var collectionVH = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
    .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
    .filterBounds(shape)
    .select(['VH']);
print(collectionVH);
Map.centerObject(shape, 10);
// Use the median reducer to obtain the median pixel value across the all years for each pixel.
var VV = collectionVV.median();
// Adding the VV layer to the map
Map.addLayer(VV, {min: -14, max: -7}, 'VV');
//Calculate the VH layer and add it
var VH = collectionVH.median();
Map.addLayer(VH, {min: -20, max: -7}, 'VH');
// Next we will experiment with making an RGB composite from the SAR data. 
// To do this we need to create three layers that we can place into the Red, Green, and Blue channels.
// Create a 3 band stack by selecting from different periods (months)
var VV1 = ee.Image(collectionVV.filterDate('2019-01-01', '2019-04-30').median());
var VV2 = ee.Image(collectionVV.filterDate('2019-05-01', '2019-08-31').median());
var VV3 = ee.Image(collectionVV.filterDate('2019-09-01', '2019-12-31').median());
//Add to map
Map.addLayer(VV1.addBands(VV2).addBands(VV3), {min: -12, max: -7}, 'Season composite VV');

// Create a 3 band stack by selecting from different periods (months)
var VH1 = ee.Image(collectionVH.filterDate('2019-06-01', '2019-06-30').median());
var VH2 = ee.Image(collectionVH.filterDate('2019-07-01', '2019-07-30').median());
var VH3 = ee.Image(collectionVH.filterDate('2019-08-01', '2019-08-31').median());

//Add to map
Map.addLayer(VH1.addBands(VH2).addBands(VH3), {min: -12, max: -7}, 'Season composite VH');