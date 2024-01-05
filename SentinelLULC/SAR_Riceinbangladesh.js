//* Please input 'landcover' properties as 1 for the LULC class that to be classifed while reamining class as 0. 
//Also run only one paddy rice classe at once, remaining should be commented.


// Districts BGD
var BGD = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017")
              .filterMetadata('country_co', 'equals', 'BG'); // BGD districts union
var NE = ee.FeatureCollection('ft:1lKojAWblSUBtBPQU84E_1whe2FTo-bAprPjgTOLD', 'geometry'); 
var SA = BGD.merge(NE).union(); // study area NE+BGD

//Function to convert from dB
function toNatural(img) {
return ee.Image(10.0).pow(img.select(0).divide(10.0));
}

//Function to convert to dB
function toDB(img) {
return ee.Image(img).log10().multiply(10.0);
}

//Apllying a Refined Lee Speckle filter as coded in the SNAP 3.0 S1TBX:
//https://github.com/senbox-org/s1tbx/blob/master/s1tbx-op-sar-processing/src/main/java/org/esa/s1tbx/sar/gpf/filtering/SpeckleFilters/RefinedLee.java
function RefinedLee(img) {
  // img must be in natural units, i.e. not in dB!
  // Set up 3x3 kernels
   
  // convert to natural.. do not apply function on dB!
  var myimg = toNatural(img);
   
  var weights3 = ee.List.repeat(ee.List.repeat(1,3),3);
  var kernel3 = ee.Kernel.fixed(3,3, weights3, 1, 1, false);
   
  var mean3 = myimg.reduceNeighborhood(ee.Reducer.mean(), kernel3);
  var variance3 = myimg.reduceNeighborhood(ee.Reducer.variance(), kernel3);
   
  // Use a sample of the 3x3 windows inside a 7x7 windows to determine gradients and directions
  var sample_weights = ee.List([[0,0,0,0,0,0,0], [0,1,0,1,0,1,0],[0,0,0,0,0,0,0], [0,1,0,1,0,1,0], [0,0,0,0,0,0,0], [0,1,0,1,0,1,0],[0,0,0,0,0,0,0]]);
   
  var sample_kernel = ee.Kernel.fixed(7,7, sample_weights, 3,3, false);
   
  // Calculate mean and variance for the sampled windows and store as 9 bands
  var sample_mean = mean3.neighborhoodToBands(sample_kernel);
  var sample_var = variance3.neighborhoodToBands(sample_kernel);
   
  // Determine the 4 gradients for the sampled windows
  var gradients = sample_mean.select(1).subtract(sample_mean.select(7)).abs();
  gradients = gradients.addBands(sample_mean.select(6).subtract(sample_mean.select(2)).abs());
  gradients = gradients.addBands(sample_mean.select(3).subtract(sample_mean.select(5)).abs());
  gradients = gradients.addBands(sample_mean.select(0).subtract(sample_mean.select(8)).abs());
   
  // And find the maximum gradient amongst gradient bands
  var max_gradient = gradients.reduce(ee.Reducer.max());
   
  // Create a mask for band pixels that are the maximum gradient
  var gradmask = gradients.eq(max_gradient);
   
  // duplicate gradmask bands: each gradient represents 2 directions
  gradmask = gradmask.addBands(gradmask);
   
  // Determine the 8 directions
  var directions = sample_mean.select(1).subtract(sample_mean.select(4)).gt(sample_mean.select(4).subtract(sample_mean.select(7))).multiply(1);
  directions = directions.addBands(sample_mean.select(6).subtract(sample_mean.select(4)).gt(sample_mean.select(4).subtract(sample_mean.select(2))).multiply(2));
  directions = directions.addBands(sample_mean.select(3).subtract(sample_mean.select(4)).gt(sample_mean.select(4).subtract(sample_mean.select(5))).multiply(3));
  directions = directions.addBands(sample_mean.select(0).subtract(sample_mean.select(4)).gt(sample_mean.select(4).subtract(sample_mean.select(8))).multiply(4));
  // The next 4 are the not() of the previous 4
  directions = directions.addBands(directions.select(0).not().multiply(5));
  directions = directions.addBands(directions.select(1).not().multiply(6));
  directions = directions.addBands(directions.select(2).not().multiply(7));
  directions = directions.addBands(directions.select(3).not().multiply(8));
   
  // Mask all values that are not 1-8
  directions = directions.updateMask(gradmask);
   
  // "collapse" the stack into a singe band image (due to masking, each pixel has just one value (1-8) in it's directional band, and is otherwise masked)
  directions = directions.reduce(ee.Reducer.sum());
   
  var sample_stats = sample_var.divide(sample_mean.multiply(sample_mean));
   
  // Calculate localNoiseVariance
  var sigmaV = sample_stats.toArray().arraySort().arraySlice(0,0,5).arrayReduce(ee.Reducer.mean(), [0]);
   
  // Set up the 7*7 kernels for directional statistics
  var rect_weights = ee.List.repeat(ee.List.repeat(0,7),3).cat(ee.List.repeat(ee.List.repeat(1,7),4));
   
  var diag_weights = ee.List([[1,0,0,0,0,0,0], [1,1,0,0,0,0,0], [1,1,1,0,0,0,0],
  [1,1,1,1,0,0,0], [1,1,1,1,1,0,0], [1,1,1,1,1,1,0], [1,1,1,1,1,1,1]]);
   
  var rect_kernel = ee.Kernel.fixed(7,7, rect_weights, 3, 3, false);
  var diag_kernel = ee.Kernel.fixed(7,7, diag_weights, 3, 3, false);
   
  // Create stacks for mean and variance using the original kernels. Mask with relevant direction.
  var dir_mean = myimg.reduceNeighborhood(ee.Reducer.mean(), rect_kernel).updateMask(directions.eq(1));
  var dir_var = myimg.reduceNeighborhood(ee.Reducer.variance(), rect_kernel).updateMask(directions.eq(1));
   
  dir_mean = dir_mean.addBands(myimg.reduceNeighborhood(ee.Reducer.mean(), diag_kernel).updateMask(directions.eq(2)));
  dir_var = dir_var.addBands(myimg.reduceNeighborhood(ee.Reducer.variance(), diag_kernel).updateMask(directions.eq(2)));
   
  // and add the bands for rotated kernels
  for (var i=1; i<4; i++) {
  dir_mean = dir_mean.addBands(myimg.reduceNeighborhood(ee.Reducer.mean(), rect_kernel.rotate(i)).updateMask(directions.eq(2*i+1)));
  dir_var = dir_var.addBands(myimg.reduceNeighborhood(ee.Reducer.variance(), rect_kernel.rotate(i)).updateMask(directions.eq(2*i+1)));
  dir_mean = dir_mean.addBands(myimg.reduceNeighborhood(ee.Reducer.mean(), diag_kernel.rotate(i)).updateMask(directions.eq(2*i+2)));
  dir_var = dir_var.addBands(myimg.reduceNeighborhood(ee.Reducer.variance(), diag_kernel.rotate(i)).updateMask(directions.eq(2*i+2)));
  }
   
  // "collapse" the stack into a single band image (due to masking, each pixel has just one value in it's directional band, and is otherwise masked)
  dir_mean = dir_mean.reduce(ee.Reducer.sum());
  dir_var = dir_var.reduce(ee.Reducer.sum());
   
  // A finally generate the filtered value
  var varX = dir_var.subtract(dir_mean.multiply(dir_mean).multiply(sigmaV)).divide(sigmaV.add(1.0));
   
  var b = varX.divide(dir_var);
   
  var result = dir_mean.add(b.multiply(myimg.subtract(dir_mean)));
  //return(result);
  return(img.select([]).addBands(ee.Image(toDB(result.arrayGet(0))).rename("VH")));
}

