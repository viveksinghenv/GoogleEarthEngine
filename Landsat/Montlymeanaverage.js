/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var gaul = ee.FeatureCollection("FAO/GAUL/2015/level2");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
//Monthly timeseries of NO2 of Kanpur
//27042022
//PS_GEE_codeforSandeepKumar
var dhn = gaul.filter(ee.Filter.eq('ADM2_NAME','Dhanbad'))
//////////////
// GEE_user/purnendu.s.123@gmail.com
////////////

//Define date variables
var date_1 = '2020-01-01'
var date_2 = '2020-12-31'
var date_3 = '2010-01-01'
var date_4 = '2010-12-31'
var date_5 = '2000-01-01'
var date_6 = '2000-12-31'
//Call Image Collection
function scaleC2(image){
  var blue = image.select('blue').multiply(0.0000275).add(-0.2).rename('blue');
  var green = image.select('green').multiply(0.0000275).add(-0.2).rename('green');
  var red = image.select('red').multiply(0.0000275).add(-0.2).rename('red');
  var nir = image.select('nir').multiply(0.0000275).add(-0.2).rename('nir');
  var swir1 = image.select('swir1').multiply(0.0000275).add(-0.2).rename('swir1');
  var swir2 = image.select('swir2').multiply(0.0000275).add(-0.2).rename('swir2');
  var tir = image.select('tir').multiply(0.00341802).add(149).rename('tir')
  var NDBaL = image.normalizedDifference(['swir1', 'tir']).rename('NDBaL');
  var NDWI = image.normalizedDifference(['nir', 'swir2']).rename('NDWI')
    return blue.addBands(green)
    .addBands(red)
    .addBands(nir)
    .addBands(swir1)
    .addBands(swir2)
    .addBands(tir)
    .addBands(NDBaL)
    .addBands(NDWI)
    .copyProperties(image,['system:time_start','system:time_end'])
    //.set('month' , ee.Image().date().get('month'))
    
}

var col20 = ee.ImageCollection("LANDSAT/LC08/C02/T1_L2")
    .filterBounds(dhn)
    .filterDate(date_1, date_2)
    .filter(ee.Filter.lt("CLOUD_COVER", 80))
    .select(['SR_B2','SR_B3','SR_B4','SR_B5','SR_B6','SR_B7','ST_B10'],['blue','green','red','nir','swir1','swir2','tir'])
    .map(scaleC2);
    print (col20,'col20')

var col20 = col20.map(function(a) {
  return a.set('month' , ee.Image(a).date().get('month'))
})
var col20 = col20.select('NDWI',"NDBaL")
var months =ee.List(col20.aggregate_array('month')).distinct()
//print(months)
var mc20 = months.map(function(x){
  return col20.filterMetadata('month', 'equals', x).mean().set('month',x)
})
var final_image20 = ee.ImageCollection.fromImages(mc20)
var chart = ui.Chart.image.series(final_image20, dhn, ee.Reducer.mean(),5000, 'month')
.setOptions({
  title: 'NDWI & NDBaL for year 2020',
  vAxis: {title: 'Values'},
  hAxis: {title: 'Month'},
})
print(chart)

/*******Landsat 5   2010********/

var col10 = ee.ImageCollection("LANDSAT/LT05/C02/T1_L2")
    .filterBounds(dhn)
    .filterDate(date_3, date_4)
    /*.filter(ee.Filter.lt("CLOUD_COVER", 100))*/
    .select(['SR_B1','SR_B2','SR_B3','SR_B4','SR_B5','SR_B7','ST_B6'],['blue','green','red','nir','swir1','swir2','tir'])
    .map(scaleC2)

var col10 = col10.map(function(a) {
  return a.set('month' , ee.Image(a).date().get('month'))
})
var col10 = col10.select('NDWI',"NDBaL")
var months =ee.List(col10.aggregate_array('month')).distinct()
//print(months)
var mc10 = months.map(function(x){
  return col10.filterMetadata('month', 'equals', x).mean().set('month',x)
})
var final_image10 = ee.ImageCollection.fromImages(mc10)
var chart = ui.Chart.image.series(final_image10, dhn, ee.Reducer.mean(),5000, 'month')
.setOptions({
  title: 'NDWI & NDBaL for year 2010',
  vAxis: {title: 'Values'},
  hAxis: {title: 'Month'},
})
print(chart)


/*******Landsat 5   2000********/

var col00 = ee.ImageCollection("LANDSAT/LT05/C02/T1_L2")
    .filterBounds(dhn)
    .filterDate(date_5, date_6)
    .filter(ee.Filter.lt("CLOUD_COVER", 80))
    .select(['SR_B1','SR_B2','SR_B3','SR_B4','SR_B5','SR_B7','ST_B6'],['blue','green','red','nir','swir1','swir2','tir'])
    .map(scaleC2)

var col00 = col00.map(function(a) {
  return a.set('month' , ee.Image(a).date().get('month'))
})
var col00 = col00.select('NDWI',"NDBaL")
var months =ee.List(col00.aggregate_array('month')).distinct()
//print(months)
var mc00 = months.map(function(x){
  return col00.filterMetadata('month', 'equals', x).mean().set('month',x)
})
var final_image00 = ee.ImageCollection.fromImages(mc00)
var chart = ui.Chart.image.series(final_image00, dhn, ee.Reducer.mean(),5000, 'month')
.setOptions({
  title: 'NDWI & NDBaL for year 2000',
  vAxis: {title: 'Values'},
  hAxis: {title: 'Month'},
})
print(chart)
    