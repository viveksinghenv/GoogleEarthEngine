/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var farms = ee.FeatureCollection("projects/landsat-325606/assets/LULC_Dhanbad_2020"),
    geometry = 
    /* color: #d63000 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[85.33426794521422, 24.457874383506955],
          [85.33426794521422, 23.679214192957662],
          [86.50019201747985, 23.679214192957662],
          [86.50019201747985, 24.457874383506955]]], null, false),
    studyarea = ee.FeatureCollection("projects/landsat-325606/assets/Study_Area_phd"),
    table = ee.FeatureCollection("projects/landsat-325606/assets/DMC_Buffer_Shp"),
    farms1 = ee.FeatureCollection("projects/landsat-325606/assets/Rev_LULC_pts2022");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var farms = ee.FeatureCollection(farms1).select('ORIG_FID')
var classNames = ee.FeatureCollection(farms1)
var gaul = ee.FeatureCollection("FAO/GAUL/2015/level2")
var vizParams = {
  bands: ['nir', 'green', 'blue'],
  min: 0,
  max: 0.5,
  gamma: [0.95, 1.1, 1]
};
Map.addLayer(farms)

// print(farms)
//function to unpack QA bits - don't modify
/*
* A function that returns an image containing just the specified QA bits.
*
* Args:
*   image - The QA Image to get bits from.
*   start - The first bit position, 0-based.
*   end   - The last bit position, inclusive.
*   name  - A name for the output image.
*/

// var geometry = gaul.filter(ee.Filter.eq('ADM2_NAME','Dhanbad'));
// Map.centerObject(geometry);Map.addLayer(geometry)
// var getQABits = function(image, start, end, newName) {
//     // Compute the bits we need to extract.
//     var pattern = 0;
//     for (var i = start; i <= end; i++) {
//       pattern += Math.pow(2, i);
//     }
//     // Return a single band image of the extracted QA bits, giving the band
//     // a new name.
//     return image.select([0], [newName])
//                   .bitwiseAnd(pattern)
//                   .rightShift(start);
// };

// // function to remove clouds and cloud shadows - don't modify
// var maskClouds = function(image) {
//   var pixelQA = image.select('QA_PIXEL');
//   var cloud = getQABits(pixelQA, 3, 3, 'cloud');
//   var cldShadow = getQABits(pixelQA, 4, 4, 'cloud_shadow');
//   return image.updateMask(cloud.eq(0)).updateMask(cldShadow.eq(0))
//     .copyProperties(image)
//     .set('system:time_start',image.get('system:time_start'));
// }
// function to add NDVI band

// function to scale Landsat Collection 2 data
// function scaleC2(image){
//   var blue = image.select('blue').multiply(0.0000275).add(-0.2).rename('blue');
//   var green = image.select('green').multiply(0.0000275).add(-0.2).rename('green');
//   var red = image.select('red').multiply(0.0000275).add(-0.2).rename('red');
//   var nir = image.select('nir').multiply(0.0000275).add(-0.2).rename('nir');
//   var swir1 = image.select('swir1').multiply(0.0000275).add(-0.2).rename('swir1');
//   var swir2 = image.select('swir2').multiply(0.0000275).add(-0.2).rename('swir2');
//   return blue.updateMask(blue.gt(0).or(blue.lt(1)))
//     .addBands(green.updateMask(green.gte(0).or(green.lte(1))))
//     .addBands(red.updateMask(red.gte(0).or(red.lte(1))))
//     .addBands(nir.updateMask(nir.gte(0).or(nir.lte(1))))
//     .addBands(swir1.updateMask(swir1.gte(0).or(swir1.lte(1))))
//     .addBands(swir2.updateMask(swir2.gte(0).or(swir2.lte(1))))
//     .copyProperties(image)
//       .set('system:time_start',image.get('system:time_start'))
//       .set('system:time_end',image.get('system:time_end'));
// }
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
      .set('system:time_start',image.get('system:time_start'))
      .set('system:time_end',image.get('system:time_end'));
}
// Landsat 8
/* Mean Image of Landsat 8 */
var mean = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
    .filterBounds(geometry)
    .filterDate('2019-09-01', '2019-12-30')
    /* .map(maskClouds)*/.filter(ee.Filter.lt("CLOUD_COVER", 2))
    .select(['SR_B2','SR_B3','SR_B4','SR_B5','SR_B6','SR_B7'],['blue','green','red','nir','swir1','swir2'])
    .map(scaleC2).median();
