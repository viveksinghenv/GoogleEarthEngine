/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var abc = ee.FeatureCollection("projects/landsat-325606/assets/Study_Area_phd"),
    gaul = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level2"),
    geometry = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[85.91668678970653, 24.02115754098645],
          [85.91668678970653, 23.44034624720995],
          [86.87936379165966, 23.44034624720995],
          [86.87936379165966, 24.02115754098645]]], null, false),
    farms1 = ee.FeatureCollection("projects/landsat-325606/assets/lulc_2010_5May");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var classNames = ee.FeatureCollection(farms1).select('ORIG_FID')
Map.addLayer(classNames)
print(farms1)
var dhn = gaul.filter(ee.Filter.eq('ADM2_NAME','Dhanbad'));
Map.addLayer(dhn)
var DEM = ee.Image("CGIAR/SRTM90_V4")
var slope =  ee.Terrain.slope(DEM);
// Map.addLayer(slope)
function scaleC3(image){
  var blue = image.select('blue').multiply(0.0000275).add(-0.2).rename('blue');
  var green = image.select('green').multiply(0.0000275).add(-0.2).rename('green');
  var red = image.select('red').multiply(0.0000275).add(-0.2).rename('red');
  var nir = image.select('nir').multiply(0.0000275).add(-0.2).rename('nir');
  var swir1 = image.select('swir1').multiply(0.0000275).add(-0.2).rename('swir1');
  var swir2 = image.select('swir2').multiply(0.0000275).add(-0.2).rename('swir2');
  var tir = image.select('tir').multiply(0.00341802).add(149).rename('tir')
  return blue.addBands(green)
    .addBands(red)
    .addBands(nir)
    .addBands(swir1)
    .addBands(swir2)
    .addBands(tir)
    .copyProperties(image)
    }
function scaleC2(image){
  var blue = image.select('blue').multiply(0.0000275).add(-0.2).rename('blue');
  var green = image.select('green').multiply(0.0000275).add(-0.2).rename('green');
  var red = image.select('red').multiply(0.0000275).add(-0.2).rename('red');
  var nir = image.select('nir').multiply(0.0000275).add(-0.2).rename('nir');
  var swir1 = image.select('swir1').multiply(0.0000275).add(-0.2).rename('swir1');
  var swir2 = image.select('swir2').multiply(0.0000275).add(-0.2).rename('swir2');
    return blue.addBands(green)
    .addBands(red)
    .addBands(nir)
    .addBands(swir1)
    .addBands(swir2)
    .copyProperties(image)
    }
// Landsat 5
/* Mean Image of Landsat 5 */
var mean = ee.ImageCollection("LANDSAT/LT05/C02/T1_L2")
    .filterBounds(geometry)
    .filterDate('2010-06-01', '2011-04-30')
    .filter(ee.Filter.lt("CLOUD_COVER", 2))
    .select(['SR_B1','SR_B2','SR_B3','SR_B4','SR_B5','SR_B7','ST_B6'],['blue','green','red','nir','swir1','swir2','tir'])
    .map(scaleC3).median();
    print (mean,'mean')
/************NBLI*******/
var addNBLI = function(image) {
return image.addBands(image.normalizedDifference(['red', 'tir']).rename('NBLI'))
};
var mean = addNBLI(mean);
/***********NdBaL***************/
var addNDBaL = function(image) {
return image.addBands(image.normalizedDifference(['swir1', 'tir']).rename('NDBaL'))
};
var mean = addNDBaL(mean);
/*****NDBI*****/
var addNDBI = function(image) {
return image.addBands(image.normalizedDifference(['swir2', 'nir']).rename('NDBI'))
};
var mean = addNDBI(mean);
// print(mean,'NDBI')
/*****NDWI*****/
var addNDWI = function(image) {
return image.addBands(image.normalizedDifference(['nir', 'swir2']).rename('NDWI'))
};
var mean = addNDWI(mean);
var mean = mean.addBands(slope);
// print(mean,'NDWI')
/*April Image*/
var April = ee.ImageCollection("LANDSAT/LT05/C02/T1_L2")
    .filterBounds(geometry)
    .filterDate('2010-04-01', '2010-04-30')
    .select(['SR_B1','SR_B2','SR_B3','SR_B4','SR_B5','SR_B7'],['blue','green','red','nir','swir1','swir2'])
    .map(scaleC2).median();
