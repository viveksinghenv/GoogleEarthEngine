var gaul = ee.FeatureCollection("FAO/GAUL/2015/level2")
var dhanbad = gaul.filter(ee.Filter.eq('ADM2_NAME','Dhanbad'));
Map.addLayer(dhanbad,{},'Dhanbad')
Map.centerObject(dhanbad,8)
var chirps = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY");
var year = 2020
var startDate = ee.Date.fromYMD(year, 1, 1)
var endDate = startDate.advance(1, 'year')
print(endDate)
var yearFiltered = chirps
  .filter(ee.Filter.date(startDate, endDate))
print(yearFiltered,'yearFiltered')
var months = ee.List.sequence(1, 12)

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
var monthlyImages = months.map(createMonthlyImage)
print(monthlyImages)
var monthlyCollection = ee.ImageCollection.fromImages(monthlyImages)
print(monthlyCollection)
var monthlyCollection = monthlyCollection.toBands()
////////////////////rename bands names on the months/////////////////
var bandNames = months.map(function(month) {
  return ee.Number(month).format('%d')
})
var monthlyCollection = monthlyCollection.rename(bandNames)//.select([0,1,2,3,4,5,6,7,8,9,10,11],['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'])
print(monthlyCollection);
Map.addLayer(monthlyCollection.clip(dhanbad),{},'rainfall');
Export.image.toDrive({
  image: monthlyCollection.clip(dhanbad),
 description: 'Chirps_Daily_2020',
 folder: 'EE_precipitation_Chirps',
 fileNamePrefix: 'precipitation',
 scale: 5566,
  region: dhanbad,
  crs: 'EPSG:4326',
  maxPixels: 1e10
 });