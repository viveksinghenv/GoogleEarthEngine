/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = /* color: #d63000 */ee.Geometry.MultiPoint();
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var country= ee.FeatureCollection("FAO/GAUL/2015/level2")
var dhn = country.filter(ee.Filter.eq('ADM2_NAME','Dhanbad'))

// Map.addLayer(country,{},'Country',0)
// Map.addLayer(dhn,{color: 'Blue'},'Dhanbad')
// Map.centerObject(dhn)
// var srtm = ee.Image("CGIAR/SRTM90_V4")
// var srtm =srtm.clip(dhn)
// Map.addLayer(srtm,{min: 100, max: 547},'SRTM_DHN')


var ndvi1 =ee.ImageCollection("MODIS/MOD09GA_006_NDVI")
            .filterDate('2019-01-01','2020-02-01')
            .filterBounds(dhn).mean();
Map.addLayer(ndvi1,{min: -.04, max: 1, palette :['blue','green','red']},'NDVI') 
Map.centerObject(dhn)
Map.addLayer(dhn,{color: 'Blue'},'Dhanbad',0)
 
 
 
 
 
 
 