/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var shape = ee.FeatureCollection("users/viveksinghenv17dr000519/Watershed"),
    Table = ee.FeatureCollection("users/viveksinghenv17dr000519/GCPs"),
    urban = ee.FeatureCollection("users/viveksinghenv17dr000519/Barren"),
    wheat = ee.FeatureCollection("users/viveksinghenv17dr000519/coke"),
    water = ee.FeatureCollection("users/viveksinghenv17dr000519/Bamboo");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// Map.centerObject(shape);
// Map.addLayer(shape,undefined,"Damodar Basin");
// var collectionJan2019 = ee.ImageCollection("COPERNICUS/S2_SR") // searches all sentinel 2 imagery pixels...
//   .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 10)) // ...filters on the metadata for pixels less than 10% cloud
//   .filterDate('2019-01-1' ,'2019-01-15') //... chooses only pixels between the dates you define here
//   .filterBounds(shape); // ... that are within your aoi
// print(collectionJan2019); // this generates a JSON list of the images (and their metadata) which the filters found in the right-hand window.
// var medianpixelJan2019 = collectionJan2019.median(); // This finds the median value of all the pixels which meet the criteria. 

// // var medianpixelsclipped = medianpixels.divide(10000); // this cuts up the result so that it fits neatly into your aoi
//                                                                   // and divides so that values between 0 and 1    
// // Map.addLayer(medianpixelJan2019, {bands: ['B4', 'B3', 'B2'], min: 0, max: 1, gamma: 2.5}, 'Sentinel_2 mosaic');


// // Define visualization parameters in a JavaScript dictionary for true colour rendering. Bands 4,3 and 2 needed for RGB.
// var trueColour = {
//     bands: ["B4", "B3", "B2"],
//     min: 0,
//     max: 3000
//     };

// // Add the image to the map, using the visualization parameters.
// Map.addLayer(medianpixelJan2019, trueColour, "True-colour image");
// //Define false-colour visualization parameters.
// var falseColour = {
//     bands: ["B8", "B4", "B3"],
//     min: 0,
//     max: 3000
//     };
// Map.addLayer(medianpixelJan2019, falseColour, "False-colour composite");
// //Define variable NDVI from equation
// var NDVIJan2019 = medianpixelJan2019.expression(
//     "(NIR - RED) / (NIR + RED)",
//     {
//       RED: medianpixelJan2019.select("B4"),    //  RED
//       NIR: medianpixelJan2019.select("B8"),    // NIR
//       BLUE: medianpixelJan2019.select("B2"),    // BLUE
//       SWIR: medianpixelJan2019.select("B11")    //SWIR
//     });
// var PMIJan2019 = medianpixelJan2019.expression(
//   "G- 1*( B8 + m * B4)/sqrt(m * m)",
//   {G: 0.5,
//   m: 1.13,
//   B8: medianpixelJan2019.select("B8"),
//   B4: medianpixelJan2019.select("B4")
//   })
// var NDBIJan2019 = medianpixelJan2019.expression(
//       "(SWIR - NIR) / (SWIR + NIR)",
//       {
//       RED: medianpixelJan2019.select("B4"),    //  RED
//       NIR: medianpixelJan2019.select("B8"),    // NIR
//       BLUE: medianpixelJan2019.select("B2"),    // BLUE
//       SWIR: medianpixelJan2019.select("B11")    //SWIR
//     });
// var NDWIJan2019 = medianpixelJan2019.expression(
//       "(GREEN - NIR) / (GREEN + NIR)",
//       {
//       RED: medianpixelJan2019.select("B4"),    //  RED
//       NIR: medianpixelJan2019.select("B8"),    // NIR
//       BLUE: medianpixelJan2019.select("B2"),    // BLUE
//       SWIR: medianpixelJan2019.select("B11"),    //SWIR
//       GREEN: medianpixelJan2019.select("B3")    //GREEN
//     });
    
// var NDSVIJan2019 = medianpixelJan2019.expression(
//   "(B11- B4) / (B11+B4)",
//   {
//     B11: medianpixelJan2019.select("B11"),
//     B4: medianpixelJan2019.select("B4")
//   })
// var NDRIJan2019 = medianpixelJan2019.expression(
//   "(B4-B12)/(B4+B12)",
//   {
//     B12: medianpixelJan2019.select("B12"),
//     B4: medianpixelJan2019.select("B4")
//   })
// var NDTIJan2019 = medianpixelJan2019.expression(
//   "(B11-B12)/(B11+B12)",
//   {
//     B12: medianpixelJan2019.select("B12"),
//     B11: medianpixelJan2019.select("B11")
//   })
//// Map.addLayer(PMIJan2019,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"PMI Jan2019")
// Map.addLayer(NDSVIJan2019,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"NDSVI Jan2019")
// Map.addLayer(NDRIJan2019,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"NDRI Jan2019")
// Map.addLayer(NDTIJan2019,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"NDTI Jan2019")
// Map.addLayer(NDVIJan2019,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"NDVI Jan2019");
// Map.addLayer(NDBIJan2019,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"NDBI Jan2019");
// Map.addLayer(NDWIJan2019,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"NDWI Jan2019");
// var compositeJan2019 = medianpixelJan2019.addBands(NDVIJan2019).addBands(NDBIJan2019).addBands(NDWIJan2019).addBands(NDSVIJan2019).addBands(NDRIJan2019).addBands(NDTIJan2019)
// var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7','B8','B8A','B9','B11','B12',"B8_1","constant","B11_1","B3_1","B11_2","B4_1","B11_3"];
// print(medianpixelJan2019)
// print(compositeJan2019)
// print(bands)
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
// //............................ Kharif season..............................
// ///...........................June......................
// Map.centerObject(shape);
// Map.addLayer(shape,undefined,"Damodar Basin");
// var collectionJune2019 = ee.ImageCollection("COPERNICUS/S2_SR") // searches all sentinel 2 imagery pixels...
//   .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 25)) // ...filters on the metadata for pixels less than 10% cloud
//   .filterDate('2019-06-1' ,'2019-06-15') //... chooses only pixels between the dates you define here
//   .filterBounds(shape); // ... that are within your aoi
// print(collectionJune2019); // this generates a JSON list of the images (and their metadata) which the filters found in the right-hand window.
// var medianpixelJune2019 = collectionJune2019.median(); // This finds the median value of all the pixels which meet the criteria. 

