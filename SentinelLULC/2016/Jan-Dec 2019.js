/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var shape = ee.FeatureCollection("users/viveksinghenv17dr000519/Watershed");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
//Visualize the data
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
Map.addLayer(medianpixelJan2019, {bands: ['B4', 'B3', 'B2'], min: 0, max: 1, gamma: 2.5}, 'Sentinel_2 mosaic');


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
Export.image.toDrive({
  image: NDVIJan2019,
  description: 'NDVIJan2019',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
Export.image.toDrive({
  image: NDBIJan2019,
  description: 'NDBIJan2019',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});Export.image.toDrive({
  image: NDWIJan2019,
  description: 'NDWIJan2019',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});

var collectionFeb2019 = ee.ImageCollection("COPERNICUS/S2_SR") // searches all sentinel 2 imagery pixels...
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 10)) // ...filters on the metadata for pixels less than 10% cloud
  .filterDate('2019-02-1' ,'2019-02-15') //... chooses only pixels between the dates you define here
  .filterBounds(shape); // ... that are within your aoi
print(collectionFeb2019); // this generates a JSON list of the images (and their metadata) which the filters found in the right-hand window.
var medianpixelFeb2019 = collectionFeb2019.median(); // This finds the median value of all the pixels which meet the criteria. 

// var medianpixelsclipped = medianpixels.divide(10000); // this cuts up the result so that it fits neatly into your aoi
                                                                  // and divides so that values between 0 and 1    
Map.addLayer(medianpixelFeb2019, {bands: ['B4', 'B3', 'B2'], min: 0, max: 1, gamma: 2.5}, 'Sentinel_2 mosaic');

// Add the image to the map, using the visualization parameters.
Map.addLayer(medianpixelFeb2019, trueColour, "True-colour image");
Map.addLayer(medianpixelFeb2019, falseColour, "False-colour composite");
//Define variable NDVI from equation
var NDVIFeb2019 = medianpixelFeb2019.expression(
    "(NIR - RED) / (NIR + RED)",
    {
      RED: medianpixelFeb2019.select("B4"),    //  RED
      NIR: medianpixelFeb2019.select("B8"),    // NIR
      BLUE: medianpixelFeb2019.select("B2"),    // BLUE
      SWIR: medianpixelFeb2019.select("B11")    //SWIR
    });
var NDBIFeb2019 = medianpixelFeb2019.expression(
      "(SWIR - NIR) / (SWIR + NIR)",
      {
      RED: medianpixelFeb2019.select("B4"),    //  RED
      NIR: medianpixelFeb2019.select("B8"),    // NIR
      BLUE: medianpixelFeb2019.select("B2"),    // BLUE
      SWIR: medianpixelFeb2019.select("B11")    //SWIR
    });
var NDWIFeb2019 = medianpixelFeb2019.expression(
      "(GREEN - NIR) / (GREEN + NIR)",
      {
      RED: medianpixelFeb2019.select("B4"),    //  RED
      NIR: medianpixelFeb2019.select("B8"),    // NIR
      BLUE: medianpixelFeb2019.select("B2"),    // BLUE
      SWIR: medianpixelFeb2019.select("B11"),    //SWIR
      GREEN: medianpixelFeb2019.select("B3")    //GREEN
    });
