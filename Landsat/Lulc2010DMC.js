/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var ZSXC = ee.FeatureCollection("projects/landsat-325606/assets/lulc2010dhn"),
    gaul = ee.FeatureCollection("FAO/GAUL/2015/level2"),
    water = 
    /* color: #d63000 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([86.68117652075676, 23.68609661207135]),
            {
              "lulc1": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([86.68735633032708, 23.688926192943406]),
            {
              "lulc1": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([86.69731269019036, 23.68924058703373]),
            {
              "lulc1": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([86.70177588599114, 23.692070099785255]),
            {
              "lulc1": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([86.71138892310051, 23.695213930930397]),
            {
              "lulc1": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([86.7213452829638, 23.69584268807514]),
            {
              "lulc1": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([86.72649512427239, 23.69613486368491]),
            {
              "lulc1": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([86.72889838354973, 23.694562968663128]),
            {
              "lulc1": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([86.73164496558098, 23.69299105471565]),
            {
              "lulc1": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([86.73576483862786, 23.692362283837678]),
            {
              "lulc1": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([86.74160132544426, 23.694248587387655]),
            {
              "lulc1": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([86.74503455298333, 23.692362283837678]),
            {
              "lulc1": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([86.74400458472161, 23.6876464057429]),
            {
              "lulc1": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([86.74160132544426, 23.683559173644703]),
            {
              "lulc1": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([86.74263129370598, 23.679786230501154]),
            {
              "lulc1": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([86.73404822485833, 23.690790343395836]),
            {
              "lulc1": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([86.72580847876458, 23.69299105471565]),
            {
              "lulc1": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([86.71722540991692, 23.694248587387655]),
            {
              "lulc1": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([86.7107022775927, 23.69299105471565]),
            {
              "lulc1": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([86.70623908179192, 23.691104732998106]),
            {
              "lulc1": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([86.70040259497551, 23.69016156192049]),
            {
              "lulc1": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([86.69353613989739, 23.68733200781475]),
            {
              "lulc1": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([86.68804297583489, 23.686074408533713]),
            {
              "lulc1": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([86.68014655249505, 23.684502392403992]),
            {
              "lulc1": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([86.67534003394036, 23.683873580654566]),
            {
              "lulc1": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([86.66710028784661, 23.683559173644703]),
            {
              "lulc1": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([86.66332373755364, 23.681987127244106]),
            {
              "lulc1": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([86.66950354712395, 23.682301538037695]),
            {
              "lulc1": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([86.67293677466301, 23.68293035735469]),
            {
              "lulc1": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([86.68598303931145, 23.684187986907666]),
            {
              "lulc1": 1,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([86.71516547339348, 23.69550610794733]),
            {
              "lulc1": 1,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([86.66470230502242, 23.67919796285599]),
            {
              "lulc1": 1,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([86.66384399813765, 23.691302490561895]),
            {
              "lulc1": 1,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([86.66041077059859, 23.6880013669861]),
            {
              "lulc1": 1,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([86.66504562777632, 23.68878735635888]),
            {
              "lulc1": 1,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([86.66762054843062, 23.689573341001104]),
            {
              "lulc1": 1,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([86.66247070712203, 23.68847296117742]),
            {
              "lulc1": 1,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([86.65972412509078, 23.681084456543058]),
            {
              "lulc1": 1,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([86.65234268588179, 23.67715423062265]),
            {
              "lulc1": 1,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([86.64959610385054, 23.677311441929376]),
            {
              "lulc1": 1,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([86.64805115145796, 23.68595777247878]),
            {
              "lulc1": 1,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([86.66865051669234, 23.68045562834076]),
            {
              "lulc1": 1,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([86.67036713046187, 23.679826797111712]),
            {
              "lulc1": 1,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([86.67362869662398, 23.680298420817252]),
            {
              "lulc1": 1,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([86.67671860140914, 23.683128127296374]),
            {
              "lulc1": 1,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([86.67088211459273, 23.68847296117742]),
            {
              "lulc1": 1,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([86.71688736361617, 23.70214845182504]),
            {
              "lulc1": 1,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([86.7218655435478, 23.701519725053828]),
            {
              "lulc1": 1,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([86.72718704623335, 23.700890995253847]),
            {
              "lulc1": 1,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([86.72203720492476, 23.701205360532448]),
            {
              "lulc1": 1,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([86.71808899325484, 23.701362542887793]),
            {
              "lulc1": 1,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([86.72049225253218, 23.701205360532448]),
            {
              "lulc1": 1,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([86.73027695101851, 23.701362542887793]),
            {
              "lulc1": 1,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([86.7240971414482, 23.70167690703058]),
            {
              "lulc1": 1,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([86.732165226165, 23.70026226242513]),
            {
              "lulc1": 1,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([86.73353851718062, 23.69821885981542]),
            {
              "lulc1": 1,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([86.73697174471968, 23.698376045767247]),
            {
              "lulc1": 1,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([86.71465576571578, 23.701205360532448]),
            {
              "lulc1": 1,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([86.70813263339156, 23.69900478768178]),
            {
              "lulc1": 1,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([86.70572937411421, 23.69617542521752]),
            {
              "lulc1": 1,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([86.69800461215132, 23.698847602487074]),
            {
              "lulc1": 1,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([86.69628799838179, 23.70450615024085]),
            {
              "lulc1": 1,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([86.68461502474898, 23.696961365386773]),
            {
              "lulc1": 1,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([86.68427170199507, 23.69460353068412]),
            {
              "lulc1": 1,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([86.68427170199507, 23.69256003949689]),
            {
              "lulc1": 1,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([86.67895019930953, 23.692088460065573]),
            {
              "lulc1": 1,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([86.67860687655562, 23.691302490561895]),
            {
              "lulc1": 1,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([86.6750019876396, 23.690830906588833]),
            {
              "lulc1": 1,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([86.67706192416304, 23.690516516327282]),
            {
              "lulc1": 1,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([86.6724270669853, 23.688315763302864]),
            {
              "lulc1": 1,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([86.66504562777632, 23.688630158862754]),
            {
              "lulc1": 1,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([86.66384399813765, 23.6880013669861]),
            {
              "lulc1": 1,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([86.66487396639937, 23.686743774150415]),
            {
              "lulc1": 1,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([86.66212738436812, 23.687372572081962]),
            {
              "lulc1": 1,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([86.65680588168257, 23.687372572081962]),
            {
              "lulc1": 1,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([86.65251434725874, 23.686743774150415]),
            {
              "lulc1": 1,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([86.64650619906539, 23.684071349168207]),
            {
              "lulc1": 1,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([86.66573227328414, 23.67856912557366]),
            {
              "lulc1": 1,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([86.67156876010054, 23.679512380362187]),
            {
              "lulc1": 1,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([86.66847885531539, 23.67935517170367]),
            {
              "lulc1": 1,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([86.67671860140914, 23.681713281718554]),
            {
              "lulc1": 1,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([86.67929352206343, 23.682813718492273]),
            {
              "lulc1": 1,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([86.69354141635054, 23.69523229076861]),
            {
              "lulc1": 1,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([86.69422806185835, 23.693346001430832]),
            {
              "lulc1": 1,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([86.69731796664351, 23.69523229076861]),
            {
              "lulc1": 1,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([86.7160290567314, 23.700890995253847]),
            {
              "lulc1": 1,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([86.71774567050093, 23.70041944591625]),
            {
              "lulc1": 1,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([86.71963394564742, 23.700890995253847]),
            {
              "lulc1": 1,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([86.72512710970992, 23.700890995253847]),
            {
              "lulc1": 1,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([86.72838867587203, 23.700890995253847]),
            {
              "lulc1": 1,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([86.7299336282646, 23.699790710816046]),
            {
              "lulc1": 1,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([86.73233688754195, 23.6975901141153]),
            {
              "lulc1": 1,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([86.73645676058882, 23.69821885981542]),
            {
              "lulc1": 1,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([86.74194992465132, 23.70026226242513]),
            {
              "lulc1": 1,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([86.69340663285779, 23.691772251789438]),
            {
              "lulc1": 1,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([86.69786982865857, 23.693815755306332]),
            {
              "lulc1": 1,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([86.70928531022595, 23.69703813817452]),
            {
              "lulc1": 1,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([86.7131476912074, 23.69546625402875]),
            {
              "lulc1": 1,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Point([86.71297602983044, 23.6982956318636]),
            {
              "lulc1": 1,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Point([86.71889834733533, 23.69703813817452]),
            {
              "lulc1": 1,
              "system:index": "99"
            }),
        ee.Feature(
            ee.Geometry.Point([86.72361903520154, 23.69703813817452]),
            {
              "lulc1": 1,
              "system:index": "100"
            }),
        ee.Feature(
            ee.Geometry.Point([86.7273955854945, 23.69090768298151]),
            {
              "lulc1": 1,
              "system:index": "101"
            }),
        ee.Feature(
            ee.Geometry.Point([86.73074298234509, 23.692165235718832]),
            {
              "lulc1": 1,
              "system:index": "102"
            }),
        ee.Feature(
            ee.Geometry.Point([86.73151545854138, 23.696959544416753]),
            {
              "lulc1": 1,
              "system:index": "103"
            }),
        ee.Feature(
            ee.Geometry.Point([86.69623904557751, 23.69247962201077]),
            {
              "lulc1": 1,
              "system:index": "104"
            }),
        ee.Feature(
            ee.Geometry.Point([86.69134669633435, 23.689885912464735]),
            {
              "lulc1": 1,
              "system:index": "105"
            }),
        ee.Feature(
            ee.Geometry.Point([86.67392306657361, 23.687056352386467]),
            {
              "lulc1": 1,
              "system:index": "106"
            }),
        ee.Feature(
            ee.Geometry.Point([86.67521052690076, 23.68226168008915]),
            {
              "lulc1": 1,
              "system:index": "107"
            }),
        ee.Feature(
            ee.Geometry.Point([86.66842990251111, 23.68524854579671]),
            {
              "lulc1": 1,
              "system:index": "108"
            }),
        ee.Feature(
            ee.Geometry.Point([86.69108920426892, 23.6878423474467]),
            {
              "lulc1": 1,
              "system:index": "109"
            }),
        ee.Feature(
            ee.Geometry.Point([86.69460826249646, 23.691300669512948]),
            {
              "lulc1": 1,
              "system:index": "110"
            }),
        ee.Feature(
            ee.Geometry.Point([86.69306331010388, 23.690357499850556]),
            {
              "lulc1": 1,
              "system:index": "111"
            }),
        ee.Feature(
            ee.Geometry.Point([86.69761233659314, 23.692636814872873]),
            {
              "lulc1": 1,
              "system:index": "112"
            }),
        ee.Feature(
            ee.Geometry.Point([86.69967227311658, 23.693108392323687]),
            {
              "lulc1": 1,
              "system:index": "113"
            }),
        ee.Feature(
            ee.Geometry.Point([86.70190387101697, 23.6947588999884]),
            {
              "lulc1": 1,
              "system:index": "114"
            }),
        ee.Feature(
            ee.Geometry.Point([86.70370631547497, 23.69507328003504]),
            {
              "lulc1": 1,
              "system:index": "115"
            }),
        ee.Feature(
            ee.Geometry.Point([86.70739703507947, 23.697745479865187]),
            {
              "lulc1": 1,
              "system:index": "116"
            }),
        ee.Feature(
            ee.Geometry.Point([86.70816951127576, 23.696566574918105]),
            {
              "lulc1": 1,
              "system:index": "117"
            }),
        ee.Feature(
            ee.Geometry.Point([86.70980029435681, 23.687606549425325]),
            {
              "lulc1": 1,
              "system:index": "118"
            }),
        ee.Feature(
            ee.Geometry.Point([86.71452098222302, 23.69208663902759]),
            {
              "lulc1": 1,
              "system:index": "119"
            }),
        ee.Feature(
            ee.Geometry.Point([86.71967082353162, 23.693737159608624]),
            {
              "lulc1": 1,
              "system:index": "120"
            }),
        ee.Feature(
            ee.Geometry.Point([86.72104411454724, 23.699553113438785]),
            {
              "lulc1": 1,
              "system:index": "121"
            }),
        ee.Feature(
            ee.Geometry.Point([86.72507815690564, 23.69939592890438]),
            {
              "lulc1": 1,
              "system:index": "122"
            }),
        ee.Feature(
            ee.Geometry.Point([86.72224574418591, 23.699946073946666]),
            {
              "lulc1": 1,
              "system:index": "123"
            }),
        ee.Feature(
            ee.Geometry.Point([86.71632342668103, 23.698138445814944]),
            {
              "lulc1": 1,
              "system:index": "124"
            }),
        ee.Feature(
            ee.Geometry.Point([86.71829753251599, 23.700024665906266]),
            {
              "lulc1": 1,
              "system:index": "125"
            }),
        ee.Feature(
            ee.Geometry.Point([86.72421985002087, 23.696173604236535]),
            {
              "lulc1": 1,
              "system:index": "126"
            }),
        ee.Feature(
            ee.Geometry.Point([86.7189841780238, 23.692636814872873]),
            {
              "lulc1": 1,
              "system:index": "127"
            }),
        ee.Feature(
            ee.Geometry.Point([86.72241740556287, 23.695780632372035]),
            {
              "lulc1": 1,
              "system:index": "128"
            }),
        ee.Feature(
            ee.Geometry.Point([86.72765307755994, 23.699474521195253]),
            {
              "lulc1": 1,
              "system:index": "129"
            }),
        ee.Feature(
            ee.Geometry.Point([86.72885470719861, 23.697902666387044]),
            {
              "lulc1": 1,
              "system:index": "130"
            }),
        ee.Feature(
            ee.Geometry.Point([86.73117213578747, 23.696723762859524]),
            {
              "lulc1": 1,
              "system:index": "131"
            }),
        ee.Feature(
            ee.Geometry.Point([86.7299705061488, 23.691222072301272]),
            {
              "lulc1": 1,
              "system:index": "132"
            }),
        ee.Feature(
            ee.Geometry.Point([86.73185878129529, 23.68949292167559]),
            {
              "lulc1": 1,
              "system:index": "133"
            }),
        ee.Feature(
            ee.Geometry.Point([86.73340373368787, 23.688628337776535]),
            {
              "lulc1": 1,
              "system:index": "134"
            }),
        ee.Feature(
            ee.Geometry.Point([86.73306041093396, 23.694287328499016]),
            {
              "lulc1": 1,
              "system:index": "135"
            }),
        ee.Feature(
            ee.Geometry.Point([86.73477702470349, 23.696723762859524]),
            {
              "lulc1": 1,
              "system:index": "136"
            }),
        ee.Feature(
            ee.Geometry.Point([86.73589282365369, 23.697666886533266]),
            {
              "lulc1": 1,
              "system:index": "137"
            }),
        ee.Feature(
            ee.Geometry.Point([86.73829608293103, 23.69680235675925]),
            {
              "lulc1": 1,
              "system:index": "138"
            }),
        ee.Feature(
            ee.Geometry.Point([86.73597865434216, 23.69625219846748]),
            {
              "lulc1": 1,
              "system:index": "139"
            }),
        ee.Feature(
            ee.Geometry.Point([86.73752360673474, 23.69507328003504]),
            {
              "lulc1": 1,
              "system:index": "140"
            }),
        ee.Feature(
            ee.Geometry.Point([86.73855357499646, 23.693894350956732]),
            {
              "lulc1": 1,
              "system:index": "141"
            }),
        ee.Feature(
            ee.Geometry.Point([86.74027018876599, 23.694837495071038]),
            {
              "lulc1": 1,
              "system:index": "142"
            }),
        ee.Feature(
            ee.Geometry.Point([86.74164347978162, 23.69892437416546]),
            {
              "lulc1": 1,
              "system:index": "143"
            }),
        ee.Feature(
            ee.Geometry.Point([86.7354636702113, 23.701203539621623]),
            {
              "lulc1": 1,
              "system:index": "144"
            })]),
    urban = /* color: #98ff00 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([86.42226124731052, 23.7936375390712]),
            {
              "lulc1": 7,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([86.4201154800986, 23.79245950177175]),
            {
              "lulc1": 7,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([86.41153241125095, 23.796935986693416]),
            {
              "lulc1": 7,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([86.41247654882419, 23.794422891337806]),
            {
              "lulc1": 7,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([86.41419316259372, 23.799291969442766]),
            {
              "lulc1": 7,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([86.44002819982516, 23.796700386068693]),
            {
              "lulc1": 7,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([86.44191647497165, 23.79905637309044]),
            {
              "lulc1": 7,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([86.44526387182223, 23.79944903344028]),
            {
              "lulc1": 7,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([86.44595051733005, 23.79662185243217]),
            {
              "lulc1": 7,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([86.44431973424899, 23.7946584960922]),
            {
              "lulc1": 7,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([86.44509221044528, 23.79285218205816]),
            {
              "lulc1": 7,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43058682409274, 23.784841269435564]),
            {
              "lulc1": 7,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([86.4296426865195, 23.78429148281819]),
            {
              "lulc1": 7,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([86.42578030553805, 23.788061401501174]),
            {
              "lulc1": 7,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([86.42972851720798, 23.78821847907359]),
            {
              "lulc1": 7,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([86.41745472875583, 23.78774724578687]),
            {
              "lulc1": 7,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([86.42028714147555, 23.789082402328713]),
            {
              "lulc1": 7,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([86.42586613622653, 23.800784069752186]),
            {
              "lulc1": 7,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43959904638278, 23.79536530779225]),
            {
              "lulc1": 7,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([86.4409723373984, 23.78625499577505]),
            {
              "lulc1": 7,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([86.4256086441611, 23.783898776667996]),
            {
              "lulc1": 7,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([86.41530896154391, 23.787825784786637]),
            {
              "lulc1": 7,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([86.41891385045993, 23.78798286264379]),
            {
              "lulc1": 7,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43032933202731, 23.805731437618686]),
            {
              "lulc1": 7,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43487835851657, 23.808479893891242]),
            {
              "lulc1": 7,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([86.44431973424899, 23.80510321087488]),
            {
              "lulc1": 7,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([86.4464655014609, 23.80502468231824]),
            {
              "lulc1": 7,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([86.44629384008395, 23.80306145297087]),
            {
              "lulc1": 7,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([86.45831013647067, 23.80227615292304]),
            {
              "lulc1": 7,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([86.45573521581638, 23.804003806761067]),
            {
              "lulc1": 7,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([86.45384694066989, 23.805652909441903]),
            {
              "lulc1": 7,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([86.45281697240817, 23.81138534155524]),
            {
              "lulc1": 7,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([86.42578030553805, 23.805967021864152]),
            {
              "lulc1": 7,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([86.42826939550388, 23.807537572579307]),
            {
              "lulc1": 7,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([86.457108506832, 23.81177796463147]),
            {
              "lulc1": 7,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([86.44852543798434, 23.814290724203584]),
            {
              "lulc1": 7,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43710995641696, 23.81978721620247]),
            {
              "lulc1": 7,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43324757543552, 23.817353084173874]),
            {
              "lulc1": 7,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([86.44002819982516, 23.819630176804015]),
            {
              "lulc1": 7,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([86.4626016708945, 23.815861174238627]),
            {
              "lulc1": 7,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([86.4692106339072, 23.818844976961508]),
            {
              "lulc1": 7,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([86.44974017081475, 23.815988792376253]),
            {
              "lulc1": 7,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([86.4583232396624, 23.81626361890887]),
            {
              "lulc1": 7,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([86.4698674672625, 23.820621504726756]),
            {
              "lulc1": 7,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([86.42437322410856, 23.78245629364409]),
            {
              "lulc1": 7,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([86.42368657860075, 23.783241713472673]),
            {
              "lulc1": 7,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43119676384245, 23.78430202271469]),
            {
              "lulc1": 7,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([86.42965181144987, 23.78375223381682]),
            {
              "lulc1": 7,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([86.42172557857847, 23.78443979337194]),
            {
              "lulc1": 7,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([86.4150307848773, 23.782751150436123]),
            {
              "lulc1": 7,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([86.41657573726988, 23.783379485253576]),
            {
              "lulc1": 7,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([86.42138225582457, 23.781573014468695]),
            {
              "lulc1": 7,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([86.42327053097105, 23.78106248556748]),
            {
              "lulc1": 7,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43310781234119, 23.77916397487242]),
            {
              "lulc1": 7,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43555398696277, 23.78061703461772]),
            {
              "lulc1": 7,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43276448958729, 23.78332675130632]),
            {
              "lulc1": 7,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([86.42319436782215, 23.779203246970926]),
            {
              "lulc1": 7,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([86.42585511916492, 23.782934042241997]),
            {
              "lulc1": 7,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43388028853748, 23.788039167548686]),
            {
              "lulc1": 7,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([86.4378285002074, 23.782934042241997]),
            {
              "lulc1": 7,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([86.44400830977771, 23.79035604288826]),
            {
              "lulc1": 7,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([86.44465203994129, 23.794401839450888]),
            {
              "lulc1": 7,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([86.4413046430907, 23.796365199669]),
            {
              "lulc1": 7,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([86.4418625425658, 23.797857333592994]),
            {
              "lulc1": 7,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([86.44289251082752, 23.79899605584765]),
            {
              "lulc1": 7,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([86.44542451613758, 23.798956789729157]),
            {
              "lulc1": 7,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43581996835408, 23.79453647369005]),
            {
              "lulc1": 7,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([86.42929683602986, 23.79665689924688]),
            {
              "lulc1": 7,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43324504769978, 23.801682954925226]),
            {
              "lulc1": 7,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([86.45135532296834, 23.797599299497865]),
            {
              "lulc1": 7,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([86.4478362647408, 23.79885582253239]),
            {
              "lulc1": 7,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([86.45496021188436, 23.79791343139581]),
            {
              "lulc1": 7,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([86.45556102670369, 23.791080891234643]),
            {
              "lulc1": 7,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([86.44826541818318, 23.791080891234643]),
            {
              "lulc1": 7,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43753658212361, 23.79532182052361]),
            {
              "lulc1": 7,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43547664560018, 23.80113323955644]),
            {
              "lulc1": 7,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43255840219197, 23.798227562534205]),
            {
              "lulc1": 7,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([86.4419997779244, 23.796028628615378]),
            {
              "lulc1": 7,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([86.4368499366158, 23.794457938745637]),
            {
              "lulc1": 7,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([86.44955287851033, 23.798070497059943]),
            {
              "lulc1": 7,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([86.45195613778768, 23.796107162610447]),
            {
              "lulc1": 7,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([86.45547519601521, 23.797285166840382]),
            {
              "lulc1": 7,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([86.41513477243123, 23.79320137317969]),
            {
              "lulc1": 7,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([86.41384731210408, 23.79532182052361]),
            {
              "lulc1": 7,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([86.94196430668252, 23.688992524369436]),
            {
              "lulc1": 7,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([86.94342342838662, 23.691350460399384]),
            {
              "lulc1": 7,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([86.95234981998819, 23.688363734237516]),
            {
              "lulc1": 7,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([86.95252148136514, 23.68584854343532]),
            {
              "lulc1": 7,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([86.95458141788858, 23.685219738166463]),
            {
              "lulc1": 7,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([86.9559547089042, 23.688285135258138]),
            {
              "lulc1": 7,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([86.95054737553018, 23.685219738166463]),
            {
              "lulc1": 7,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([86.95320812687295, 23.684119321661804]),
            {
              "lulc1": 7,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([86.9394752167167, 23.691900639346585]),
            {
              "lulc1": 7,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([86.94076267704385, 23.693551162278855]),
            {
              "lulc1": 7,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([86.94582668766397, 23.691900639346585]),
            {
              "lulc1": 7,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([86.94393841251748, 23.690171497706523]),
            {
              "lulc1": 7,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([86.94187847599405, 23.68820653623149]),
            {
              "lulc1": 7,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([86.96419445499795, 23.683804915243417]),
            {
              "lulc1": 7,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Point([86.96676937565225, 23.68215426913142]),
            {
              "lulc1": 7,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Point([86.96307865604776, 23.697638081642623]),
            {
              "lulc1": 7,
              "system:index": "99"
            }),
        ee.Feature(
            ee.Geometry.Point([86.9643661163749, 23.697480894802165]),
            {
              "lulc1": 7,
              "system:index": "100"
            }),
        ee.Feature(
            ee.Geometry.Point([86.96754185184854, 23.697559488246053]),
            {
              "lulc1": 7,
              "system:index": "101"
            }),
        ee.Feature(
            ee.Geometry.Point([86.96960178837197, 23.69913134718674]),
            {
              "lulc1": 7,
              "system:index": "102"
            }),
        ee.Feature(
            ee.Geometry.Point([86.96960178837197, 23.700231637182846]),
            {
              "lulc1": 7,
              "system:index": "103"
            }),
        ee.Feature(
            ee.Geometry.Point([86.97166172489541, 23.699288532039763]),
            {
              "lulc1": 7,
              "system:index": "104"
            }),
        ee.Feature(
            ee.Geometry.Point([86.96908680424112, 23.697402301310948]),
            {
              "lulc1": 7,
              "system:index": "105"
            }),
        ee.Feature(
            ee.Geometry.Point([86.9709750793876, 23.696773551677836]),
            {
              "lulc1": 7,
              "system:index": "106"
            }),
        ee.Feature(
            ee.Geometry.Point([86.97784153446572, 23.696537769784662]),
            {
              "lulc1": 7,
              "system:index": "107"
            }),
        ee.Feature(
            ee.Geometry.Point([86.975009121746, 23.69339397051757]),
            {
              "lulc1": 7,
              "system:index": "108"
            }),
        ee.Feature(
            ee.Geometry.Point([86.97191921696084, 23.694101331953025]),
            {
              "lulc1": 7,
              "system:index": "109"
            }),
        ee.Feature(
            ee.Geometry.Point([86.94977489933389, 23.680267790892557]),
            {
              "lulc1": 7,
              "system:index": "110"
            }),
        ee.Feature(
            ee.Geometry.Point([86.94694248661416, 23.68089661999898]),
            {
              "lulc1": 7,
              "system:index": "111"
            }),
        ee.Feature(
            ee.Geometry.Point([86.94522587284463, 23.690721681621152]),
            {
              "lulc1": 7,
              "system:index": "112"
            }),
        ee.Feature(
            ee.Geometry.Point([86.94960323795694, 23.69583042155006]),
            {
              "lulc1": 7,
              "system:index": "113"
            }),
        ee.Feature(
            ee.Geometry.Point([86.97123257145303, 23.686162944934544]),
            {
              "lulc1": 7,
              "system:index": "114"
            }),
        ee.Feature(
            ee.Geometry.Point([86.97260586246865, 23.685141137295005]),
            {
              "lulc1": 7,
              "system:index": "115"
            }),
        ee.Feature(
            ee.Geometry.Point([86.975009121746, 23.684748132228215]),
            {
              "lulc1": 7,
              "system:index": "116"
            }),
        ee.Feature(
            ee.Geometry.Point([86.97303501591104, 23.684355125978943]),
            {
              "lulc1": 7,
              "system:index": "117"
            }),
        ee.Feature(
            ee.Geometry.Point([86.46112448764634, 23.813444980099437]),
            {
              "lulc1": 7,
              "system:index": "118"
            }),
        ee.Feature(
            ee.Geometry.Point([86.47953517032457, 23.813248671230355]),
            {
              "lulc1": 7,
              "system:index": "119"
            }),
        ee.Feature(
            ee.Geometry.Point([86.45653254581285, 23.814387258539032]),
            {
              "lulc1": 7,
              "system:index": "120"
            }),
        ee.Feature(
            ee.Geometry.Point([86.45382887912584, 23.811521140382883]),
            {
              "lulc1": 7,
              "system:index": "121"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43975264621568, 23.818980767985824]),
            {
              "lulc1": 7,
              "system:index": "122"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43726355624986, 23.822710421026308]),
            {
              "lulc1": 7,
              "system:index": "123"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43116957736802, 23.82133635079747]),
            {
              "lulc1": 7,
              "system:index": "124"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43486029697252, 23.82176820300857]),
            {
              "lulc1": 7,
              "system:index": "125"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43395907474351, 23.81733183457971]),
            {
              "lulc1": 7,
              "system:index": "126"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43713481021715, 23.81968744731848]),
            {
              "lulc1": 7,
              "system:index": "127"
            }),
        ee.Feature(
            ee.Geometry.Point([86.4373064715941, 23.81733183457971]),
            {
              "lulc1": 7,
              "system:index": "128"
            }),
        ee.Feature(
            ee.Geometry.Point([86.4404392917235, 23.819412628035227]),
            {
              "lulc1": 7,
              "system:index": "129"
            }),
        ee.Feature(
            ee.Geometry.Point([86.44095427585435, 23.817174792210412]),
            {
              "lulc1": 7,
              "system:index": "130"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43102447565134, 23.81280482002146]),
            {
              "lulc1": 7,
              "system:index": "131"
            }),
        ee.Feature(
            ee.Geometry.Point([86.4320973592573, 23.81233367591381]),
            {
              "lulc1": 7,
              "system:index": "132"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43415729578074, 23.807111714239298]),
            {
              "lulc1": 7,
              "system:index": "133"
            }),
        ee.Feature(
            ee.Geometry.Point([86.4315394597822, 23.805816007021473]),
            {
              "lulc1": 7,
              "system:index": "134"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43068115289744, 23.80750435023786]),
            {
              "lulc1": 7,
              "system:index": "135"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43183986719187, 23.80828961867357]),
            {
              "lulc1": 7,
              "system:index": "136"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43617431695994, 23.809428249470493]),
            {
              "lulc1": 7,
              "system:index": "137"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43415729578074, 23.80982087846475]),
            {
              "lulc1": 7,
              "system:index": "138"
            }),
        ee.Feature(
            ee.Geometry.Point([86.42613212640818, 23.80522704492171]),
            {
              "lulc1": 7,
              "system:index": "139"
            }),
        ee.Feature(
            ee.Geometry.Point([86.42445842798288, 23.80522704492171]),
            {
              "lulc1": 7,
              "system:index": "140"
            }),
        ee.Feature(
            ee.Geometry.Point([86.42634670312937, 23.808525198278296]),
            {
              "lulc1": 7,
              "system:index": "141"
            }),
        ee.Feature(
            ee.Geometry.Point([86.42467300470408, 23.809153408468134]),
            {
              "lulc1": 7,
              "system:index": "142"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43681804712351, 23.806444230317304]),
            {
              "lulc1": 7,
              "system:index": "143"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43943588312204, 23.806562021846954]),
            {
              "lulc1": 7,
              "system:index": "144"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43716136987742, 23.805423365918404]),
            {
              "lulc1": 7,
              "system:index": "145"
            }),
        ee.Feature(
            ee.Geometry.Point([86.4441994863325, 23.80448102242784]),
            {
              "lulc1": 7,
              "system:index": "146"
            }),
        ee.Feature(
            ee.Geometry.Point([86.44505779321726, 23.802321459474225]),
            {
              "lulc1": 7,
              "system:index": "147"
            }),
        ee.Feature(
            ee.Geometry.Point([86.44952098901804, 23.806640549474018]),
            {
              "lulc1": 7,
              "system:index": "148"
            }),
        ee.Feature(
            ee.Geometry.Point([86.45982067163523, 23.80679760458571]),
            {
              "lulc1": 7,
              "system:index": "149"
            }),
        ee.Feature(
            ee.Geometry.Point([86.45415584619577, 23.803263818633184]),
            {
              "lulc1": 7,
              "system:index": "150"
            }),
        ee.Feature(
            ee.Geometry.Point([86.45582954462107, 23.803617201555145]),
            {
              "lulc1": 7,
              "system:index": "151"
            }),
        ee.Feature(
            ee.Geometry.Point([86.45784656580027, 23.80200733823528]),
            {
              "lulc1": 7,
              "system:index": "152"
            }),
        ee.Feature(
            ee.Geometry.Point([86.45806114252146, 23.800790111259445]),
            {
              "lulc1": 7,
              "system:index": "153"
            }),
        ee.Feature(
            ee.Geometry.Point([86.41591827447947, 23.798748285558258]),
            {
              "lulc1": 7,
              "system:index": "154"
            }),
        ee.Feature(
            ee.Geometry.Point([86.417634888249, 23.799219478953088]),
            {
              "lulc1": 7,
              "system:index": "155"
            }),
        ee.Feature(
            ee.Geometry.Point([86.4141587453657, 23.798669753159636]),
            {
              "lulc1": 7,
              "system:index": "156"
            }),
        ee.Feature(
            ee.Geometry.Point([86.41252796228464, 23.79937654303826]),
            {
              "lulc1": 7,
              "system:index": "157"
            }),
        ee.Feature(
            ee.Geometry.Point([86.40995304163035, 23.797099095218126]),
            {
              "lulc1": 7,
              "system:index": "158"
            }),
        ee.Feature(
            ee.Geometry.Point([86.40930931146677, 23.79505721150741]),
            {
              "lulc1": 7,
              "system:index": "159"
            }),
        ee.Feature(
            ee.Geometry.Point([86.40935222681101, 23.796353026044155]),
            {
              "lulc1": 7,
              "system:index": "160"
            }),
        ee.Feature(
            ee.Geometry.Point([86.41257087762888, 23.79435039813145]),
            {
              "lulc1": 7,
              "system:index": "161"
            }),
        ee.Feature(
            ee.Geometry.Point([86.41171257074411, 23.79372211634738]),
            {
              "lulc1": 7,
              "system:index": "162"
            }),
        ee.Feature(
            ee.Geometry.Point([86.41295711572702, 23.793918454731223]),
            {
              "lulc1": 7,
              "system:index": "163"
            }),
        ee.Feature(
            ee.Geometry.Point([86.41381542261179, 23.79482160747596]),
            {
              "lulc1": 7,
              "system:index": "164"
            }),
        ee.Feature(
            ee.Geometry.Point([86.42209808404978, 23.79270115196937]),
            {
              "lulc1": 7,
              "system:index": "165"
            }),
        ee.Feature(
            ee.Geometry.Point([86.42390052850779, 23.793250903015803]),
            {
              "lulc1": 7,
              "system:index": "166"
            }),
        ee.Feature(
            ee.Geometry.Point([86.42063896234568, 23.793996990001695]),
            {
              "lulc1": 7,
              "system:index": "167"
            }),
        ee.Feature(
            ee.Geometry.Point([86.42518798883494, 23.79466453788432]),
            {
              "lulc1": 7,
              "system:index": "168"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43424312646921, 23.797177628566168]),
            {
              "lulc1": 7,
              "system:index": "169"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43664638574656, 23.79788442656242]),
            {
              "lulc1": 7,
              "system:index": "170"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43801967676218, 23.798080758656763]),
            {
              "lulc1": 7,
              "system:index": "171"
            }),
        ee.Feature(
            ee.Geometry.Point([86.41475956018503, 23.786810816245506]),
            {
              "lulc1": 7,
              "system:index": "172"
            }),
        ee.Feature(
            ee.Geometry.Point([86.41621868188913, 23.787478401040207]),
            {
              "lulc1": 7,
              "system:index": "173"
            }),
        ee.Feature(
            ee.Geometry.Point([86.41364376123484, 23.788381598540386]),
            {
              "lulc1": 7,
              "system:index": "174"
            }),
        ee.Feature(
            ee.Geometry.Point([86.40742103632029, 23.787399861830558]),
            {
              "lulc1": 7,
              "system:index": "175"
            }),
        ee.Feature(
            ee.Geometry.Point([86.42068187768992, 23.78339429921532]),
            {
              "lulc1": 7,
              "system:index": "176"
            }),
        ee.Feature(
            ee.Geometry.Point([86.42711917932566, 23.788538675725842]),
            {
              "lulc1": 7,
              "system:index": "177"
            }),
        ee.Feature(
            ee.Geometry.Point([86.4269475179487, 23.78787109637666]),
            {
              "lulc1": 7,
              "system:index": "178"
            }),
        ee.Feature(
            ee.Geometry.Point([86.42849247034128, 23.788499406447286]),
            {
              "lulc1": 7,
              "system:index": "179"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43673221643503, 23.786575197264085]),
            {
              "lulc1": 7,
              "system:index": "180"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43892089899119, 23.786653736972006]),
            {
              "lulc1": 7,
              "system:index": "181"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43269817407663, 23.782216169075838]),
            {
              "lulc1": 7,
              "system:index": "182"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43441478784617, 23.783512111642107]),
            {
              "lulc1": 7,
              "system:index": "183"
            }),
        ee.Feature(
            ee.Geometry.Point([86.429522438603, 23.783158674041495]),
            {
              "lulc1": 7,
              "system:index": "184"
            }),
        ee.Feature(
            ee.Geometry.Point([86.4179782110029, 23.779584973220008]),
            {
              "lulc1": 7,
              "system:index": "185"
            }),
        ee.Feature(
            ee.Geometry.Point([86.42016689355906, 23.78143074305191]),
            {
              "lulc1": 7,
              "system:index": "186"
            }),
        ee.Feature(
            ee.Geometry.Point([86.41789238031443, 23.784376066176286]),
            {
              "lulc1": 7,
              "system:index": "187"
            }),
        ee.Feature(
            ee.Geometry.Point([86.41699115808542, 23.78590760783076]),
            {
              "lulc1": 7,
              "system:index": "188"
            }),
        ee.Feature(
            ee.Geometry.Point([86.42188350732859, 23.783826277591547]),
            {
              "lulc1": 7,
              "system:index": "189"
            }),
        ee.Feature(
            ee.Geometry.Point([86.42535965021189, 23.78264815136655]),
            {
              "lulc1": 7,
              "system:index": "190"
            }),
        ee.Feature(
            ee.Geometry.Point([86.4225701528364, 23.77805335708587]),
            {
              "lulc1": 7,
              "system:index": "191"
            }),
        ee.Feature(
            ee.Geometry.Point([86.43505851800974, 23.77840680856414]),
            {
              "lulc1": 7,
              "system:index": "192"
            }),
        ee.Feature(
            ee.Geometry.Point([86.92593511196813, 23.675465659096613]),
            {
              "lulc1": 7,
              "system:index": "193"
            }),
        ee.Feature(
            ee.Geometry.Point([86.91941197964391, 23.677194995414908]),
            {
              "lulc1": 7,
              "system:index": "194"
            }),
        ee.Feature(
            ee.Geometry.Point([86.91949781033239, 23.675622872434907]),
            {
              "lulc1": 7,
              "system:index": "195"
            }),
        ee.Feature(
            ee.Geometry.Point([86.92198690029821, 23.674050730540742]),
            {
              "lulc1": 7,
              "system:index": "196"
            }),
        ee.Feature(
            ee.Geometry.Point([86.92138608547887, 23.671928308982675]),
            {
              "lulc1": 7,
              "system:index": "197"
            }),
        ee.Feature(
            ee.Geometry.Point([86.91460546108922, 23.665246386444082]),
            {
              "lulc1": 7,
              "system:index": "198"
            }),
        ee.Feature(
            ee.Geometry.Point([86.91391881558141, 23.662573521797974]),
            {
              "lulc1": 7,
              "system:index": "199"
            }),
        ee.Feature(
            ee.Geometry.Point([86.91306050869665, 23.65958613782848]),
            {
              "lulc1": 7,
              "system:index": "200"
            }),
        ee.Feature(
            ee.Geometry.Point([86.9176095351859, 23.661630144759677]),
            {
              "lulc1": 7,
              "system:index": "201"
            }),
        ee.Feature(
            ee.Geometry.Point([86.91975530239782, 23.66453886876716]),
            {
              "lulc1": 7,
              "system:index": "202"
            }),
        ee.Feature(
            ee.Geometry.Point([86.92198690029821, 23.66658279827602]),
            {
              "lulc1": 7,
              "system:index": "203"
            }),
        ee.Feature(
            ee.Geometry.Point([86.91778119656286, 23.668941138770172]),
            {
              "lulc1": 7,
              "system:index": "204"
            }),
        ee.Feature(
            ee.Geometry.Point([86.9245618209525, 23.673264652501132]),
            {
              "lulc1": 7,
              "system:index": "205"
            }),
        ee.Feature(
            ee.Geometry.Point([86.92773755642614, 23.672871611708253]),
            {
              "lulc1": 7,
              "system:index": "206"
            }),
        ee.Feature(
            ee.Geometry.Point([86.92447599026403, 23.672635786665154]),
            {
              "lulc1": 7,
              "system:index": "207"
            }),
        ee.Feature(
            ee.Geometry.Point([86.92121442410192, 23.678059654991383]),
            {
              "lulc1": 7,
              "system:index": "208"
            }),
        ee.Feature(
            ee.Geometry.Point([86.92121442410192, 23.679081518022826]),
            {
              "lulc1": 7,
              "system:index": "209"
            }),
        ee.Feature(
            ee.Geometry.Point([86.91709455105504, 23.680181976964892]),
            {
              "lulc1": 7,
              "system:index": "210"
            }),
        ee.Feature(
            ee.Geometry.Point([86.91838201138219, 23.681125220109067]),
            {
              "lulc1": 7,
              "system:index": "211"
            }),
        ee.Feature(
            ee.Geometry.Point([86.91786702725133, 23.677981049811784]),
            {
              "lulc1": 7,
              "system:index": "212"
            }),
        ee.Feature(
            ee.Geometry.Point([86.92962583157262, 23.677430812230494]),
            {
              "lulc1": 7,
              "system:index": "213"
            }),
        ee.Feature(
            ee.Geometry.Point([86.93486150356969, 23.67129943671656]),
            {
              "lulc1": 7,
              "system:index": "214"
            }),
        ee.Feature(
            ee.Geometry.Point([86.94893773647985, 23.672557178222892]),
            {
              "lulc1": 7,
              "system:index": "215"
            }),
        ee.Feature(
            ee.Geometry.Point([86.95185597988805, 23.670120293062052]),
            {
              "lulc1": 7,
              "system:index": "216"
            }),
        ee.Feature(
            ee.Geometry.Point([86.9534867629691, 23.672557178222892]),
            {
              "lulc1": 7,
              "system:index": "217"
            }),
        ee.Feature(
            ee.Geometry.Point([86.96138318630895, 23.678138260123678]),
            {
              "lulc1": 7,
              "system:index": "218"
            }),
        ee.Feature(
            ee.Geometry.Point([86.96979459377965, 23.677352206672577]),
            {
              "lulc1": 7,
              "system:index": "219"
            }),
        ee.Feature(
            ee.Geometry.Point([86.96644719692907, 23.675308445569186]),
            {
              "lulc1": 7,
              "system:index": "220"
            }),
        ee.Feature(
            ee.Geometry.Point([86.98953565212926, 23.681361029831]),
            {
              "lulc1": 7,
              "system:index": "221"
            }),
        ee.Feature(
            ee.Geometry.Point([86.98266919705114, 23.68073220295996]),
            {
              "lulc1": 7,
              "system:index": "222"
            }),
        ee.Feature(
            ee.Geometry.Point([86.97906430813512, 23.682382867040765]),
            {
              "lulc1": 7,
              "system:index": "223"
            }),
        ee.Feature(
            ee.Geometry.Point([86.97786267849645, 23.675151231852603]),
            {
              "lulc1": 7,
              "system:index": "224"
            }),
        ee.Feature(
            ee.Geometry.Point([86.98884900662145, 23.67845268018004]),
            {
              "lulc1": 7,
              "system:index": "225"
            }),
        ee.Feature(
            ee.Geometry.Point([86.98421414944372, 23.692522203052288]),
            {
              "lulc1": 7,
              "system:index": "226"
            }),
        ee.Feature(
            ee.Geometry.Point([86.99228223416051, 23.679867561070136]),
            {
              "lulc1": 7,
              "system:index": "227"
            }),
        ee.Feature(
            ee.Geometry.Point([86.99056562039098, 23.678138260123678]),
            {
              "lulc1": 7,
              "system:index": "228"
            }),
        ee.Feature(
            ee.Geometry.Point([86.50663390395114, 23.836946952224476]),
            {
              "lulc1": 7,
              "system:index": "229"
            }),
        ee.Feature(
            ee.Geometry.Point([86.49410262343356, 23.83930220883468]),
            {
              "lulc1": 7,
              "system:index": "230"
            }),
        ee.Feature(
            ee.Geometry.Point([86.49496093031833, 23.837496515926464]),
            {
              "lulc1": 7,
              "system:index": "231"
            }),
        ee.Feature(
            ee.Geometry.Point([86.5045739674277, 23.842049954143636]),
            {
              "lulc1": 7,
              "system:index": "232"
            }),
        ee.Feature(
            ee.Geometry.Point([86.50268569228122, 23.842756507810822]),
            {
              "lulc1": 7,
              "system:index": "233"
            }),
        ee.Feature(
            ee.Geometry.Point([86.518135216207, 23.844562127465824]),
            {
              "lulc1": 7,
              "system:index": "234"
            }),
        ee.Feature(
            ee.Geometry.Point([86.51933684584567, 23.843855583639336]),
            {
              "lulc1": 7,
              "system:index": "235"
            }),
        ee.Feature(
            ee.Geometry.Point([86.49745002028415, 23.838124585876905]),
            {
              "lulc1": 7,
              "system:index": "236"
            }),
        ee.Feature(
            ee.Geometry.Point([86.4990808033652, 23.839851762554922]),
            {
              "lulc1": 7,
              "system:index": "237"
            }),
        ee.Feature(
            ee.Geometry.Point([86.49238600966403, 23.842678002037946]),
            {
              "lulc1": 7,
              "system:index": "238"
            }),
        ee.Feature(
            ee.Geometry.Point([86.4917851948447, 23.841421903206896]),
            {
              "lulc1": 7,
              "system:index": "239"
            }),
        ee.Feature(
            ee.Geometry.Point([86.49255767104098, 23.84197144794292]),
            {
              "lulc1": 7,
              "system:index": "240"
            }),
        ee.Feature(
            ee.Geometry.Point([86.5470371921183, 23.822804629507466]),
            {
              "lulc1": 7,
              "system:index": "241"
            }),
        ee.Feature(
            ee.Geometry.Point([86.55270201755775, 23.819663878458044]),
            {
              "lulc1": 7,
              "system:index": "242"
            }),
        ee.Feature(
            ee.Geometry.Point([86.55227286411537, 23.81738678641918]),
            {
              "lulc1": 7,
              "system:index": "243"
            }),
        ee.Feature(
            ee.Geometry.Point([86.56377417637123, 23.815345221662838]),
            {
              "lulc1": 7,
              "system:index": "244"
            }),
        ee.Feature(
            ee.Geometry.Point([86.56866652561439, 23.814324427243967]),
            {
              "lulc1": 7,
              "system:index": "245"
            }),
        ee.Feature(
            ee.Geometry.Point([86.56583411289466, 23.814638518689325]),
            {
              "lulc1": 7,
              "system:index": "246"
            }),
        ee.Feature(
            ee.Geometry.Point([86.56368834568275, 23.814874086774633]),
            {
              "lulc1": 7,
              "system:index": "247"
            }),
        ee.Feature(
            ee.Geometry.Point([86.56488997532142, 23.815109654432476]),
            {
              "lulc1": 7,
              "system:index": "248"
            }),
        ee.Feature(
            ee.Geometry.Point([86.54635054661048, 23.822176485378428]),
            {
              "lulc1": 7,
              "system:index": "249"
            }),
        ee.Feature(
            ee.Geometry.Point([86.5473805148722, 23.822176485378428]),
            {
              "lulc1": 7,
              "system:index": "250"
            }),
        ee.Feature(
            ee.Geometry.Point([86.56669241977943, 23.81479556412703]),
            {
              "lulc1": 7,
              "system:index": "251"
            }),
        ee.Feature(
            ee.Geometry.Point([86.5068428029108, 23.836125296517604]),
            {
              "lulc1": 7,
              "system:index": "252"
            }),
        ee.Feature(
            ee.Geometry.Point([86.50770110979556, 23.8358112570811]),
            {
              "lulc1": 7,
              "system:index": "253"
            }),
        ee.Feature(
            ee.Geometry.Point([86.50607032671451, 23.836046786729764]),
            {
              "lulc1": 7,
              "system:index": "254"
            }),
        ee.Feature(
            ee.Geometry.Point([86.51808662310123, 23.844761082989923]),
            {
              "lulc1": 7,
              "system:index": "255"
            }),
        ee.Feature(
            ee.Geometry.Point([86.51697082415103, 23.844761082989923]),
            {
              "lulc1": 7,
              "system:index": "256"
            }),
        ee.Feature(
            ee.Geometry.Point([86.49662895098209, 23.837538464571058]),
            {
              "lulc1": 7,
              "system:index": "257"
            }),
        ee.Feature(
            ee.Geometry.Point([86.50418205156802, 23.841620863550176]),
            {
              "lulc1": 7,
              "system:index": "258"
            }),
        ee.Feature(
            ee.Geometry.Point([86.50229377642154, 23.842876960453612]),
            {
              "lulc1": 7,
              "system:index": "259"
            }),
        ee.Feature(
            ee.Geometry.Point([86.50332374468326, 23.842013395139798]),
            {
              "lulc1": 7,
              "system:index": "260"
            }),
        ee.Feature(
            ee.Geometry.Point([86.50495452776431, 23.84107131732817]),
            {
              "lulc1": 7,
              "system:index": "261"
            }),
        ee.Feature(
            ee.Geometry.Point([86.50529785051822, 23.838402059689248]),
            {
              "lulc1": 7,
              "system:index": "262"
            }),
        ee.Feature(
            ee.Geometry.Point([86.50632781877994, 23.83549721688415]),
            {
              "lulc1": 7,
              "system:index": "263"
            }),
        ee.Feature(
            ee.Geometry.Point([86.50770110979556, 23.835418706716087]),
            {
              "lulc1": 7,
              "system:index": "264"
            }),
        ee.Feature(
            ee.Geometry.Point([86.50710029497623, 23.83549721688415]),
            {
              "lulc1": 7,
              "system:index": "265"
            }),
        ee.Feature(
            ee.Geometry.Point([86.5181724537897, 23.844133045187082]),
            {
              "lulc1": 7,
              "system:index": "266"
            }),
        ee.Feature(
            ee.Geometry.Point([86.48057861223697, 23.843269488240164]),
            {
              "lulc1": 7,
              "system:index": "267"
            }),
        ee.Feature(
            ee.Geometry.Point([86.48057861223697, 23.84271994900623]),
            {
              "lulc1": 7,
              "system:index": "268"
            }),
        ee.Feature(
            ee.Geometry.Point([86.48109359636783, 23.84271994900623]),
            {
              "lulc1": 7,
              "system:index": "269"
            }),
        ee.Feature(
            ee.Geometry.Point([86.48057861223697, 23.842091901315104]),
            {
              "lulc1": 7,
              "system:index": "270"
            }),
        ee.Feature(
            ee.Geometry.Point([86.47980613604068, 23.842955466106012]),
            {
              "lulc1": 7,
              "system:index": "271"
            }),
        ee.Feature(
            ee.Geometry.Point([86.49748725786685, 23.837538464571058]),
            {
              "lulc1": 7,
              "system:index": "272"
            }),
        ee.Feature(
            ee.Geometry.Point([86.4958564747858, 23.837459955638753]),
            {
              "lulc1": 7,
              "system:index": "273"
            }),
        ee.Feature(
            ee.Geometry.Point([86.49568481340884, 23.836674863701617]),
            {
              "lulc1": 7,
              "system:index": "274"
            }),
        ee.Feature(
            ee.Geometry.Point([86.49516982927798, 23.8358112570811]),
            {
              "lulc1": 7,
              "system:index": "275"
            }),
        ee.Feature(
            ee.Geometry.Point([86.49516982927798, 23.840600275855387]),
            {
              "lulc1": 7,
              "system:index": "276"
            })]),
    Studyarea = 
    /* color: #0b4a8b */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[85.67642250490071, 24.03505137923002],
          [85.67642250490071, 23.25257638380747],
          [86.97555580568196, 23.25257638380747],
          [86.97555580568196, 24.03505137923002]]], null, false),
    table = ee.FeatureCollection("projects/landsat-325606/assets/DMC_Buffer_Shp"),
    ZSX = ee.FeatureCollection("projects/landsat-325606/assets/Rand_Pts_value_n"),
    mining = 
    /* color: #d63000 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([86.1826549203817, 23.77537654119037]),
            {
              "lulc1": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([86.18419987277427, 23.772705932895246]),
            {
              "lulc1": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([86.18660313205162, 23.771449157077075]),
            {
              "lulc1": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([86.19999271945396, 23.778361273802886]),
            {
              "lulc1": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([86.20445591525474, 23.778361273802886]),
            {
              "lulc1": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([86.23895985202232, 23.78982829339285]),
            {
              "lulc1": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([86.24222141818443, 23.800194864999614]),
            {
              "lulc1": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([86.21115070895591, 23.779460894865522]),
            {
              "lulc1": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([86.19552952365318, 23.776162003782456]),
            {
              "lulc1": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([86.26694065646568, 23.801922546519812]),
            {
              "lulc1": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([86.2847934396688, 23.803807263789047]),
            {
              "lulc1": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([86.31569248752037, 23.788571683062138]),
            {
              "lulc1": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([86.31706577853599, 23.784016368774576]),
            {
              "lulc1": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([86.31878239230552, 23.782916786237813]),
            {
              "lulc1": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([86.31431919650474, 23.788414605916564]),
            {
              "lulc1": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([86.31311756686607, 23.804435496801446]),
            {
              "lulc1": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([86.3203273446981, 23.80490666956656]),
            {
              "lulc1": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([86.34350163058677, 23.79972367514256]),
            {
              "lulc1": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([86.35826450900474, 23.79893835491626]),
            {
              "lulc1": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([86.24187809543052, 23.792812694234755]),
            {
              "lulc1": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([86.20445591525474, 23.777261643441754]),
            {
              "lulc1": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([86.19810444430748, 23.776790370440594]),
            {
              "lulc1": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([86.18728977755943, 23.770977863014803]),
            {
              "lulc1": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([86.33886677340904, 23.793598051486452]),
            {
              "lulc1": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([86.34401661471763, 23.79752476654593]),
            {
              "lulc1": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([86.39414173678794, 23.77883254111119]),
            {
              "lulc1": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([86.3946567209188, 23.777261643441754]),
            {
              "lulc1": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([86.39500004367271, 23.770820764614605]),
            {
              "lulc1": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([86.39671665744224, 23.776476187491035]),
            {
              "lulc1": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([86.3972316415731, 23.767678756770696]),
            {
              "lulc1": 2,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([86.40461308078208, 23.772077546503976]),
            {
              "lulc1": 2,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([86.3836703927938, 23.797210633708254]),
            {
              "lulc1": 2,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([86.33766514377037, 23.785901345771695]),
            {
              "lulc1": 2,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([86.34247166232505, 23.781817194401185]),
            {
              "lulc1": 2,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([86.39500004367271, 23.76705034609605]),
            {
              "lulc1": 2,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([86.3998065622274, 23.765793515641352]),
            {
              "lulc1": 2,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([86.40220982150474, 23.764536673046535]),
            {
              "lulc1": 2,
              "system:index": "36"
            })]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var ZSXC1 = ee.FeatureCollection(ZSX)
var classNames = water.merge(ZSXC1).merge(urban).merge(mining);
var dmc = ee.FeatureCollection(table)
Map.addLayer(dmc);
// var Studyarea = gaul.filter(ee.Filter.eq('ADM2_NAME','Dhanbad'));
// var shape = ee.FeatureCollection("users/viveksinghenv/Damodar_Basin");
// var classNames = Water.merge(Urban).merge(Agriculture).merge(Fallowland).merge(Mining).merge(DenseVegetation).merge(Barren);
// //Visualize the data
Map.centerObject(Studyarea,10);
// Map.addLayer(Studyarea);

// print(classNames)
/////// ...............Landsat................
var collection = ee.ImageCollection("LANDSAT/LT05/C02/T1_L2")
    .filterDate('2010-10-01', '2011-01-30')
    .filterBounds(Studyarea)
    .filter(ee.Filter.lt("CLOUD_COVER", 2)) .mean()/*.mosaic()*/;
    // .sort('CLOUD_COVER').first();//... chooses only pixels between the dates you define here
  // ... that are within your aoi