// // var medianpixelsclipped = medianpixels.divide(10000); // this cuts up the result so that it fits neatly into your aoi
//                                                                   // and divides so that values between 0 and 1    
// // Map.addLayer(medianpixelJune2019, {bands: ['B4', 'B3', 'B2'], min: 0, max: 1, gamma: 2.5}, 'Sentinel_2 mosaic');


// // Define visualization parameters in a JavaScript dictionary for true colour rendering. Bands 4,3 and 2 needed for RGB.
// var trueColour = {
//     bands: ["B4", "B3", "B2"],
//     min: 0,
//     max: 3000
//     };

// // Add the image to the map, using the visualization parameters.
// Map.addLayer(medianpixelJune2019, trueColour, "True-colour image");
// //Define false-colour visualization parameters.
// var falseColour = {
//     bands: ["B8", "B4", "B3"],
//     min: 0,
//     max: 3000
//     };
// Map.addLayer(medianpixelJune2019, falseColour, "False-colour composite");
// //Define variable NDVI from equation
// var NDVIJune2019 = medianpixelJune2019.expression(
//     "(NIR - RED) / (NIR + RED)",
//     {
//       RED: medianpixelJune2019.select("B4"),    //  RED
//       NIR: medianpixelJune2019.select("B8"),    // NIR
//       BLUE: medianpixelJune2019.select("B2"),    // BLUE
//       SWIR: medianpixelJune2019.select("B11")    //SWIR
//     });
// // var PMIJune2019 = medianpixelJune2019.expression(
// //   "G- 1*( B8 + m * B4)/sqrt(m * m)",
// //   {G: 0.5,
// //   m: 1.13,
// //   B8: medianpixelJune2019.select("B8"),
// //   B4: medianpixelJune2019.select("B4")
// //   })
// var NDBIJune2019 = medianpixelJune2019.expression(
//       "(SWIR - NIR) / (SWIR + NIR)",
//       {
//       RED: medianpixelJune2019.select("B4"),    //  RED
//       NIR: medianpixelJune2019.select("B8"),    // NIR
//       BLUE: medianpixelJune2019.select("B2"),    // BLUE
//       SWIR: medianpixelJune2019.select("B11")    //SWIR
//     });
// var NDWIJune2019 = medianpixelJune2019.expression(
//       "(GREEN - NIR) / (GREEN + NIR)",
//       {
//       RED: medianpixelJune2019.select("B4"),    //  RED
//       NIR: medianpixelJune2019.select("B8"),    // NIR
//       BLUE: medianpixelJune2019.select("B2"),    // BLUE
//       SWIR: medianpixelJune2019.select("B11"),    //SWIR
//       GREEN: medianpixelJune2019.select("B3")    //GREEN
//     });
    
// var NDSVIJune2019 = medianpixelJune2019.expression(
//   "(B11- B4) / (B11+B4)",
//   {
//     B11: medianpixelJune2019.select("B11"),
//     B4: medianpixelJune2019.select("B4")
//   })
// var NDRIJune2019 = medianpixelJune2019.expression(
//   "(B4-B12)/(B4+B12)",
//   {
//     B12: medianpixelJune2019.select("B12"),
//     B4: medianpixelJune2019.select("B4")
//   })
// var NDTIJune2019 = medianpixelJune2019.expression(
//   "(B11-B12)/(B11+B12)",
//   {
//     B12: medianpixelJune2019.select("B12"),
//     B11: medianpixelJune2019.select("B11")
//   })
// // Map.addLayer(PMIJune2019,{min: 0, max: 1, palette: [
// //     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
// //     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
// //     '012E01', '011D01', '011301'
// //   ]},"PMI June2019")
// Map.addLayer(NDSVIJune2019,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"NDSVI June2019")
// Map.addLayer(NDRIJune2019,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"NDRI June2019")
// Map.addLayer(NDTIJune2019,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"NDTI June2019")
// Map.addLayer(NDVIJune2019,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"NDVI June2019");
// Map.addLayer(NDBIJune2019,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"NDBI June2019");
// Map.addLayer(NDWIJune2019,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"NDWI June2019");
// var compositeJune2019 = medianpixelJune2019.addBands(NDVIJune2019).addBands(NDBIJune2019).addBands(NDWIJune2019).addBands(NDSVIJune2019).addBands(NDRIJune2019).addBands(NDTIJune2019)
// var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7','B8','B8A','B9','B11','B12',"B8_1","constant","B11_1","B3_1","B11_2","B4_1","B11_3"];
// print(medianpixelJune2019)
// print(compositeJune2019)
// print(bands)
// //............................July.............

