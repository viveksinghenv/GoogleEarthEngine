/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var shape = ee.FeatureCollection("users/viveksinghenv17dr000519/Watershed");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
//Visualize the data
Map.centerObject(shape);
Map.addLayer(shape,undefined,"Damodar Basin");
var collectionJan2020 = ee.ImageCollection("COPERNICUS/S2_SR") // searches all sentinel 2 imagery pixels...
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 10)) // ...filters on the metadata for pixels less than 10% cloud
  .filterDate('2020-01-1' ,'2020-01-15') //... chooses only pixels between the dates you define here
  .filterBounds(shape); // ... that are within your aoi
print(collectionJan2020); // this generates a JSON list of the images (and their metadata) which the filters found in the right-hand window.
var medianpixelJan2020 = collectionJan2020.median(); // This finds the median value of all the pixels which meet the criteria. 

// var medianpixelsclipped = medianpixels.divide(10000); // this cuts up the result so that it fits neatly into your aoi
                                                                  // and divides so that values between 0 and 1    
Map.addLayer(medianpixelJan2020, {bands: ['B4', 'B3', 'B2'], min: 0, max: 1, gamma: 2.5}, 'Sentinel_2 mosaic');


// Define visualization parameters in a JavaScript dictionary for true colour rendering. Bands 4,3 and 2 needed for RGB.
var trueColour = {
    bands: ["B4", "B3", "B2"],
    min: 0,
    max: 3000
    };

// Add the image to the map, using the visualization parameters.
Map.addLayer(medianpixelJan2020, trueColour, "True-colour image");
//Define false-colour visualization parameters.
var falseColour = {
    bands: ["B8", "B4", "B3"],
    min: 0,
    max: 3000
    };
Map.addLayer(medianpixelJan2020, falseColour, "False-colour composite");
//Define variable NDVI from equation
var NDVIJan2020 = medianpixelJan2020.expression(
    "(NIR - RED) / (NIR + RED)",
    {
      RED: medianpixelJan2020.select("B4"),    //  RED
      NIR: medianpixelJan2020.select("B8"),    // NIR
      BLUE: medianpixelJan2020.select("B2"),    // BLUE
      SWIR: medianpixelJan2020.select("B11")    //SWIR
    });
var NDBIJan2020 = medianpixelJan2020.expression(
      "(SWIR - NIR) / (SWIR + NIR)",
      {
      RED: medianpixelJan2020.select("B4"),    //  RED
      NIR: medianpixelJan2020.select("B8"),    // NIR
      BLUE: medianpixelJan2020.select("B2"),    // BLUE
      SWIR: medianpixelJan2020.select("B11")    //SWIR
    });
var NDWIJan2020 = medianpixelJan2020.expression(
      "(GREEN - NIR) / (GREEN + NIR)",
      {
      RED: medianpixelJan2020.select("B4"),    //  RED
      NIR: medianpixelJan2020.select("B8"),    // NIR
      BLUE: medianpixelJan2020.select("B2"),    // BLUE
      SWIR: medianpixelJan2020.select("B11"),    //SWIR
      GREEN: medianpixelJan2020.select("B3")    //GREEN
    });
Map.addLayer(NDVIJan2020,{},"NDVI Jan2020");
Map.addLayer(NDBIJan2020,{},"NDBI Jan2020");
Map.addLayer(NDWIJan2020,{},"NDWI Jan2020");
Export.image.toDrive({
  image: NDVIJan2020,
  description: 'NDVIJan2020',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
Export.image.toDrive({
  image: NDBIJan2020,
  description: 'NDBIJan2020',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});Export.image.toDrive({
  image: NDWIJan2020,
  description: 'NDWIJan2020',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});

var collectionFeb2020 = ee.ImageCollection("COPERNICUS/S2_SR") // searches all sentinel 2 imagery pixels...
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 10)) // ...filters on the metadata for pixels less than 10% cloud
  .filterDate('2020-02-1' ,'2020-02-15') //... chooses only pixels between the dates you define here
  .filterBounds(shape); // ... that are within your aoi
print(collectionFeb2020); // this generates a JSON list of the images (and their metadata) which the filters found in the right-hand window.
var medianpixelFeb2020 = collectionFeb2020.median(); // This finds the median value of all the pixels which meet the criteria. 

// var medianpixelsclipped = medianpixels.divide(10000); // this cuts up the result so that it fits neatly into your aoi
                                                                  // and divides so that values between 0 and 1    
Map.addLayer(medianpixelFeb2020, {bands: ['B4', 'B3', 'B2'], min: 0, max: 1, gamma: 2.5}, 'Sentinel_2 mosaic');

