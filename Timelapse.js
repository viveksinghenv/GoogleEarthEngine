/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var gaul = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level2"),
    geometry1 = 
    /* color: #d63000 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[86.14116098852769, 24.011091319862935],
          [86.14116098852769, 23.621624599556903],
          [86.84977915259019, 23.621624599556903],
          [86.84977915259019, 24.011091319862935]]], null, false);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var geometry = gaul.filter(ee.Filter.eq('ADM2_NAME','Dhanbad'));
// import text package from Gena
var text = require('users/gena/packages:text');
 
var l4 = ee.ImageCollection("LANDSAT/LT04/C02/T1_L2");
var l5 = ee.ImageCollection("LANDSAT/LT05/C02/T1_L2");
// var l7 = ee.ImageCollection("LANDSAT/LE07/C02/T1_L2");
var l8 = ee.ImageCollection("LANDSAT/LC08/C02/T1_L2");
 
var l4names = ee.List(["SR_B1","SR_B2","SR_B3"]);
var l5names = ee.List(["SR_B1","SR_B2","SR_B3"]);
// var l7names = ee.List(["SR_B1","SR_B2","SR_B3"]);
var l8names = ee.List(["SR_B2","SR_B3","SR_B4"]);
 
// bands
var outBands = ee.List(['blue','green','red']);
 
// Filter based on location
var l4images  = l4.filterBounds(geometry).filter(ee.Filter.lt("CLOUD_COVER",2));
var l5images  = l5.filterBounds(geometry).filter(ee.Filter.lt("CLOUD_COVER",2));
// var l7images  = l7.filterBounds(geometry).filter(ee.Filter.lt("CLOUD_COVER",2));
var l8images  = l8.filterBounds(geometry).filter(ee.Filter.lt("CLOUD_COVER",2));
 
print(l4images.size(),'l4imagessize');
print(l5images.size(),'l5imagessize');
// print(l7images.size(),'l7imagessize');
print(l8images.size(),'l8imagessize');
// Change the bandnames
l4images = l4images.select(l4names,outBands);
l5images = l5images.select(l5names,outBands);
// l7images = l7images.select(l7names,outBands);
l8images = l8images.select(l8names,outBands);
 
print(l4images,'l4images');
 
// Combine all data in single collection
var myCollection = ee.ImageCollection((l4images.merge(l5images))
                                               /*.merge(l7images)*/
                                               .merge(l8images));
 
var scale = 0.0000275;
var offset = -0.2;
 
myCollection = myCollection.map(function(image){
    return image.add(offset).multiply(scale).set("system:time_start",image.get("system:time_start"));
})
 
myCollection = myCollection.sort("system:time_start");
print(myCollection,'myCollection');

// Select the red, green an blue bands
myCollection = myCollection.select(['red','green','blue'])
 
// we need an 8-bit format
var coll4Video = myCollection.map(function(image) {
     var date = ee.Date(image.get('system:time_start'))
     var label = date.format('YYYY')
     
    return image.multiply(512).uint8().clip(geometry1).set({label: label});;   // need to make it 8-bit
  });
 
 
// annotate
var annotations = [
  {
    position: 'left', offset: '1%', margin: '1%', property: 'label', scale: Map.getScale() * 2
  }
]
 
coll4Video = coll4Video.map(function(image) {
  return text.annotateImage(image, {}, geometry1, annotations)
})
 
Map.centerObject(geometry, 9)  
 
// export the video to the drive
Export.video.toDrive({
    collection: coll4Video,
    description: "ppv1" , 
    scale: 30,
    framesPerSecond: 3,
    region: geometry1
});