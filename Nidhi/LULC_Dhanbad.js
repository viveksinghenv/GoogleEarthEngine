/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var table = ee.FeatureCollection("projects/landsat-325606/assets/Nid_Studyarea1"),
    geometry = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[86.29264270931661, 23.86108456759824],
          [86.29264270931661, 23.632936029770246],
          [86.60849964291036, 23.632936029770246],
          [86.60849964291036, 23.86108456759824]]], null, false);
/***** End of imports. If edited, may not auto-convert in the playground. *****/

var dataset = ee.ImageCollection("ESA/WorldCover/v100").first().clip(geometry);
Map.centerObject(table)
var visualization = {
  bands: ['Map'],
};

// Map.centerObject(dataset);

Map.addLayer(dataset, visualization, "Landcover");
Export.image.toDrive({
  image: dataset,
  description: 'ESA_Dhn',
  //folder: 'ee_demos',
  region: geometry,
  scale: 10,
   crs: 'EPSG:32645'
});

/////*********Adding legends************//////
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});

// Create legend title
var legendTitle = ui.Label({
  value: 'My Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});

// Add the title to the panel
legend.add(legendTitle);
    
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
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
      
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};


//  Palette with the colors
var palette =['006400', 'ffbb22', 'ffff4c', 'f096ff', 'fa0000', 'b4b4b4', 'f0f0f0', '0064c8', '0096a0', '00cf75', 'fae6a0'];

// name of the legend
var names = ['Tree cover','Shrubland','Grassland','Cropland','Built-up','Bare / sparse vegetation','Snow and ice','Permanent water bodies','Herbaceous wetland','Mangroves','Moss and lichen'];

// Add color and and names
for (var i = 0; i < 11; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  

// add legend to map (alternatively you can also print the legend to the console)  
Map.add(legend);  
  