// Add the image to the map, using the visualization parameters.
Map.addLayer(medianpixelFeb2020, trueColour, "True-colour image");
Map.addLayer(medianpixelFeb2020, falseColour, "False-colour composite");
//Define variable NDVI from equation
var NDVIFeb2020 = medianpixelFeb2020.expression(
    "(NIR - RED) / (NIR + RED)",
    {
      RED: medianpixelFeb2020.select("B4"),    //  RED
      NIR: medianpixelFeb2020.select("B8"),    // NIR
      BLUE: medianpixelFeb2020.select("B2"),    // BLUE
      SWIR: medianpixelFeb2020.select("B11")    //SWIR
    });
var NDBIFeb2020 = medianpixelFeb2020.expression(
      "(SWIR - NIR) / (SWIR + NIR)",
      {
      RED: medianpixelFeb2020.select("B4"),    //  RED
      NIR: medianpixelFeb2020.select("B8"),    // NIR
      BLUE: medianpixelFeb2020.select("B2"),    // BLUE
      SWIR: medianpixelFeb2020.select("B11")    //SWIR
    });
var NDWIFeb2020 = medianpixelFeb2020.expression(
      "(GREEN - NIR) / (GREEN + NIR)",
      {
      RED: medianpixelFeb2020.select("B4"),    //  RED
      NIR: medianpixelFeb2020.select("B8"),    // NIR
      BLUE: medianpixelFeb2020.select("B2"),    // BLUE
      SWIR: medianpixelFeb2020.select("B11"),    //SWIR
      GREEN: medianpixelFeb2020.select("B3")    //GREEN
    });