// print (April,'april')
// Function to calculate and add an NDVI band
var April_NDVI = function(image) {
return image.addBands(image.normalizedDifference(['nir', 'red']).rename('NDVI_April'));
};
var April_EVI = function(image){
  return image.addBands(image.expression(
  '2.5 * ((nir-red) / (nir + 6 * red - 7.5* blue +1))',
  {
    nir: image.select('nir'),
    red: image.select('red'),
    blue: image.select('blue')}).rename('EVI_April')
    .copyProperties(image,['system:time_start','system:time_end']))
}
// Add NDVI band to image collection
var April = April_NDVI(April);
var April = April_EVI(April);
print(April)
var april_ndvi = April.select('NDVI_April')
var April_evi =April.select('EVI_April');
Map.addLayer(April_evi,{},'April_evi')
// print(april_ndvi)
/*****May*****/
var May = ee.ImageCollection("LANDSAT/LT05/C02/T1_L2")
    .filterBounds(geometry)
    .filterDate('2010-05-01', '2010-05-30')
    .select(['SR_B1','SR_B2','SR_B3','SR_B4','SR_B5','SR_B7'],['blue','green','red','nir','swir1','swir2'])
    .map(scaleC2).median();
// print (May,'May')
// Function to calculate and add an NDVI band
var May_NDVI = function(image) {
return image.addBands(image.normalizedDifference(['nir', 'red']).rename('NDVI_May'));
};
var May_EVI = function(image){
  return image.addBands(image.expression(
  '2.5 * ((nir-red) / (nir + 6 * red - 7.5* blue +1))',
  {
    nir: image.select('nir'),
    red: image.select('red'),
    blue: image.select('blue')}).rename('EVI_May')
    .copyProperties(image,['system:time_start','system:time_end']))
}
// Add NDVI band to image collection
var May = May_NDVI(May);
var May = May_EVI(May);
// print(May)
var May_ndvi = May.select('NDVI_May')
var May_evi = May.select('EVI_May');
// Map.addLayer(May_ndvi)
// print(May_ndvi)
/*****june*****/
var June = ee.ImageCollection("LANDSAT/LT05/C02/T1_L2")
    .filterBounds(geometry)
    .filterDate('2010-06-01', '2010-06-30')
    .select(['SR_B1','SR_B2','SR_B3','SR_B4','SR_B5','SR_B7'],['blue','green','red','nir','swir1','swir2'])
    .map(scaleC2).mean();
// print (June,'June')
// Function to calculate and add an NDVI band
var June_NDVI = function(image) {
return image.addBands(image.normalizedDifference(['nir', 'red']).rename('NDVI_June'))
};
var June_EVI = function(image){
  return image.addBands(image.expression(
  '2.5 * ((nir-red) / (nir + 6 * red - 7.5* blue +1))',
  {
    nir: image.select('nir'),
    red: image.select('red'),
    blue: image.select('blue')}).rename('EVI_June')
    .copyProperties(image,['system:time_start','system:time_end']))
}
// Add NDVI band to image collection
var June = June_NDVI(June);
var June = June_EVI(June);
// print(June)
var June_ndvi = June.select('NDVI_June')
var June_evi = June.select('EVI_June');
// print(June_ndvi)
/*****July*****/
var July = ee.ImageCollection("LANDSAT/LT05/C02/T1_L2")
    .filterBounds(geometry)
    .filterDate('2010-07-01', '2010-07-30')
    .select(['SR_B1','SR_B2','SR_B3','SR_B4','SR_B5','SR_B7'],['blue','green','red','nir','swir1','swir2'])
    .map(scaleC2).mean();
// print (July,'July')
// Function to calculate and add an NDVI band
var July_NDVI = function(image) {
return image.addBands(image.normalizedDifference(['nir', 'red']).rename('NDVI_July'));
};
var July_EVI = function(image){
  return image.addBands(image.expression(
  '2.5 * ((nir-red) / (nir + 6 * red - 7.5* blue +1))',
  {
    nir: image.select('nir'),
    red: image.select('red'),
    blue: image.select('blue')}).rename('EVI_July')
    .copyProperties(image,['system:time_start','system:time_end']))
}
// Add NDVI band to image collection
var July = July_NDVI(July);
var July = July_EVI(July);
// print(July)
var July_ndvi = July.select('NDVI_July')
var July_evi = July.select('EVI_July');
// print(July_ndvi)
/*****August*****/
var August = ee.ImageCollection("LANDSAT/LT05/C02/T1_L2")
    .filterBounds(geometry)
    .filterDate('2010-08-01', '2010-08-30')
    .select(['SR_B1','SR_B2','SR_B3','SR_B4','SR_B5','SR_B7'],['blue','green','red','nir','swir1','swir2'])
    .map(scaleC2).mean();
