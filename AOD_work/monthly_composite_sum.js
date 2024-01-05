/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var gaul = ee.FeatureCollection("FAO/GAUL/2015/level2"),
    point = 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Point([86.42143692054603, 23.774710759118438]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// Aggregating Rainfall to a Monthly Time-Series
var dhanbad = gaul.filter(ee.Filter.eq('ADM2_NAME','Dhanbad'));
Map.addLayer(dhanbad,{},'Dhanbad')
var chirps = ee.ImageCollection("UCSB-CHG/CHIRPS/PENTAD");
var year = 2018
var startDate = ee.Date.fromYMD(year, 1, 1)
var endDate = startDate.advance(1, 'year')
print(endDate)
var yearFiltered = chirps
  .filter(ee.Filter.date(startDate, endDate))
// CHIRPS collection has 1 image for every pentad (5-days)
// The collection is filtered for 1 year and the time-series
// now has 72 images
print(yearFiltered,'yearFiltered')

// We need to aggregate this time series to compute
// monthly images

// Create a list of months
var months = ee.List.sequence(1, 12)

// Write a function that takes a month number
// and returns a monthly image
var createMonthlyImage = function(month) {
  var startDate = ee.Date.fromYMD(year, month, 1)
  var endDate = startDate.advance(1, 'month')
  var monthFiltered = yearFiltered
    .filter(ee.Filter.date(startDate, endDate))
  // Calculate total precipitation
  var total = monthFiltered.reduce(ee.Reducer.sum())
  return total.set({
    'system:time_start': startDate.millis(),
    'system:time_end': endDate.millis(),
    'year': year,
    'month': month})
}

// map() the function on the list  of months
// This creates a list with images for each month in the list
var monthlyImages = months.map(createMonthlyImage)
// Create an imagecollection
var monthlyCollection = ee.ImageCollection.fromImages(monthlyImages)
print(monthlyCollection)

// Create a point with coordinates for the city of Bengaluru, India
var monthlyCollection = monthlyCollection.toBands()
var monthlyCollection = monthlyCollection.select([0,1,2,3,4,5,6,7,8,9,10,11],['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'])
print(monthlyCollection)
Map.centerObject(dhanbad,9)
Map.addLayer(monthlyCollection.clip(dhanbad),{},'rainfall')
// Create a chart of monthly rainfall at a point
// var chart = ui.Chart.image.series({
//   imageCollection: monthlyCollection,
//   region: point,
//   reducer: ee.Reducer.mean(),
//   scale: 5566
// }).setOptions({
//       lineWidth: 1,
//       pointSize: 3,
//       title: 'Monthly Rainfall at Dhanbad',
//       vAxis: {title: 'Rainfall (mm)'},
//       hAxis: {title: 'Month', gridlines: {count: 12}}
// })
// print(chart)
Export.image.toDrive({
  image: monthlyCollection.clip(dhanbad),
 description: 'Chirps_Pentad',
  scale: 30,
  region: dhanbad
 
});