Map.addLayer(NDVIFeb2019,{},"NDVI Feb2019");
Map.addLayer(NDBIFeb2019,{},"NDBI Feb2019");
Map.addLayer(NDWIFeb2019,{},"NDWI Feb2019");
Export.image.toDrive({
  image: NDVIFeb2019,
  description: 'NDVI Feb2019',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
Export.image.toDrive({
  image: NDBIFeb2019,
  description: 'NDBI Feb2019',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});Export.image.toDrive({
  image: NDWIFeb2019,
  description: 'NDWI Feb2019',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
var collectionMar2019 = ee.ImageCollection("COPERNICUS/S2_SR") // searches all sentinel 2 imagery pixels...
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 10)) // ...filters on the metadata for pixels less than 10% cloud
  .filterDate('2019-03-1' ,'2019-03-15') //... chooses only pixels between the dates you define here
  .filterBounds(shape); // ... that are within your aoi
print(collectionMar2019); // this generates a JSON list of the images (and their metadata) which the filters found in the right-hand window.
var medianpixelMar2019 = collectionMar2019.median(); // This finds the median value of all the pixels which meet the criteria. 

// var medianpixelsclipped = medianpixels.divide(10000); // this cuts up the result so that it fits neatly into your aoi
                                                                  // and divides so that values between 0 and 1    
Map.addLayer(medianpixelMar2019, {bands: ['B4', 'B3', 'B2'], min: 0, max: 1, gamma: 2.5}, 'Sentinel_2 mosaic');

// Add the image to the map, using the visualization parameters.
Map.addLayer(medianpixelMar2019, trueColour, "True-colour image");
Map.addLayer(medianpixelMar2019, falseColour, "False-colour composite");
//Define variable NDVI from equation
var NDVIMar2019 = medianpixelMar2019.expression(
    "(NIR - RED) / (NIR + RED)",
    {
      RED: medianpixelMar2019.select("B4"),    //  RED
      NIR: medianpixelMar2019.select("B8"),    // NIR
      BLUE: medianpixelMar2019.select("B2"),    // BLUE
      SWIR: medianpixelMar2019.select("B11")    //SWIR
    });
var NDBIMar2019 = medianpixelMar2019.expression(
      "(SWIR - NIR) / (SWIR + NIR)",
      {
      RED: medianpixelMar2019.select("B4"),    //  RED
      NIR: medianpixelMar2019.select("B8"),    // NIR
      BLUE: medianpixelMar2019.select("B2"),    // BLUE
      SWIR: medianpixelMar2019.select("B11")    //SWIR
    });
var NDWIMar2019 = medianpixelMar2019.expression(
      "(GREEN - NIR) / (GREEN + NIR)",
      {
      RED: medianpixelMar2019.select("B4"),    //  RED
      NIR: medianpixelMar2019.select("B8"),    // NIR
      BLUE: medianpixelMar2019.select("B2"),    // BLUE
      SWIR: medianpixelMar2019.select("B11"),    //SWIR
      GREEN: medianpixelMar2019.select("B3")    //GREEN
    });
Map.addLayer(NDVIMar2019,{},"NDVI Mar2019");
Map.addLayer(NDBIMar2019,{},"NDBI Mar2019");
Map.addLayer(NDWIMar2019,{},"NDWI Mar2019");
Export.image.toDrive({
  image: NDVIMar2019,
  description: 'NDVI Mar2019',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
Export.image.toDrive({
  image: NDBIMar2019,
  description: 'NDBI Mar2019',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});Export.image.toDrive({
  image: NDWIMar2019,
  description: 'NDWI Mar2019',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
var collectionApr2019 = ee.ImageCollection("COPERNICUS/S2_SR") // searches all sentinel 2 imagery pixels...
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 10)) // ...filters on the metadata for pixels less than 10% cloud
  .filterDate('2019-04-1' ,'2019-04-15') //... chooses only pixels between the dates you define here
  .filterBounds(shape); // ... that are within your aoi
print(collectionApr2019); // this generates a JSON list of the images (and their metadata) which the filters found in the right-hand window.
var medianpixelApr2019 = collectionApr2019.median(); // This finds the median value of all the pixels which meet the criteria. 

// var medianpixelsclipped = medianpixels.divide(10000); // this cuts up the result so that it fits neatly into your aoi
                                                                  // and divides so that values between 0 and 1    
Map.addLayer(medianpixelApr2019, {bands: ['B4', 'B3', 'B2'], min: 0, max: 1, gamma: 2.5}, 'Sentinel_2 mosaic');

// Add the image to the map, using the visualization parameters.
Map.addLayer(medianpixelApr2019, trueColour, "True-colour image");
Map.addLayer(medianpixelApr2019, falseColour, "False-colour composite");
//Define variable NDVI from equation
var NDVIApr2019 = medianpixelApr2019.expression(
    "(NIR - RED) / (NIR + RED)",
    {
      RED: medianpixelApr2019.select("B4"),    //  RED
      NIR: medianpixelApr2019.select("B8"),    // NIR
      BLUE: medianpixelApr2019.select("B2"),    // BLUE
      SWIR: medianpixelApr2019.select("B11")    //SWIR
    });
var NDBIApr2019 = medianpixelApr2019.expression(
      "(SWIR - NIR) / (SWIR + NIR)",
      {
      RED: medianpixelApr2019.select("B4"),    //  RED
      NIR: medianpixelApr2019.select("B8"),    // NIR
      BLUE: medianpixelApr2019.select("B2"),    // BLUE
      SWIR: medianpixelApr2019.select("B11")    //SWIR
    });
var NDWIApr2019 = medianpixelApr2019.expression(
      "(GREEN - NIR) / (GREEN + NIR)",
      {
      RED: medianpixelApr2019.select("B4"),    //  RED
      NIR: medianpixelApr2019.select("B8"),    // NIR
      BLUE: medianpixelApr2019.select("B2"),    // BLUE
      SWIR: medianpixelApr2019.select("B11"),    //SWIR
      GREEN: medianpixelApr2019.select("B3")    //GREEN
    });
Map.addLayer(NDVIApr2019,{},"NDVI Apr2019");
Map.addLayer(NDBIApr2019,{},"NDBI Apr2019");
Map.addLayer(NDWIApr2019,{},"NDWI Apr2019");
Export.image.toDrive({
  image: NDVIApr2019,
  description: 'NDVI Apr2019',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
Export.image.toDrive({
  image: NDBIApr2019,
  description: 'NDBI Apr2019',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});Export.image.toDrive({
  image: NDWIApr2019,
  description: 'NDWI Apr2019',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
var collectionMay2019 = ee.ImageCollection("COPERNICUS/S2_SR") // searches all sentinel 2 imagery pixels...
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 10)) // ...filters on the metadata for pixels less than 10% cloud
  .filterDate('2019-05-1' ,'2019-05-15') //... chooses only pixels between the dates you define here
  .filterBounds(shape); // ... that are within your aoi
print(collectionMay2019); // this generates a JSON list of the images (and their metadata) which the filters found in the right-hand window.
var medianpixelMay2019 = collectionMay2019.median(); // This finds the median value of all the pixels which meet the criteria. 

// var medianpixelsclipped = medianpixels.divide(10000); // this cuts up the result so that it fits neatly into your aoi
                                                                  // and divides so that values between 0 and 1    
Map.addLayer(medianpixelMay2019, {bands: ['B4', 'B3', 'B2'], min: 0, max: 1, gamma: 2.5}, 'Sentinel_2 mosaic');

// Add the image to the map, using the visualization parameters.
Map.addLayer(medianpixelMay2019, trueColour, "True-colour image");
Map.addLayer(medianpixelMay2019, falseColour, "False-colour composite");
//Define variable NDVI from equation
var NDVIMay2019 = medianpixelMay2019.expression(
    "(NIR - RED) / (NIR + RED)",
    {
      RED: medianpixelMay2019.select("B4"),    //  RED
      NIR: medianpixelMay2019.select("B8"),    // NIR
      BLUE: medianpixelMay2019.select("B2"),    // BLUE
      SWIR: medianpixelMay2019.select("B11")    //SWIR
    });
var NDBIMay2019 = medianpixelMay2019.expression(
      "(SWIR - NIR) / (SWIR + NIR)",
      {
      RED: medianpixelMay2019.select("B4"),    //  RED
      NIR: medianpixelMay2019.select("B8"),    // NIR
      BLUE: medianpixelMay2019.select("B2"),    // BLUE
      SWIR: medianpixelMay2019.select("B11")    //SWIR
    });
var NDWIMay2019 = medianpixelMay2019.expression(
      "(GREEN - NIR) / (GREEN + NIR)",
      {
      RED: medianpixelMay2019.select("B4"),    //  RED
      NIR: medianpixelMay2019.select("B8"),    // NIR
      BLUE: medianpixelMay2019.select("B2"),    // BLUE
      SWIR: medianpixelMay2019.select("B11"),    //SWIR
      GREEN: medianpixelMay2019.select("B3")    //GREEN
    });
Map.addLayer(NDVIMay2019,{},"NDVI May2019");
Map.addLayer(NDBIMay2019,{},"NDBI May2019");
Map.addLayer(NDWIMay2019,{},"NDWI May2019");
Export.image.toDrive({
  image: NDVIMay2019,
  description: 'NDVI May2019',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
Export.image.toDrive({
  image: NDBIMay2019,
  description: 'NDBI May2019',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});Export.image.toDrive({
  image: NDWIMay2019,
  description: 'NDWI May2019',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
var collectionJune2019 = ee.ImageCollection("COPERNICUS/S2_SR") // searches all sentinel 2 imagery pixels...
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 30)) // ...filters on the metadata for pixels less than 10% cloud
  .filterDate('2019-06-1' ,'2019-06-30') //... chooses only pixels between the dates you define here
  .filterBounds(shape); // ... that are within your aoi
print(collectionJune2019); // this generates a JSON list of the images (and their metadata) which the filters found in the right-hand window.
var medianpixelJune2019 = collectionJune2019.median(); // This finds the median value of all the pixels which meet the criteria. 

// var medianpixelsclipped = medianpixels.divide(10000); // this cuts up the result so that it fits neatly into your aoi
                                                                  // and divides so that values between 0 and 1    
Map.addLayer(medianpixelJune2019, {bands: ['B4', 'B3', 'B2'], min: 0, max: 1, gamma: 2.5}, 'Sentinel_2 mosaic');

// Add the image to the map, using the visualization parameters.
Map.addLayer(medianpixelJune2019, trueColour, "True-colour image");
Map.addLayer(medianpixelJune2019, falseColour, "False-colour composite");
//Define variable NDVI from equation
var NDVIJune2019 = medianpixelJune2019.expression(
    "(NIR - RED) / (NIR + RED)",
    {
      RED: medianpixelJune2019.select("B4"),    //  RED
      NIR: medianpixelJune2019.select("B8"),    // NIR
      BLUE: medianpixelJune2019.select("B2"),    // BLUE
      SWIR: medianpixelJune2019.select("B11")    //SWIR
    });
var NDBIJune2019 = medianpixelJune2019.expression(
      "(SWIR - NIR) / (SWIR + NIR)",
      {
      RED: medianpixelJune2019.select("B4"),    //  RED
      NIR: medianpixelJune2019.select("B8"),    // NIR
      BLUE: medianpixelJune2019.select("B2"),    // BLUE
      SWIR: medianpixelJune2019.select("B11")    //SWIR
    });
var NDWIJune2019 = medianpixelJune2019.expression(
      "(GREEN - NIR) / (GREEN + NIR)",
      {
      RED: medianpixelJune2019.select("B4"),    //  RED
      NIR: medianpixelJune2019.select("B8"),    // NIR
      BLUE: medianpixelJune2019.select("B2"),    // BLUE
      SWIR: medianpixelJune2019.select("B11"),    //SWIR
      GREEN: medianpixelJune2019.select("B3")    //GREEN
    });
Map.addLayer(NDVIJune2019,{},"NDVI June2019");
Map.addLayer(NDBIJune2019,{},"NDBI June2019");
Map.addLayer(NDWIJune2019,{},"NDWI June2019");
Export.image.toDrive({
  image: NDVIJune2019,
  description: 'NDVI June2019',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
Export.image.toDrive({
  image: NDBIJune2019,
  description: 'NDBI June2019',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});Export.image.toDrive({
  image: NDWIJune2019,
  description: 'NDWI June2019',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
var collectionJuly2019 = ee.ImageCollection("COPERNICUS/S2_SR") // searches all sentinel 2 imagery pixels...
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 30)) // ...filters on the metadata for pixels less than 10% cloud
  .filterDate('2019-07-1' ,'2019-07-30') //... chooses only pixels between the dates you define here
  .filterBounds(shape); // ... that are within your aoi
print(collectionJuly2019); // this generates a JSON list of the images (and their metadata) which the filters found in the right-hand window.
var medianpixelJuly2019 = collectionJuly2019.median(); // This finds the median value of all the pixels which meet the criteria. 

// var medianpixelsclipped = medianpixels.divide(10000); // this cuts up the result so that it fits neatly into your aoi
                                                                  // and divides so that values between 0 and 1    
Map.addLayer(medianpixelJuly2019, {bands: ['B4', 'B3', 'B2'], min: 0, max: 1, gamma: 2.5}, 'Sentinel_2 mosaic');

// Add the image to the map, using the visualization parameters.
Map.addLayer(medianpixelJuly2019, trueColour, "True-colour image");
Map.addLayer(medianpixelJuly2019, falseColour, "False-colour composite");
//Define variable NDVI from equation
var NDVIJuly2019 = medianpixelJuly2019.expression(
    "(NIR - RED) / (NIR + RED)",
    {
      RED: medianpixelJuly2019.select("B4"),    //  RED
      NIR: medianpixelJuly2019.select("B8"),    // NIR
      BLUE: medianpixelJuly2019.select("B2"),    // BLUE
      SWIR: medianpixelJuly2019.select("B11")    //SWIR
    });
var NDBIJuly2019 = medianpixelJuly2019.expression(
      "(SWIR - NIR) / (SWIR + NIR)",
      {
      RED: medianpixelJuly2019.select("B4"),    //  RED
      NIR: medianpixelJuly2019.select("B8"),    // NIR
      BLUE: medianpixelJuly2019.select("B2"),    // BLUE
      SWIR: medianpixelJuly2019.select("B11")    //SWIR
    });
var NDWIJuly2019 = medianpixelJuly2019.expression(
      "(GREEN - NIR) / (GREEN + NIR)",
      {
      RED: medianpixelJuly2019.select("B4"),    //  RED
      NIR: medianpixelJuly2019.select("B8"),    // NIR
      BLUE: medianpixelJuly2019.select("B2"),    // BLUE
      SWIR: medianpixelJuly2019.select("B11"),    //SWIR
      GREEN: medianpixelJuly2019.select("B3")    //GREEN
    });
Map.addLayer(NDVIJuly2019,{},"NDVI July2019");
Map.addLayer(NDBIJuly2019,{},"NDBI July2019");
Map.addLayer(NDWIJuly2019,{},"NDWI July2019");
Export.image.toDrive({
  image: NDVIJuly2019,
  description: 'NDVI July2019',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
Export.image.toDrive({
  image: NDBIJuly2019,
  description: 'NDBI July2019',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});Export.image.toDrive({
  image: NDWIJuly2019,
  description: 'NDWI July2019',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
var collectionAug2019 = ee.ImageCollection("COPERNICUS/S2_SR") // searches all sentinel 2 imagery pixels...
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 50)) // ...filters on the metadata for pixels less than 10% cloud
  .filterDate('2019-08-1' ,'2019-08-30') //... chooses only pixels between the dates you define here
  .filterBounds(shape); // ... that are within your aoi
print(collectionAug2019); // this generates a JSON list of the images (and their metadata) which the filters found in the right-hand window.
var medianpixelAug2019 = collectionAug2019.median(); // This finds the median value of all the pixels which meet the criteria. 

// var medianpixelsclipped = medianpixels.divide(10000); // this cuts up the result so that it fits neatly into your aoi
                                                                  // and divides so that values between 0 and 1    
Map.addLayer(medianpixelAug2019, {bands: ['B4', 'B3', 'B2'], min: 0, max: 1, gamma: 2.5}, 'Sentinel_2 mosaic');

// Add the image to the map, using the visualization parameters.
Map.addLayer(medianpixelAug2019, trueColour, "True-colour image");
Map.addLayer(medianpixelAug2019, falseColour, "False-colour composite");
//Define variable NDVI from equation
var NDVIAug2019 = medianpixelAug2019.expression(
    "(NIR - RED) / (NIR + RED)",
    {
      RED: medianpixelAug2019.select("B4"),    //  RED
      NIR: medianpixelAug2019.select("B8"),    // NIR
      BLUE: medianpixelAug2019.select("B2"),    // BLUE
      SWIR: medianpixelAug2019.select("B11")    //SWIR
    });
var NDBIAug2019 = medianpixelAug2019.expression(
      "(SWIR - NIR) / (SWIR + NIR)",
      {
      RED: medianpixelAug2019.select("B4"),    //  RED
      NIR: medianpixelAug2019.select("B8"),    // NIR
      BLUE: medianpixelAug2019.select("B2"),    // BLUE
      SWIR: medianpixelAug2019.select("B11")    //SWIR
    });
var NDWIAug2019 = medianpixelAug2019.expression(
      "(GREEN - NIR) / (GREEN + NIR)",
      {
      RED: medianpixelAug2019.select("B4"),    //  RED
      NIR: medianpixelAug2019.select("B8"),    // NIR
      BLUE: medianpixelAug2019.select("B2"),    // BLUE
      SWIR: medianpixelAug2019.select("B11"),    //SWIR
      GREEN: medianpixelAug2019.select("B3")    //GREEN
    });
Map.addLayer(NDVIAug2019,{},"NDVI Aug2019");
Map.addLayer(NDBIAug2019,{},"NDBI Aug2019");
Map.addLayer(NDWIAug2019,{},"NDWI Aug2019");
Export.image.toDrive({
  image: NDVIAug2019,
  description: 'NDVI Aug2019',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
Export.image.toDrive({
  image: NDBIAug2019,
  description: 'NDBI Aug2019',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});Export.image.toDrive({
  image: NDWIAug2019,
  description: 'NDWI Aug2019',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
var collectionSep2019 = ee.ImageCollection("COPERNICUS/S2_SR") // searches all sentinel 2 imagery pixels...
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 30)) // ...filters on the metadata for pixels less than 10% cloud
  .filterDate('2019-09-1' ,'2019-09-30') //... chooses only pixels between the dates you define here
  .filterBounds(shape); // ... that are within your aoi
print(collectionSep2019); // this generates a JSON list of the images (and their metadata) which the filters found in the right-hand window.
var medianpixelSep2019 = collectionSep2019.median(); // This finds the median value of all the pixels which meet the criteria. 

// var medianpixelsclipped = medianpixels.divide(10000); // this cuts up the result so that it fits neatly into your aoi
                                                                  // and divides so that values between 0 and 1    
Map.addLayer(medianpixelSep2019, {bands: ['B4', 'B3', 'B2'], min: 0, max: 1, gamma: 2.5}, 'Sentinel_2 mosaic');

// Add the image to the map, using the visualization parameters.
Map.addLayer(medianpixelSep2019, trueColour, "True-colour image");
Map.addLayer(medianpixelSep2019, falseColour, "False-colour composite");
//Define variable NDVI from equation
var NDVISep2019 = medianpixelSep2019.expression(
    "(NIR - RED) / (NIR + RED)",
    {
      RED: medianpixelSep2019.select("B4"),    //  RED
      NIR: medianpixelSep2019.select("B8"),    // NIR
      BLUE: medianpixelSep2019.select("B2"),    // BLUE
      SWIR: medianpixelSep2019.select("B11")    //SWIR
    });
var NDBISep2019 = medianpixelSep2019.expression(
      "(SWIR - NIR) / (SWIR + NIR)",
      {
      RED: medianpixelSep2019.select("B4"),    //  RED
      NIR: medianpixelSep2019.select("B8"),    // NIR
      BLUE: medianpixelSep2019.select("B2"),    // BLUE
      SWIR: medianpixelSep2019.select("B11")    //SWIR
    });
var NDWISep2019 = medianpixelSep2019.expression(
      "(GREEN - NIR) / (GREEN + NIR)",
      {
      RED: medianpixelSep2019.select("B4"),    //  RED
      NIR: medianpixelSep2019.select("B8"),    // NIR
      BLUE: medianpixelSep2019.select("B2"),    // BLUE
      SWIR: medianpixelSep2019.select("B11"),    //SWIR
      GREEN: medianpixelSep2019.select("B3")    //GREEN
    });
Map.addLayer(NDVISep2019,{},"NDVI Sep2019");
Map.addLayer(NDBISep2019,{},"NDBI Sep2019");
Map.addLayer(NDWISep2019,{},"NDWI Sep2019");
Export.image.toDrive({
  image: NDVISep2019,
  description: 'NDVI Sep2019',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
Export.image.toDrive({
  image: NDBISep2019,
  description: 'NDBI Sep2019',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});Export.image.toDrive({
  image: NDWISep2019,
  description: 'NDWI Sep2019',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
var collectionOct2019 = ee.ImageCollection("COPERNICUS/S2_SR") // searches all sentinel 2 imagery pixels...
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 20)) // ...filters on the metadata for pixels less than 10% cloud
  .filterDate('2019-10-1' ,'2019-10-30') //... chooses only pixels between the dates you define here
  .filterBounds(shape); // ... that are within your aoi
print(collectionOct2019); // this generates a JSON list of the images (and their metadata) which the filters found in the right-hand window.
var medianpixelOct2019 = collectionOct2019.median(); // This finds the median value of all the pixels which meet the criteria. 

// var medianpixelsclipped = medianpixels.divide(10000); // this cuts up the result so that it fits neatly into your aoi
                                                                  // and divides so that values between 0 and 1    
Map.addLayer(medianpixelOct2019, {bands: ['B4', 'B3', 'B2'], min: 0, max: 1, gamma: 2.5}, 'Sentinel_2 mosaic');

// Add the image to the map, using the visualization parameters.
Map.addLayer(medianpixelOct2019, trueColour, "True-colour image");
Map.addLayer(medianpixelOct2019, falseColour, "False-colour composite");
//Define variable NDVI from equation
var NDVIOct2019 = medianpixelOct2019.expression(
    "(NIR - RED) / (NIR + RED)",
    {
      RED: medianpixelOct2019.select("B4"),    //  RED
      NIR: medianpixelOct2019.select("B8"),    // NIR
      BLUE: medianpixelOct2019.select("B2"),    // BLUE
      SWIR: medianpixelOct2019.select("B11")    //SWIR
    });
var NDBIOct2019 = medianpixelOct2019.expression(
      "(SWIR - NIR) / (SWIR + NIR)",
      {
      RED: medianpixelOct2019.select("B4"),    //  RED
      NIR: medianpixelOct2019.select("B8"),    // NIR
      BLUE: medianpixelOct2019.select("B2"),    // BLUE
      SWIR: medianpixelOct2019.select("B11")    //SWIR
    });
var NDWIOct2019 = medianpixelOct2019.expression(
      "(GREEN - NIR) / (GREEN + NIR)",
      {
      RED: medianpixelOct2019.select("B4"),    //  RED
      NIR: medianpixelOct2019.select("B8"),    // NIR
      BLUE: medianpixelOct2019.select("B2"),    // BLUE
      SWIR: medianpixelOct2019.select("B11"),    //SWIR
      GREEN: medianpixelOct2019.select("B3")    //GREEN
    });
Map.addLayer(NDVIOct2019,{},"NDVI Oct2019");
Map.addLayer(NDBIOct2019,{},"NDBI Oct2019");
Map.addLayer(NDWIOct2019,{},"NDWI Oct2019");
Export.image.toDrive({
  image: NDVIOct2019,
  description: 'NDVI Oct2019',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
Export.image.toDrive({
  image: NDBIOct2019,
  description: 'NDBI Oct2019',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});Export.image.toDrive({
  image: NDWIOct2019,
  description: 'NDWI Oct2019',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
var collectionNov2019 = ee.ImageCollection("COPERNICUS/S2_SR") // searches all sentinel 2 imagery pixels...
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 10)) // ...filters on the metadata for pixels less than 10% cloud
  .filterDate('2019-11-1' ,'2019-11-15') //... chooses only pixels between the dates you define here
  .filterBounds(shape); // ... that are within your aoi
print(collectionNov2019); // this generates a JSON list of the images (and their metadata) which the filters found in the right-hand window.
var medianpixelNov2019 = collectionNov2019.median(); // This finds the median value of all the pixels which meet the criteria. 

// var medianpixelsclipped = medianpixels.divide(10000); // this cuts up the result so that it fits neatly into your aoi
                                                                  // and divides so that values between 0 and 1    
Map.addLayer(medianpixelNov2019, {bands: ['B4', 'B3', 'B2'], min: 0, max: 1, gamma: 2.5}, 'Sentinel_2 mosaic');

// Add the image to the map, using the visualization parameters.
Map.addLayer(medianpixelNov2019, trueColour, "True-colour image");
Map.addLayer(medianpixelNov2019, falseColour, "False-colour composite");
//Define variable NDVI from equation
var NDVINov2019 = medianpixelNov2019.expression(
    "(NIR - RED) / (NIR + RED)",
    {
      RED: medianpixelNov2019.select("B4"),    //  RED
      NIR: medianpixelNov2019.select("B8"),    // NIR
      BLUE: medianpixelNov2019.select("B2"),    // BLUE
      SWIR: medianpixelNov2019.select("B11")    //SWIR
    });
var NDBINov2019 = medianpixelNov2019.expression(
      "(SWIR - NIR) / (SWIR + NIR)",
      {
      RED: medianpixelNov2019.select("B4"),    //  RED
      NIR: medianpixelNov2019.select("B8"),    // NIR
      BLUE: medianpixelNov2019.select("B2"),    // BLUE
      SWIR: medianpixelNov2019.select("B11")    //SWIR
    });
var NDWINov2019 = medianpixelNov2019.expression(
      "(GREEN - NIR) / (GREEN + NIR)",
      {
      RED: medianpixelNov2019.select("B4"),    //  RED
      NIR: medianpixelNov2019.select("B8"),    // NIR
      BLUE: medianpixelNov2019.select("B2"),    // BLUE
      SWIR: medianpixelNov2019.select("B11"),    //SWIR
      GREEN: medianpixelNov2019.select("B3")    //GREEN
    });
Map.addLayer(NDVINov2019,{},"NDVI Nov2019");
Map.addLayer(NDBINov2019,{},"NDBI Nov2019");
Map.addLayer(NDWINov2019,{},"NDWI Nov2019");
Export.image.toDrive({
  image: NDVINov2019,
  description: 'NDVI Nov2019',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
Export.image.toDrive({
  image: NDBINov2019,
  description: 'NDBI Nov2019',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});Export.image.toDrive({
  image: NDWINov2019,
  description: 'NDWI Nov2019',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
var collectionDec2019 = ee.ImageCollection("COPERNICUS/S2_SR") // searches all sentinel 2 imagery pixels...
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 10)) // ...filters on the metadata for pixels less than 10% cloud
  .filterDate('2019-12-1' ,'2019-12-15') //... chooses only pixels between the dates you define here
  .filterBounds(shape); // ... that are within your aoi
print(collectionDec2019); // this generates a JSON list of the images (and their metadata) which the filters found in the right-hand window.
var medianpixelDec2019 = collectionDec2019.median(); // This finds the median value of all the pixels which meet the criteria. 

// var medianpixelsclipped = medianpixels.divide(10000); // this cuts up the result so that it fits neatly into your aoi
                                                                  // and divides so that values between 0 and 1    
Map.addLayer(medianpixelDec2019, {bands: ['B4', 'B3', 'B2'], min: 0, max: 1, gamma: 2.5}, 'Sentinel_2 mosaic');

// Add the image to the map, using the visualization parameters.
Map.addLayer(medianpixelDec2019, trueColour, "True-colour image");
Map.addLayer(medianpixelDec2019, falseColour, "False-colour composite");
//Define variable NDVI from equation
var NDVIDec2019 = medianpixelDec2019.expression(
    "(NIR - RED) / (NIR + RED)",
    {
      RED: medianpixelDec2019.select("B4"),    //  RED
      NIR: medianpixelDec2019.select("B8"),    // NIR
      BLUE: medianpixelDec2019.select("B2"),    // BLUE
      SWIR: medianpixelDec2019.select("B11")    //SWIR
    });
var NDBIDec2019 = medianpixelDec2019.expression(
      "(SWIR - NIR) / (SWIR + NIR)",
      {
      RED: medianpixelDec2019.select("B4"),    //  RED
      NIR: medianpixelDec2019.select("B8"),    // NIR
      BLUE: medianpixelDec2019.select("B2"),    // BLUE
      SWIR: medianpixelDec2019.select("B11")    //SWIR
    });
var NDWIDec2019 = medianpixelDec2019.expression(
      "(GREEN - NIR) / (GREEN + NIR)",
      {
      RED: medianpixelDec2019.select("B4"),    //  RED
      NIR: medianpixelDec2019.select("B8"),    // NIR
      BLUE: medianpixelDec2019.select("B2"),    // BLUE
      SWIR: medianpixelDec2019.select("B11"),    //SWIR
      GREEN: medianpixelDec2019.select("B3")    //GREEN
    });
Map.addLayer(NDVIDec2019,{},"NDVI Dec2019");
Map.addLayer(NDBIDec2019,{},"NDBI Dec2019");
Map.addLayer(NDWIDec2019,{},"NDWI Dec2019");
Export.image.toDrive({
  image: NDVIDec2019,
  description: 'NDVI Dec2019',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
Export.image.toDrive({
  image: NDBIDec2019,
  description: 'NDBI Dec2019',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});Export.image.toDrive({
  image: NDWIDec2019,
  description: 'NDWI Dec2019',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});

// Mask the non-watery parts of the image, where NDWI < 0.4.
// var water = NDVI.updateMask(NDVI.gte(0.4));
// var forest = NDVI.lt(0.5).and(NDVI.lt(0.9));
// var agri = NDVI.lt(0.2).and(NDVI.lt(0.4));

// Mask and display the binary layer.

// Map.addLayer(forest.selfMask(), {}, 'forest');
// Map.addLayer(agri.selfMask(), {}, 'agri');
// Map.addLayer(water, 'NDWI masked');

// // var forest = NDVI(value < 0.6);
// Map.addLayer(water, {min: 0, max: 1, palette: ['black', 'yellow']})
// Map.addLayer(NDVI, {min: -1, max: 1}, "NDVI");
// Map.addLayer(NDVI, {min: -1, max: 1, palette: ['black', 'yellow', 'green']}, "NDVI colour");