var bufferPoly = function(feature) {
  return feature.buffer(20);   // substitute in your value of Z here
}; 
//////////////////***********Main*****************//////////////////
var col = ee.ImageCollection('COPERNICUS/S1_GRD')
            .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
            .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
            .filter(ee.Filter.eq('instrumentMode', 'IW'))
            //.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
            .filterBounds(SA)
            .filterDate('2016-12-01','2017-12-31')
            .select(['VH'])
            .map(RefinedLee)

//   create monthly time series
var monList = ee.List.sequence(1,12,1).aside(print,'month')
function monthlyComposite(month) {
  var year = 2017
  var start = ee.Date.fromYMD(year,month,1)
  var end = start.advance(1,"month")
  var S1 = col.filterDate(start,end).max()
  return S1
}
var s1Collection = ee.ImageCollection(monList.map(monthlyComposite)).aside(print,'S1 collection')
var compositedImage = ee.Image(s1Collection.toList(12).get(0))//Collection
for (var i=1;i<12;i++) {
  var compositedImage = compositedImage.addBands(ee.Image(s1Collection.toList(12).get(i)).select([0]))
}
print(compositedImage)

var compositeBoro = compositedImage.select([0,1,2,3])//.clip(BGD);// Boro rice(Jan-April)
var compositeAus = compositedImage.select([4,5,6])//.clip(SA);// Aus rice(May-July)
var compositeAman = compositedImage.select([7,8,9,10,11])//.clip(SA);// Aman rice (Aug-Dec)
var compositeBoro_NE = compositedImage.select([0,1,2,3])//.clip(NE);// NE Boro rice(Jan-April)

//merge, buffer features and pickup random samples for training & validation
var fcBoro = waterBoro.merge(vegetation).merge(Builtup).merge(paddyBoro);
var fcAus = waterBoro.merge(vegetation).merge(Builtup).merge(paddyAus);
var fcAman = waterBoro.merge(vegetation).merge(Builtup).merge(paddyAman);
var fcBoroNE = waterBoro.merge(Builtup).merge(builtupBoro).merge(paddyBoroNE); //BoroNE