// print (August,'August')
// Function to calculate and add an NDVI band
var August_NDVI = function(image) {
return image.addBands(image.normalizedDifference(['nir', 'red']).rename('NDVI_August'));
};
var August_EVI = function(image){
  return image.addBands(image.expression(
  '2.5 * ((nir-red) / (nir + 6 * red - 7.5* blue +1))',
  {
    nir: image.select('nir'),
    red: image.select('red'),
    blue: image.select('blue')}).rename('EVI_August')
    .copyProperties(image,['system:time_start','system:time_end']))
}
// Add NDVI band to image collection
var August = August_NDVI(August);
var August = August_EVI(August);
// print(August)
var August_ndvi = August.select('NDVI_August')
var August_evi = August.select('EVI_August');
// print(August_ndvi)
/*****September*****/
var September = ee.ImageCollection("LANDSAT/LT05/C02/T1_L2")
    .filterBounds(geometry)
    .filterDate('2010-09-01', '2010-09-30')
    // .map(maskClouds)
    .select(['SR_B1','SR_B2','SR_B3','SR_B4','SR_B5','SR_B7'],['blue','green','red','nir','swir1','swir2'])
    .map(scaleC2).mean();
// print (September,'September')
// Function to calculate and add an NDVI band
var September_NDVI = function(image) {
return image.addBands(image.normalizedDifference(['nir', 'red']).rename('NDVI_September')
/*.copyProperties(image,['system:time_start','system:time_end'])*/);
};
var September_EVI = function(image){
  return image.addBands(image.expression(
  '2.5 * ((nir-red) / (nir + 6 * red - 7.5* blue +1))',
  {
    nir: image.select('nir'),
    red: image.select('red'),
    blue: image.select('blue')}).rename('EVI_September')
    .copyProperties(image,['system:time_start','system:time_end']))
}
// Add NDVI band to image collection
var September = September_NDVI(September);
var September = September_EVI(September);
// print(September)
var September_ndvi = September.select('NDVI_September')
var September_evi = September.select('EVI_September');
// print(September_ndvi)
/*****October*****/
var October = ee.ImageCollection("LANDSAT/LT05/C02/T1_L2")
    .filterBounds(geometry)
    .filterDate('2010-10-01', '2010-10-30')

    .select(['SR_B1','SR_B2','SR_B3','SR_B4','SR_B5','SR_B7'],['blue','green','red','nir','swir1','swir2'])
    .map(scaleC2).mean();
// print (October,'October')
// Function to calculate and add an NDVI band
var October_NDVI = function(image) {
return image.addBands(image.normalizedDifference(['nir', 'red']).rename('NDVI_October')
/*.copyProperties(image,['system:time_start','system:time_end'])*/);
};
var October_EVI = function(image){
  return image.addBands(image.expression(
  '2.5 * ((nir-red) / (nir + 6 * red - 7.5* blue +1))',
  {
    nir: image.select('nir'),
    red: image.select('red'),
    blue: image.select('blue')}).rename('EVI_October')
    .copyProperties(image,['system:time_start','system:time_end']))
}
// Add NDVI band to image collection
var October = October_NDVI(October);
var October = October_EVI(October);
// print(October)
var October_ndvi = October.select('NDVI_October')
var October_evi = October.select('EVI_October');
// print(October_ndvi)

/*****November*****/
var November = ee.ImageCollection("LANDSAT/LT05/C02/T1_L2")
    .filterBounds(geometry)
    .filterDate('2010-11-01', '2010-11-30')
    // .map(maskClouds)
    .select(['SR_B1','SR_B2','SR_B3','SR_B4','SR_B5','SR_B7'],['blue','green','red','nir','swir1','swir2'])
    .map(scaleC2).mean();
// print (November,'November')
// Function to calculate and add an NDVI band
var November_NDVI = function(image) {
return image.addBands(image.normalizedDifference(['nir', 'red']).rename('NDVI_November')
/*.copyProperties(image,['system:time_start','system:time_end'])*/);
};
var November_EVI = function(image){
  return image.addBands(image.expression(
  '2.5 * ((nir-red) / (nir + 6 * red - 7.5* blue +1))',
  {
    nir: image.select('nir'),
    red: image.select('red'),
    blue: image.select('blue')}).rename('EVI_November')
    .copyProperties(image,['system:time_start','system:time_end']))
}
// Add NDVI band to image collection
var November = November_NDVI(November);
var November = November_EVI(November);
// print(November)
var November_ndvi = November.select('NDVI_November')
var November_evi = November.select('EVI_November');
// print(November_ndvi)
/*****December*****/
var December = ee.ImageCollection("LANDSAT/LT05/C02/T1_L2")
    .filterBounds(geometry)
    .filterDate('2010-12-01', '2010-12-30')
    // .map(maskClouds)
    .select(['SR_B1','SR_B2','SR_B3','SR_B4','SR_B5','SR_B7'],['blue','green','red','nir','swir1','swir2'])
    .map(scaleC2).median();
