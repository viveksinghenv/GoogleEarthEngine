
/********************************************/
/************        Day 2    ***************/
/************  Data Visualization     *******/
/********************************************/

var s2 = ee.ImageCollection("COPERNICUS/S2");
var admin2 = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level2");

var dhn = admin2.filter(ee.Filter.eq('ADM2_NAME', 'Dhanbad'))
var geometry = dhn.geometry()
Map.addLayer(geometry)
// Map.centerObject(dhn,10)
var filtered = s2.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
  .filter(ee.Filter.date('2019-01-01', '2020-01-01'))
  // .filter(ee.Filter.bounds(geometry))
  .filterBounds(geometry)
var image = filtered.median(); 
Map.addLayer(image,{min:602 ,max: 2730, bands: ['B8','B4','B3']},'image')
// Calculate  Normalized Difference Vegetation Index (NDVI)
// 'NIR' (B8) and 'RED' (B4)
var ndvi = image.normalizedDifference(['B8', 'B4']).rename(['ndvi']);

// Calculate Modified Normalized Difference Water Index (MNDWI)
// 'GREEN' (B3) and 'SWIR1' (B11)
var mndwi = image.normalizedDifference(['B3', 'B11']).rename(['mndwi']); 

// Calculate Soil-adjusted Vegetation Index (SAVI)
// 1.5 * ((NIR - RED) / (NIR + RED + 0.5))

// For more complex indices, you can use the expression() function

// Note: 
// For the SAVI formula, the pixel values need to converted to reflectances
// Multiplyng the pixel values by 'scale' gives us the reflectance value
// The scale value is 0.0001 for Sentinel-2 dataset

var savi = image.expression(
    '1.5 * ((NIR - RED) / (NIR + RED + 0.5))', {
      'NIR': image.select('B8').multiply(0.0001),
      'RED': image.select('B4').multiply(0.0001),
}).rename('savi');

var rgbVis = {min: 0.0, max: 3000, bands: ['B4', 'B3', 'B2']};
var ndviVis = {min:0, max:1, palette: ['white', 'green']}
var ndwiVis = {min:0, max:0.5, palette: ['white', 'blue']}

Map.addLayer(image.clip(geometry), rgbVis, 'Image');
Map.addLayer(mndwi.clip(geometry), ndwiVis, 'mndwi')
Map.addLayer(savi.clip(geometry), ndviVis, 'savi') 
Map.addLayer(ndvi.clip(geometry), ndviVis, 'ndvi')

