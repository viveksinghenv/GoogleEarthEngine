/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var gaul = ee.FeatureCollection("FAO/GAUL/2015/level2"),
    geometry = 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[86.95015396156165, 23.95965495001473],
          [85.9476515201554, 24.251727292801636],
          [85.83366836585853, 23.63169661867484],
          [86.82518447913978, 23.544857013432313]]]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var dhn = gaul.filter(ee.Filter.eq('ADM2_NAME','Dhanbad'))
Map.centerObject(dhn,9)
Map.addLayer(geometry,{},'Geometry',0)
//Load Sentinel-1 SAR collection and filter according to data collection type
var S1 = ee.ImageCollection('COPERNICUS/S1_GRD')
  .filterBounds(/*dhn*/geometry)
  .filterDate('2020-01-01','2020-04-01')
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))

//Add first image to map to get an idea of what a SAR image looks like  
Map.addLayer(S1.first(),{bands: 'VV',min: -18, max: 0}, 'SAR image',0)

// Filter speckle noise
var filterSpeckles = function(img) {
  var vv = img.select('VV') //select the VV polarization band
  var vv_smoothed = vv.focal_median(100,'circle','meters').rename('VV_Filtered') //Apply a focal median filter
  return img.addBands(vv_smoothed) // Add filtered VV band to original image
}

// Map speckle noise filter across collection. Result is same collection, with smoothed VV band added to each image
S1 = S1.map(filterSpeckles)

//Add speckle filtered image to map to sompare with raw SAR image
Map.addLayer(S1.first(),{bands: 'VV_Filtered',min: -18, max: 0}, 'Filtered SAR image',0)
//Here we are using -16. This is only an approximation and will result in some errors. Try adjusting the 
var classifyWater = function(img) {
  var vv = img.select('VV_Filtered')
  var water = vv.lt(-14).rename('Water')  //Identify all pixels below threshold and set them equal to 1. All other pixels set to 0
  water = water.updateMask(water) //Remove all pixels equal to 0
  return img.addBands(water)  //Return image with added classified water band
}

//Map classification across sentinel-1 collection and print to console to inspect
S1 = S1.map(classifyWater)
print(S1)
// S1 = S1.lt(-12).rename(water)
Map.addLayer(S1.select(0,'Water'),{},'water')
var water1 =S1.select(25,'Water') 
//Make time series of water pixels within region
var ClassChart = ui.Chart.image.series({
  imageCollection: S1.select('Water'),
  region: geometry,
  reducer: ee.Reducer.sum(),
  scale: 100,
})
  .setOptions({
      title: 'Inundated Pixels',
      hAxis: {'title': 'Date'},
      vAxis: {'title': 'Number of Inundated Pixels'},
      lineWidth: 2
    })

//Set the postion of the chart and add it to the map    
ClassChart.style().set({
    position: 'bottom-right',
    width: '500px',
    height: '300px'
  });
// Create a label on the map.
var label = ui.Label('Click a point on the chart to show the image for that date.');
Map.add(label);

//Create callbakc function that adds image to the map coresponding with clicked data point on chart
ClassChart.onClick(function(xValue, yValue, seriesName) {
    if (!xValue) return;  // Selection was cleared.
  
    // Show the image for the clicked date.
    var equalDate = ee.Filter.equals('system:time_start', xValue);
    //Find image coresponding with clicked data and clip water classification to roi 
    var classification = ee.Image(S1.filter(equalDate).first()).clip(roi).select('Water'); 
    var SARimage = ee.Image(S1.filter(equalDate).first());
    //Make map layer based on SAR image, reset the map layers, and add this new layer
    var S1Layer = ui.Map.Layer(SARimage, {
      bands: ['VV'],
      max: 0,
      min: -20
    });
    Map.layers().reset([S1Layer]);
    var visParams = {
      min: 0,
      max: 1,
      palette: ['#FFFFFF','#0000FF']
    }
    //Add water classification on top of SAR image
    Map.addLayer(classification,visParams,'Water')
    
    // Show a label with the date on the map.
    label.setValue((new Date(xValue)).toUTCString());
  });