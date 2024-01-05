/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var study = 
    /* color: #98ff00 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[86.38121492307553, 23.983821992951786],
          [86.38121492307553, 23.828142707856593],
          [86.55424959104428, 23.828142707856593],
          [86.55424959104428, 23.983821992951786]]], null, false);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
Map.addLayer(study,{},'India')
Map.centerObject(study,8)


/****************************************************************
********************** Landsat Imagery Composite****************
****************************************************************/
// 1. QA FUNCTIONS //
//--------------------------------------------//
//SATURATES MASK (L5/7)
var maskSaturate57 = function(image){ image = image.select('B3', 'B4', 'B1'); var mask = image.lt(10000).and(image.gte(0)); return image.updateMask(mask);
}
//SATURATES MASK (L8)
var maskSaturate8 = function(image){
image = image.select('B4', 'B5', 'B2');
var mask = image.lt(10000).and(image.gte(0));
return image.updateMask(mask);
}
//----------------------------------------------//
// 2. EVI FUNCTIONS //
//----------------------------------------------//
//EVI FUNCTIONS FOR LANDSAT 5/7//
var getEVI57 = function(image) {
//Apply saturate function
// image = maskSaturate57(image);
var evi = (image.expression(
  '2.5 * ((nir-red) / (nir + 6 * red - 7.5* blue +1))',
  {
    nir: image.select('B4'),
    red: image.select('B3'),
    blue: image.select('B1')}).rename ('nd'));
return (evi);
}

//EVI FUNCTIONS FOR LANDSAT 8//

var getEVI8 = function(image){ 
  //Apply saturate function 
  // image = maskSaturate8(image); 
  var evi = (image.expression(
  '2.5 * ((nir-red) / (nir + 6 * red - 7.5* blue +1))',
  {
    nir: image.select('B5'),
    red: image.select('B4'),
    blue: image.select('B2')}).rename ('nd'))
  return(evi);
  
}

var yearrangeStart = 1992; 
  var yearrangeStop = 2022; 
 
var listfin = ee.Image([]);
for(var loopYear = yearrangeStart; loopYear <= yearrangeStop; loopYear +=1){ 
    
	//Set year's date range //
	// !!!! Adjust the time period you want to cover within each year here !!!! //

    var start = ee.Date.fromYMD(loopYear, 1, 20); 
    var end = ee.Date.fromYMD(loopYear, 12, 25);


var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')  //Filter AOI (imported at the top)
      .filterBounds(study)
      .filterDate(start, end)
      .map(getEVI8)


var l7 = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')  //Filter AOI (imported at the top)
      .filterBounds(study)
      .filterDate(start, end)
      .map(getEVI57);  

var l5 = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR')  //Filter AOI (imported at the top)
      .filterBounds(study) 
      .filterDate(start, end) 
      .map(getEVI57) 

//Merge collections
    var mergedCollection = ee.ImageCollection(l8.merge(l7).merge(l5));
var finalOutput = mergedCollection.reduce(ee.Reducer.mean()).clip(study).rename(loopYear.toString()); 
    
	//Generate filename for export 
    var filename = ("EVI_Composite_").concat(loopYear.toString()); 
    listfin = ee.Image(listfin).addBands(finalOutput.rename(filename))
// var listfin =mergedCollection
}
var listfin2 = listfin.toDouble()
print(listfin) 


// var listfin =ee.ImageCollection.fromImages(listfin)
// print('listfin',listfin)
var selected = listfin.select(26)
Map.addLayer(listfin,{},'listfin')
var min =  listfin.reduceRegion(ee.Reducer.min(), study,500);
var max = listfin.reduceRegion(ee.Reducer.max(), study,500);
print('min',min)
print('max',max)

Export.image.toDrive({
  image: listfin,
  description: 'EVIYearlyr',
  fileNamePrefix: 'EVIyearly',
  region: study,
  scale: 500,
  crs: 'EPSG:4326',
  maxPixels: 1e13
})