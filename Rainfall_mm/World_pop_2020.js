/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var imageCollection = ee.ImageCollection("WorldPop/GP/100m/pop"),
    gaul = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level2");
/***** End of imports. If edited, may not auto-convert in the playground. *****/

var dhanbad = gaul.filter(ee.Filter.eq('ADM2_NAME','Dhanbad'));
var dataset = ee.Image/*Collection*/("WorldPop/GP/100m/pop/IND_2020").select('population')//.filterDate('2020');
var visualization = {
  bands: ['population'],
  min: 0.0,
  max: 21171.0,
  palette: ['24126c', '1fff4f', 'd4ff50']
};
print(dataset)
Map.centerObject(dhanbad);
var clipToCol = function(image){
  return image.clip(dhanbad);
};
//var dhnpop= dataset.map(clipToCol)
var dhnpop= dataset.clip(dhanbad)
print(dhnpop,'Dhn Pop')
Map.addLayer(dhnpop, visualization, 'Population');

Export.image.toDrive({
  image: dhnpop,
 description: 'DhanbadPopDens',
  scale: 100,
  region: dhanbad
 
});