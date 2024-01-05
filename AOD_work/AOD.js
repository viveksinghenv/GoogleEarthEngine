/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var study = ee.FeatureCollection("projects/landsat-325606/assets/INDIA_admin_boundary");
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
/************Trend Analysis**************/

var createaodcomposite = function(){
  var yearstart = 2005;
  var yearend = 2007;
var listaod = ee.Image([]);
for(var loopYear = yearstart; loopYear<= yearend; loopYear =+1){
  var start = ee.Date.fromYMD(loopYear, 6, 01);
  var end = ee.Date.fromYMD(loopYear, 12, 25);
  
var aod = ee.ImageCollection("MODIS/006/MCD19A2_GRANULES")
                      .select('Optical_Depth_047')
                      .filterBounds(study)
                      .filterDate(start, end)//.mean()
var mergedCollection = ee.ImageCollection(aod);
  var finalop = mergedCollection.reduce(ee.Reducer.mean()).clip(study).rename(loopYear.toString());
  var filename = ("Optical_Depth_047_").concat(loopYear.toString());
  
  listaod = listaod.addBands(finalop.rename(filename));
}
print(listaod,'List AOD')
// var listfin2 = listaod.toDouble()
Map.addLayer(listfin,{},'Listfin')
// print(listfin,'Listfin2')
Export.image.toDrive({
    image: listfin,
    description: 'yearly_AOD_ts',
    //Landsat resolution is 1000m
    scale: 1000,
    region: study,
    //LCC_MNRF projection
    crs: 'epsg:4326',
    // maxPixels: 8000000000
    })
}
var comp = createaodcomposite();
print(comp)