// var collectionJuly2019 = ee.ImageCollection("COPERNICUS/S2_SR") // searches all sentinel 2 imagery pixels...
//   .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 30)) // ...filters on the metadata for pixels less than 10% cloud
//   .filterDate('2019-07-1' ,'2019-07-20') //... chooses only pixels between the dates you define here
//   .filterBounds(shape); // ... that are within your aoi
// print(collectionJuly2019); // this generates a JSON list of the images (and their metadata) which the filters found in the right-hand window.
// var medianpixelJuly2019 = collectionJuly2019.median(); // This finds the median value of all the pixels which meet the criteria. 

// // var medianpixelsclipped = medianpixels.divide(10000); // this cuts up the result so that it fits neatly into your aoi
//                                                                   // and divides so that values between 0 and 1    
// // Map.addLayer(medianpixelJuly2019, {bands: ['B4', 'B3', 'B2'], min: 0, max: 1, gamma: 2.5}, 'Sentinel_2 mosaic');


// // Define visualization parameters in a JavaScript dictionary for true colour rendering. Bands 4,3 and 2 needed for RGB.
// var trueColour = {
//     bands: ["B4", "B3", "B2"],
//     min: 0,
//     max: 3000
//     };

// // Add the image to the map, using the visualization parameters.
// Map.addLayer(medianpixelJuly2019, trueColour, "True-colour image");
// //Define false-colour visualization parameters.
// var falseColour = {
//     bands: ["B8", "B4", "B3"],
//     min: 0,
//     max: 3000
//     };
// Map.addLayer(medianpixelJuly2019, falseColour, "False-colour composite");
// //Define variable NDVI from equation
// var NDVIJuly2019 = medianpixelJuly2019.expression(
//     "(NIR - RED) / (NIR + RED)",
//     {
//       RED: medianpixelJuly2019.select("B4"),    //  RED
//       NIR: medianpixelJuly2019.select("B8"),    // NIR
//       BLUE: medianpixelJuly2019.select("B2"),    // BLUE
//       SWIR: medianpixelJuly2019.select("B11")    //SWIR
//     });
// // var PMIJuly2019 = medianpixelJuly2019.expression(
// //   "G- 1*( B8 + m * B4)/sqrt(m * m)",
// //   {G: 0.5,
// //   m: 1.13,
// //   B8: medianpixelJuly2019.select("B8"),
// //   B4: medianpixelJuly2019.select("B4")
// //   })
// var NDBIJuly2019 = medianpixelJuly2019.expression(
//       "(SWIR - NIR) / (SWIR + NIR)",
//       {
//       RED: medianpixelJuly2019.select("B4"),    //  RED
//       NIR: medianpixelJuly2019.select("B8"),    // NIR
//       BLUE: medianpixelJuly2019.select("B2"),    // BLUE
//       SWIR: medianpixelJuly2019.select("B11")    //SWIR
//     });
// var NDWIJuly2019 = medianpixelJuly2019.expression(
//       "(GREEN - NIR) / (GREEN + NIR)",
//       {
//       RED: medianpixelJuly2019.select("B4"),    //  RED
//       NIR: medianpixelJuly2019.select("B8"),    // NIR
//       BLUE: medianpixelJuly2019.select("B2"),    // BLUE
//       SWIR: medianpixelJuly2019.select("B11"),    //SWIR
//       GREEN: medianpixelJuly2019.select("B3")    //GREEN
//     });
    
// var NDSVIJuly2019 = medianpixelJuly2019.expression(
//   "(B11- B4) / (B11+B4)",
//   {
//     B11: medianpixelJuly2019.select("B11"),
//     B4: medianpixelJuly2019.select("B4")
//   })
// var NDRIJuly2019 = medianpixelJuly2019.expression(
//   "(B4-B12)/(B4+B12)",
//   {
//     B12: medianpixelJuly2019.select("B12"),
//     B4: medianpixelJuly2019.select("B4")
//   })
// var NDTIJuly2019 = medianpixelJuly2019.expression(
//   "(B11-B12)/(B11+B12)",
//   {
//     B12: medianpixelJuly2019.select("B12"),
//     B11: medianpixelJuly2019.select("B11")
//   })
// // Map.addLayer(PMIJuly2019,{min: 0, max: 1, palette: [
// //     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
// //     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
// //     '012E01', '011D01', '011301'
// //   ]},"PMI July2019")
// Map.addLayer(NDSVIJuly2019,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"NDSVI July2019")
// Map.addLayer(NDRIJuly2019,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"NDRI July2019")
// Map.addLayer(NDTIJuly2019,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"NDTI July2019")
// Map.addLayer(NDVIJuly2019,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"NDVI July2019");
// Map.addLayer(NDBIJuly2019,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"NDBI July2019");
// Map.addLayer(NDWIJuly2019,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"NDWI July2019");
// var compositeJuly2019 = medianpixelJuly2019.addBands(NDVIJuly2019). addBands(NDBIJuly2019).addBands(NDWIJuly2019).addBands(NDSVIJuly2019).addBands(NDRIJuly2019).addBands(NDTIJuly2019)
// var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7','B8','B8A','B9','B11','B12',"B8_1","constant","B11_1","B3_1","B11_2","B4_1","B11_3"];
// // print(medianpixelJuly2019)
// // print(compositeJuly2019)
// // print(bands)
// //...............................August.....................

