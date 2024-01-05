/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var study = ee.FeatureCollection("projects/landsat-325606/assets/India_shapefile_withkashmir");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
Map.addLayer(study,{},'India')
Map.centerObject(study,4)
{
// var aod = ee.ImageCollection("MODIS/006/MCD19A2_GRANULES")
//                       .select('Optical_Depth_047')
//                       .filterDate('2020-01-01', '2020-01-15')
//                       .filterBounds(study)//.mean()
// print(aod)
// var band_viz = {
//   min: 0,
//   max: 500,
//   palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
// };
// var Iaod = aod.mean().clip(study)
// Map.addLayer(Iaod, band_viz, 'Optical Depth 047');
}
// /************Trend Analysis**************/

// var createaodcomposite = function(){
//   var yearstart = 2005;
//   var yearend = 2007;
// var listaod = ee.Image([]);
// for(var loopYear = yearstart; loopYear<= yearend; loopYear =+1){
//   var start = ee.Date.fromYMD(loopYear, 6, 01);
//   var end = ee.Date.fromYMD(loopYear, 12, 25);
  
// var aod = ee.ImageCollection("MODIS/006/MCD19A2_GRANULES")
//                       .select('Optical_Depth_047')
//                       .filterBounds(study)
//                       .filterDate(start, end)//.mean()
// var mergedCollection = ee.ImageCollection(aod);
//   var finalop = mergedCollection.reduce(ee.Reducer.mean()).clip(study).rename(loopYear.toString());
//   var filename = ("Optical_Depth_047_").concat(loopYear.toString());
  
//   listaod = listaod.addBands(finalop.rename(filename));
// }
// print(listaod,'List AOD')
// // var listfin2 = listaod.toDouble()
// Map.addLayer(listfin,{},'Listfin')
// // print(listfin,'Listfin2')
// Export.image.toDrive({
//     image: listfin,
//     description: 'yearly_AOD_ts',
//     //Landsat resolution is 1000m
//     scale: 1000,
//     region: study,
//     //LCC_MNRF projection
//     crs: 'epsg:4326',
//     // maxPixels: 8000000000
//     })
// }
// var comp = createaodcomposite();
// print(comp)
/*****************************************************/

/// apply
var yearStart = ee.Number(2000);
var sdate = ee.Date.fromYMD(yearStart,1,1);
var yearEnd = ee.Number(2019); // note that the year ending is the 10year + 1
var edate = ee.Date.fromYMD(yearEnd,1,1); 
print(sdate);
print(edate);

var moaod= function(img) {
  return img
    .multiply(0.001)
    .subtract(0.00)
    .copyProperties(img, ['system:time_start']);
};

// combine landsat collections and NDVI
var coll = ee.ImageCollection("MODIS/006/MCD19A2_GRANULES")
                      .select('Optical_Depth_047')
                      .map(moaod)

// create annual composites using the mean() operator
var yearList = ee.List.sequence(yearStart, yearEnd.subtract(1));
var annualNDVI = ee.ImageCollection(yearList.map(function(yr){
  var year = ee.Number(yr);
  var annual = coll.filterDate(year.format('%d').cat('-01-01'),year.add(1).format('%d').cat('-01-01'))
    .select('Optical_Depth_047').median().clip(study)
  return annual.set('year',year);
}));

//print(annualNDVI)

// convert the image collection with 10 years of NDVI into a 10-band image
// and rename the bands
// var bandNames = annualNDVI.bandNames();
// print(coll)
var ndvi19year = annualNDVI.toBands().select([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,],
  ['aod1','aod2','aod3','aod4','aod5','aod6','aod7','aod8','aod9','aod10','aod11','aod12','aod13','aod14','aod15','aod16','aod17','aod18','aod19']);
  
print(ndvi19year,'NDVI_19year') 

Map.addLayer(ndvi19year,{min:-1,max:5})

// export 10-band ndvi image to your drive as a geotiff image
Export.image.toDrive({
  image: ndvi19year,
  description: 'ndvi19year',
  fileNamePrefix: 'ndvi19year',
  region: study,
  scale: 500,
  crs: 'EPSG:4326',
  maxPixels: 1e13
})