print(collection); 

// function applyScaleFactors(image) {
//   var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
//   var thermalBands = image.select('ST_B.*').multiply(0.00341802).add(149.0);
//   return image.addBands(opticalBands, null, true)
//               .addBands(thermalBands, null, true);
// }
// var image= collection.map(applyScaleFactors);
// This finds the median value of all the pixels which meet the criteria.
Map.addLayer(collection, {bands: ['SR_B3', 'SR_B2', 'SR_B1'], min: 7000, max: 30000, gamma:1.5}, 'TCC',0);
Map.addLayer(collection, {bands: ['SR_B4', 'SR_B3', 'SR_B2'], min: 7000, max: 30000, gamma:1.5}, 'SFC',0);
// Map.addLayer(medianpixels, {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000, gamma: 1.5}, 'Sentinel_2 TCC');
// Map.addLayer(medianpixels, {bands: ['B8', 'B4', 'B3'], min: 0, max: 3000, gamma: 1.5}, 'Sentinel_2 FCC');

// Map.addLayer(roi)
// print(classNames);
// Creating training data sets
var bands = ['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7'];
var sample = classNames; 
// print(training);
var sample = sample.randomColumn();
print(sample)
var traininggcp = sample.filter(ee.Filter.lt('random', 0.70))// //70% training and 30% validation
var validation = sample.filter(ee.Filter.gte('random', 0.70));
print(traininggcp)
print(validation)
var training = collection.select(bands).sampleRegions({
  collection: traininggcp,
  properties: ['lulc1'],
  scale: 20
});
// print(training)
var classifier = ee.Classifier.libsvm().train({ //ee.Classifier.decisionTree(treeString)
  features: training,
  classProperty: 'lulc1',
  inputProperties: bands
});
// print(classifier)
//Run the classification
var classified = collection.select(bands).classify(classifier);
//Display classification
Map.centerObject(classNames, 10);
Map.addLayer(classified,
{min: 1, max: 7,palette: ['0cffff','27a910','81937e','d61717','f1fb5b','0cff08','cf1ad2'/*,'1EEAF9'*/]},
'classification',0);

var test = classified.sampleRegions({
  collection: validation,
  properties: ['lulc1'],
    scale:30 ,
});

var testConfusionMatrix = test.errorMatrix('landcover', 'classification')
// Printing of confusion matrix may time out. Alternatively, you can export it as CSV
print('Confusion Matrix', testConfusionMatrix);
print('Test Accuracy', testConfusionMatrix.accuracy());
// Map.addLayer(classNames);
ui.Label(classNames)
Export.image.toDrive({
  image: classified,
  description: 'Landsat2010',
  scale: 30,
  maxPixels: 1e9,
  region: table
});