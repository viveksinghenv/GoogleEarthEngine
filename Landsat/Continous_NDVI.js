/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var gaul = ee.FeatureCollection("FAO/GAUL/2015/level2"),
    farms11 = ee.FeatureCollection("projects/landsat-325606/assets/allinone1"),
    farms = ee.FeatureCollection("users/viveksinghenv17dr000519/Allinoneshp"),
    vizPallete = {"min":0,"max":1,"palette":["white","green"]};
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var farms = ee.FeatureCollection(farms).select('Class_id')
var classNames = ee.FeatureCollection(farms11)
var vizParams = {
  bands: ['nir', 'green', 'blue'],
  min: 0,
  max: 0.5,
  gamma: [0.95, 1.1, 1]
};
// Map.addLayer(farms)
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

var geometry = gaul.filter(ee.Filter.eq('ADM2_NAME','Dhanbad'));

var getQABits = function(image, start, end, newName) {
    // Compute the bits we need to extract.
    var pattern = 0;
    for (var i = start; i <= end; i++) {
      pattern += Math.pow(2, i);
    }
    // Return a single band image of the extracted QA bits, giving the band
    // a new name.
    return image.select([0], [newName])
                  .bitwiseAnd(pattern)
                  .rightShift(start);
};

// function to remove clouds and cloud shadows - don't modify
var maskClouds = function(image) {
  var pixelQA = image.select('QA_PIXEL');
  var cloud = getQABits(pixelQA, 3, 3, 'cloud');
  var cldShadow = getQABits(pixelQA, 4, 4, 'cloud_shadow');
  return image.updateMask(cloud.eq(0)).updateMask(cldShadow.eq(0))
    .copyProperties(image)
    .set('system:time_start',image.get('system:time_start'));
}


// function to add NDVI band
function addNDVI(image){
  var ndvi = image.normalizedDifference(['nir','red']).rename('NDVI');
  return image.addBands(ndvi).copyProperties(image)
    .set('system:time_start',image.get('system:time_start'))
    .set('system:time_end',image.get('system:time_end'))
}


// function to scale Landsat Collection 2 data
function scaleC2(image){
  var blue = image.select('blue').multiply(0.0000275).add(-0.2).rename('blue');
  var green = image.select('green').multiply(0.0000275).add(-0.2).rename('green');
  var red = image.select('red').multiply(0.0000275).add(-0.2).rename('red');
  var nir = image.select('nir').multiply(0.0000275).add(-0.2).rename('nir');
  var swir1 = image.select('swir1').multiply(0.0000275).add(-0.2).rename('swir1');
  var swir2 = image.select('swir2').multiply(0.0000275).add(-0.2).rename('swir2');
  return blue.updateMask(blue.gt(0).or(blue.lt(1)))
    .addBands(green.updateMask(green.gte(0).or(green.lte(1))))
    .addBands(red.updateMask(red.gte(0).or(red.lte(1))))
    .addBands(nir.updateMask(nir.gte(0).or(nir.lte(1))))
    .addBands(swir1.updateMask(swir1.gte(0).or(swir1.lte(1))))
    .addBands(swir2.updateMask(swir2.gte(0).or(swir2.lte(1))))
    .copyProperties(image)
      .set('system:time_start',image.get('system:time_start'))
      .set('system:time_end',image.get('system:time_end'));
}

// Landsat 8
var S2 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
    .filterBounds(geometry)
    .filterDate('2015-04-01', '2016-3-30')
    .map(maskClouds)
    .select(['SR_B2','SR_B3','SR_B4','SR_B5','SR_B6','SR_B7'],['blue','green','red','nir','swir1','swir2'])
    .map(scaleC2)
// print (S2)
var meanimage = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
    .filterBounds(geometry)
    .filterDate('2015-04-01', '2016-3-30')
    .map(maskClouds)
    .select(['SR_B2','SR_B3','SR_B4','SR_B5','SR_B6','SR_B7'],['blue','green','red','nir','swir1','swir2'])
    .map(scaleC2).median();
Map.addLayer(S2,vizParams)
// // landsat 5
// var L5coll = ee.ImageCollection('LANDSAT/LT05/C02/T1_L2')
//     .filterBounds(geometry)
//     .filterDate('2015-04-01', '2016-3-30')
//     .map(maskClouds)
//     .select(['SR_B1','SR_B2','SR_B3','SR_B4','SR_B5','SR_B7'],['blue','green','red','nir','swir1','swir2'])
//     .map(scaleC2)

// Function to calculate and add an NDVI band
var addNDVI = function(image) {
return image.addBands(image.normalizedDifference(['nir', 'red']).rename('NDVI')
.copyProperties(image,['system:time_start','system:time_end']));
};
// Add NDVI band to image collection
var S2 = S2.map(addNDVI);
// print(S2)
// Extract NDVI band and create NDVI median composite image
var NDVI = S2.select(['NDVI']);
print(NDVI)
var addEVI = function(image){
  return image.addBands(image.expression(
  '2.5 * ((nir-red) / (nir + 6 * red - 7.5* blue +1))',
  {
    nir: image.select('nir'),
    red: image.select('red'),
    blue: image.select('blue')}).rename('EVI')
    .copyProperties(image,['system:time_start','system:time_end']))
}
var S2 = S2.map(addEVI);
// print(S2)

var scaledNDVI = S2.select('NDVI')
var image = ee.Image(scaledNDVI.mean())

// Map.addLayer(image, visParams, 'L8 NDVI')

var collec = ee.ImageCollection(meanimage/*.merge(scaledNDVI).merge(L5coll)*/)
    .sort('system:time_start',true)
    .map(addNDVI)
print(collec)

var triplets = scaledNDVI.map(function(image) {
  var withStats = image.reduceRegions({
  collection: farms,
  reducer: ee.Reducer.mean().setOutputs(['ndvi']),
  scale: 30
  }).map(function(feature) {
    return feature.set('imageId', image.id())
  })
  return withStats
}).flatten()
print(triplets.first())
var format = function(table, rowId, colId) {
  var rows = table.distinct(rowId); 
  var joined = ee.Join.saveAll('matches').apply({
    primary: rows, 
    secondary: table, 
    condition: ee.Filter.equals({
      leftField: rowId, 
      rightField: rowId
    })
  });
         
  return joined.map(function(row) {
      var values = ee.List(row.get('matches'))
        .map(function(feature) {
          feature = ee.Feature(feature);
          // var ndvi = ee.List([feature.get('ndvi'), -9999])
          //   .reduce(ee.Reducer.firstNonNull())
          return [feature.get(colId),feature.get('ndvi')]; /*ee.Number(ndvi).format('%.3f')];*/
        });
      return row.select([rowId]).set(ee.Dictionary(values.flatten()));
    });
};

var timeSeriesResults = format(triplets, 'farm_id', 'imageId');
print(timeSeriesResults)


Export.table.toDrive({
  collection: timeSeriesResults,
  description: 'NDVI_Series1',
  folder: 'earthengine',
  fileNamePrefix: 'ndvi_series1',
  fileFormat: 'CSV'})












