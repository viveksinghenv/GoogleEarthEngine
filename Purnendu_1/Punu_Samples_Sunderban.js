/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[88.63525059608513, 21.96673560626522],
          [88.61465123085075, 21.88583953310886],
          [88.6009183206945, 21.824659271172592],
          [88.59336522010857, 21.762301236851833],
          [88.59061863807732, 21.709999639084547],
          [88.60915806678825, 21.685755863145488],
          [88.64074376014763, 21.737428460325486],
          [88.66065647987419, 21.796095793592396],
          [88.67576268104607, 21.83243198863396],
          [88.6997952738195, 21.940748235709204],
          [88.71764805702263, 22.013974273557317],
          [88.64280369667107, 22.023522709927565]]]),
    table = ee.FeatureCollection("projects/landsat-325606/assets/Punu_Samples");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
/////////This code requires reducers on Bands///////////
var boundary = ee.FeatureCollection(table).select('SymbolID')
var composite = ee.ImageCollection('EO1/HYPERION')
                  .filter(ee.Filter.date('2001-09-01', '2017-09-20'))
                  .filterBounds(geometry).median();
var rgb = composite.select(['B050', 'B023', 'B015']);
var rgbVis = {
  min: 1000.0,
  max: 14000.0,
  gamma: 2.5,
};
Map.centerObject(geometry)
Map.addLayer(rgb/*.median()*/, rgbVis, 'RGB',0);
print(composite)
Map.addLayer(boundary,{color: 'red'},'Points',0)
var image2 =composite.select('B008')
Map.addLayer(image2,{},'image2')

function PCA(maskedImage){
  var image = maskedImage.unmask()
  var scale = 50;
  var region = geometry;
  var bandNames = image.bandNames();
  // Mean center the data to enable a faster covariance reducer
  // and an SD stretch of the principal components.
  var meanDict = image.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: region,
    scale: scale,
    maxPixels: 1e9,
    bestEffort: true,
    tileScale: 16
  });
  var means = ee.Image.constant(meanDict.values(bandNames));
  var centered = image.subtract(means);
  // This helper function returns a list of new band names.
  var getNewBandNames = function(prefix) {
    var seq = ee.List.sequence(1, bandNames.length());
    return seq.map(function(b) {
      return ee.String(prefix).cat(ee.Number(b).int());
    });
  };
  // This function accepts mean centered imagery, a scale and
  // a region in which to perform the analysis.  It returns the
  // Principal Components (PC) in the region as a new image.
  var getPrincipalComponents = function(centered, scale, region) {
    // Collapse the bands of the image into a 1D array per pixel.
    var arrays = centered.toArray();
    
    // Compute the covariance of the bands within the region.
    var covar = arrays.reduceRegion({
      reducer: ee.Reducer.centeredCovariance(),
      geometry: region,
      scale: scale,
      maxPixels: 1e9,
      bestEffort: true,
      tileScale: 16
    });

    // Get the 'array' covariance result and cast to an array.
    // This represents the band-to-band covariance within the region.
    var covarArray = ee.Array(covar.get('array'));

    // Perform an eigen analysis and slice apart the values and vectors.
    var eigens = covarArray.eigen();

    // This is a P-length vector of Eigenvalues.
    var eigenValues = eigens.slice(1, 0, 1);
    
    // Compute Percentage Variance of each component
    var eigenValuesList = eigenValues.toList().flatten()
    var total = eigenValuesList.reduce(ee.Reducer.sum())
    var percentageVariance = eigenValuesList.map(function(item) {
      return (ee.Number(item).divide(total)).multiply(100).format('%.2f')
    })
    // This will allow us to decide how many components capture
    // most of the variance in the input
    print('Percentage Variance of Each Component', percentageVariance)
    // This is a PxP matrix with eigenvectors in rows.
    var eigenVectors = eigens.slice(1, 1);
    // Convert the array image to 2D arrays for matrix computations.
    var arrayImage = arrays.toArray(1);

    // Left multiply the image array by the matrix of eigenvectors.
    var principalComponents = ee.Image(eigenVectors).matrixMultiply(arrayImage);

    // Turn the square roots of the Eigenvalues into a P-band image.
    var sdImage = ee.Image(eigenValues.sqrt())
      .arrayProject([0]).arrayFlatten([getNewBandNames('sd')]);

    // Turn the PCs into a P-band image, normalized by SD.
    return principalComponents
      // Throw out an an unneeded dimension, [[]] -> [].
      .arrayProject([0])
      // Make the one band array image a multi-band image, [] -> image.
      .arrayFlatten([getNewBandNames('pc')])
      // Normalize the PCs by their SDs.
      .divide(sdImage);
  };
  var pcImage = getPrincipalComponents(centered, scale, region);
  return pcImage.mask(maskedImage.mask());
}
var pca = PCA(composite).select(['pc1', 'pc2', 'pc3','pc4'/*,'pc5','pc6','pc7','pc8','pc9','pc10'*/])
Map.addLayer(PCA(composite),{},'pca')
var composite = composite.addBands(pca)
print(composite,'Composite')
var pca = composite
var bandNames = pca.bandNames();
print(bandNames,'BandNames')

// var training = pca.select(bandNames).sampleRegions({
//   collection: table,
//   properties: ['SymbolID'],
//   scale: 30
// });
// var classifier = ee.Classifier.libsvm().train({ //ee.Classifier.decisionTree(treeString)
//   features: training,
//   classProperty: 'SymbolID',
//   inputProperties: bandNames
// });
// //Run the classification
// var classified = pca.select(bandNames).classify(classifier);
// // Map.centerObject(classNames, 10);
// Map.addLayer(classified,
// {min: 0, max: 10,/*palette: ['0cffff','27a910','81937e','d61717','f1fb5b','0cff08','cf1ad2','1EEAF9','#d7ffd2']*/},
// 'classification',0);


// // var test = classified.sampleRegions({
// //   collection: validation,
// //   properties: ['ORIG_FID'],
// //     scale:20 ,
// // });

// // var testConfusionMatrix = test.errorMatrix('ORIG_FID', 'classification')
// // print('Confusion Matrix', testConfusionMatrix);
// // print('Test Accuracy', testConfusionMatrix.accuracy());
// // // Map.addLayer(studyarea)
// // // Map.addLayer(table)
// // var fc = ee.FeatureCollection([
// //   ee.Feature(null, {
// //     'accuracy': testConfusionMatrix.accuracy(),
// //     'matrix': testConfusionMatrix.array()
// //   })
// //   ])
// // print(fc)  
// // Export.table.toDrive({
// //   collection: fc,
// //   description: 'Accuracy_Export',
// //   folder: 'Change_Interpretation',
// //   fileNamePrefix: 'accuracy2020',
// //   fileFormat: 'CSV'
// // })
// // Export.image.toDrive({
// //   image: classified,
// //   description: 'Landsat_2020',
// //   scale: 30,
// //   maxPixels: 1e9,
// //   region: dhn
// // });