// var collectionAug2019 = ee.ImageCollection("COPERNICUS/S2_SR") // searches all sentinel 2 imagery pixels...
//   .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 40)) // ...filters on the metadata for pixels less than 10% cloud
//   .filterDate('2019-08-1' ,'2019-08-30') //... chooses only pixels between the dates you define here
//   .filterBounds(shape); // ... that are within your aoi
// print(collectionAug2019); // this generates a JSON list of the images (and their metadata) which the filters found in the right-hand window.
// var medianpixelAug2019 = collectionAug2019.median(); // This finds the median value of all the pixels which meet the criteria. 

// // var medianpixelsclipped = medianpixels.divide(10000); // this cuts up the result so that it fits neatly into your aoi
//                                                                   // and divides so that values between 0 and 1    
// // Map.addLayer(medianpixelAug2019, {bands: ['B4', 'B3', 'B2'], min: 0, max: 1, gamma: 2.5}, 'Sentinel_2 mosaic');


// // Define visualization parameters in a JavaScript dictionary for true colour rendering. Bands 4,3 and 2 needed for RGB.
// var trueColour = {
//     bands: ["B4", "B3", "B2"],
//     min: 0,
//     max: 3000
//     };

// // Add the image to the map, using the visualization parameters.
// Map.addLayer(medianpixelAug2019, trueColour, "True-colour image");
// //Define false-colour visualization parameters.
// var falseColour = {
//     bands: ["B8", "B4", "B3"],
//     min: 0,
//     max: 3000
//     };
// Map.addLayer(medianpixelAug2019, falseColour, "False-colour composite");
// //Define variable NDVI from equation
// var NDVIAug2019 = medianpixelAug2019.expression(
//     "(NIR - RED) / (NIR + RED)",
//     {
//       RED: medianpixelAug2019.select("B4"),    //  RED
//       NIR: medianpixelAug2019.select("B8"),    // NIR
//       BLUE: medianpixelAug2019.select("B2"),    // BLUE
//       SWIR: medianpixelAug2019.select("B11")    //SWIR
//     });
// // var PMIAug2019 = medianpixelAug2019.expression(
// //   "G- 1*( B8 + m * B4)/sqrt(m * m)",
// //   {G: 0.5,
// //   m: 1.13,
// //   B8: medianpixelAug2019.select("B8"),
// //   B4: medianpixelAug2019.select("B4")
// //   })
// var NDBIAug2019 = medianpixelAug2019.expression(
//       "(SWIR - NIR) / (SWIR + NIR)",
//       {
//       RED: medianpixelAug2019.select("B4"),    //  RED
//       NIR: medianpixelAug2019.select("B8"),    // NIR
//       BLUE: medianpixelAug2019.select("B2"),    // BLUE
//       SWIR: medianpixelAug2019.select("B11")    //SWIR
//     });
// var NDWIAug2019 = medianpixelAug2019.expression(
//       "(GREEN - NIR) / (GREEN + NIR)",
//       {
//       RED: medianpixelAug2019.select("B4"),    //  RED
//       NIR: medianpixelAug2019.select("B8"),    // NIR
//       BLUE: medianpixelAug2019.select("B2"),    // BLUE
//       SWIR: medianpixelAug2019.select("B11"),    //SWIR
//       GREEN: medianpixelAug2019.select("B3")    //GREEN
//     });
    
// var NDSVIAug2019 = medianpixelAug2019.expression(
//   "(B11- B4) / (B11+B4)",
//   {
//     B11: medianpixelAug2019.select("B11"),
//     B4: medianpixelAug2019.select("B4")
//   })
// var NDRIAug2019 = medianpixelAug2019.expression(
//   "(B4-B12)/(B4+B12)",
//   {
//     B12: medianpixelAug2019.select("B12"),
//     B4: medianpixelAug2019.select("B4")
//   })
// var NDTIAug2019 = medianpixelAug2019.expression(
//   "(B11-B12)/(B11+B12)",
//   {
//     B12: medianpixelAug2019.select("B12"),
//     B11: medianpixelAug2019.select("B11")
//   })
// // Map.addLayer(PMIAug2019,{min: 0, max: 1, palette: [
// //     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
// //     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
// //     '012E01', '011D01', '011301'
// //   ]},"PMI Aug2019")
// Map.addLayer(NDSVIAug2019,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"NDSVI Aug2019")
// Map.addLayer(NDRIAug2019,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"NDRI Aug2019")
// Map.addLayer(NDTIAug2019,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"NDTI Aug2019")
// Map.addLayer(NDVIAug2019,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"NDVI Aug2019");
// Map.addLayer(NDBIAug2019,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"NDBI Aug2019");
// Map.addLayer(NDWIAug2019,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"NDWI Aug2019");
// var compositeAug2019 = medianpixelAug2019.addBands(NDVIAug2019). addBands(NDBIAug2019).addBands(NDWIAug2019).addBands(NDSVIAug2019).addBands(NDRIAug2019).addBands(NDTIAug2019)
// var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7','B8','B8A','B9','B11','B12',"B8_1","constant","B11_1","B3_1","B11_2","B4_1","B11_3"];
// // print(medianpixelAug2019)
// // print(compositeAug2019)
// // print(bands)
// //>......................September.....................

