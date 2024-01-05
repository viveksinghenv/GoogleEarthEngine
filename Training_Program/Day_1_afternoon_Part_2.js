/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = 
    /* color: #bf04c2 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[86.07820320866082, 23.97903156043503],
          [86.07820320866082, 23.42827752939661],
          [87.00380135319207, 23.42827752939661],
          [87.00380135319207, 23.97903156043503]]], null, false);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var image = ee.Image("CGIAR/SRTM90_V4");
//Map.addLayer(image, {min: 0, max: 3000},"custom visualization"); //display
var geometry = ee.Geometry.Point([86.13, 23.99])
Map.addLayer(image,{min: 25, max: 926, palette: ['blue','green','red']},'custom palette');
// var hill = ee.Terrain.hillshade(image,270,45)
// Map.addLayer(image,{min: 64, max: 1152},'Hillshade')
// Map.centerObject(geometry, 10)
var lst = ee.ImageCollection("MODIS/061/MOD11A1")
              .filterDate('2015-01-01', '2017-03-01')
              .filterBounds(geometry)

Map.addLayer(lst,{},'Lst')
// Map.centerObject(geometry,8)
var imagery = ee.ImageCollection("MODIS/MOD09GA_006_NDVI")
              .filterDate('2015-01-01', '2017-03-01')
              .filterBounds(geometry)

var ndvi = imagery.median().select('NDVI')
print(ndvi)
Map.addLayer(ndvi,{},'ndvi')
// var collection = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
//     // .filter(ee.Filter.eq('WRS_PATH', 130))
//     // .filter(ee.Filter.eq('WRS_ROW', 43))
//     .filterDate('2015-01-01', '2017-03-01')
//     .filter(ee.Filter.lt('CLOUD_COVER',20))
//     .filterBounds(geometry);
// print('Collection: ', collection);

// // Convert the collection to a list and get the number of images.
// var size = collection.toList(1000).length();
// print('Number of images: ',size);

// // Get the number of images.
// var count = collection.size();
// print('Count: ',count);


// var dataset = ee.ImageCollection('COPERNICUS/S2_SR')
//                   .filterDate('2020-01-01', '2020-12-01')
//                   .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',10));

// var visual = {
//   min: 0.0,
//   max: 0.3,
//   bands: ['B4', 'B3', 'B2'],
// };

// Map.setCenter(86.13, 23.99, 12);
// ////////It is the collection of data and now we select 1 collection from this data collection using mean(), median()//// 
// var dataset = dataset.median()
// Map.addLayer(dataset, visual, 'RGB');
// var band1 = dataset.select('B4')
// Map.addLayer(band1,{min: 275, max:3650},'1Band')