var buffered_fcBoro = fcBoro.map(bufferPoly);
var buffered_fcAus = fcAus.map(bufferPoly);
var buffered_fcAman = fcAman.map(bufferPoly);
var buffered_fcBoroNE = fcBoroNE.map(bufferPoly);

//Assign random numbers for a test/train split
var fcBoro = buffered_fcBoro.randomColumn('random',2015);
var fcAus = buffered_fcAus.randomColumn('random',2015);
var fcAman = buffered_fcAman.randomColumn('random',2015);
var fcBoroNE = buffered_fcBoroNE.randomColumn('random',2015);
print(fcBoro)
//create training data 
//Join training samples with bands
var bandsBoro = ['VH','VH_1','VH_2','VH_3'];//Boro season
var bandsAus = ['VH_4','VH_5','VH_6'];//Aus season 
var bandsAman = ['VH_7','VH_8','VH_9','VH_10','VH_11'];//Aman season  
var bandsBoroNE = ['VH','VH_1','VH_2','VH_3'];//NE Boro season

var trainingBoro = compositeBoro.select(bandsBoro).sampleRegions({
    collection :fcBoro,
    properties: ['landcover','random'],
    scale: 10
});
var trainingAus = compositeAus.select(bandsAus).sampleRegions({
    collection :fcAus,
    properties: ['landcover','random'],
    scale: 10
});
var trainingAman = compositeAman.select(bandsAman).sampleRegions({
    collection :fcAman,
    properties: ['landcover','random'],
    scale: 10
});
var trainingBoroNE = compositeBoro_NE.select(bandsBoroNE).sampleRegions({
    collection :fcBoroNE,
    properties: ['landcover','random'],
    scale: 10
});

print(trainingAman);
// // // // //split the training and testing ROI into a 30/70 percent
var trainingAccuracyBoro = trainingBoro.filterMetadata('random','less_than', 0.7);
var trainingAccuracyAus = trainingAus.filterMetadata('random','less_than', 0.7);
var trainingAccuracyAman = trainingAman.filterMetadata('random','less_than', 0.7);
var trainingAccuracyBoroNE = trainingBoroNE.filterMetadata('random','less_than', 0.7);

var testingAccuracyBoro = trainingBoro.filterMetadata('random','not_less_than', 0.7);
var testingAccuracyAus = trainingAus.filterMetadata('random','not_less_than', 0.7);
var testingAccuracyAman = trainingAman.filterMetadata('random','not_less_than', 0.7);
var testingAccuracyBoroNE = trainingBoroNE.filterMetadata('random','not_less_than', 0.7);

// Train the classifier
var trainingClassifierBoro = ee.Classifier.randomForest().train({
  features:trainingAccuracyBoro,
  classProperty: 'landcover',
  inputProperties: bandsBoro
});
var trainingClassifierAus = ee.Classifier.randomForest().train({
  features:trainingAccuracyAus,
  classProperty: 'landcover',
  inputProperties: bandsAus
});
var trainingClassifierAman = ee.Classifier.randomForest().train({
  features:trainingAccuracyAman,
  classProperty: 'landcover',
  inputProperties: bandsAman
});
var trainingClassifierBoroNE = ee.Classifier.randomForest().train({
  features:trainingAccuracyBoroNE,
  classProperty: 'landcover',
  inputProperties: bandsBoroNE
});

// Classify rice and others on the composited images
var classifiedBoro = compositeBoro.select(bandsBoro).classify(trainingClassifierBoro);
var classifiedAus = compositeAus.select(bandsAus).classify(trainingClassifierAus);
var classifiedAman = compositeAman.select(bandsAman).classify(trainingClassifierAman);
var classifiedBoroNE = compositeBoro_NE.select(bandsBoroNE).classify(trainingClassifierBoroNE);

//accuracy assessment
var validationBoro = testingAccuracyBoro.classify(trainingClassifierBoro);
var validationAus = testingAccuracyAus.classify(trainingClassifierAus);
var validationAman = testingAccuracyAman.classify(trainingClassifierAman);
var validationBoroNE = testingAccuracyBoroNE.classify(trainingClassifierBoroNE);

var errorMatrixBoro = validationBoro.errorMatrix('landcover','classification');
var errorMatrixAus = validationAus.errorMatrix('landcover','classification');
var errorMatrixAman = validationAman.errorMatrix('landcover','classification');
var errorMatrixBoroNE = validationBoroNE.errorMatrix('landcover','classification');
print(errorMatrixAus)
Map.setCenter(90.99,24.78);
Map.addLayer(classifiedBoroNE,
{min :0, max: 4, palette: ['230CE1','2FE10C','DE0CE1','E1290C']},
'classificationAus');

//export accuracy to Google Drive
var geo = ee.Geometry.Rectangle([87.13379882812501,29.657743636176832,98.30689453125001,19.8475837332181])
Map.addLayer(geo, {}, 'geo'); 

 Export.image.toDrive({
        crs: 'EPSG:4326',
        image: classifiedBoroNE.clip(geo).multiply(100).uint8(),
        description: "Boro_R1_SA_NE",
        scale: 10,
        region: geo,
        maxPixels:10000000000000
        })
        