// var collectionSept2019 = ee.ImageCollection("COPERNICUS/S2_SR") // searches all sentinel 2 imagery pixels...
//   .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 10)) // ...filters on the metadata for pixels less than 10% cloud
//   .filterDate('2019-09-1' ,'2019-09-20') //... chooses only pixels between the dates you define here
//   .filterBounds(shape); // ... that are within your aoi
// print(collectionSept2019); // this generates a JSON list of the images (and their metadata) which the filters found in the right-hand window.
// var medianpixelSept2019 = collectionSept2019.median(); // This finds the median value of all the pixels which meet the criteria. 

// // var medianpixelsclipped = medianpixels.divide(10000); // this cuts up the result so that it fits neatly into your aoi
//                                                                   // and divides so that values between 0 and 1    
// // Map.addLayer(medianpixelSept2019, {bands: ['B4', 'B3', 'B2'], min: 0, max: 1, gamma: 2.5}, 'Sentinel_2 mosaic');


// // Define visualization parameters in a JavaScript dictionary for true colour rendering. Bands 4,3 and 2 needed for RGB.
// var trueColour = {
//     bands: ["B4", "B3", "B2"],
//     min: 0,
//     max: 3000
//     };

// // Add the image to the map, using the visualization parameters.
// Map.addLayer(medianpixelSept2019, trueColour, "True-colour image");
// //Define false-colour visualization parameters.
// var falseColour = {
//     bands: ["B8", "B4", "B3"],
//     min: 0,
//     max: 3000
//     };
// Map.addLayer(medianpixelSept2019, falseColour, "False-colour composite");
// //Define variable NDVI from equation
// var NDVISept2019 = medianpixelSept2019.expression(
//     "(NIR - RED) / (NIR + RED)",
//     {
//       RED: medianpixelSept2019.select("B4"),    //  RED
//       NIR: medianpixelSept2019.select("B8"),    // NIR
//       BLUE: medianpixelSept2019.select("B2"),    // BLUE
//       SWIR: medianpixelSept2019.select("B11")    //SWIR
//     });
// // var PMISept2019 = medianpixelSept2019.expression(
// //   "G- 1*( B8 + m * B4)/sqrt(m * m)",
// //   {G: 0.5,
// //   m: 1.13,
// //   B8: medianpixelSept2019.select("B8"),
// //   B4: medianpixelSept2019.select("B4")
// //   })
// var NDBISept2019 = medianpixelSept2019.expression(
//       "(SWIR - NIR) / (SWIR + NIR)",
//       {
//       RED: medianpixelSept2019.select("B4"),    //  RED
//       NIR: medianpixelSept2019.select("B8"),    // NIR
//       BLUE: medianpixelSept2019.select("B2"),    // BLUE
//       SWIR: medianpixelSept2019.select("B11")    //SWIR
//     });
// var NDWISept2019 = medianpixelSept2019.expression(
//       "(GREEN - NIR) / (GREEN + NIR)",
//       {
//       RED: medianpixelSept2019.select("B4"),    //  RED
//       NIR: medianpixelSept2019.select("B8"),    // NIR
//       BLUE: medianpixelSept2019.select("B2"),    // BLUE
//       SWIR: medianpixelSept2019.select("B11"),    //SWIR
//       GREEN: medianpixelSept2019.select("B3")    //GREEN
//     });
    
// var NDSVISept2019 = medianpixelSept2019.expression(
//   "(B11- B4) / (B11+B4)",
//   {
//     B11: medianpixelSept2019.select("B11"),
//     B4: medianpixelSept2019.select("B4")
//   })
// var NDRISept2019 = medianpixelSept2019.expression(
//   "(B4-B12)/(B4+B12)",
//   {
//     B12: medianpixelSept2019.select("B12"),
//     B4: medianpixelSept2019.select("B4")
//   })
// var NDTISept2019 = medianpixelSept2019.expression(
//   "(B11-B12)/(B11+B12)",
//   {
//     B12: medianpixelSept2019.select("B12"),
//     B11: medianpixelSept2019.select("B11")
//   })
// // Map.addLayer(PMISept2019,{min: 0, max: 1, palette: [
// //     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
// //     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
// //     '012E01', '011D01', '011301'
// //   ]},"PMI Sept2019")
// Map.addLayer(NDSVISept2019,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"NDSVI Sept2019")
// Map.addLayer(NDRISept2019,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"NDRI Sept2019")
// Map.addLayer(NDTISept2019,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"NDTI Sept2019")
// Map.addLayer(NDVISept2019,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"NDVI Sept2019");
// Map.addLayer(NDBISept2019,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"NDBI Sept2019");
// Map.addLayer(NDWISept2019,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"NDWI Sept2019");
// var compositeSept2019 = medianpixelSept2019.addBands(NDVISept2019).addBands(NDBISept2019).addBands(NDWISept2019).addBands(NDSVISept2019).addBands(NDRISept2019).addBands(NDTISept2019)
// var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7','B8','B8A','B9','B11','B12',"B8_1","constant","B11_1","B3_1","B11_2","B4_1","B11_3"];
// // print(medianpixelSept2019)
// // print(compositeSept2019)
// // print(bands)
// // ///.............................October...........