// print (December,'December')
// Function to calculate and add an NDVI band
var December_NDVI = function(image) {
return image.addBands(image.normalizedDifference(['nir', 'red']).rename('NDVI_December')
/*.copyProperties(image,['system:time_start','system:time_end'])*/);
};
var December_EVI = function(image){
  return image.addBands(image.expression(
  '2.5 * ((nir-red) / (nir + 6 * red - 7.5* blue +1))',
  {
    nir: image.select('nir'),
    red: image.select('red'),
    blue: image.select('blue')}).rename('EVI_December')
    .copyProperties(image,['system:time_start','system:time_end']))
}
// Add NDVI band to image collection
var December = December_NDVI(December);
var December = December_EVI(December);
// print(December)
var December_ndvi = December.select('NDVI_December')
var December_evi = December.select('EVI_December');
// print(December_ndvi)
/*****January*****/
var January = ee.ImageCollection("LANDSAT/LT05/C02/T1_L2")
    .filterBounds(geometry)
    .filterDate('2011-01-01', '2011-01-30')
    // .map(maskClouds)
    .select(['SR_B1','SR_B2','SR_B3','SR_B4','SR_B5','SR_B7'],['blue','green','red','nir','swir1','swir2'])
    .map(scaleC2).mean();
// print (January,'January')
// Function to calculate and add an NDVI band
var January_NDVI = function(image) {
return image.addBands(image.normalizedDifference(['nir', 'red']).rename('NDVI_January')
/*.copyProperties(image,['system:time_start','system:time_end'])*/);
};
var January_EVI = function(image){
  return image.addBands(image.expression(
  '2.5 * ((nir-red) / (nir + 6 * red - 7.5* blue +1))',
  {
    nir: image.select('nir'),
    red: image.select('red'),
    blue: image.select('blue')}).rename('EVI_January')
    .copyProperties(image,['system:time_start','system:time_end']))
}
// Add NDVI band to image collection
var January = January_NDVI(January);
var January = January_EVI(January);
// print(January)
var January_ndvi = January.select('NDVI_January')
var January_evi = January.select('EVI_January');
// print(January_ndvi)
/*****February*****/
var February = ee.ImageCollection("LANDSAT/LT05/C02/T1_L2")
    .filterBounds(geometry)
    .filterDate('2011-02-01', '2011-02-28')
    // .map(maskClouds)
    .select(['SR_B1','SR_B2','SR_B3','SR_B4','SR_B5','SR_B7'],['blue','green','red','nir','swir1','swir2'])
    .map(scaleC2).mean();
// print (February,'February')
// Function to calculate and add an NDVI band
var February_NDVI = function(image) {
return image.addBands(image.normalizedDifference(['nir', 'red']).rename('NDVI_February')
/*.copyProperties(image,['system:time_start','system:time_end'])*/);
};
var February_EVI = function(image){
  return image.addBands(image.expression(
  '2.5 * ((nir-red) / (nir + 6 * red - 7.5* blue +1))',
  {
    nir: image.select('nir'),
    red: image.select('red'),
    blue: image.select('blue')}).rename('EVI_February')
    .copyProperties(image,['system:time_start','system:time_end']))
}
// Add NDVI band to image collection
var February = February_NDVI(February);
var February = February_EVI(February);
// print(February)
var February_ndvi = February.select('NDVI_February')
var February_evi = February.select('EVI_February');
// print(February_ndvi)
/*****March*****/
var March = ee.ImageCollection("LANDSAT/LT05/C02/T1_L2")
    .filterBounds(geometry)
    .filterDate('2011-03-01', '2011-03-30')
    //* .map(maskClouds)*//
    .select(['SR_B1','SR_B2','SR_B3','SR_B4','SR_B5','SR_B7'],['blue','green','red','nir','swir1','swir2'])
    .map(scaleC2).mean();
