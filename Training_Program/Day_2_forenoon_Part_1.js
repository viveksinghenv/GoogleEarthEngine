/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[85.32840046089964, 24.176916372214045],
          [85.32840046089964, 23.2035771509626],
          [86.92141803902464, 23.2035771509626],
          [86.92141803902464, 24.176916372214045]]], null, false);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
/********************************************/
/************    Day 2        ***************/
/************  Data Visualization     *******/
var image = ee.Image("CGIAR/SRTM90_V4");
var image = image.clip(geometry)
Map.setCenter(86.13, 23.99,9); //latitude, longitude, zoom level
Map.centerObject(geometry, 9);
Map.addLayer(image, {min: 0, max: 3000},"custom visualization");
var basic = ee.Image(0);
basic = basic.where(image.lt(500),1);
// lt:  less than
basic = basic.where(image.gte(500).and(image.lt(1000)),2);
// gte: greater than or equal
basic = basic.where(image.gte(1000),3);
basic=basic.mask(basic);
Map.addLayer(basic);
// var slope =  ee.Terrain.slope(image);
var slope = ee.Terrain.slope(image)
//calculates the maximum rate of DEM change in value 
//from that cell to its neighbors
var aspect =  ee.Terrain.aspect(image);
//Aspect identifies the downslope direction of the maximum rate of change
//in value from each cell to its neighbors. 
//Aspect can be thought of as the slope direction
var hillsh =ee.Terrain.hillshade(image)
Map.addLayer(aspect, {},"custom visualization aspect");
Map.addLayer(slope, {},"custom visualization slope");
Map.addLayer(hillsh, {},"custom visualization hillshade");

Export.image.toDrive({
    image: hillsh,
    description: 'Dhanbad Hillshade',
    //folder: 'earthengine',
    fileNamePrefix: 'dhnhill',
    region: geometry,
    scale: 10,
    maxPixels: 1e9
})

