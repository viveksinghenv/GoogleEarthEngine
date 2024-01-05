/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var Q1 = /* color: #d63000 */ee.Geometry.MultiPoint(
        [[78.41408239215582, 10.929348872393872],
         [78.41425405353277, 10.929664899229246],
         [78.414114578664, 10.929865049384212],
         [78.4151767334339, 10.930001994149283],
         [78.41526256412237, 10.929496351625586],
         [78.41531620830267, 10.929190858849962],
         [78.41812716335028, 10.928200638725531],
         [78.41678605884283, 10.928653612171244],
         [78.41644273608892, 10.929464748939255]]),
    BWN = ee.FeatureCollection("users/nirmalgsarath/last");
/***** End of imports. If edited, may not auto-convert in the playground. *****/

var collectionA = ee.ImageCollection('COPERNICUS/S1_GRD').filterBounds(BWN)
    //Cloud filtering
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))  
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  // Filter to get images collected in interferometric wide swath mode.
  .filter(ee.Filter.eq('instrumentMode', 'IW'))
  // Filter to get images collected in ASCENDING mode.
  .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'));
print('all collection VV+VH IW mode all dates', collectionA);

//VV and VH image selection
var vvA=collectionA.select('VV');
var vhA=collectionA.select('VH');
print('VV all dates', vvA);
print('VH all dates', vhA);

//Cloud filter by date
var vv1A=vvA.filterDate('2018-09-08', '2018-09-15').mosaic();
var vh1A=vhA.filterDate('2018-09-08', '2018-09-15').mosaic();

var vv2A=vvA.filterDate('2018-09-19', '2018-09-25').mosaic();
var vh2A=vhA.filterDate('2018-09-19', '2018-09-25').mosaic();

var vv3A=vvA.filterDate('2018-10-02', '2018-10-15').mosaic();
var vh3A=vhA.filterDate('2018-10-02', '2018-10-15').mosaic();

var vv4A=vvA.filterDate('2018-10-25', '2018-10-29').mosaic();
var vh4A=vhA.filterDate('2018-10-25', '2018-10-29').mosaic();

var vv5A=vvA.filterDate('2018-11-05', '2018-11-11').mosaic();
var vh5A=vhA.filterDate('2018-11-05', '2018-11-11').mosaic();

var vv6A=vvA.filterDate('2018-11-18', '2018-11-23').mosaic();
var vh6A=vhA.filterDate('2018-11-18', '2018-11-23').mosaic();

var vv7A=vvA.filterDate('2018-11-30', '2018-12-07').mosaic();
var vh7A=vhA.filterDate('2018-11-30', '2018-12-07').mosaic();

var vv8A=vvA.filterDate('2018-12-11', '2018-12-19').mosaic();
var vh8A=vhA.filterDate('2018-12-11', '2018-12-19').mosaic();

var vv9A=vvA.filterDate('2018-12-23', '2018-12-28').mosaic();
var vh9A=vhA.filterDate('2018-12-23', '2018-12-28').mosaic();


//Speckle filtering/smoothing
// Smooth the image by convolving with the boxcar kernel.
// Define a boxcar or low-pass kernel.
//A 3X3 Boxcar filter
var boxcar = ee.Kernel.square({radius: 1.5, units: 'pixels', normalize: true});

var vh1A = vh1A.convolve(boxcar);
var vv1A = vv1A.convolve(boxcar);

var vh2A = vh2A.convolve(boxcar);
var vv2A = vv2A.convolve(boxcar);

var vh3A = vh3A.convolve(boxcar);
var vv3A = vv3A.convolve(boxcar);

var vh4A = vh4A.convolve(boxcar);
var vv4A = vv4A.convolve(boxcar);

var vh5A = vh5A.convolve(boxcar);
var vv5A = vv5A.convolve(boxcar);

var vh6A = vh6A.convolve(boxcar);
var vv6A = vv6A.convolve(boxcar);

var vh7A = vh7A.convolve(boxcar);
var vv7A = vv7A.convolve(boxcar);

var vh8A = vh8A.convolve(boxcar);
var vv8A = vv8A.convolve(boxcar);

var vh9A = vh9A.convolve(boxcar);
var vv9A = vv9A.convolve(boxcar);



// Create band stack
var st_vvA = vv1A.addBands(vv2A).addBands(vv3A).addBands(vv4A)
.addBands(vv5A).addBands(vv6A).addBands(vv7A).addBands(vv8A).addBands(vv9A);
print('Stacked VV_ASC', st_vvA);

var st_vhA=vh1A.addBands(vh2A).addBands(vh3A).addBands(vh4A).addBands(vh5A).addBands(vh6A)
.addBands(vh7A).addBands(vh8A).addBands(vh9A);
print('Stacked VH_ASC', st_vhA);

//------------------------------------------------------------------------------------------------------
// Make a handy variable of visualization parameters.
var visParamsvvA = {bands: ['VV', 'VV_2', 'VV_3'],min: -30,
  max: 0,
  gamma: [0.9, 0.8, 0.7]};