// print (March,'March')
// Function to calculate and add an NDVI band
var March_NDVI = function(image) {
return image.addBands(image.normalizedDifference(['nir', 'red']).rename('NDVI_March')
/*.copyProperties(image,['system:time_start','system:time_end'])*/);
};
var March_EVI = function(image){
  return image.addBands(image.expression(
  '2.5 * ((nir-red) / (nir + 6 * red - 7.5* blue +1))',
  {
    nir: image.select('nir'),
    red: image.select('red'),
    blue: image.select('blue')}).rename('EVI_March')
    .copyProperties(image,['system:time_start','system:time_end']))
}
// Add NDVI band to image collection
var March = March_NDVI(March);
var March = March_EVI(March);
print(March)

var March_ndvi = March.select('NDVI_March')
var March_evi = March.select('EVI_March');
// print(March_ndvi)

var mean = mean.addBands(april_ndvi)
              // .addBands(May_ndvi)
              // .addBands(June_ndvi)
              // .addBands(July_ndvi)
              // .addBands(August_ndvi)
              // .addBands(September_ndvi)
              // .addBands(October_ndvi)
              // .addBands(November_ndvi)
              // .addBands(December_ndvi)
              // .addBands(January_ndvi)
              .addBands(February_ndvi)
              // .addBands(March_ndvi)
 
var mean = mean.addBands(April_evi)
              // .addBands(May_evi)
              // .addBands(June_evi)
              // .addBands(July_evi)
              // .addBands(August_evi)
              // .addBands(September_evi)
              // .addBands(October_evi)
              // .addBands(November_evi)
              // .addBands(December_evi)
              // .addBands(January_evi)
              .addBands(February_evi)
              .addBands(March_evi)
print(mean)
var min =  mean.reduceRegion(ee.Reducer.min(), geometry,250);
var max = mean.reduceRegion(ee.Reducer.max(), geometry,250);
print('min',min)
print('max',max)
Map.addLayer(mean, {bands: ['nir', 'red', 'green'], min: 0, max: 1, gamma:1.5}, 'TCC');
var bandNames = mean.bandNames();
print(bandNames,'BandNames')
var sample = classNames; 
var sample = sample.randomColumn();
print(sample,'Sample')
var traininggcp = sample.filter(ee.Filter.lt('random', 0.60))// //70% training and 30% validation
var validation = sample.filter(ee.Filter.gte('random', 0.60));
print(traininggcp,'Training')
print(validation,'Validation')
var training = mean.select(bandNames).sampleRegions({
  collection: traininggcp,
  properties: ['ORIG_FID'],
  scale: 20
});
var classifier = ee.Classifier.smileRandomForest(300,5).train({ //ee.Classifier.decisionTree(treeString)
  features: training,
  classProperty: 'ORIG_FID',
  inputProperties: bandNames
});
//Run the classification
var classified = mean.select(bandNames).classify(classifier);
Map.centerObject(classNames, 10);
Map.addLayer(classified,
{min: 0, max: 5,palette: ['0cffff','27a910','81937e','d61717','f1fb5b','0cff08','cf1ad2'/*,'1EEAF9','#d7ffd2'*/]},
'classification');

var kernel = ee.Kernel.manhattan(1)
var postclassify = classified.reduceNeighborhood({
  reducer:ee.Reducer.mode(),
  kernel:kernel
})
Map.addLayer(postclassify,
{min: 0, max: 5,palette: ['0cffff','27a910','81937e','d61717','f1fb5b','0cff08','cf1ad2'/*,'1EEAF9','#d7ffd2'*/]},
'Post-classification');
var test = classified.sampleRegions({
  collection: validation,
  properties: ['ORIG_FID'],
    scale:20 ,
});

var testConfusionMatrix = test.errorMatrix('ORIG_FID', 'classification')
print('Confusion Matrix', testConfusionMatrix);
print('Test Accuracy', testConfusionMatrix.accuracy());
// Map.addLayer(studyarea)
// Map.addLayer(table)
var fc = ee.FeatureCollection([
  ee.Feature(null, {
    'accuracy': testConfusionMatrix.accuracy(),
    'matrix': testConfusionMatrix.array()
  })
  ])
print(fc)  
Export.table.toDrive({
  collection: fc,
  description: 'Accuracy_Export2010',
  folder: 'Change_Interpretation',
  fileNamePrefix: 'accuracy2010_n',
  fileFormat: 'CSV'
})
Export.image.toDrive({
  image: postclassify,
  description: 'Landsat_2010_n',
  folder: 'Change_Interpretation',
  scale: 30,
  maxPixels: 1e9,
  region: dhn
});