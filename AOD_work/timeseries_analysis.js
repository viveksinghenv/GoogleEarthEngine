/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var study = ee.FeatureCollection("projects/landsat-325606/assets/India_shapefile_withkashmir");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
Map.addLayer(study,{},'India',0)
Map.centerObject(study, 4);
var date_1 = '2020-01-01';
var date_2 = '2020-12-30'
var year_1 ='2019'
var year_2 ='2020'
/*******AOD Load and Display*********/
{var aod = ee.ImageCollection("MODIS/006/MCD19A2_GRANULES")
                      .select('Optical_Depth_047')
                      .filterDate(date_1, date_2)/*.mean()*/
                      .filterBounds(study)
// print(aod)
var moaod= aod.map(function(img) {
  return img
    .multiply(0.001)
    .subtract(0.00)
    .copyProperties(img, ['system:time_start']);
});
var band_viz = {
  min: 0,
  max: 1,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
/****************Due to filter bound clip is not working*************/
// var Iaod = aod.clip(study)
// // print(Iaod)
// Map.addLayer(Iaod, band_viz, 'Optical Depth 047',0);
Map.addLayer(moaod, band_viz, 'Optical Depth 047',0)
}
/************Modis LST*************/
var moLST= ee.ImageCollection("MODIS/061/MOD11A2")
                              .select('LST_Day_1km')
                              .filterBounds(study)
                              .filterDate(date_1, date_2)
// Scale to Kelvin and convert to Celsius, set image acquisition time.
var moLST= moLST.map(function(img) {
  return img
    .multiply(0.02)
    .subtract(273.15)
    .copyProperties(img, ['system:time_start']);
});
Map.addLayer(moLST, {min: 2.0, max:56, palette: [
'040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
'0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
'3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
'ff0000', 'de0101', 'c21301', 'a71001', '911003'
 ]},'MODIS LST',0);

/**********LULC sentinel 2 10 m resolution display************/
{
var lulc10 = ee.ImageCollection("projects/sat-io/open-datasets/landcover/ESRI_Global-LULC_10m");

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
Map.addLayer(lulc10, {min:1, max:10, palette:dict['colors']}, 'India_LULC_2020 10m',0)
// Create a panel to hold the legend widget
/*******Legend Display and pannelling*****/
{var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
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
// Add the legend to the map
}
}
// {addCategoricalLegend(legend, dict, 'ESRI 2020 Land Cover');
// var ur = lulc10.eq(7);
// var urban = lulc10.mask(ur)
// var wt = lulc10.eq(1);
// var water = lulc10.mask(wt)
// var tr= lulc10.eq(2)
// var trees= lulc10.mask(tr)
// var cp = lulc10.eq(5)
// var crops= lulc10.mask(cp)}

/************MODIS NDVI**********/
var mondvi = ee.ImageCollection('MODIS/MOD09GA_006_NDVI')
                  .filter(ee.Filter.date(date_1, date_2));
var modsindvi = mondvi.select('NDVI');
var colorizedVis = {
  min: -1.0,
  max: 1.0,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};

Map.addLayer(modsindvi, colorizedVis, 'MODIS NDVI',0);
/***************Precipitation*************/
var precipitation1 = ee.ImageCollection('JAXA/GPM_L3/GSMaP/v6/operational')
                  .filter(ee.Filter.date(year_1, year_2));
var precipitation = precipitation1.select('hourlyPrecipRate')//.mean();
// var precipitation = precipitation.clip(study)
var precipitationVis = {
  min: 0.0,
  max: 1687,
  palette:
      ['1621a2', 'ffffff', '03ffff', '13ff03', 'efff00', 'ffb103', 'ff2300'],
};
// print(precipitation,'precipitation')
/******monthly image function***********/
var addMonthlyPrecip = function (img) {
  var start = ee.Date(img.get('system:time_start'));
  var end = start.advance(1, 'month');
  var hoursInMonth = end.difference(start, 'hours');
  return img.addBands(img.multiply(hoursInMonth).rename('precip_mm_month'));
};
precipitation = precipitation.map(addMonthlyPrecip);
var precipitation1 = precipitation.select('precip_mm_month')
Map.addLayer(precipitation1, precipitationVis,'Precipitation',0)


/*************Merging the Image(Composite)***************/


/********Time Series Function*********/
var col20 = aod.map(function(a) {
  return a.set('month' , ee.Image(a).date().get('month'))
})
var months =ee.List(col20.aggregate_array('month')).distinct()

var mc20 = months.map(function(x){
  return col20.filterMetadata('month', 'equals', x).mean().set('month',x)
})
var final_image20 = ee.ImageCollection.fromImages(mc20)
var chart = ui.Chart.image.series(final_image20, study, ee.Reducer.mean(),5000, 'month')
.setOptions({
  title: 'NDWI & NDBaL for year 2020',
  vAxis: {title: 'Values'},
  hAxis: {title: 'Month'},
})
print(chart)
