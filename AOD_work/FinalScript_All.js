/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var study = ee.FeatureCollection("projects/landsat-325606/assets/India_shapefile_withkashmir");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
Map.addLayer(study,{},'India')
Map.centerObject(study,4)
/****************MODIS  AOD*******************/
var ys = 2000
var ye =2019
var yearStart = ee.Number(ys);
var sdate = ee.Date.fromYMD(yearStart,1,1);
var yearEnd = ee.Number(ye); // note that the year ending is the 10year + 1
var edate = ee.Date.fromYMD(yearEnd,1,1); 
// print(sdate);
// print(edate);

var moaod= function(img) {
  return img
    .multiply(0.001)
    
    .copyProperties(img, ['system:time_start']);
};


var coll = ee.ImageCollection("MODIS/006/MCD19A2_GRANULES")
                      .select('Optical_Depth_047')
                      .map(moaod)
// print(coll)
// create annual composites using the median() operator
var yearList = ee.List.sequence(yearStart, yearEnd.subtract(1));
print('yearListAOD',yearList)
var annualAOD = ee.ImageCollection(yearList.map(function(yr){
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
var AOD19year = annualAOD.toBands().select([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,],
  ['aod1','aod2','aod3','aod4','aod5','aod6','aod7','aod8','aod9','aod10','aod11','aod12','aod13','aod14','aod15','aod16','aod17','aod18','aod19']);
  
print(AOD19year,'AOD_19year') 

Map.addLayer(AOD19year,{min:-1,max:5},'AOD19year')

// export 10-band ndvi image to your drive as a geotiff image
Export.image.toDrive({
  image: AOD19year,
  description: 'AOD19year',
  fileNamePrefix: 'AOD19year',
  region: study,
  scale: 500,
  crs: 'EPSG:4326',
  maxPixels: 1e13
})
/*******************MODIS  NDVI***************/
var yearStart = ee.Number(2000);
var sdate = ee.Date.fromYMD(yearStart,1,1);
var yearEnd = ee.Number(2019); // note that the year ending is the 10year + 1
var edate = ee.Date.fromYMD(yearEnd,1,1); 
// print(sdate);
// print(edate);

var colNDVI = ee.ImageCollection('MODIS/MOD09GA_006_NDVI')
                      .select('NDVI')
// print(coll)
// create annual composites using the median() operator
var yearList = ee.List.sequence(yearStart, yearEnd.subtract(1));
print('yearListNDVI',yearList)
var annualNDVI = ee.ImageCollection(yearList.map(function(yr){
  var year = ee.Number(yr);
  var annual = colNDVI.filterDate(year.format('%d').cat('-01-01'),year.add(1).format('%d').cat('-01-01'))
    .select('NDVI').median().clip(study)
  return annual.set('year',year);
}));

//print(annualNDVI)
// print(coll)
var NDVI19year = annualNDVI.toBands().select([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,],
  ['NDVI1','NDVI2','NDVI3','NDVI4','NDVI5','NDVI6','NDVI7','NDVI8','NDVI9','NDVI10','NDVI11','NDVI12','NDVI13','NDVI14','NDVI15','NDVI16','NDVI17','NDVI18','NDVI19']);
  
print(NDVI19year,'NDVI_19year') 

Map.addLayer(NDVI19year,{min:-1,max:1},'NDVI19year')

// export 10-band ndvi image to your drive as a geotiff image
Export.image.toDrive({
  image: NDVI19year,
  description: 'NDVI19year',
  fileNamePrefix: 'NDVI19year',
  region: study,
  scale: 500,
  crs: 'EPSG:4326',
  maxPixels: 1e13
})


// /*****************MODIS  LST**************/

var moLST= function(img) {
  return img
    .multiply(0.02)
    .subtract(273.15)
    .copyProperties(img, ['system:time_start']);
};


var collst = ee.ImageCollection("MODIS/061/MOD11A2")
                      .select('LST_Day_1km')
                      .map(moLST)
// print(collst)
// create annual composites using the median() operator
var yearList = ee.List.sequence(yearStart, yearEnd.subtract(1));
print('yearListLST',yearList)
var annualLST = ee.ImageCollection(yearList.map(function(yr){
  var year = ee.Number(yr);
  var annual = collst.filterDate(year.format('%d').cat('-01-01'),year.add(1).format('%d').cat('-01-01'))
    .select('LST_Day_1km').median().clip(study)
  return annual.set('year',year);
}));

//print(annualNDVI)

// convert the image collstection with 10 years of NDVI into a 10-band image
// and rename the bands
// var bandNames = annualNDVI.bandNames();
// print(collst)
var LST19year = annualLST.toBands().select([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,],
  ['LST1','LST2','LST3','LST4','LST5','LST6','LST7','LST8','LST9','LST10','LST11','LST12','LST13','LST14','LST15','LST16','LST17','LST18','LST19']);
  
print(LST19year,'LST_19year') 

Map.addLayer(LST19year,{min:0,max:48},'LST19year')

// export 10-band ndvi image to your drive as a geotiff image
Export.image.toDrive({
  image: LST19year,
  description: 'LST19year',
  fileNamePrefix: 'LST19year',
  region: study,
  scale: 500,
  crs: 'EPSG:4326',
  maxPixels: 1e13
})

/****************Precipitation****************/
/****************Precipitation****************/
// set start and end year
var startyear = ys;
var endyear = ye-1;

// make a date object
var startdate = ee.Date.fromYMD(startyear,1, 1);
var enddate = ee.Date.fromYMD(endyear + 1, 1, 1);

// make a list with years
var years = ee.List.sequence(startyear, endyear);
print('yearsPrecp',years)
var chirps = ee.ImageCollection("UCSB-CHG/CHIRPS/PENTAD")
var annualPrecip = ee.ImageCollection.fromImages(
  years.map(function (year) {
    var annual = chirps
        .filter(ee.Filter.calendarRange(year, year, 'year'))
        .sum();
    return annual
        .set('year', year)
        .set('system:time_start', ee.Date.fromYMD(year, 1, 1));
}));

print('prec',annualPrecip)
var Precp19year = annualPrecip.toBands().select([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,],
  ['PRECP1','PRECP2','PRECP3','PRECP4','PRECP5','PRECP6','PRECP7','PRECP8','PRECP9','PRECP10','PRECP11','PRECP12','PRECP13','PRECP14','PRECP15','PRECP16','PRECP17','PRECP18','PRECP19']);
var Precp19year = Precp19year.clip(study)
Map.addLayer(Precp19year, {}, 'Yearly Precipitation');
Export.image.toDrive({
  image: Precp19year,
  description: 'Precp19year',
  fileNamePrefix: 'Precp19year',
  region: study,
  scale: 500,
  crs: 'EPSG:4326',
  maxPixels: 1e13
})