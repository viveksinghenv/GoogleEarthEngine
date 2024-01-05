/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var s2 = ee.ImageCollection("COPERNICUS/S2"),
    s1 = ee.ImageCollection("COPERNICUS/S1_GRD"),
    table = ee.FeatureCollection("projects/landsat-325606/assets/Study_Area_phd");
/***** End of imports. If edited, may not auto-convert in the playground. *****/

// Define period 
var startdate = ee.Date.fromYMD(2014,1,1);
var enddate = ee.Date.fromYMD(2016,12,1);

// Define geograpic domain
var Ca = ee.FeatureCollection(table);
Map.centerObject(Ca,8);

// filter s2 data
var Sentinel2 = s2.filterBounds(Ca)
                .filterDate(startdate, enddate)
                .filterBounds(Ca);
                
// filter s1 data
var Sentinel1 =  ee.ImageCollection('COPERNICUS/S1_GRD')
                    .filterBounds(Ca)
                    .filterDate(startdate, enddate)
                    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
                    .select('VV');

// cloud function to remove clouds
var cloudfunction_ST2 = function(image){
  //use add the cloud likelihood band to the image
  var quality = image.select("QA60").unmask();
  //get pixels above the threshold
  var cloud01 = quality.gt(0);
  //create a mask from high likelihood pixels
  var cloudmask = image.mask().and(cloud01.not());
  //mask those pixels from the image
  return image.updateMask(cloudmask);
};

// remove the clouds
var ST2_nocloud = Sentinel2.map(cloudfunction_ST2);

// take the median
var st2median = ST2_nocloud.median();

// the normalized difference bare index
var ndbi = st2median.normalizedDifference(['B12', 'B8']);

// the normalized difference vegetation index
var ndvi = st2median.normalizedDifference(['B8', 'B4']);

// the normalize difference water index
var ndwi = st2median.normalizedDifference(['B3', 'B8']);

// define thresholds
var bareThreshold = -0.32
var vegetationThreshold = 0.65
var waterThreshold = 0.2

// show the urban area
var ndbi_th = ndbi.gt(bareThreshold)
var myndbi = ndbi_th.updateMask(ndbi_th).clip(Ca)
var ndbi_viz = {palette:"111101"};
Map.addLayer(myndbi, ndbi_viz, 'Urban');

// show the water areas
var ndwi_th = ndwi.gt(waterThreshold)
var myndwi = ndwi_th.updateMask(ndwi_th).clip(Ca)
var ndwi_viz = {palette:"24069b"};
Map.addLayer(myndwi, ndwi_viz, 'Water');

// show the forests
var ndvi_th = ndvi.gt(vegetationThreshold)
var myndvi = ndvi_th.updateMask(ndvi_th).clip(Ca)
var ndvi_viz = {palette:"006b0c"};
Map.addLayer(myndvi, ndvi_viz, 'Vegetation');

// create a map of the wet and dry conditions from sentinel-1
var wet = Sentinel1.reduce(ee.Reducer.percentile([10]))
var dry = Sentinel1.reduce(ee.Reducer.percentile([90]))

// calculate the difference between wet and dry conditions
var paddies = wet.subtract(dry)

// remove the mountains from the data
var hydrosheds = ee.Image('WWF/HydroSHEDS/03VFDEM');
var terrain = ee.Algorithms.Terrain(hydrosheds);
var slope = terrain.select('slope');

// remove all slopes greater then 2 degrees
paddies = paddies.updateMask(slope.lt(2));

// set the paddy threshold
var paddies_th = -8;

// select areas smaller than the threshold
var paddies_th = paddies.lt(paddies_th);

// mask the areas that are not rice paddies
var mypaddies = paddies_th.updateMask(paddies_th).clip(Ca)

var paddies_viz = {palette:"c2c64d"};
Map.addLayer(mypaddies, paddies_viz, 'Rice');