var visParamsvhA = {bands: ['VH', 'VH_2', 'VH_3'],min: -30,
  max: 0,gamma: [0.9, 0.8, 0.7]};

// Display map
Map.centerObject(BWN, 8);
// Display composite image
Map.addLayer(st_vvA.clip(BWN), visParamsvvA, 'Date stack VVASC');
Map.addLayer(st_vhA.clip(BWN), visParamsvhA, 'Date stack VHASC');
//Display individual data
Map.addLayer(vh3A.clip(BWN), {min:-30,max:0}, 'VHA');


//--------------------------------------------------------------------------------------------------------------
//Masking: mask pixels of no interest
var urbanmask=(vv1A.lt(-7).and(vv2A.lt(-7)));
//Map.addLayer(classified.updateMask(urbanmask), {min: 1, max: 3, palette: palette}, 'Class Type');
var watermask=(vv5A.gt(-19).and(vh5A.gt(-21)));
//Apply mask
var st_vvA_M=st_vvA.updateMask(watermask).updateMask(urbanmask);
var st_vhA_M=st_vvA.updateMask(watermask).updateMask(urbanmask);
Map.addLayer(st_vvA.updateMask(watermask).updateMask(urbanmask),
visParamsvvA, 'Masked Image stack');
var st_vv_vhM=st_vvA_M.addBands(st_vhA_M);
Map.addLayer(st_vv_vhM.clip(BWN), visParamsvvA, 'Date stack VV-VH');
//---------------------------------------------------------------------------------------------------------------
//Temporal analysis
// Create a chart/temporal analysis

// Define customization options.
var optionsvv = {
  title: 'Time Series sigma0_VV plot',
  hAxis: {title: 'Date'},
  vAxis: {title: 'Backscatter coefficient Sigma0_VV (dB)'},
  lineWidth: 2,
  pointSize: 4,
  fontSize:20,
  series: {
    0: {color: '970F0F'}, // rice1L
    1: {color: 'FF0000'}, // rice2L
    2: {color: 'F68244'}, // rice3L
    3: {color: '1230D8'}, // rice3L
    4: {color: '00F7FF'}, // rice3L
    5: {color: '0093FF'}, // rice3L
    6: {color: 'B455F1'}, // rice3
    7: {color: 'EE37BA'}, // rice3
    8: {color: '5711B0'}, // rice3
    9: {color: 'AEF712'}, // rice3
    10: {color: '06F70E'}, // rice3
    11: {color: '08690B'}, // rice3
    12: {color: 'E074B7'}, // rice3
    13: {color: '610808'}, // rice3
    14: {color: '0F9728'}, // rice3
    15: {color: 'E074B7'}, // rice3
    16: {color: 'E074B7'}, // rice3
    17: {color: 'E074B7'}, // rice3
    18: {color: 'E074B7'}, // rice3
    19: {color: 'E074B7'}, // rice3
    20: {color: 'E074B7'}, // rice3
    21: {color: 'E074B7'}, // rice3
    22: {color: 'E074B7'}, // rice3
    23: {color: 'E074B7'}, // rice3
    24: {color: 'E074B7'}, // rice3
    25: {color: 'E074B7'}, // rice3
    26: {color: 'E074B7'} // rice3
    
}};
//['11May','23May','04Jun','28jun','10Jul','22Jul','03Aug','15Aug','27Aug','08Sep','20Sep','02Oct','14Oct','26Oct','07Nov','19Nov','01Dec','13Dec','25Dec']
// Define dates for X-axis labels.
var dates = ['9sep','21sep','3oct','27oct','8nov','20nov','2dec','14dec','26dec'];


// Define and display a FeatureCollection of ground data locations.
//-----------------------------------------------

Map.addLayer(Q1);


// Create the chart and set options.
//VV Plot
var timeChartvvQ1= ui.Chart.image.regions(
    st_vvA, Q1, ee.Reducer.mean(), 30, 'label', dates)
        .setChartType('LineChart')
        .setOptions(optionsvv);
// Display the chart.
print('Timeseries VV Plot1',timeChartvvQ1);

//VH plot
var timeChartvhQ1 = ui.Chart.image.regions(
    st_vhA, Q1, ee.Reducer.mean(), 30, 'label', dates)
        .setChartType('LineChart')
        .setOptions(optionsvv);
// Display the chart.
print('Timeseries VH Plot1',timeChartvhQ1);
//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------


//---------------------------------------------------------------------------------
// Unsupervised Classification (clustering)
// Make the training dataset
var training = st_vv_vhM.sample({
  region: BWN,
  scale: 20,
  numPixels: 5000
});

// Instantiate the clusterer and train it.
var clusterer = ee.Clusterer.wekaKMeans(4).train(training);

// Cluster the input using the trained clusterer.
var result = st_vv_vhM.cluster(clusterer).clip(BWN);

// Display the clusters with random colors.
Map.addLayer(result.randomVisualizer(), {}, 'clusters');

//----------------------------------------------------------------------------------
// Export the image, specifying scale and region.
Export.image.toDrive({
  image: result,
  description: 'Rice_Map',
  scale: 10,
  region: BWN
});
