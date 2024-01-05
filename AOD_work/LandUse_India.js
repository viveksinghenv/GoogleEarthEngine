/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = /* color: #d63000 */ee.Geometry.Point([79.91397952727124, 23.69499875468795]),
    lulc = ee.ImageCollection("COPERNICUS/Landcover/100m/Proba-V-C3/Global"),
    study = ee.FeatureCollection("projects/landsat-325606/assets/India_shapefile_withkashmir");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var gaul = ee.FeatureCollection("FAO/GAUL/2015/level0");
var image = ee.ImageCollection("COPERNICUS/Landcover/100m/Proba-V-C3/Global")
var lulc10 = ee.ImageCollection("projects/sat-io/open-datasets/landcover/ESRI_Global-LULC_10m");
var dhn = gaul.filter(ee.Filter.eq('ADM0_CODE','IN'));
// Map.addLayer(study)
var lulc10 = lulc10.mosaic()
var lulc10 = lulc10.clip(study)
var dict = {
  "names": [
    "Water", "Trees", "Grass","Flooded Vegetation","Crops","Scrub/Shrub",
    "Built Area","Bare Ground","Snow/Ice","Clouds"
  ],
  "colors": [
    "1A5BAB","358221","A7D282","87D19E","FFDB5C","EECFA8",
    "ED022A","EDE9E4","F2FAFF","C8C8C8"
  ]};
Map.addLayer(lulc10, {min:1, max:10, palette:dict['colors']}, 'India_LULC_2020 10m')
// Create a panel to hold the legend widget
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});

// Function to generate the legend
function addCategoricalLegend(panel, dict, title) {
  
  // Create and add the legend title.
  var legendTitle = ui.Label({
    value: title,
    style: {
      fontWeight: 'bold',
      fontSize: '18px',
      margin: '0 0 4px 0',
      padding: '0'
    }
  });
  panel.add(legendTitle);
  
  var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
  panel.add(loading);
  
  // Creates and styles 1 row of the legend.
  var makeRow = function(color, name) {
    // Create the label that is actually the colored box.
    var colorBox = ui.Label({
      style: {
        backgroundColor: color,
        // Use padding to give the box height and width.
        padding: '8px',
        margin: '0 0 4px 0'
      }
    });
  
    // Create the label filled with the description text.
    var description = ui.Label({
      value: name,
      style: {margin: '0 0 4px 6px'}
    });
  
    return ui.Panel({
      widgets: [colorBox, description],
      layout: ui.Panel.Layout.Flow('horizontal')
    });
  };
  
  // Get the list of palette colors and class names from the image.
  var palette = dict['colors'];
  var names = dict['names'];
  loading.style().set('shown', false);
  
  for (var i = 0; i < names.length; i++) {
    panel.add(makeRow(palette[i], names[i]));
  }
  
  Map.add(panel);
  
}

var ur = lulc10.eq(7);
var urban = lulc10.mask(ur)
Map.addLayer(urban,{},'Urban')

// Add the legend to the map
addCategoricalLegend(legend, dict, 'ESRI 2020 Land Cover');