Map.addLayer(NDVIFeb2020,{},"NDVI Feb2020");
Map.addLayer(NDBIFeb2020,{},"NDBI Feb2020");
Map.addLayer(NDWIFeb2020,{},"NDWI Feb2020");
Export.image.toDrive({
  image: NDVIFeb2020,
  description: 'NDVIFeb2020',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
Export.image.toDrive({
  image: NDBIFeb2020,
  description: 'NDBIFeb2020',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});Export.image.toDrive({
  image: NDWIFeb2020,
  description: 'NDWIFeb2020',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
var collectionMar2020 = ee.ImageCollection("COPERNICUS/S2_SR") // searches all sentinel 2 imagery pixels...
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 10)) // ...filters on the metadata for pixels less than 10% cloud
  .filterDate('2020-03-1' ,'2020-03-15') //... chooses only pixels between the dates you define here
  .filterBounds(shape); // ... that are within your aoi
print(collectionMar2020); // this generates a JSON list of the images (and their metadata) which the filters found in the right-hand window.
var medianpixelMar2020 = collectionMar2020.median(); // This finds the median value of all the pixels which meet the criteria. 

// var medianpixelsclipped = medianpixels.divide(10000); // this cuts up the result so that it fits neatly into your aoi
                                                                  // and divides so that values between 0 and 1    
Map.addLayer(medianpixelMar2020, {bands: ['B4', 'B3', 'B2'], min: 0, max: 1, gamma: 2.5}, 'Sentinel_2 mosaic');

// Add the image to the map, using the visualization parameters.
Map.addLayer(medianpixelMar2020, trueColour, "True-colour image");
Map.addLayer(medianpixelMar2020, falseColour, "False-colour composite");
//Define variable NDVI from equation
var NDVIMar2020 = medianpixelMar2020.expression(
    "(NIR - RED) / (NIR + RED)",
    {
      RED: medianpixelMar2020.select("B4"),    //  RED
      NIR: medianpixelMar2020.select("B8"),    // NIR
      BLUE: medianpixelMar2020.select("B2"),    // BLUE
      SWIR: medianpixelMar2020.select("B11")    //SWIR
    });
var NDBIMar2020 = medianpixelMar2020.expression(
      "(SWIR - NIR) / (SWIR + NIR)",
      {
      RED: medianpixelMar2020.select("B4"),    //  RED
      NIR: medianpixelMar2020.select("B8"),    // NIR
      BLUE: medianpixelMar2020.select("B2"),    // BLUE
      SWIR: medianpixelMar2020.select("B11")    //SWIR
    });
var NDWIMar2020 = medianpixelMar2020.expression(
      "(GREEN - NIR) / (GREEN + NIR)",
      {
      RED: medianpixelMar2020.select("B4"),    //  RED
      NIR: medianpixelMar2020.select("B8"),    // NIR
      BLUE: medianpixelMar2020.select("B2"),    // BLUE
      SWIR: medianpixelMar2020.select("B11"),    //SWIR
      GREEN: medianpixelMar2020.select("B3")    //GREEN
    });
Map.addLayer(NDVIMar2020,{},"NDVI Mar2020");
Map.addLayer(NDBIMar2020,{},"NDBI Mar2020");
Map.addLayer(NDWIMar2020,{},"NDWI Mar2020");
Export.image.toDrive({
  image: NDVIMar2020,
  description: 'NDVIMar2020',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
Export.image.toDrive({
  image: NDBIMar2020,
  description: 'NDBIMar2020',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});Export.image.toDrive({
  image: NDWIMar2020,
  description: 'NDWIMar2020',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
var collectionApr2020 = ee.ImageCollection("COPERNICUS/S2_SR") // searches all sentinel 2 imagery pixels...
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 10)) // ...filters on the metadata for pixels less than 10% cloud
  .filterDate('2020-04-1' ,'2020-04-15') //... chooses only pixels between the dates you define here
  .filterBounds(shape); // ... that are within your aoi
print(collectionApr2020); // this generates a JSON list of the images (and their metadata) which the filters found in the right-hand window.
var medianpixelApr2020 = collectionApr2020.median(); // This finds the median value of all the pixels which meet the criteria. 

// var medianpixelsclipped = medianpixels.divide(10000); // this cuts up the result so that it fits neatly into your aoi
                                                                  // and divides so that values between 0 and 1    
Map.addLayer(medianpixelApr2020, {bands: ['B4', 'B3', 'B2'], min: 0, max: 1, gamma: 2.5}, 'Sentinel_2 mosaic');

// Add the image to the map, using the visualization parameters.
Map.addLayer(medianpixelApr2020, trueColour, "True-colour image");
Map.addLayer(medianpixelApr2020, falseColour, "False-colour composite");
//Define variable NDVI from equation
var NDVIApr2020 = medianpixelApr2020.expression(
    "(NIR - RED) / (NIR + RED)",
    {
      RED: medianpixelApr2020.select("B4"),    //  RED
      NIR: medianpixelApr2020.select("B8"),    // NIR
      BLUE: medianpixelApr2020.select("B2"),    // BLUE
      SWIR: medianpixelApr2020.select("B11")    //SWIR
    });
var NDBIApr2020 = medianpixelApr2020.expression(
      "(SWIR - NIR) / (SWIR + NIR)",
      {
      RED: medianpixelApr2020.select("B4"),    //  RED
      NIR: medianpixelApr2020.select("B8"),    // NIR
      BLUE: medianpixelApr2020.select("B2"),    // BLUE
      SWIR: medianpixelApr2020.select("B11")    //SWIR
    });
var NDWIApr2020 = medianpixelApr2020.expression(
      "(GREEN - NIR) / (GREEN + NIR)",
      {
      RED: medianpixelApr2020.select("B4"),    //  RED
      NIR: medianpixelApr2020.select("B8"),    // NIR
      BLUE: medianpixelApr2020.select("B2"),    // BLUE
      SWIR: medianpixelApr2020.select("B11"),    //SWIR
      GREEN: medianpixelApr2020.select("B3")    //GREEN
    });
Map.addLayer(NDVIApr2020,{},"NDVI Apr2020");
Map.addLayer(NDBIApr2020,{},"NDBI Apr2020");
Map.addLayer(NDWIApr2020,{},"NDWI Apr2020");
Export.image.toDrive({
  image: NDVIApr2020,
  description: 'NDVIApr2020',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
Export.image.toDrive({
  image: NDBIApr2020,
  description: 'NDBIApr2020',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});Export.image.toDrive({
  image: NDWIApr2020,
  description: 'NDWIApr2020',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
var collectionMay2020 = ee.ImageCollection("COPERNICUS/S2_SR") // searches all sentinel 2 imagery pixels...
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 10)) // ...filters on the metadata for pixels less than 10% cloud
  .filterDate('2020-05-1' ,'2020-05-15') //... chooses only pixels between the dates you define here
  .filterBounds(shape); // ... that are within your aoi
print(collectionMay2020); // this generates a JSON list of the images (and their metadata) which the filters found in the right-hand window.
var medianpixelMay2020 = collectionMay2020.median(); // This finds the median value of all the pixels which meet the criteria. 

// var medianpixelsclipped = medianpixels.divide(10000); // this cuts up the result so that it fits neatly into your aoi
                                                                  // and divides so that values between 0 and 1    
Map.addLayer(medianpixelMay2020, {bands: ['B4', 'B3', 'B2'], min: 0, max: 1, gamma: 2.5}, 'Sentinel_2 mosaic');

// Add the image to the map, using the visualization parameters.
Map.addLayer(medianpixelMay2020, trueColour, "True-colour image");
Map.addLayer(medianpixelMay2020, falseColour, "False-colour composite");
//Define variable NDVI from equation
var NDVIMay2020 = medianpixelMay2020.expression(
    "(NIR - RED) / (NIR + RED)",
    {
      RED: medianpixelMay2020.select("B4"),    //  RED
      NIR: medianpixelMay2020.select("B8"),    // NIR
      BLUE: medianpixelMay2020.select("B2"),    // BLUE
      SWIR: medianpixelMay2020.select("B11")    //SWIR
    });
var NDBIMay2020 = medianpixelMay2020.expression(
      "(SWIR - NIR) / (SWIR + NIR)",
      {
      RED: medianpixelMay2020.select("B4"),    //  RED
      NIR: medianpixelMay2020.select("B8"),    // NIR
      BLUE: medianpixelMay2020.select("B2"),    // BLUE
      SWIR: medianpixelMay2020.select("B11")    //SWIR
    });
var NDWIMay2020 = medianpixelMay2020.expression(
      "(GREEN - NIR) / (GREEN + NIR)",
      {
      RED: medianpixelMay2020.select("B4"),    //  RED
      NIR: medianpixelMay2020.select("B8"),    // NIR
      BLUE: medianpixelMay2020.select("B2"),    // BLUE
      SWIR: medianpixelMay2020.select("B11"),    //SWIR
      GREEN: medianpixelMay2020.select("B3")    //GREEN
    });
Map.addLayer(NDVIMay2020,{},"NDVI May2020");
Map.addLayer(NDBIMay2020,{},"NDBI May2020");
Map.addLayer(NDWIMay2020,{},"NDWI May2020");
Export.image.toDrive({
  image: NDVIMay2020,
  description: 'NDVIMay2020',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
Export.image.toDrive({
  image: NDBIMay2020,
  description: 'NDBIMay2020',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});Export.image.toDrive({
  image: NDWIMay2020,
  description: 'NDWIMay2020',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
var collectionJune2020 = ee.ImageCollection("COPERNICUS/S2_SR") // searches all sentinel 2 imagery pixels...
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 50)) // ...filters on the metadata for pixels less than 10% cloud
  .filterDate('2020-06-1' ,'2020-06-30') //... chooses only pixels between the dates you define here
  .filterBounds(shape); // ... that are within your aoi
print(collectionJune2020); // this generates a JSON list of the images (and their metadata) which the filters found in the right-hand window.
var medianpixelJune2020 = collectionJune2020.median(); // This finds the median value of all the pixels which meet the criteria. 

// var medianpixelsclipped = medianpixels.divide(10000); // this cuts up the result so that it fits neatly into your aoi
                                                                  // and divides so that values between 0 and 1    
Map.addLayer(medianpixelJune2020, {bands: ['B4', 'B3', 'B2'], min: 0, max: 1, gamma: 2.5}, 'Sentinel_2 mosaic');

// Add the image to the map, using the visualization parameters.
Map.addLayer(medianpixelJune2020, trueColour, "True-colour image");
Map.addLayer(medianpixelJune2020, falseColour, "False-colour composite");
//Define variable NDVI from equation
var NDVIJune2020 = medianpixelJune2020.expression(
    "(NIR - RED) / (NIR + RED)",
    {
      RED: medianpixelJune2020.select("B4"),    //  RED
      NIR: medianpixelJune2020.select("B8"),    // NIR
      BLUE: medianpixelJune2020.select("B2"),    // BLUE
      SWIR: medianpixelJune2020.select("B11")    //SWIR
    });
var NDBIJune2020 = medianpixelJune2020.expression(
      "(SWIR - NIR) / (SWIR + NIR)",
      {
      RED: medianpixelJune2020.select("B4"),    //  RED
      NIR: medianpixelJune2020.select("B8"),    // NIR
      BLUE: medianpixelJune2020.select("B2"),    // BLUE
      SWIR: medianpixelJune2020.select("B11")    //SWIR
    });
var NDWIJune2020 = medianpixelJune2020.expression(
      "(GREEN - NIR) / (GREEN + NIR)",
      {
      RED: medianpixelJune2020.select("B4"),    //  RED
      NIR: medianpixelJune2020.select("B8"),    // NIR
      BLUE: medianpixelJune2020.select("B2"),    // BLUE
      SWIR: medianpixelJune2020.select("B11"),    //SWIR
      GREEN: medianpixelJune2020.select("B3")    //GREEN
    });
Map.addLayer(NDVIJune2020,{},"NDVI June2020");
Map.addLayer(NDBIJune2020,{},"NDBI June2020");
Map.addLayer(NDWIJune2020,{},"NDWI June2020");
Export.image.toDrive({
  image: NDVIJune2020,
  description: 'NDVIJune2020',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
Export.image.toDrive({
  image: NDBIJune2020,
  description: 'NDBIJune2020',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});Export.image.toDrive({
  image: NDWIJune2020,
  description: 'NDWIJune2020',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
var collectionJuly2020 = ee.ImageCollection("COPERNICUS/S2_SR") // searches all sentinel 2 imagery pixels...
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 50)) // ...filters on the metadata for pixels less than 10% cloud
  .filterDate('2020-07-1' ,'2020-07-30') //... chooses only pixels between the dates you define here
  .filterBounds(shape); // ... that are within your aoi
print(collectionJuly2020); // this generates a JSON list of the images (and their metadata) which the filters found in the right-hand window.
var medianpixelJuly2020 = collectionJuly2020.median(); // This finds the median value of all the pixels which meet the criteria. 

// var medianpixelsclipped = medianpixels.divide(10000); // this cuts up the result so that it fits neatly into your aoi
                                                                  // and divides so that values between 0 and 1    
Map.addLayer(medianpixelJuly2020, {bands: ['B4', 'B3', 'B2'], min: 0, max: 1, gamma: 2.5}, 'Sentinel_2 mosaic');

// Add the image to the map, using the visualization parameters.
Map.addLayer(medianpixelJuly2020, trueColour, "True-colour image");
Map.addLayer(medianpixelJuly2020, falseColour, "False-colour composite");
//Define variable NDVI from equation
var NDVIJuly2020 = medianpixelJuly2020.expression(
    "(NIR - RED) / (NIR + RED)",
    {
      RED: medianpixelJuly2020.select("B4"),    //  RED
      NIR: medianpixelJuly2020.select("B8"),    // NIR
      BLUE: medianpixelJuly2020.select("B2"),    // BLUE
      SWIR: medianpixelJuly2020.select("B11")    //SWIR
    });
var NDBIJuly2020 = medianpixelJuly2020.expression(
      "(SWIR - NIR) / (SWIR + NIR)",
      {
      RED: medianpixelJuly2020.select("B4"),    //  RED
      NIR: medianpixelJuly2020.select("B8"),    // NIR
      BLUE: medianpixelJuly2020.select("B2"),    // BLUE
      SWIR: medianpixelJuly2020.select("B11")    //SWIR
    });
var NDWIJuly2020 = medianpixelJuly2020.expression(
      "(GREEN - NIR) / (GREEN + NIR)",
      {
      RED: medianpixelJuly2020.select("B4"),    //  RED
      NIR: medianpixelJuly2020.select("B8"),    // NIR
      BLUE: medianpixelJuly2020.select("B2"),    // BLUE
      SWIR: medianpixelJuly2020.select("B11"),    //SWIR
      GREEN: medianpixelJuly2020.select("B3")    //GREEN
    });
Map.addLayer(NDVIJuly2020,{},"NDVI July2020");
Map.addLayer(NDBIJuly2020,{},"NDBI July2020");
Map.addLayer(NDWIJuly2020,{},"NDWI July2020");
Export.image.toDrive({
  image: NDVIJuly2020,
  description: 'NDVIJuly2020',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
Export.image.toDrive({
  image: NDBIJuly2020,
  description: 'NDBIJuly2020',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});Export.image.toDrive({
  image: NDWIJuly2020,
  description: 'NDWIJuly2020',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
var collectionAug2020 = ee.ImageCollection("COPERNICUS/S2_SR") // searches all sentinel 2 imagery pixels...
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 90)) // ...filters on the metadata for pixels less than 10% cloud
  .filterDate('2020-08-1' ,'2020-08-30') //... chooses only pixels between the dates you define here
  .filterBounds(shape); // ... that are within your aoi
print(collectionAug2020); // this generates a JSON list of the images (and their metadata) which the filters found in the right-hand window.
var medianpixelAug2020 = collectionAug2020.median(); // This finds the median value of all the pixels which meet the criteria. 

// var medianpixelsclipped = medianpixels.divide(10000); // this cuts up the result so that it fits neatly into your aoi
                                                                  // and divides so that values between 0 and 1    
Map.addLayer(medianpixelAug2020, {bands: ['B4', 'B3', 'B2'], min: 0, max: 1, gamma: 2.5}, 'Sentinel_2 mosaic');

// Add the image to the map, using the visualization parameters.
Map.addLayer(medianpixelAug2020, trueColour, "True-colour image");
Map.addLayer(medianpixelAug2020, falseColour, "False-colour composite");
//Define variable NDVI from equation
var NDVIAug2020 = medianpixelAug2020.expression(
    "(NIR - RED) / (NIR + RED)",
    {
      RED: medianpixelAug2020.select("B4"),    //  RED
      NIR: medianpixelAug2020.select("B8"),    // NIR
      BLUE: medianpixelAug2020.select("B2"),    // BLUE
      SWIR: medianpixelAug2020.select("B11")    //SWIR
    });
var NDBIAug2020 = medianpixelAug2020.expression(
      "(SWIR - NIR) / (SWIR + NIR)",
      {
      RED: medianpixelAug2020.select("B4"),    //  RED
      NIR: medianpixelAug2020.select("B8"),    // NIR
      BLUE: medianpixelAug2020.select("B2"),    // BLUE
      SWIR: medianpixelAug2020.select("B11")    //SWIR
    });
var NDWIAug2020 = medianpixelAug2020.expression(
      "(GREEN - NIR) / (GREEN + NIR)",
      {
      RED: medianpixelAug2020.select("B4"),    //  RED
      NIR: medianpixelAug2020.select("B8"),    // NIR
      BLUE: medianpixelAug2020.select("B2"),    // BLUE
      SWIR: medianpixelAug2020.select("B11"),    //SWIR
      GREEN: medianpixelAug2020.select("B3")    //GREEN
    });
Map.addLayer(NDVIAug2020,{},"NDVI Aug2020");
Map.addLayer(NDBIAug2020,{},"NDBI Aug2020");
Map.addLayer(NDWIAug2020,{},"NDWI Aug2020");
Export.image.toDrive({
  image: NDVIAug2020,
  description: 'NDVIAug2020',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
Export.image.toDrive({
  image: NDBIAug2020,
  description: 'NDBIAug2020',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});Export.image.toDrive({
  image: NDWIAug2020,
  description: 'NDWIAug2020',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
var collectionSep2020 = ee.ImageCollection("COPERNICUS/S2_SR") // searches all sentinel 2 imagery pixels...
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 30)) // ...filters on the metadata for pixels less than 10% cloud
  .filterDate('2020-09-1' ,'2020-09-30') //... chooses only pixels between the dates you define here
  .filterBounds(shape); // ... that are within your aoi
print(collectionSep2020); // this generates a JSON list of the images (and their metadata) which the filters found in the right-hand window.
var medianpixelSep2020 = collectionSep2020.median(); // This finds the median value of all the pixels which meet the criteria. 

// var medianpixelsclipped = medianpixels.divide(10000); // this cuts up the result so that it fits neatly into your aoi
                                                                  // and divides so that values between 0 and 1    
Map.addLayer(medianpixelSep2020, {bands: ['B4', 'B3', 'B2'], min: 0, max: 1, gamma: 2.5}, 'Sentinel_2 mosaic');

// Add the image to the map, using the visualization parameters.
Map.addLayer(medianpixelSep2020, trueColour, "True-colour image");
Map.addLayer(medianpixelSep2020, falseColour, "False-colour composite");
//Define variable NDVI from equation
var NDVISep2020 = medianpixelSep2020.expression(
    "(NIR - RED) / (NIR + RED)",
    {
      RED: medianpixelSep2020.select("B4"),    //  RED
      NIR: medianpixelSep2020.select("B8"),    // NIR
      BLUE: medianpixelSep2020.select("B2"),    // BLUE
      SWIR: medianpixelSep2020.select("B11")    //SWIR
    });
var NDBISep2020 = medianpixelSep2020.expression(
      "(SWIR - NIR) / (SWIR + NIR)",
      {
      RED: medianpixelSep2020.select("B4"),    //  RED
      NIR: medianpixelSep2020.select("B8"),    // NIR
      BLUE: medianpixelSep2020.select("B2"),    // BLUE
      SWIR: medianpixelSep2020.select("B11")    //SWIR
    });
var NDWISep2020 = medianpixelSep2020.expression(
      "(GREEN - NIR) / (GREEN + NIR)",
      {
      RED: medianpixelSep2020.select("B4"),    //  RED
      NIR: medianpixelSep2020.select("B8"),    // NIR
      BLUE: medianpixelSep2020.select("B2"),    // BLUE
      SWIR: medianpixelSep2020.select("B11"),    //SWIR
      GREEN: medianpixelSep2020.select("B3")    //GREEN
    });
Map.addLayer(NDVISep2020,{},"NDVI Sep2020");
Map.addLayer(NDBISep2020,{},"NDBI Sep2020");
Map.addLayer(NDWISep2020,{},"NDWI Sep2020");
Export.image.toDrive({
  image: NDVISep2020,
  description: 'NDVISep2020',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
Export.image.toDrive({
  image: NDBISep2020,
  description: 'NDBISep2020',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});Export.image.toDrive({
  image: NDWISep2020,
  description: 'NDWISep2020',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
var collectionOct2020 = ee.ImageCollection("COPERNICUS/S2_SR") // searches all sentinel 2 imagery pixels...
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 20)) // ...filters on the metadata for pixels less than 10% cloud
  .filterDate('2020-10-1' ,'2020-10-30') //... chooses only pixels between the dates you define here
  .filterBounds(shape); // ... that are within your aoi
print(collectionOct2020); // this generates a JSON list of the images (and their metadata) which the filters found in the right-hand window.
var medianpixelOct2020 = collectionOct2020.median(); // This finds the median value of all the pixels which meet the criteria. 

// var medianpixelsclipped = medianpixels.divide(10000); // this cuts up the result so that it fits neatly into your aoi
                                                                  // and divides so that values between 0 and 1    
Map.addLayer(medianpixelOct2020, {bands: ['B4', 'B3', 'B2'], min: 0, max: 1, gamma: 2.5}, 'Sentinel_2 mosaic');

// Add the image to the map, using the visualization parameters.
Map.addLayer(medianpixelOct2020, trueColour, "True-colour image");
Map.addLayer(medianpixelOct2020, falseColour, "False-colour composite");
//Define variable NDVI from equation
var NDVIOct2020 = medianpixelOct2020.expression(
    "(NIR - RED) / (NIR + RED)",
    {
      RED: medianpixelOct2020.select("B4"),    //  RED
      NIR: medianpixelOct2020.select("B8"),    // NIR
      BLUE: medianpixelOct2020.select("B2"),    // BLUE
      SWIR: medianpixelOct2020.select("B11")    //SWIR
    });
var NDBIOct2020 = medianpixelOct2020.expression(
      "(SWIR - NIR) / (SWIR + NIR)",
      {
      RED: medianpixelOct2020.select("B4"),    //  RED
      NIR: medianpixelOct2020.select("B8"),    // NIR
      BLUE: medianpixelOct2020.select("B2"),    // BLUE
      SWIR: medianpixelOct2020.select("B11")    //SWIR
    });
var NDWIOct2020 = medianpixelOct2020.expression(
      "(GREEN - NIR) / (GREEN + NIR)",
      {
      RED: medianpixelOct2020.select("B4"),    //  RED
      NIR: medianpixelOct2020.select("B8"),    // NIR
      BLUE: medianpixelOct2020.select("B2"),    // BLUE
      SWIR: medianpixelOct2020.select("B11"),    //SWIR
      GREEN: medianpixelOct2020.select("B3")    //GREEN
    });
Map.addLayer(NDVIOct2020,{},"NDVI Oct2020");
Map.addLayer(NDBIOct2020,{},"NDBI Oct2020");
Map.addLayer(NDWIOct2020,{},"NDWI Oct2020");
Export.image.toDrive({
  image: NDVIOct2020,
  description: 'NDVIOct2020',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
Export.image.toDrive({
  image: NDBIOct2020,
  description: 'NDBIOct2020',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});Export.image.toDrive({
  image: NDWIOct2020,
  description: 'NDWIOct2020',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
var collectionNov2020 = ee.ImageCollection("COPERNICUS/S2_SR") // searches all sentinel 2 imagery pixels...
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 10)) // ...filters on the metadata for pixels less than 10% cloud
  .filterDate('2020-11-1' ,'2020-11-15') //... chooses only pixels between the dates you define here
  .filterBounds(shape); // ... that are within your aoi
print(collectionNov2020); // this generates a JSON list of the images (and their metadata) which the filters found in the right-hand window.
var medianpixelNov2020 = collectionNov2020.median(); // This finds the median value of all the pixels which meet the criteria. 

// var medianpixelsclipped = medianpixels.divide(10000); // this cuts up the result so that it fits neatly into your aoi
                                                                  // and divides so that values between 0 and 1    
Map.addLayer(medianpixelNov2020, {bands: ['B4', 'B3', 'B2'], min: 0, max: 1, gamma: 2.5}, 'Sentinel_2 mosaic');

// Add the image to the map, using the visualization parameters.
Map.addLayer(medianpixelNov2020, trueColour, "True-colour image");
Map.addLayer(medianpixelNov2020, falseColour, "False-colour composite");
//Define variable NDVI from equation
var NDVINov2020 = medianpixelNov2020.expression(
    "(NIR - RED) / (NIR + RED)",
    {
      RED: medianpixelNov2020.select("B4"),    //  RED
      NIR: medianpixelNov2020.select("B8"),    // NIR
      BLUE: medianpixelNov2020.select("B2"),    // BLUE
      SWIR: medianpixelNov2020.select("B11")    //SWIR
    });
var NDBINov2020 = medianpixelNov2020.expression(
      "(SWIR - NIR) / (SWIR + NIR)",
      {
      RED: medianpixelNov2020.select("B4"),    //  RED
      NIR: medianpixelNov2020.select("B8"),    // NIR
      BLUE: medianpixelNov2020.select("B2"),    // BLUE
      SWIR: medianpixelNov2020.select("B11")    //SWIR
    });
var NDWINov2020 = medianpixelNov2020.expression(
      "(GREEN - NIR) / (GREEN + NIR)",
      {
      RED: medianpixelNov2020.select("B4"),    //  RED
      NIR: medianpixelNov2020.select("B8"),    // NIR
      BLUE: medianpixelNov2020.select("B2"),    // BLUE
      SWIR: medianpixelNov2020.select("B11"),    //SWIR
      GREEN: medianpixelNov2020.select("B3")    //GREEN
    });
Map.addLayer(NDVINov2020,{},"NDVI Nov2020");
Map.addLayer(NDBINov2020,{},"NDBI Nov2020");
Map.addLayer(NDWINov2020,{},"NDWI Nov2020");
Export.image.toDrive({
  image: NDVINov2020,
  description: 'NDVINov2020',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
Export.image.toDrive({
  image: NDBINov2020,
  description: 'NDBINov2020',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});Export.image.toDrive({
  image: NDWINov2020,
  description: 'NDWINov2020',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
var collectionDec2020 = ee.ImageCollection("COPERNICUS/S2_SR") // searches all sentinel 2 imagery pixels...
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 10)) // ...filters on the metadata for pixels less than 10% cloud
  .filterDate('2020-12-1' ,'2020-12-15') //... chooses only pixels between the dates you define here
  .filterBounds(shape); // ... that are within your aoi
print(collectionDec2020); // this generates a JSON list of the images (and their metadata) which the filters found in the right-hand window.
var medianpixelDec2020 = collectionDec2020.median(); // This finds the median value of all the pixels which meet the criteria. 

// var medianpixelsclipped = medianpixels.divide(10000); // this cuts up the result so that it fits neatly into your aoi
                                                                  // and divides so that values between 0 and 1    
Map.addLayer(medianpixelDec2020, {bands: ['B4', 'B3', 'B2'], min: 0, max: 1, gamma: 2.5}, 'Sentinel_2 mosaic');

// Add the image to the map, using the visualization parameters.
Map.addLayer(medianpixelDec2020, trueColour, "True-colour image");
Map.addLayer(medianpixelDec2020, falseColour, "False-colour composite");
//Define variable NDVI from equation
var NDVIDec2020 = medianpixelDec2020.expression(
    "(NIR - RED) / (NIR + RED)",
    {
      RED: medianpixelDec2020.select("B4"),    //  RED
      NIR: medianpixelDec2020.select("B8"),    // NIR
      BLUE: medianpixelDec2020.select("B2"),    // BLUE
      SWIR: medianpixelDec2020.select("B11")    //SWIR
    });
var NDBIDec2020 = medianpixelDec2020.expression(
      "(SWIR - NIR) / (SWIR + NIR)",
      {
      RED: medianpixelDec2020.select("B4"),    //  RED
      NIR: medianpixelDec2020.select("B8"),    // NIR
      BLUE: medianpixelDec2020.select("B2"),    // BLUE
      SWIR: medianpixelDec2020.select("B11")    //SWIR
    });
var NDWIDec2020 = medianpixelDec2020.expression(
      "(GREEN - NIR) / (GREEN + NIR)",
      {
      RED: medianpixelDec2020.select("B4"),    //  RED
      NIR: medianpixelDec2020.select("B8"),    // NIR
      BLUE: medianpixelDec2020.select("B2"),    // BLUE
      SWIR: medianpixelDec2020.select("B11"),    //SWIR
      GREEN: medianpixelDec2020.select("B3")    //GREEN
    });
Map.addLayer(NDVIDec2020,{},"NDVI Dec2020");
Map.addLayer(NDBIDec2020,{},"NDBI Dec2020");
Map.addLayer(NDWIDec2020,{},"NDWI Dec2020");
Export.image.toDrive({
  image: NDVIDec2020,
  description: 'NDVIDec2020',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});
Export.image.toDrive({
  image: NDBIDec2020,
  description: 'NDBIDec2020',
  scale: 20,
  maxPixels: 1e9,
  region: shape
});Export.image.toDrive({
  image: NDWIDec2020,
  description: 'NDWIDec2020',
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