// var collectionOct2019 = ee.ImageCollection("COPERNICUS/S2_SR") // searches all sentinel 2 imagery pixels...
//   .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 10)) // ...filters on the metadata for pixels less than 10% cloud
//   .filterDate('2019-10-1' ,'2019-10-20') //... chooses only pixels between the dates you define here
//   .filterBounds(shape); // ... that are within your aoi
// print(collectionOct2019); // this generates a JSON list of the images (and their metadata) which the filters found in the right-hand window.
// var medianpixelOct2019 = collectionOct2019.median(); // This finds the median value of all the pixels which meet the criteria. 

// // var medianpixelsclipped = medianpixels.divide(10000); // this cuts up the result so that it fits neatly into your aoi
//                                                                   // and divides so that values between 0 and 1    
// // Map.addLayer(medianpixelOct2019, {bands: ['B4', 'B3', 'B2'], min: 0, max: 1, gamma: 2.5}, 'Sentinel_2 mosaic');


// // Define visualization parameters in a JavaScript dictionary for true colour rendering. Bands 4,3 and 2 needed for RGB.
// var trueColour = {
//     bands: ["B4", "B3", "B2"],
//     min: 0,
//     max: 3000
//     };

// // Add the image to the map, using the visualization parameters.
// Map.addLayer(medianpixelOct2019, trueColour, "True-colour image");
// //Define false-colour visualization parameters.
// var falseColour = {
//     bands: ["B8", "B4", "B3"],
//     min: 0,
//     max: 3000
//     };
// Map.addLayer(medianpixelOct2019, falseColour, "False-colour composite");
// //Define variable NDVI from equation
// var NDVIOct2019 = medianpixelOct2019.expression(
//     "(NIR - RED) / (NIR + RED)",
//     {
//       RED: medianpixelOct2019.select("B4"),    //  RED
//       NIR: medianpixelOct2019.select("B8"),    // NIR
//       BLUE: medianpixelOct2019.select("B2"),    // BLUE
//       SWIR: medianpixelOct2019.select("B11")    //SWIR
//     });
// // var PMIOct2019 = medianpixelOct2019.expression(
// //   "G- 1*( B8 + m * B4)/sqrt(m * m)",
// //   {G: 0.5,
// //   m: 1.13,
// //   B8: medianpixelOct2019.select("B8"),
// //   B4: medianpixelOct2019.select("B4")
// //   })
// var NDBIOct2019 = medianpixelOct2019.expression(
//       "(SWIR - NIR) / (SWIR + NIR)",
//       {
//       RED: medianpixelOct2019.select("B4"),    //  RED
//       NIR: medianpixelOct2019.select("B8"),    // NIR
//       BLUE: medianpixelOct2019.select("B2"),    // BLUE
//       SWIR: medianpixelOct2019.select("B11")    //SWIR
//     });
// var NDWIOct2019 = medianpixelOct2019.expression(
//       "(GREEN - NIR) / (GREEN + NIR)",
//       {
//       RED: medianpixelOct2019.select("B4"),    //  RED
//       NIR: medianpixelOct2019.select("B8"),    // NIR
//       BLUE: medianpixelOct2019.select("B2"),    // BLUE
//       SWIR: medianpixelOct2019.select("B11"),    //SWIR
//       GREEN: medianpixelOct2019.select("B3")    //GREEN
//     });
    
// var NDSVIOct2019 = medianpixelOct2019.expression(
//   "(B11- B4) / (B11+B4)",
//   {
//     B11: medianpixelOct2019.select("B11"),
//     B4: medianpixelOct2019.select("B4")
//   })
// var NDRIOct2019 = medianpixelOct2019.expression(
//   "(B4-B12)/(B4+B12)",
//   {
//     B12: medianpixelOct2019.select("B12"),
//     B4: medianpixelOct2019.select("B4")
//   })
// var NDTIOct2019 = medianpixelOct2019.expression(
//   "(B11-B12)/(B11+B12)",
//   {
//     B12: medianpixelOct2019.select("B12"),
//     B11: medianpixelOct2019.select("B11")
//   })
// // Map.addLayer(PMIOct2019,{min: 0, max: 1, palette: [
// //     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
// //     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
// //     '012E01', '011D01', '011301'
// //   ]},"PMI Oct2019")
// Map.addLayer(NDSVIOct2019,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"NDSVI Oct2019")
// Map.addLayer(NDRIOct2019,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"NDRI Oct2019")
// Map.addLayer(NDTIOct2019,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"NDTI Oct2019")
// Map.addLayer(NDVIOct2019,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"NDVI Oct2019");
// Map.addLayer(NDBIOct2019,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"NDBI Oct2019");
// Map.addLayer(NDWIOct2019,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"NDWI Oct2019");
// var compositeOct2019 = medianpixelOct2019.addBands(NDVIOct2019).addBands(NDBIOct2019).addBands(NDWIOct2019).addBands(NDSVIOct2019).addBands(NDRIOct2019).addBands(NDTIOct2019)
// var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7','B8','B8A','B9','B11','B12',"B8_1","constant","B11_1","B3_1","B11_2","B4_1","B11_3"];
// // print(medianpixelOct2019)
// // print(compositeOct2019)
// // print(bands)
/////////......................November 1st week............

