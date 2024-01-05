// Demonstrate SAR polarization.

// Define the time interval.
var start_date = ee.Date('2019-07-21');
var end_date = start_date.advance(16, 'days');
var date_filter = ee.Filter.date(start_date, end_date);

// Define the base Sentinel-1 collection.
var collection_base = ee.ImageCollection('COPERNICUS/S1_GRD')
        .filter(date_filter)
        // .filter(ee.Filter.eq('instrumentMode', 'IW'))
        .filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'))
        .select(['VV','VH']);

// Define the data layers.
var label1 = 'VH Polarization';
var collection1 = collection_base
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'));
var vis_params1 = {bands:'VH', min:-25, max:5};

var label2 = 'VV Polarization';
var collection2 = collection_base
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'));
var vis_params2 = {bands:'VV', min:-25, max:5};

// Create the map objects, link them, and display them.
var map1 = ui.Map().add(ui.Label(label1, {position:'middle-left'}));
map1.addLayer(collection1, vis_params1, label1);

var map2 = ui.Map().add(ui.Label(label2, {position:'middle-right'}));
map2.addLayer(collection2, vis_params2, label2);

var linker = ui.Map.Linker([map1,map2]);
var split_panel = ui.SplitPanel({
  firstPanel: map1,
  secondPanel: map2,
  wipe: true,
});
map1.setCenter( 86.566640, 23.813940, 11);  // San Francisco Bay area

// Add the split panel to the UI.
ui.root.widgets().reset([split_panel]);