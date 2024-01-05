/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var study = ee.FeatureCollection("projects/landsat-325606/assets/India_shapefile_withkashmir");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
Map.addLayer(study,{},'India',0)
Map.centerObject(study,4)
var eleva = ee.Image('NASA/NASADEM_HGT/001').select('elevation');
Map.addLayer(eleva, { min: 0, max: 2000, }, 'Elevation',0);
var aod = ee.ImageCollection("MODIS/006/MCD19A2_GRANULES")
                      .select('Optical_Depth_047')
                      .filterDate('2019-01-01', '2019-06-30')
                      .filterBounds(study)//.mean()
print(aod)
var band_viz = {
  min: -100,
  max: 4000,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
var Iaod = aod.mean()//.clip(study)
Map.addLayer(Iaod, band_viz, 'Optical Depth 047');
/************Trend Analysis**************/

// var createaodcomposite = function(){
//   var yearstart = 2002;
//   var yearend = 2019;
// var listaod = ee.Image([]);
// for(var loopYear = yearstart; loopYear<= yearend; loopYear =+1){
//   var start = ee.Date.fromYMD(loopYear, 1, 20);
//   var end = ee.Date.fromYMD(loopYear, 10, 25);
  
// var aod = ee.ImageCollection("MODIS/006/MCD19A2_GRANULES")
//                       .select('Optical_Depth_047')
//                       .filterBounds(study)
//                       .filterDate(start, end)//.mean()
                      
//   // print(aod,'AOD collection')
//   var finalop = aod.reduce(ee.Reducer.median()).clip(study).rename(loopYear.toString());
//   var filename = ("Optical_Depth_047_").concat(loopYear.toString());
  
//   listaod = ee.Image(listaod).addBands(finalop.rename(filename));
  
// }
// // // print(listaod,'List AOD')
// // var listfin2 = listaod.toDouble()

// // // print(listfin2,'Listfin2')
// // Export.image.toDrive({
// //     image: listfin2,
// //     description: 'yearly_AOD_ts',
// //     //Landsat resolution is 1000m
// //     scale: 1000,
// //     region: study,
// //     //LCC_MNRF projection
// //     crs: 'epsg:4326',
// //     maxPixels: 800000000
// //     })
// }
// var comp = createaodcomposite();
// print(comp)