var collectionNov2019 = ee.ImageCollection("COPERNICUS/S2_SR") // searches all sentinel 2 imagery pixels...
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 10)) // ...filters on the metadata for pixels less than 10% cloud
  .filterDate('2019-11-1' ,'2019-11-10') //... chooses only pixels between the dates you define here
  .filterBounds(shape); // ... that are within your aoi
print(collectionNov2019); // this generates a JSON list of the images (and their metadata) which the filters found in the right-hand window.
var medianpixelNov2019 = collectionNov2019.median(); // This finds the median value of all the pixels which meet the criteria. 

// var medianpixelsclipped = medianpixels.divide(10000); // this cuts up the result so that it fits neatly into your aoi
                                                                  // and divides so that values between 0 and 1    
// Map.addLayer(medianpixelNov2019, {bands: ['B4', 'B3', 'B2'], min: 0, max: 1, gamma: 2.5}, 'Sentinel_2 mosaic');


// Define visualization parameters in a JavaScript dictionary for true colour rendering. Bands 4,3 and 2 needed for RGB.
var trueColour = {
    bands: ["B4", "B3", "B2"],
    min: 0,
    max: 3000
    };

// Add the image to the map, using the visualization parameters.
Map.addLayer(medianpixelNov2019, trueColour, "True-colour image");
//Define false-colour visualization parameters.
var falseColour = {
    bands: ["B8", "B4", "B3"],
    min: 0,
    max: 3000
    };
Map.addLayer(medianpixelNov2019, falseColour, "False-colour composite",0);
//Define variable NDVI from equation
var NDVINov2019 = medianpixelNov2019.expression(
    "(NIR - RED) / (NIR + RED)",
    {
      RED: medianpixelNov2019.select("B4"),    //  RED
      NIR: medianpixelNov2019.select("B8"),    // NIR
      BLUE: medianpixelNov2019.select("B2"),    // BLUE
      SWIR: medianpixelNov2019.select("B11")    //SWIR
    });
// var PMINov2019 = medianpixelNov2019.expression(
//   "(0.5- 1*( B8 + 1.13 * B4)/sqrt((m * m) +1))",
//   {G: 0.5,
//   m: 1.13,
//   B8: medianpixelNov2019.select("B8"),
//   B4: medianpixelNov2019.select("B4")
//   })
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
    
var NDSVINov2019 = medianpixelNov2019.expression(
  "(B11- B4) / (B11+B4)",
  {
    B11: medianpixelNov2019.select("B11"),
    B4: medianpixelNov2019.select("B4")
  })
var NDRINov2019 = medianpixelNov2019.expression(
  "(B4-B12)/(B4+B12)",
  {
    B12: medianpixelNov2019.select("B12"),
    B4: medianpixelNov2019.select("B4")
  })
var NDTINov2019 = medianpixelNov2019.expression(
  "(B11-B12)/(B11+B12)",
  {
    B12: medianpixelNov2019.select("B12"),
    B11: medianpixelNov2019.select("B11")
  })
// Map.addLayer(PMINov2019,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"PMI Nov2019")
Map.addLayer(NDSVINov2019,{min: 0, max: 1, palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ]},"NDSVI Nov2019",0)
Map.addLayer(NDRINov2019,{min: 0, max: 1, palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ]},"NDRI Nov2019",0)
Map.addLayer(NDTINov2019,{min: 0, max: 1, palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ]},"NDTI Nov2019",0)
Map.addLayer(NDVINov2019,{min: 0, max: 1, palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ]},"NDVI Nov2019",0);
Map.addLayer(NDBINov2019,{min: 0, max: 1, palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ]},"NDBI Nov2019",0);
Map.addLayer(NDWINov2019,{min: 0, max: 1, palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ]},"NDWI Nov2019",0);
var compositeNov2019 = medianpixelNov2019.addBands(NDVINov2019). addBands(NDBINov2019).addBands(NDWINov2019).addBands(NDSVINov2019).addBands(NDRINov2019).addBands(NDTINov2019)
var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7','B8','B8A','B9','B11','B12',"B8_1","constant","B11_1","B3_1","B11_2","B4_1","B11_3"];
// print(medianpixelNov2019)
print(compositeNov2019)
print(bands)
// ///////////////....................November 3rd week..........
var collectionNov32019 = ee.ImageCollection("COPERNICUS/S2_SR") // searches all sentinel 2 imagery pixels...
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 10)) // ...filters on the metadata for pixels less than 10% cloud
  .filterDate('2019-11-15' ,'2019-11-30') //... chooses only pixels between the dates you define here
  .filterBounds(shape); // ... that are within your aoi
print(collectionNov32019); // this generates a JSON list of the images (and their metadata) which the filters found in the right-hand window.
var medianpixelNov32019 = collectionNov32019.median(); // This finds the median value of all the pixels which meet the criteria. 

// var medianpixelsclipped = medianpixels.divide(10000); // this cuts up the result so that it fits neatly into your aoi
                                                                  // and divides so that values between 0 and 1    
