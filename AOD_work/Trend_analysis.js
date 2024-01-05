/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var study = ee.FeatureCollection("projects/landsat-325606/assets/India_shapefile_withkashmir");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
//--------------------------------------------//
// 1. QA FUNCTIONS //
//--------------------------------------------//
//SATURATES MASK (L5/7)
var maskSaturate57 = function(image){ image = image.select('B3', 'B4'); var mask = image.lt(10000).and(image.gte(0)); return image.updateMask(mask);
}
//SATURATES MASK (L8)
var maskSaturate8 = function(image){
image = image.select('B4', 'B5');
var mask = image.lt(10000).and(image.gte(0));
return image.updateMask(mask);
}

//PIXEL MASK (L8)
var maskPixels8 = function(image){
var pixel_qa = image.select('pixel_qa');
var mask = pixel_qa.eq(322);
return image.updateMask(mask);
}

//PIXEL MASK (L5/L7)
var maskPixels57 = function(image){
var pixel_qa = image.select('pixel_qa');
var mask = pixel_qa.eq(66);
return image.updateMask(mask);
}

//AEROSOL MASK (L8)
var maskAerosol = function(image){
var aero_qa = image.select('sr_aerosol'); var mask = aero_qa.neq(194).and(aero_qa.neq(224)).and(aero_qa.neq(160)).and(aero_qa.neq( 130));
return image.updateMask(mask); } 

//ATMOS OPACITY MASK (L5/L7) -to get rid of haze 
var maskHaze = function(image){
//Select band and multiply by scaling factor
var atmos_qa = image.select('sr_atmos_opacity').multiply(0.0010);
//Mask for non-hazy pixels and remove fill vals
var mask = atmos_qa.lte(0.1).and(atmos_qa.gt(-9.9));
return image.updateMask(mask)
}

//----------------------------------------------//
// 2. NDVI FUNCTIONS //
//----------------------------------------------//
//NDVI FUNCTIONS
var getNDVI57 = function(image) {
//Apply saturate function
image = maskSaturate57(image);
var nir = image.select('B4');
var red = image.select('B3');
var ndvi = nir.subtract(red).divide(nir.add(red)).rename('nd');
return(ndvi);
}
var getNDVI8 = function(image){ 
  //Apply saturate function 
  image = maskSaturate8(image); 
  var nir = image.select('B5'); 
  var red = image.select('B4'); 
  var ndvi = nir.subtract(red).divide(nir.add(red)).rename('nd'); 
  return(ndvi);
}

//-----------------------------------------------//
// 3. SENSOR CALLIBRATION FUNCTIONS //
//-----------------------------------------------//
//Coefficient Function (L5)
var applyCoefficientL5 = function(image){
var image_adjusted = image.select('nd').multiply(1.036);
return(image_adjusted); } 
//Coefficient Function (L8) 
var applyCoefficientL8 = function(image){
var image_adjusted = image.select('nd').multiply(1.0863);
return(image_adjusted); } 

//---------------------------------------------// 
// 4. MAIN FUNCTION // 
//---------------------------------------------//
var createNDVIComposite = function(){ 
  //Set year range 
  // !!!! Adjust the years you want to cover here !!!! //
  var yearrangeStart = 1986; 
  var yearrangeStop = 2019; 
  


var listfin = ee.Image([]);
for(var loopYear = yearrangeStart; loopYear <= yearrangeStop; loopYear +=1){ 
    
	//Set year's date range //
	// !!!! Adjust the time period you want to cover within each year here !!!! //

    var start = ee.Date.fromYMD(loopYear, 6, 20); 
    var end = ee.Date.fromYMD(loopYear, 9, 25); 


    //Landsat 8 
	// load Landsat 8 surface reflection collection and apply all
	// pre-processing functions
	// and calculate NDVI + apply sensor calibration coefficients

    var l8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR")
      //Filter AOI (imported at the top)
      .filterBounds(study)
      //July and August only
      .filterDate(start, end)
      //Filter CLOUD_COVER
      .filterMetadata('CLOUD_COVER', 'less_than', 80)
      //Apply Pixel Mask
      .map(maskPixels8)
      //Apply Aerosol Mask
      .map(maskAerosol)
      //Calculate NDVI
      .map(getNDVI8)
      //Apply Sensor Callibration Coefficient
      .map(applyCoefficientL8);
  //Landsat7
	// load Landsat 7 surface reflection collection and apply all
	// pre-processing functions
	// and calculate NDVI 

    var l7 = ee.ImageCollection("LANDSAT/LE07/C01/T1_SR")
      //Filter AOI (imported at the top)
      .filterBounds(study)
      //July and August only
      .filterDate(start, end)
      //Filter CLOUD_COVER
      .filterMetadata('CLOUD_COVER', 'less_than', 100)
      //Apply Pixel Mask
      .map(maskPixels57)
      //Apply Haze Mask
      .map(maskHaze)
      //Calculate NDVI
      .map(getNDVI57);  


    //Landsat5
	// load Landsat 5 surface reflection collection and apply all
	// pre-processing functions
	// and calculate NDVI + apply sensor calibration coefficients

    var l5 = ee.ImageCollection("LANDSAT/LT05/C01/T1_SR") 
      //Filter AOI (imported at the top) 
      .filterBounds(study) 
      //July and August only 
      .filterDate(start, end) 
      //Filter CLOUD_COVER 
      .filterMetadata('CLOUD_COVER', 'less_than', 100) 
      //Apply Pixel Mask 
      .map(maskPixels57) //Apply Haze Mask 
      .map(maskHaze) //Calculate NDVI 
      .map(getNDVI57) //Apply Sensor Callibration Coefficient 
      .map(applyCoefficientL5);
      
//Merge collections
    var mergedCollection = ee.ImageCollection(l8.merge(l7).merge(l5));
    
	//Create composite with median, clip to AOI and rename band based on year 
    var finalOutput = mergedCollection.reduce(ee.Reducer.median()).clip(study).rename(loopYear.toString()); 
    
	//Generate filename for export 
    var filename = ("NDVI_Composite_").concat(loopYear.toString()); 
    
	// add mosaic of current year to image list    
    listfin = ee.Image(listfin).addBands(finalOutput.rename(filename));
    
  //end of loop 

    }
// print out the stacked image list to check how many mosaics are contained
    print(listfin)

	// convert all datasets to the same data type (LS8 has another datatype thatn LS5 and 7)
// convert all datasets to the same data type (LS8 has another datatype thatn LS5 and 7)
    var listfin2 = listfin.toDouble()

 print(listfin2,'Listfin2')
	// Export the stack of NDVI mosaics to Google Drive

    Export.image.toDrive({
    image: listfin2,
    description: 'yearly_LS_ts',
    //Landsat resolution is 30m
    scale: 1000,
    region: study,
    //LCC_MNRF projection
     crs: 'epsg:4326',
    maxPixels: 800000000
    })
    
 } 
 var comp = createNDVIComposite();
print(comp)