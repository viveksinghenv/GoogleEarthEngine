/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var imageCollection = ee.ImageCollection("LANDSAT/LT05/C01/T1_SR"),
    Water = /* color: #0dd6d6 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([86.7351604894406, 23.69192334130658]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([86.68503536737029, 23.688150639773372]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([86.58663734385918, 23.576717943405487]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([86.80798987008241, 23.797639389212208]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([86.82343939400819, 23.81899862107671]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([86.80112341500428, 23.835329780110534]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([86.80627325631288, 23.828734751810103]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([86.79651104772425, 23.68676999673131]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([86.80316292608119, 23.683861767503533]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([85.82907843436725, 23.7211483512309]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([85.82444357718951, 23.733720418835798]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([85.79302954520709, 23.741577345261945]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([85.80075430716998, 23.753990323154955]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([85.77380347098834, 23.714547530417356]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([85.78101324882037, 23.72429148180228]),
            {
              "landcover": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([85.79165625419147, 23.730263221121405]),
            {
              "landcover": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([85.78187155570514, 23.74032026887378]),
            {
              "landcover": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([85.815345524211, 23.731206102320503]),
            {
              "landcover": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([85.77277350272662, 23.71281868880713]),
            {
              "landcover": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([85.8241002544356, 23.714861862793686]),
            {
              "landcover": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([86.0886641349178, 23.700942367063654]),
            {
              "landcover": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([86.09175403970296, 23.70565776487796]),
            {
              "landcover": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([86.098963817535, 23.69748430038788]),
            {
              "landcover": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([86.13140781777913, 23.6792493432005]),
            {
              "landcover": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([86.13930424111898, 23.676733976901215]),
            {
              "landcover": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([86.13604267495687, 23.682865097414723]),
            {
              "landcover": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([85.76064409260673, 23.937634560494757]),
            {
              "landcover": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([85.76064409260673, 23.95018566025822]),
            {
              "landcover": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([85.74176134114188, 23.9526957336898]),
            {
              "landcover": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([85.74759782795829, 23.947047999780178]),
            {
              "landcover": 1,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([85.2898350181028, 23.598024294687928]),
            {
              "landcover": 1,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([85.28674511331765, 23.607147751858673]),
            {
              "landcover": 1,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([85.29944805521218, 23.612495690218914]),
            {
              "landcover": 1,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([85.30974773782937, 23.606203975382336]),
            {
              "landcover": 1,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([85.35370208541094, 23.671303306519626]),
            {
              "landcover": 1,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([85.35910941878497, 23.662734620699357]),
            {
              "landcover": 1,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([85.35215713301837, 23.663442148139758]),
            {
              "landcover": 1,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([85.3373942546004, 23.66084786214126]),
            {
              "landcover": 1,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([85.36755513336614, 23.673559393441884]),
            {
              "landcover": 1,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([85.36933612015203, 23.673834520673086]),
            {
              "landcover": 1,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([85.35712670471624, 23.675721091797747]),
            {
              "landcover": 1,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([87.2316062424731, 23.53582112401814]),
            {
              "landcover": 1,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([87.25821375590084, 23.510795170398445]),
            {
              "landcover": 1,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([87.21684336405514, 23.54943387338518]),
            {
              "landcover": 1,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([87.29242552156391, 23.49004302039899]),
            {
              "landcover": 1,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([87.27731932039204, 23.48894096597617]),
            {
              "landcover": 1,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([87.32669730997291, 23.487119572491544]),
            {
              "landcover": 1,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([87.31725593424049, 23.489107227144817]),
            {
              "landcover": 1,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([87.31135507440773, 23.48650949426129]),
            {
              "landcover": 1,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([87.34954086564713, 23.427371770164005]),
            {
              "landcover": 1,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([87.3602697017067, 23.421268099923786]),
            {
              "landcover": 1,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([87.41336089843409, 23.407730550966953]),
            {
              "landcover": 1,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([87.4552127994596, 23.378910226431394]),
            {
              "landcover": 1,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([87.47770043984046, 23.369849750673218]),
            {
              "landcover": 1,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([87.45984765663734, 23.371583106979493]),
            {
              "landcover": 1,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([87.99382063710722, 23.088633365965055]),
            {
              "landcover": 1,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([87.99180361592802, 23.084290738288487]),
            {
              "landcover": 1,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([87.99163195455107, 23.080579654381697]),
            {
              "landcover": 1,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([87.35208719491584, 23.08864855042154]),
            {
              "landcover": 1,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([87.39980905770881, 23.112096312167644]),
            {
              "landcover": 1,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([87.49684033255971, 23.097132251106125]),
            {
              "landcover": 1,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([87.50318107467092, 23.09797109858845]),
            {
              "landcover": 1,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([87.50424322944082, 23.097793460735218]),
            {
              "landcover": 1,
              "system:index": "62"
            })]),
    Urban = /* color: #ff4b96 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([86.42618592998369, 23.787635265513238]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([86.4254800720675, 23.782642284692848]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([86.42569464878869, 23.784262205572894]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([86.42552298741174, 23.78778669096274]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([86.42882746891809, 23.78873897284512]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43421334461999, 23.78640243372315]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([86.42742199139428, 23.78794376886714]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43774003816195, 23.791899985103125]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([86.42529458833285, 23.788778121173586]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([86.42126054597445, 23.791998155708654]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([86.70979407154006, 23.794244777974765]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([86.70563128314895, 23.7861161412283]),
            {
              "landcover": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([86.82566484094376, 23.742337724981653]),
            {
              "landcover": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([86.81485017419571, 23.737820076546452]),
            {
              "landcover": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([86.85119218299846, 23.72988795590745]),
            {
              "landcover": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([86.85175008247356, 23.73200943512136]),
            {
              "landcover": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([86.8501192993925, 23.73287373156733]),
            {
              "landcover": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([86.87621913483055, 23.722907930361625]),
            {
              "landcover": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([86.88381515076073, 23.724283040752194]),
            {
              "landcover": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([86.891067843937, 23.7229472194312]),
            {
              "landcover": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([86.88441596558006, 23.717014435853674]),
            {
              "landcover": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([86.89201198151024, 23.71634648967243]),
            {
              "landcover": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([86.9527172733006, 23.673009284517303]),
            {
              "landcover": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([86.94838282353254, 23.67556402585018]),
            {
              "landcover": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([86.95070025212141, 23.679612205990082]),
            {
              "landcover": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([86.94739577061506, 23.679454997451685]),
            {
              "landcover": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([86.9454216647801, 23.677804296377886]),
            {
              "landcover": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([86.96533438450666, 23.675288902260142]),
            {
              "landcover": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([86.96769472843977, 23.681970311365546]),
            {
              "landcover": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([86.9752478290257, 23.680241038251996]),
            {
              "landcover": 2,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([86.98816534764143, 23.675996361749913]),
            {
              "landcover": 2,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([86.9767069507298, 23.674070490827347]),
            {
              "landcover": 2,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([87.13231658778578, 23.616084567738188]),
            {
              "landcover": 2,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([87.11515045009047, 23.612073744249066]),
            {
              "landcover": 2,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([87.11669540248305, 23.620881665986666]),
            {
              "landcover": 2,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([87.11901283107191, 23.607826856186797]),
            {
              "landcover": 2,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([87.11154556117445, 23.609871671318206]),
            {
              "landcover": 2,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([87.18965148768812, 23.616320494709047]),
            {
              "landcover": 2,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([87.1908531173268, 23.622297169615234]),
            {
              "landcover": 2,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([87.2810342604638, 23.557376436982967]),
            {
              "landcover": 2,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([87.26421144552239, 23.55942203827131]),
            {
              "landcover": 2,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([87.27639940328606, 23.5669747517605]),
            {
              "landcover": 2,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([87.30541017599114, 23.53817770430154]),
            {
              "landcover": 2,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([87.34042909688958, 23.497882730193957]),
            {
              "landcover": 2,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([87.31897142477044, 23.501503485913403]),
            {
              "landcover": 2,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([87.35605028219231, 23.517559551240346]),
            {
              "landcover": 2,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([87.55242698108484, 23.431593187247188]),
            {
              "landcover": 2,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([87.41146764086294, 23.306134450602595]),
            {
              "landcover": 2,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([87.41769036577749, 23.306528586268044]),
            {
              "landcover": 2,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([87.40816315935659, 23.30633151858132]),
            {
              "landcover": 2,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([87.86542558320647, 23.22263946636253]),
            {
              "landcover": 2,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([87.85092019685393, 23.237073113495164]),
            {
              "landcover": 2,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([87.86834382661468, 23.217670144803826]),
            {
              "landcover": 2,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([85.35081797396975, 24.01261380009953]),
            {
              "landcover": 2,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([85.3480713919385, 23.992541181994714]),
            {
              "landcover": 2,
              "system:index": "54"
            })]),
    Agriculture = /* color: #38ff06 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([87.99203088337384, 23.146737205278008]),
            {
              "landcover": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([87.98396279865705, 23.146165023782128]),
            {
              "landcover": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([87.98492839390241, 23.147348844865455]),
            {
              "landcover": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([87.9911940341612, 23.144566848733383]),
            {
              "landcover": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([87.9925458675047, 23.145375803917492]),
            {
              "landcover": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([87.99359729343854, 23.147565877596485]),
            {
              "landcover": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([87.99582889133893, 23.147861830754206]),
            {
              "landcover": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([87.98810412937604, 23.14612556289927]),
            {
              "landcover": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([87.98902680927716, 23.14438927255169]),
            {
              "landcover": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([87.9917519336363, 23.142810807263864]),
            {
              "landcover": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([87.99048593098127, 23.14290946188889]),
            {
              "landcover": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([87.98673083836042, 23.147408035645128]),
            {
              "landcover": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([87.99754550510846, 23.146046641098682]),
            {
              "landcover": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([87.9588767113333, 23.036839531591713]),
            {
              "landcover": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([87.95939169546416, 23.040670297445203]),
            {
              "landcover": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([87.96818934103301, 23.044185028023218]),
            {
              "landcover": 3,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([87.95870504995635, 23.032653209313025]),
            {
              "landcover": 3,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([87.95119486471465, 23.032416243785576]),
            {
              "landcover": 3,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([87.95050821920684, 23.039604012735058]),
            {
              "landcover": 3,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([87.95694552084258, 23.041223182490807]),
            {
              "landcover": 3,
              "system:index": "19"
            })]),
    Fallowland = /* color: #ffc82d */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([85.32284401415536, 23.421740965699417]),
            {
              "landcover": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([85.32825134752939, 23.420894308349627]),
            {
              "landcover": 4,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([85.3243460512037, 23.4223907223155]),
            {
              "landcover": 4,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([85.32655619143198, 23.421288103139954]),
            {
              "landcover": 4,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([85.32777927874277, 23.421918172365803]),
            {
              "landcover": 4,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([85.32475374697397, 23.419732606887532]),
            {
              "landcover": 4,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([85.30141616775953, 23.42564594450843]),
            {
              "landcover": 4,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([85.30177021934949, 23.42708323818178]),
            {
              "landcover": 4,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([85.29095555260145, 23.428983198308266]),
            {
              "landcover": 4,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([85.29172802879773, 23.428599270742758]),
            {
              "landcover": 4,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([85.28988266899549, 23.428422073028845]),
            {
              "landcover": 4,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([85.29390598251783, 23.429327747738412]),
            {
              "landcover": 4,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([85.29475356056653, 23.42937696901226]),
            {
              "landcover": 4,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([85.28871361692845, 23.41608636218068]),
            {
              "landcover": 4,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([85.29570881803929, 23.41742530834893]),
            {
              "landcover": 4,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([85.28356377561985, 23.416007600219366]),
            {
              "landcover": 4,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([85.10731458538918, 23.74016129353012]),
            {
              "landcover": 4,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([85.10564088696388, 23.741968339228812]),
            {
              "landcover": 4,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([85.10598420971779, 23.740436280362136]),
            {
              "landcover": 4,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([85.11572599285988, 23.74416818711508]),
            {
              "landcover": 4,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([85.11761426800636, 23.742479021513606]),
            {
              "landcover": 4,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([85.12396573895363, 23.738275653902893]),
            {
              "landcover": 4,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([85.12379407757668, 23.74224332224633]),
            {
              "landcover": 4,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([85.12400865429787, 23.73277571578067]),
            {
              "landcover": 4,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([85.12521028393654, 23.736900691136203]),
            {
              "landcover": 4,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([85.12117624157814, 23.734150722074446]),
            {
              "landcover": 4,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([85.915528434451, 23.6738222608472]),
            {
              "landcover": 4,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([85.8990489422635, 23.680818159312555]),
            {
              "landcover": 4,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([85.91797460907259, 23.678774452422964]),
            {
              "landcover": 4,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([85.92565645569124, 23.680818159312555]),
            {
              "landcover": 4,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([85.90243925445833, 23.67240731449801]),
            {
              "landcover": 4,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([86.07866048990837, 23.606536027702848]),
            {
              "landcover": 4,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([86.11549363884828, 23.597769294222267]),
            {
              "landcover": 4,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([86.11626611504457, 23.59780862090724]),
            {
              "landcover": 4,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([86.24603018165116, 23.446497687120097]),
            {
              "landcover": 4,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([86.26559957862382, 23.435158090160247]),
            {
              "landcover": 4,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([86.26594290137773, 23.430747984136346]),
            {
              "landcover": 4,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([85.33367282748421, 23.49098520699092]),
            {
              "landcover": 4,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([85.31290180087288, 23.494842297351926]),
            {
              "landcover": 4,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([85.3402817904969, 23.48909597869915]),
            {
              "landcover": 4,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([84.85802851105012, 23.764125475417465]),
            {
              "landcover": 4,
              "system:index": "40"
            })]),
    Mining = /* color: #8096ac */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([86.23560190893181, 23.789544534598775]),
            {
              "landcover": 5,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([86.22547388769158, 23.78404676270966]),
            {
              "landcover": 5,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([86.34546519018181, 23.797712223419317]),
            {
              "landcover": 5,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([86.35301829076775, 23.801638814136982]),
            {
              "landcover": 5,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([86.3942170212365, 23.77163665155412]),
            {
              "landcover": 5,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([86.38237238622673, 23.793942584679204]),
            {
              "landcover": 5,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([86.36881113744744, 23.798811680783494]),
            {
              "landcover": 5,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([86.3418603012658, 23.782790096487965]),
            {
              "landcover": 5,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([86.39404535985955, 23.765823913835224]),
            {
              "landcover": 5,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([86.4052033493615, 23.77634949146598]),
            {
              "landcover": 5,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([86.42872095800408, 23.763310217093192]),
            {
              "landcover": 5,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([86.41567469335564, 23.75749710740825]),
            {
              "landcover": 5,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([86.32726908422478, 23.801795875297003]),
            {
              "landcover": 5,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([86.21517420507439, 23.78593173926607]),
            {
              "landcover": 5,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([86.20126963354119, 23.7771349481819]),
            {
              "landcover": 5,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([86.18599177099236, 23.77634949146598]),
            {
              "landcover": 5,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([86.18616343236931, 23.772265040075276]),
            {
              "landcover": 5,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([86.19148493505486, 23.77383599809705]),
            {
              "landcover": 5,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([86.20264292455681, 23.776192399553523]),
            {
              "landcover": 5,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([86.20624781347283, 23.78090507438049]),
            {
              "landcover": 5,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43747568822869, 23.726759097074606]),
            {
              "landcover": 5,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43610239721306, 23.736816415248338]),
            {
              "landcover": 5,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([86.42065287328728, 23.75127245011014]),
            {
              "landcover": 5,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([86.44846201635369, 23.720472879138974]),
            {
              "landcover": 5,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([86.44125223852166, 23.720472879138974]),
            {
              "landcover": 5,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([86.399710185299, 23.67646087124872]),
            {
              "landcover": 5,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([87.07764621186445, 23.79086119489002]),
            {
              "landcover": 5,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([86.84933658051679, 23.75944254260397]),
            {
              "landcover": 5,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([86.9434070150871, 23.786777199351278]),
            {
              "landcover": 5,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([87.22505785755575, 23.69084499888403]),
            {
              "landcover": 5,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([87.24926211170614, 23.71261468054435]),
            {
              "landcover": 5,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([87.21733309559286, 23.57265964547439]),
            {
              "landcover": 5,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([87.23243929676474, 23.557239727714585]),
            {
              "landcover": 5,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([86.39275118498004, 23.76368889166558]),
            {
              "landcover": 5,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([85.86918398527301, 23.753005169932084]),
            {
              "landcover": 5,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([85.86094423917926, 23.802017377090884]),
            {
              "landcover": 5,
              "system:index": "35"
            })]),
    DenseVegetation = /* color: #29ae08 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([86.14087176783893, 23.975985521347564]),
            {
              "landcover": 6,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([86.11649585231159, 23.971593654291304]),
            {
              "landcover": 6,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([86.12027240260456, 23.958417155062968]),
            {
              "landcover": 6,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([86.14705157740924, 23.959044637947983]),
            {
              "landcover": 6,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([86.16009784205768, 23.96751535799033]),
            {
              "landcover": 6,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([86.14567828639362, 23.95402468936937]),
            {
              "landcover": 6,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([86.13434863551471, 23.94523930918025]),
            {
              "landcover": 6,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([86.38016772731159, 23.956848434490883]),
            {
              "landcover": 6,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([86.12919879420612, 23.976926616239755]),
            {
              "landcover": 6,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([86.13709521754596, 23.990101222794905]),
            {
              "landcover": 6,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([86.1116893337569, 23.96720163754465]),
            {
              "landcover": 6,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([86.15941119654987, 23.95653468808632]),
            {
              "landcover": 6,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([86.14361834987018, 23.948063246636252]),
            {
              "landcover": 6,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([86.11889911158893, 23.955279694834516]),
            {
              "landcover": 6,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([85.72090751231595, 23.762641099573887]),
            {
              "landcover": 6,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([85.68794852794095, 23.775837533539484]),
            {
              "landcover": 6,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([85.69893485606595, 23.772067260430436]),
            {
              "landcover": 6,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([85.68039542735501, 23.76578322907094]),
            {
              "landcover": 6,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([85.73395377696438, 23.767040059625003]),
            {
              "landcover": 6,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([85.7071746021597, 23.76452638637678]),
            {
              "landcover": 6,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([85.0095427662222, 23.76452638637678]),
            {
              "landcover": 6,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([85.0040496021597, 23.782749417030427]),
            {
              "landcover": 6,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([85.1303923755972, 23.772067260430436]),
            {
              "landcover": 6,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([85.18875724376126, 23.768296878038484]),
            {
              "landcover": 6,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([86.7603889207695, 23.62111440599761]),
            {
              "landcover": 6,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([86.77000195787888, 23.62111440599761]),
            {
              "landcover": 6,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([86.76244885729294, 23.612306499904104]),
            {
              "landcover": 6,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([86.74734265612106, 23.61985616994613]),
            {
              "landcover": 6,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([86.49465710924606, 23.812225488357825]),
            {
              "landcover": 6,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([86.50289685533981, 23.800289257463145]),
            {
              "landcover": 6,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([86.94234998033981, 23.570775543778474]),
            {
              "landcover": 6,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([87.43752733354339, 23.58839877806446]),
            {
              "landcover": 6,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([87.44851366166839, 23.57628473300039]),
            {
              "landcover": 6,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([87.4737478840805, 23.556459339175017]),
            {
              "landcover": 6,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([87.37418428544768, 23.589342682669542]),
            {
              "landcover": 6,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([87.48267453343163, 23.56142905678683]),
            {
              "landcover": 6,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([87.49125760227929, 23.552617143584474]),
            {
              "landcover": 6,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([87.54224103123437, 23.555921680278484]),
            {
              "landcover": 6,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([87.55803387791406, 23.545378344335937]),
            {
              "landcover": 6,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([87.53417294651757, 23.512956225495532]),
            {
              "landcover": 6,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([87.57828992039452, 23.567408232763057]),
            {
              "landcover": 6,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([87.5358895602871, 23.4913895213905]),
            {
              "landcover": 6,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([87.532627994125, 23.50052038175723]),
            {
              "landcover": 6,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([87.54241269261132, 23.50398364605709]),
            {
              "landcover": 6,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([87.57966321141015, 23.491861822784607]),
            {
              "landcover": 6,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([87.58567135960351, 23.498473864610872]),
            {
              "landcover": 6,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([87.61416714817773, 23.501307495273423]),
            {
              "landcover": 6,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([87.58017819554101, 23.47391318044184]),
            {
              "landcover": 6,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([85.76118585835475, 22.914871192600852]),
            {
              "landcover": 6,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([86.1978924013235, 22.892100776534]),
            {
              "landcover": 6,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([85.403101310595, 23.500013567061544]),
            {
              "landcover": 6,
              "system:index": "50"
            })]),
    Barren = /* color: #efff00 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([84.84879637362546, 23.75279498058234]),
            {
              "landcover": 7,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([84.85454702975339, 23.763127761841577]),
            {
              "landcover": 7,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([84.84514856936521, 23.76281354589406]),
            {
              "landcover": 7,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([85.83703591431546, 23.726856286669523]),
            {
              "landcover": 7,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([85.83750798310209, 23.72722952104848]),
            {
              "landcover": 7,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([85.83782984818387, 23.72783848010941]),
            {
              "landcover": 7,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([85.83874179924894, 23.72727863075562]),
            {
              "landcover": 7,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([85.83899929131437, 23.728133136698236]),
            {
              "landcover": 7,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([85.83940698708463, 23.728712626046523]),
            {
              "landcover": 7,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([85.83908512200284, 23.728948349790038]),
            {
              "landcover": 7,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([85.83987176285946, 23.730761797488242]),
            {
              "landcover": 7,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([85.83973228799069, 23.731468956321855]),
            {
              "landcover": 7,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([85.84037601815426, 23.73087965756028]),
            {
              "landcover": 7,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([85.83985030518734, 23.731085912429933]),
            {
              "landcover": 7,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([85.8394640670892, 23.731085912429933]),
            {
              "landcover": 7,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([85.83605229722225, 23.732378753334007]),
            {
              "landcover": 7,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([85.83662092553341, 23.732476968849568]),
            {
              "landcover": 7,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([85.83637416230404, 23.732997509846356]),
            {
              "landcover": 7,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([85.83637416230404, 23.732408217996444]),
            {
              "landcover": 7,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([85.83640634881222, 23.732162678939215]),
            {
              "landcover": 7,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([85.83642780648434, 23.732771614952156]),
            {
              "landcover": 7,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([85.83596646653378, 23.732879651689533]),
            {
              "landcover": 7,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([85.83671748505795, 23.73221178678767]),
            {
              "landcover": 7,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([85.84030091630184, 23.730748364963183]),
            {
              "landcover": 7,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([85.84037601815426, 23.731337664318392]),
            {
              "landcover": 7,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([85.8433500158016, 23.73820868177762]),
            {
              "landcover": 7,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([85.84309252373617, 23.73881758953716]),
            {
              "landcover": 7,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([85.84366115204733, 23.739760408840436]),
            {
              "landcover": 7,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([85.84346803299826, 23.739760408840436]),
            {
              "landcover": 7,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([85.84357532135886, 23.73917114757545]),
            {
              "landcover": 7,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([85.84339293114584, 23.738640810158195]),
            {
              "landcover": 7,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([85.84293159119528, 23.738041722701272]),
            {
              "landcover": 7,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([85.84316762558859, 23.738434567246255]),
            {
              "landcover": 7,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([85.84337147347372, 23.738964905503053]),
            {
              "landcover": 7,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([85.84327491394919, 23.73945595751964]),
            {
              "landcover": 7,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([85.84744454285146, 23.745609742348552]),
            {
              "landcover": 7,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([85.84733725449087, 23.746022205125914]),
            {
              "landcover": 7,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([85.84700466057302, 23.745118713529497]),
            {
              "landcover": 7,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([85.84409714600088, 23.74461786222696]),
            {
              "landcover": 7,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([85.84404350182058, 23.74401880225722]),
            {
              "landcover": 7,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([85.84685445686819, 23.74481427473203]),
            {
              "landcover": 7,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([85.8479380693102, 23.74545261332788]),
            {
              "landcover": 7,
              "system:index": "41"
            })]),
    shape = ee.FeatureCollection("users/viveksinghenv/Damodar_Basin");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var classNames = Water.merge(Urban).merge(Agriculture).merge(Fallowland).merge(Mining).merge(DenseVegetation).merge(Barren);
//Visualize the data
Map.centerObject(shape,10);
Map.addLayer(shape,undefined,"Damodar Basin");

var dataset1 = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR')
                  .filterDate('2000-03-01', '2000-07-30')
                  .filter(ee.Filter.lt("CLOUD_COVER", 10))
                  .filterBounds(shape);
var visParams = {
  bands: ['B3', 'B2', 'B1'],
  min: 0,
  max: 3000,
  gamma: 1.4,
};
var dataset= dataset1.median()
Map.addLayer(dataset, visParams,  'Landsat 5 TCC');
print(dataset);
var visParams1 = {
  bands: ['B4', 'B3', 'B2'],
  min: 0,
  max: 3000,
  gamma: 1.4,
};
Map.addLayer(dataset, visParams1,  'Landsat 5 SFCC');
// // Map.addLayer(roi)
// print(classNames)
// Creating training data sets
var bands = ['B1', 'B2', 'B3', 'B4', 'B5','B7'];
var training =dataset.select(bands).sampleRegions({
  collection: classNames,
  properties: ['landcover'],
  scale: 30
});
print(training);

var classifier = ee.Classifier.svm().train({ //ee.Classifier.decisionTree(treeString)
  features: training,
  classProperty: 'landcover',
  inputProperties: bands
});
//Run the classification
var classified = dataset.select(bands).classify(classifier);
//Display classification
Map.centerObject(classNames, 7);
Map.addLayer(classified,
{min: 1, max: 7,palette: ['1E90FF', '708090', '7CFC00','EEDD82','000000','228B22','FFE4E1']},
'classification');
// var medianpixelsclipped1 = classified.clip(shape1);
// Export.image.toDrive({
//   image: medianpixelsclipped1,
//   description: 'Landsat_2000',
//   scale: 30,
//   maxPixels: 1e9,
//   region: shape1
// });
// Map.addLayer(medianpixelsclipped1,
// {min: 1, max: 7,palette: ['1E90FF', '708090', '7CFC00','EEDD82','000000','228B22','B8860B']},
// 'classificationcliped');