// Map.addLayer(medianpixelNov2019, {bands: ['B4', 'B3', 'B2'], min: 0, max: 1, gamma: 2.5}, 'Sentinel_2 mosaic');


// Define visualization parameters in a JavaScript dictionary for true colour rendering. Bands 4,3 and 2 needed for RGB.
var trueColour = {
    bands: ["B4", "B3", "B2"],
    min: 0,
    max: 3000
    };

// Add the image to the map, using the visualization parameters.
// Map.addLayer(medianpixelNov2019, trueColour, "True-colour image");
//Define false-colour visualization parameters.
var falseColour = {
    bands: ["B8", "B4", "B3"],
    min: 0,
    max: 3000
    };
// Map.addLayer(medianpixelNov2019, falseColour, "False-colour composite");
//Define variable NDVI from equation
var NDVINov32019 = medianpixelNov32019.expression(
    "(NIR - RED) / (NIR + RED)",
    {
      RED: medianpixelNov32019.select("B4"),    //  RED
      NIR: medianpixelNov32019.select("B8"),    // NIR
      BLUE: medianpixelNov32019.select("B2"),    // BLUE
      SWIR: medianpixelNov32019.select("B11")    //SWIR
    });
// var PMINov2019 = medianpixelNov2019.expression(
//   "(0.5- 1*( B8 + 1.13 * B4)/sqrt((m * m) +1))",
//   {G: 0.5,
//   m: 1.13,
//   B8: medianpixelNov2019.select("B8"),
//   B4: medianpixelNov2019.select("B4")
//   })
var NDBINov32019 = medianpixelNov32019.expression(
      "(SWIR - NIR) / (SWIR + NIR)",
      {
      RED: medianpixelNov32019.select("B4"),    //  RED
      NIR: medianpixelNov32019.select("B8"),    // NIR
      BLUE: medianpixelNov32019.select("B2"),    // BLUE
      SWIR: medianpixelNov32019.select("B11")    //SWIR
    });
var NDWINov32019 = medianpixelNov32019.expression(
      "(GREEN - NIR) / (GREEN + NIR)",
      {
      RED: medianpixelNov32019.select("B4"),    //  RED
      NIR: medianpixelNov32019.select("B8"),    // NIR
      BLUE: medianpixelNov32019.select("B2"),    // BLUE
      SWIR: medianpixelNov32019.select("B11"),    //SWIR
      GREEN: medianpixelNov32019.select("B3")    //GREEN
    });
    
var NDSVINov32019 = medianpixelNov32019.expression(
  "(B11- B4) / (B11+B4)",
  {
    B11: medianpixelNov32019.select("B11"),
    B4: medianpixelNov32019.select("B4")
  })
var NDRINov32019 = medianpixelNov32019.expression(
  "(B4-B12)/(B4+B12)",
  {
    B12: medianpixelNov32019.select("B12"),
    B4: medianpixelNov32019.select("B4")
  })
var NDTINov32019 = medianpixelNov32019.expression(
  "(B11-B12)/(B11+B12)",
  {
    B12: medianpixelNov32019.select("B12"),
    B11: medianpixelNov32019.select("B11")
  })
// Map.addLayer(PMINov32019,{min: 0, max: 1, palette: [
//     'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//     '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//     '012E01', '011D01', '011301'
//   ]},"PMI Nov32019")
Map.addLayer(NDSVINov32019,{min: 0, max: 1, palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ]},"NDSVI Nov32019",0)
Map.addLayer(NDRINov32019,{min: 0, max: 1, palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ]},"NDRI Nov32019",0)
Map.addLayer(NDTINov32019,{min: 0, max: 1, palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ]},"NDTI Nov32019",0)
Map.addLayer(NDVINov32019,{min: 0, max: 1, palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ]},"NDVI Nov32019",0);
Map.addLayer(NDBINov32019,{min: 0, max: 1, palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ]},"NDBI Nov32019",0);
Map.addLayer(NDWINov32019,{min: 0, max: 1, palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ]},"NDWI Nov32019",0);
var compositeNov32019 = medianpixelNov32019.addBands(NDVINov32019). addBands(NDBINov32019).addBands(NDWINov32019).addBands(NDSVINov32019).addBands(NDRINov32019).addBands(NDTINov32019)
// var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7','B8','B8A','B9','B11','B12',"B8_1","B11_1","B3_1","B11_2","B4_1","B11_3"];
// print(medianpixelNov2019)
var bands = ['B2', 'B3', 'B4', 'B7','B8','B9','B11','B12'];

print(compositeNov32019)
print(bands)

var urban1 = ee.FeatureCollection(urban)
print(urban1)
var water2 = ee.FeatureCollection(water)
var wheat3 = ee.FeatureCollection(wheat)
var classNames = urban1.merge(water2).merge(wheat3)
print(classNames)
var training = compositeNov32019.select(bands).sampleRegions({
  collection: classNames,
  properties: ['Landuse'],
  scale: 30
});
var classifier = ee.Classifier.libsvm().train({ //ee.Classifier.decisionTree(treeString)
  features: training,
  classProperty: 'Landuse',
  inputProperties: bands
});
var classified = compositeNov32019.select(bands).classify(classifier);
Map.addLayer(classified,
{min: 0, max: 3, palette: ['red', 'blue', 'green','yellow']},
'classification');