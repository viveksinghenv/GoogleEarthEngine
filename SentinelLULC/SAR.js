/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var roi1 = ee.FeatureCollection("users/viveksinghenv17dr000519/Watershed"),
    roi = 
    /* color: #98ff00 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[83.75671886342093, 25.414324520696564],
          [83.75671886342093, 23.05023859938398],
          [88.23914073842093, 23.05023859938398],
          [88.23914073842093, 25.414324520696564]]], null, false);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// The objective of this lab is to deepen your understanding of Synthetic Aperture Radar (SAR) data, and learn how to visualise different composites in Google Earth Engine

// Filter the collection for the VV product from the descending track
var collectionVV = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
    .filterBounds(roi1)
    .select(['VV']);
print(collectionVV);

// Filter the collection for the VH product from the descending track
var collectionVH = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
    .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
    .filterBounds(roi1)
    .select(['VH']);
print(collectionVH);
Map.centerObject(roi1, 8);
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
var VV1 = ee.Image(collectionVV.filterDate('2018-01-01', '2018-04-30').median());
var VV2 = ee.Image(collectionVV.filterDate('2018-05-01', '2018-08-31').median());
var VV3 = ee.Image(collectionVV.filterDate('2018-09-01', '2018-12-31').median());
//Add to map
Map.addLayer(VV1.addBands(VV2).addBands(VV3), {min: -12, max: -7}, 'Season composite VV');

// Create a 3 band stack by selecting from different periods (months)
var VH1 = ee.Image(collectionVH.filterDate('2019-06-01', '2019-06-30').median());
var VH2 = ee.Image(collectionVH.filterDate('2019-07-01', '2019-07-30').median());
var VH3 = ee.Image(collectionVH.filterDate('2019-08-01', '2019-08-31').median());

//Add to map
Map.addLayer(VH1.addBands(VH2).addBands(VH3), {min: -12, max: -7}, 'Season composite VH');