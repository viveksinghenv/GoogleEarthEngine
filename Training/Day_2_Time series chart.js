/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var s2 = ee.ImageCollection("COPERNICUS/S2_SR"),
    geometry = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[86.62312683863696, 23.929397921591477],
          [86.62312683863696, 23.881689573172775],
          [86.6746252517229, 23.881689573172775],
          [86.6746252517229, 23.929397921591477]]], null, false),
    geometry2 = 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Point([86.66775879664478, 23.855944866578582]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// Load Landsat 8 top-of-atmosphere (TOA) input imagery.
// var Landsat_Collection = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA').select('B[1-7]')
//     .filterBounds(geometry)
// print('Collection: ', Landsat_Collection);

// // Sort by a cloud cover property, get the least cloudy image.
// var image = ee.Image(Landsat_Collection.sort('CLOUD_COVER').first());
// print('Least cloudy image: ', image);

// //Display Map
// var vizTrue = {
//   bands: ['B4', 'B3', 'B2'],
//   min: 0,
//   max: 0.5,
//   gamma: [0.95, 1.1, 1]
// };

// // Define a region of interest as a buffer around a point.
// var Sample_Point = geometry2.buffer(500);
// Map.addLayer(image, vizTrue, 'Landsat Cloud Free Composite');
// Map.addLayer(Sample_Point, {}, 'Sample Point');
// Map.centerObject(Sample_Point, 10);

// // Create and print the chart.
// print(ui.Chart.image.series(Landsat_Collection, Sample_Point, ee.Reducer.mean(), 30));

/*********Time Series analysis****************/
// var filtered = s2
//   .filter(ee.Filter.date('2018-01-01', '2020-01-01'))
//   .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
//   .filter(ee.Filter.bounds(geometry))

// /* Create function for computing NDVI*/
// function addNDVI(image) {
//   var ndvi = image.normalizedDifference(['B8', 'B4']).rename('ndvi');
//   return image.addBands(ndvi);
// }
// var withNdvi = filtered.map(addNDVI);


// // Display a time-series chart
// var chart = ui.Chart.image.series({
//   imageCollection: withNdvi.select('ndvi'),
//   region: geometry,
//   reducer: ee.Reducer.mean(),
//   scale: 20
// }).setOptions({
//       lineWidth: 1,
//       title: 'NDVI Time Series',
//       interpolateNulls: true,
//       vAxis: {title: 'NDVI'},
//       hAxis: {title: '', format: 'YYYY-MMM'}
//     })
// print(chart);

// /*******NO2 Time series************/
// //Define date variables
// var date_1 = '2021-01-01'
// var date_2 = '2021-12-31'

// //Call Image Collection

// var col = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_NO2")
// .filterBounds(geometry)
// .filterDate(date_1, date_2)
// .select('NO2_column_number_density')
// .map(function(a) {
//   return a.set('month' , ee.Image(a).date().get('month'))
// })

// // print(col)

// var months =ee.List(col.aggregate_array('month')).distinct()  //removes duplicates by distinct

// print(months)

// var mc = months.map(function(x){
//   return col.filterMetadata('month', 'equals', x).mean().set('month',x)
// })

// var final_image = ee.ImageCollection.fromImages(mc)    // Returns the image collection containing the given images

// var chart = ui.Chart.image.series(final_image, geometry, ee.Reducer.mean(),5000, 'month')
// .setOptions({
//   title: 'NO2 Concentration of study area',
//   vAxis: {title: 'Concentration'},
//   hAxis: {title: 'Month'},
// })

// print(chart)


/*********************Stacked Imagery**************/
/****************MODIS  AOD*******************/
// var ys = 2000
// var ye =2019
// var yearStart = ee.Number(ys);
// var sdate = ee.Date.fromYMD(yearStart,1,1);
// var yearEnd = ee.Number(ye); // note that the year ending is the 10year + 1
// var edate = ee.Date.fromYMD(yearEnd,1,1); 
// // print(sdate);
// // print(edate);

// var moaod= function(img) {
//   return img
//     .multiply(0.001)
    
//     .copyProperties(img, ['system:time_start']);
// };


// var coll = ee.ImageCollection("MODIS/006/MCD19A2_GRANULES")
//                       .select('Optical_Depth_047')
//                       .map(moaod)
// // print(coll)
// // create annual composites using the median() operator
// var yearList = ee.List.sequence(yearStart, yearEnd.subtract(1));
// print('yearListAOD',yearList)
// var annualAOD = ee.ImageCollection(yearList.map(function(yr){
//   var year = ee.Number(yr);
//   var annual = coll.filterDate(year.format('%d').cat('-01-01'),year.add(1).format('%d').cat('-01-01'))
//     .select('Optical_Depth_047').median().clip(geometry)
//   return annual.set('year',year);
// }));

// // print(annualAOD)

// // convert the image collection with 10 years of NDVI into a 10-band image
// // and rename the bands
// // var bandNames = annualNDVI.bandNames();
// // print(coll)
// var AOD19year = annualAOD.toBands().select([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
//   ['aod1','aod2','aod3','aod4','aod5','aod6','aod7','aod8','aod9','aod10','aod11','aod12','aod13','aod14','aod15','aod16','aod17','aod18','aod19']);
  
// print(AOD19year,'AOD_19year') 

// Map.addLayer(AOD19year,{min:-1,max:5},'AOD19year')

// // export 10-band ndvi image to your drive as a geotiff image
// Export.image.toDrive({
//   image: AOD19year,
//   description: 'AOD19year',
//   fileNamePrefix: 'AOD19year',
//   region: geometry,
//   scale: 1000,
//   crs: 'EPSG:4326',
//   maxPixels: 1e13
// })