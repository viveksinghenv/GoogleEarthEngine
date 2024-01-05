/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var study = ee.FeatureCollection("projects/landsat-325606/assets/India_shapefile_withkashmir");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var dataset = ee.ImageCollection('UCSB-CHG/CHIRPS/PENTAD')
                  .filter(ee.Filter.date('2020-05-01', '2020-05-05'));
/* Spatial Resolution 5566 meters, 30+ year quasi-global rainfall dataset, */ /*
var precipitation = dataset.select('precipitation');
var precipitationVis = {
  min: 0.0,
  max: 112.0,
  palette: ['001137', '0aab1e', 'e7eb05', 'ff4a2d', 'e90000'],
};
Map.addLayer(precipitation, precipitationVis, 'Precipitation');**/

/*Global Satellite Mapping of Precipitation (GSMaP) 
provides a global hourly rain rate with a 0.1 x 0.1 degree(11132 meters) resolution*/
var dataset = ee.ImageCollection('JAXA/GPM_L3/GSMaP/v6/operational')
                  .filter(ee.Filter.date('2020-08-06', '2020-08-07'));
var precipitation = dataset.select('hourlyPrecipRate').mean();
var precipitation = precipitation.clip(study)
var precipitationVis = {
  min: 0.0,
  max: 40.0,
  palette:
      ['1621a2', 'ffffff', '03ffff', '13ff03', 'efff00', 'ffb103', 'ff2300'],
};
Map.centerObject(study, 4);
Map.addLayer(precipitation, precipitationVis, 'Precipitation');