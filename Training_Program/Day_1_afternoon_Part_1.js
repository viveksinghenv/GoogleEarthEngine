/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = 
    /* color: #ffc82d */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[86.89810543202773, 24.094466157290622],
          [86.89810543202773, 23.959001476420863],
          [87.07388668202773, 23.959001476420863],
          [87.07388668202773, 24.094466157290622]]], null, false);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
/**********************************
***********************************
              Day 1
Working with raster and vector data
**********************************
**********************************/

// 1. Strings

// Use single (or double) quotes to make a string.
var testString = 'Google Earth Engine!';

// Use parentheses to pass arguments to functions.
print(testString);

// 2. Numbers
// Store a number in a variable.
var number = 99;
print('My answer is:', number);

// 3. List of Integers
var myList = [0, 1, 2, 3, 4, 5];
print('List of numbers:', myList);

// Make a list of strings.
var myListStrings = ['x', 'y', 'z'];
print('My list of strings:', myListStrings);

// 4. Objects / Dictionary
var myObject = {
  aby: 'try',
  nota: 13,
  item: ['county', 'zone', 'country']
};
print('Dictionary:', myObject);

// Access dictionary items using square brackets.
print('Print aby:', myObject['aby']);

// Access dictionary items using dot notation.
print('Print item:', myObject.item);

// 5. Functions
var test = function(element) {
  // Return the argument.
  return element;
};

// Load country features from Large Scale International Boundary (LSIB) dataset.
var countries = ee.FeatureCollection("FAO/GAUL/2015/level2");

// Subset the colombia feature from countries.
var p = countries.filter(ee.Filter.eq('ADM2_NAME',"Dhanbad"));

print (p,'p')
Map.addLayer(p,{color:"blue"},'P')
/**********for point shape ***************/
var pts = ee.Geometry.MultiPoint(
        [[87.038, 23.84],
         [87.14, 23.88],
         [87.18, 23.81]]);
Map.addLayer(pts)
/**********for rectangular shape*************/
var rect = ee.Geometry.Polygon(
        [[[86.89, 24.09],
          [86.89, 23.95],
          [87.07, 23.95],
          [87.07, 24.09]]]);
Map.addLayer(rect)
Map.centerObject(p)

var vispar ={color: 'blue'}
Map.addLayer(p, vispar, 'geodesic polygon');
///////area() function
var sa = rect.area()
print(sa,'sa')
//////////for dissolving all feature collection use .geometry()
var sArea = p.geometry().area()
var stateAreaSqKm = ee.Number(sArea).divide(1e6).round()
print(stateAreaSqKm)
///////for exporting the feature collection in CSV, SHP (shapefile), GeoJSON, KML, KMZ/////////
Export.table.toDrive({collection: p,
description:'Todrive',
fileFormat: 'SHP'});
// Map.centerObject(p)