// Map.addLayer(mean, {bands: ['nir', 'red', 'green'], min: 0, max: 1, gamma:1.5}, 'TCC');
  
/*****NDBI*****/
var addNDBI = function(image) {
return image.addBands(image.normalizedDifference(['swir2', 'nir']).rename('NDBI')
/*.copyProperties(image,['system:time_start','system:time_end'])*/);
};
var mean = addNDBI(mean);
// print(mean,'NDBI')
/*****NDWI*****/
var addNDWI = function(image) {
return image.addBands(image.normalizedDifference(['nir', 'swir2']).rename('NDWI')
/*.copyProperties(image,['system:time_start','system:time_end'])*/);
};
var mean = addNDWI(mean);
// print(mean,'NDWI')
/*April Image*/
var April = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
    .filterBounds(geometry)
    .filterDate('2019-04-01', '2019-04-30')
    // .map(maskClouds)
    .select(['SR_B2','SR_B3','SR_B4','SR_B5','SR_B6','SR_B7'],['blue','green','red','nir','swir1','swir2'])
    .map(scaleC2).median();
// print (April,'april')
// Function to calculate and add an NDVI band
var April_NDVI = function(image) {
return image.addBands(image.normalizedDifference(['nir', 'red']).rename('NDVI_April')
/*.copyProperties(image,['system:time_start','system:time_end'])*/);
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
// Map.addLayer(April_evi)
// print(april_ndvi)
/*****May*****/
var May = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
    .filterBounds(geometry)
    .filterDate('2019-05-01', '2019-05-30')
    // .map(maskClouds)
    .select(['SR_B2','SR_B3','SR_B4','SR_B5','SR_B6','SR_B7'],['blue','green','red','nir','swir1','swir2'])
    .map(scaleC2).median();
// print (May,'May')
// Function to calculate and add an NDVI band
var May_NDVI = function(image) {
return image.addBands(image.normalizedDifference(['nir', 'red']).rename('NDVI_May')
/*.copyProperties(image,['system:time_start','system:time_end'])*/);
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
var June = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
    .filterBounds(geometry)
    .filterDate('2019-06-01', '2019-06-30')
    // .map(maskClouds)
    .select(['SR_B2','SR_B3','SR_B4','SR_B5','SR_B6','SR_B7'],['blue','green','red','nir','swir1','swir2'])
    .map(scaleC2).median();
// print (June,'June')
// Function to calculate and add an NDVI band
var June_NDVI = function(image) {
return image.addBands(image.normalizedDifference(['nir', 'red']).rename('NDVI_June')
/*.copyProperties(image,['system:time_start','system:time_end'])*/);
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
var July = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
    .filterBounds(geometry)
    .filterDate('2019-07-01', '2019-07-30')
    // .map(maskClouds)
    .select(['SR_B2','SR_B3','SR_B4','SR_B5','SR_B6','SR_B7'],['blue','green','red','nir','swir1','swir2'])
    .map(scaleC2).median();
// print (July,'July')
// Function to calculate and add an NDVI band
var July_NDVI = function(image) {
return image.addBands(image.normalizedDifference(['nir', 'red']).rename('NDVI_July')
/*.copyProperties(image,['system:time_start','system:time_end'])*/);
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
var August = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
    .filterBounds(geometry)
    .filterDate('2019-08-01', '2019-08-30')
    // .map(maskClouds)
    .select(['SR_B2','SR_B3','SR_B4','SR_B5','SR_B6','SR_B7'],['blue','green','red','nir','swir1','swir2'])
    .map(scaleC2).median();
// print (August,'August')
// Function to calculate and add an NDVI band
var August_NDVI = function(image) {
return image.addBands(image.normalizedDifference(['nir', 'red']).rename('NDVI_August')
/*.copyProperties(image,['system:time_start','system:time_end'])*/);
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
var September = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
    .filterBounds(geometry)
    .filterDate('2019-09-01', '2019-09-30')
    // .map(maskClouds)
    .select(['SR_B2','SR_B3','SR_B4','SR_B5','SR_B6','SR_B7'],['blue','green','red','nir','swir1','swir2'])
    .map(scaleC2).median();
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
var October = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
    .filterBounds(geometry)
    .filterDate('2019-10-01', '2019-10-30')
    // .map(maskClouds)
    .select(['SR_B2','SR_B3','SR_B4','SR_B5','SR_B6','SR_B7'],['blue','green','red','nir','swir1','swir2'])
    .map(scaleC2).median();
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
var November = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
    .filterBounds(geometry)
    .filterDate('2019-11-01', '2019-11-30')
    // .map(maskClouds)
    .select(['SR_B2','SR_B3','SR_B4','SR_B5','SR_B6','SR_B7'],['blue','green','red','nir','swir1','swir2'])
    .map(scaleC2).median();
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
var December = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
    .filterBounds(geometry)
    .filterDate('2019-12-01', '2019-12-30')
    // .map(maskClouds)
    .select(['SR_B2','SR_B3','SR_B4','SR_B5','SR_B6','SR_B7'],['blue','green','red','nir','swir1','swir2'])
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
var January = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
    .filterBounds(geometry)
    .filterDate('2020-01-01', '2020-01-30')
    // .map(maskClouds)
    .select(['SR_B2','SR_B3','SR_B4','SR_B5','SR_B6','SR_B7'],['blue','green','red','nir','swir1','swir2'])
    .map(scaleC2).median();
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
var February = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
    .filterBounds(geometry)
    .filterDate('2020-02-01', '2020-02-28')
    // .map(maskClouds)
    .select(['SR_B2','SR_B3','SR_B4','SR_B5','SR_B6','SR_B7'],['blue','green','red','nir','swir1','swir2'])
    .map(scaleC2).median();
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
var March = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
    .filterBounds(geometry)
    .filterDate('2020-03-01', '2020-03-30')
    //* .map(maskClouds)*//
    .select(['SR_B2','SR_B3','SR_B4','SR_B5','SR_B6','SR_B7'],['blue','green','red','nir','swir1','swir2'])
    .map(scaleC2).median();
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

var mean = mean.addBands(april_ndvi).addBands(May_ndvi).addBands(June_ndvi).addBands(July_ndvi).addBands(August_ndvi)
                .addBands(September_ndvi).addBands(October_ndvi).addBands(November_ndvi).addBands(December_ndvi)
                .addBands(January_ndvi).addBands(February_ndvi).addBands(March_ndvi)
 
var mean = mean.addBands(April_evi).addBands(May_evi).addBands(June_evi)
              .addBands(July_evi).addBands(August_evi).addBands(September_evi)
              .addBands(October_evi).addBands(November_evi).addBands(December_evi)
              .addBands(January_evi).addBands(February_evi).addBands(March_evi)
print(mean)
Map.addLayer(mean, {bands: ['nir', 'red', 'green'], min: 0, max: 1, gamma:1.5}, 'TCC');
var bandNames = mean.bandNames();
print(bandNames,'BandNames')
var sample = classNames; 
var sample = sample.randomColumn();
print(sample,'Sample')
var traininggcp = sample.filter(ee.Filter.lt('random', 0.70))// //70% training and 30% validation
var validation = sample.filter(ee.Filter.gte('random', 0.70));
print(traininggcp,'Training')
print(validation,'Validation')
var training = mean.select(bandNames).sampleRegions({
  collection: traininggcp,
  properties: ['ORIG_FID'],
  scale: 20
});
var classifier = ee.Classifier.libsvm().train({ //ee.Classifier.decisionTree(treeString)
  features: training,
  classProperty: 'ORIG_FID',
  inputProperties: bandNames
});
//Run the classification
var classified = mean.select(bandNames).classify(classifier);
Map.centerObject(classNames, 10);
Map.addLayer(classified,
{min: 0, max: 8,palette: ['0cffff','27a910','81937e','d61717','f1fb5b','0cff08','cf1ad2','1EEAF9','#d7ffd2']},
'classification',0);


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