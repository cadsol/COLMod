import * as EQTIME from '../astronomia-master/src/eqtime.js';
import * as JULIAN from '../astronomia-master/src/julian.js';
import { apparentEquatorial } from '../astronomia-master/src/solar.js';
import {
	march,
	june,
	september,
	december
} from '../astronomia-master/src/solstice.js';
//import { POLYHEDRA } from './polyhedra.js';

//export const SP = "Polar or straight style", BF = "Bifilar (vertical)", BFG = 'Bifilar generalised', ANL = 'Analemmatic';///+++
export const SP = "Polar or straight style", BF = "Bifilar (vertical)", BFG = 'Bifilar generalised', ANL = 'Analemmatic', RTS='Ray tracing sundial';///+++
export const CPS = "Sphere projection";
//export let cadran;
 
export let cs = {
	version: "",
	hsol: 13,
	dayofYear: 105,
	year: 2023,

	//geometry 
	typeCadran: SP,// {value:SP,comment:"Sundial type"},
	typeForme:"parallelepiped",
	largeur: 600,
	hauteur: 400,
	epaisseur: 30,
	decli: 0,
	incli: 90,
	rot: 0,
	zfxy:"sin(25*sqrt(x*x+y*y))",
	hgnomon: 50,
	egnomon: 1,
	xgnomon: 0,
	ygnomon: 100,
	zgnomon: 70,
	vgnomon: true,
	vstyle: true,
	vsousstyle: true,
	angleStyleSousstylaire: 0,
	xPole: 0, 
	yPole: 0,
	hgnomonBord:0,
	///++++
	xdirect: 0,			// Direction en ° /centre de projection cadran analemmatique, positif à droite du cadran
	ydirect: 0,			// Direction en ° /centre de projection cadran analemmatique, positif en haut du cadran
	zdirect: 60,		// Distance relative du centre de projection cadran analemmatique, positif au dessus du cadran
	Hanalem: 200,		// Hauteur du gnomon pour cadran analemmatique
	Ranalem: 200,		// Rayon du cercle équatorial pour cadran analemmatique
	colorAnalem: "rgb(100,10,100)",
	Canalem: false,	// Cadran analemmatique à projection centale   
	textSizeANL: 1,
	dateAnalem: 21,     // dates sur l'axe des dates
	subAnalem: 1,
	///++++ sphere projection
	GSphere: 200,		// Longueur du gnomon
	RSphere: 100,		// Rayon de la sphère (valeur calculée)
	RCadran: 200,		// Rayon du cercle sur le cadran
	colorSphere: "rgb(20,120,20)",
	SSphere: 1,			// 1 ou -1 -> type de pôle pour la projection stéréographique.
	KSphere: 0, 		// Angle K de -89 à 89°
	textSizeCPS: 1,
	///++++

	hfilHorizontal: 30,
	hfilVertical: 50,
	anglefilHorizontal: 0,
	anglefilVertical: 90,

	hA1: 30, xA1: -300, yA1: 100, //support1 du fil A
	hA2: 30, xA2: 300, yA2: 100, //support2 du fil A
	hB1: 50, xB1: 0, yB1: -200,  //support1 du fil B	
	hB2: 50, xB2: 0, yB2: 200,  //support2 du fil B

	//colors sundial
	colorCS: "rgb(250,250,250)",
	emissiveCS: "rgb(55,55,55)",
	specularCS: "rgb(0,0,0)",
	metalness: 0.5,
	roughness:0.5,
	opaciteCS: 0.8,
	wireframe:false,
	nameTexture:"steel",
	dataURL:"",
	typedataURL:'',

	//geolocation
	lati: 43.6,
	longi: 0,
	adresse: "",
	urlOpenStreet: "",
	timezone: "",
	offset_sec: 0,
	offset_string: "",
	now_in_dst: 0,
	dst: 0,
	autoLocation:false,

	// hours
	heuresSolaires:true,
	heuresLegalesSummerAutums: false,
	heuresLegalesWinterSpring: false,
	heuresAntiques: false,
	heuresBabyloniques: false,
	heuresItaliques: false,
	heuresSideralesWS: false,
	heuresSideralesSA: false,
	heuresPlanetairesWS: false,
	heuresPlanetairesSA: false,
	
	colorHS: "rgb(200,0,0)",
	colorHLSummerAutums: "rgb(0,200,5)",
	colorHLWinterSpring: "rgb(0,0,200)",
	colorHeuresAntiques: "rgb(200,0,200)",
	colorHeuresBabyloniques: "rgb(0,150,200)",
	colorHeuresItaliques: "rgb(0,150,100)",
	colorHeuresSDSA: "rgb(100,100,10)",
	colorHeuresSDWS: "rgb(102,16,10)",
	colorHeuresHPSA: "rgb(250,250,10)",
	colorHeuresHPWS: "rgb(1,250,10)",
	textSizeHS: 1,
	textSizeSA: 1,
	textSizeWS: 1,
	textSizeHA: 1,
	textSizeHB: 1,
	textSizeHI: 1,
	textSizeSDSA: 1,
	textSizeSDWS: 1,
	textSizeHPSA: 1,
	textSizeHPWS: 1,
	hoursTextSize: 1,
	subDivisions: 1,
	precisionHours: 5,   // un point tous les 5 jours, tous les jours au voisinage des solstices 

	//arcs diurnes
	equinoxeAndSolstices: false,
	colorequinoxeAndSolstice: "rgb(152,0,0)",
	datesArcsDiurnes: [[]],  // [[date, dec en rad]]  tableau à deux dimensions
	precisionArcs: 15,   // un point toutes les 15 minutes

	//display
	devise: "Carpe Diem",
	positionDevisex: -280,
	positionDevisey: -180,
	deviseSize: 1,
	axesESZ: true,
	axesXYZ: true,
	voirTerre: true,
	vrotscene: 0,
	vrotSun: 0,
	linkMedia: "",
	autoCloseMenu: true,
	//comments:"http://",
	//backgroundColor
	background: "rgb(60,100,140)",	
	//export
	unitSVG: 'auto',
	separateurCSV: ";",
	nameFile: "mySundial",
	export: "Sundial(.JSON)",

	// polyedres
	typePolyedre:"Dodecahedron", // par defaut
	rayonPolyedre:200,
	conicity:2,
	
	polyGx:[],
	polyGy:[],
	polyGz:[], // sommet du style droit en coord.locales		
	polyheuresSolaires: [],
	polyheuresLegalesSummerAutums: [],
	polyheuresLegalesWinterSpring: [],
	polyheuresAntiques: [],
	polyheuresBabyloniques: [],
	polyheuresItaliques: [],
	polyheuresSideralesWS: [],
	polyheuresSideralesSA: [],
	polyheuresPlanetairesWS: [],
	polyheuresPlanetairesSA: [],
	polyequinoxeAndSolstices: [],
	polydatesArcsDiurnes: [[]], // [[date, dec en rad]]  tableau à deux dimensions
	polyDev:[],
	polyDevx:[],
	polyDevy:[],
	polysubDivisions:[],
	polyDevTextsize:1
}

// ----------------------------------------------------------------------------------------------------
export function HTLM(cs) {
	let htmlText = `
<!DOCTYPE html>
<html lang="en">
  <head>					
  <meta charset="utf-8" />
  <title> ${cs.nameFile}</title>
</head>
<body>
    <H1>Sundial :  ${cs.nameFile}</H3>
	<H2>CadsolOnLine</H2> 
	Licence CECILL <br>
	<br>
	Version of CadsolOnLine:  ${cs.version}<br>
	Ephemeris for the year:  ${cs.year}<br>
	<H3>Sundial type:  ${cs.typeCadran}</H3>
	
	<H5>Geolocation</H5> 
	latitude : ${cs.lati.toFixed(6)}° (decimal degrees, positive to the north, negative to the south) <br>
	longitude : ${cs.longi.toFixed(6)}° (decimal degrees, positive to east, negative to the west) <br>
	adress : ${cs.adresse}<br>
	time zone : ${cs.timezone}<br>
	offset : ${cs.offset_sec} (seconds)<br>
	offset +/-HHMM : ${cs.offset_string} (hours:minuts)<br>

	<H5>Geometry</H5> 
	width: ${cs.largeur} (arbitrary unit)<br>
    height: ${cs.hauteur} (arbitrary unit)<br>
	thickness: ${cs.epaisseur} (arbitrary unit)<br>
	
	declination	: ${cs.decli}° (decimal degrees, positive to the east, negative to the west)<br>
	inclination	: ${cs.incli}° (decimal degrees,  0°:horizontal  90°:vertical ) <br><br>
`

	if (cs.typeCadran == SP) {
		htmlText += `
	diameter of the style : ${cs.egnomon}  (arbitrary unit)<br>
	length of the straight style : ${cs.hgnomon}  (arbitrary unit)<br>
	coordinates of the foot of the straight style  : (${cs.xgnomon.toFixed(2)} , ${cs.ygnomon.toFixed(2)})  (origin: center of the rectangle)<br>
	coordinates of the pole of the sundial : (${cs.xPole.toFixed(2)} , ${cs.yPole.toFixed(2)})  (origin: center of the rectangle)<br>
	angle between style and substyle : ${cs.angleStyleSousstylaire.toFixed(1)}° (decimal degrees)<br>
	`
	}
	if (cs.typeCadran == BF) {
		htmlText += `
	diameter of the wires : ${cs.egnomon}  (arbitrary unit)<br>
	Horizontal wire height : ${cs.hfilHorizontal}  (arbitrary unit)<br>
    Vertical wire height : ${cs.hfilVertical}  (arbitrary unit)<br>
	wire A angle with horizontal : ${cs.anglefilHorizontal}° (decimal degrees, positive clockwise)<br>
    wire B angle with horizontal : ${cs.anglefilVertical}° (decimal degrees, positive clockwise)<br>
	wire crossing coordinates: (${cs.xgnomon.toFixed(2)} , ${cs.ygnomon.toFixed(2)})  (origin: center of the rectangle)<br>
	coordinates of pillar A1: (${cs.xA1.toFixed(2)} , ${cs.yA1.toFixed(2)})  (origin: center of the rectangle)<br>
	coordinates of pillar A2: (${cs.xA2.toFixed(2)} , ${cs.yA2.toFixed(2)}) <br>
	coordinates of pillar B1: (${cs.xB1.toFixed(2)} , ${cs.yB1.toFixed(2)}) <br>
	coordinates of pillar A2: (${cs.xB2.toFixed(2)} , ${cs.yB2.toFixed(2)})	<br>	
	`
	}
	if (cs.typeCadran == BFG) {
		htmlText += `
	diameter of the wires : ${cs.egnomon}  (arbitrary unit)<br>
	wire A angle with horizontal : ${cs.anglefilHorizontal}° (decimal degrees, positive clockwise)<br>
    wire B angle with horizontal : ${cs.anglefilVertical}° (decimal degrees, positive clockwise)<br>
	wire crossing coordinates: (${cs.xgnomon.toFixed(2)} , ${cs.ygnomon.toFixed(2)})  (origin: center of the rectangle)<br>
	height of pillar A1 : ${cs.hA1}<br>
	height of pillar A2 : ${cs.hA2}<br>
	height of pillar B1 : ${cs.hB1}<br>
	height of pillar B2 : ${cs.hB2}<br>
	coordinates of pillar A1: (${cs.xA1.toFixed(2)} , ${cs.yA1.toFixed(2)})  (origin: center of the rectangle)<br>
	coordinates of pillar A2: (${cs.xA2.toFixed(2)} , ${cs.yA2.toFixed(2)}) <br>
	coordinates of pillar B1: (${cs.xB1.toFixed(2)} , ${cs.yB1.toFixed(2)}) <br>
	coordinates of pillar A2: (${cs.xB2.toFixed(2)} , ${cs.yB2.toFixed(2)})	<br>	
	`
	}
	if (cs.typeCadran == ANL) {
		htmlText += `
	righ or left  tilt of the  style : ${cs.xdirect}° (decimal degrees)<br>
	up or down  tilt of the style : ${cs.ydirect}° (decimal degrees)<br>
	Height of the gnomon : ${cs.Hanalem}<br> (arbitrary unit)
	Radius of the equatorial circle : ${cs.Ranalem}<br>
	Dates on the date axis :  ${cs.dateAnalem} (for each month)<br>
	Center of the line of dates (equinox): (${cs.xgnomon.toFixed(2)} , ${cs.ygnomon.toFixed(2)})  (origin: center of the rectangle)<br>
		`
	}
	
	htmlText += `<br><br><br>
	Motto : ${cs.devise}<br>
	Link web : ${cs.linkMedia}<br>
	<br>
	
End
</body>
</html>
`
	return htmlText

}

//TableSol------------------------
export function TableSol(year) {
	let jde, ae, dec, eqt, jdes, eqts, decs;
	let decSunMin = 0, decSunMax = 0, jdecSunMin = 0, jdecSunMax = 0, j = 0;
	jdes = []; eqts = []; decs = []
	jde = JULIAN.CalendarGregorianToJD(year, 1, 1.5);  //Premier Janvier à 12h
	while (jde <= JULIAN.CalendarGregorianToJD(year, 12, 31.5))//31 decembre à 12h
	{
		ae = apparentEquatorial(jde);
		dec = ae.dec;
		if (dec > decSunMax) { decSunMax = dec; jdecSunMax = j };
		if (dec < decSunMin) { decSunMin = dec; jdecSunMin = j };
		eqt = EQTIME.eSmart(jde);
		jdes.push(jde); eqts.push(eqt); decs.push(dec)
		jde += 1; j += 1
	};
	// console.log(jdecSunMin,jdecSunMax);
	return {//Tableaux à 365 ou 366 elements, valeurs calculées à 12h, index: 0...364 ou 0...365
		decSuns: decs,  //radians
		eqtimes: eqts,  //equation of time as an hour angle in radians.
		jdates: jdes,    //jourjulien
		//jours des solstices
		jdecSunMin,
		jdecSunMax,
		eqMars: march(cs.year),
		eqSeptembre: september(cs.year),
		solDecembre: december(cs.year),
		solJuin: june(cs.year)
	}

}

//--------------------------------------------------------------------------------------------------------
export function RechercheParAdresse(v) {
	//  adrAPIOpenStreet :=
	//       'http://api.opencagedata.com/geocode/v1/json?key=a110b502b29f4de9a47d95bc3b6c5e98&q='
	//       + adresse + '&limit=1';
	//  OpenStreetURL: String = 'https://www.openstreetmap.org/#map=15/%s/%s';

	// Create an XMLHttpRequest object
	const xhttp = new XMLHttpRequest();

	// Define a callback function
	xhttp.onload = function () {
		// Here you can use the Data
		let myObj = JSON.parse(this.responseText);
		//console.log(JSON.stringify(myObj,null,2));
		if (myObj.total_results > 0) {
			cs.adresse = myObj.results[0].formatted;
			cs.lati = myObj.results[0].geometry.lat;
			cs.longi = myObj.results[0].geometry.lng;
			cs.urlOpenStreet = myObj.results[0].annotations.OSM.url;
			cs.timezone = myObj.results[0].annotations.timezone.name;
			cs.offset_sec = myObj.results[0].annotations.timezone.offset_sec;
			cs.offset_string = myObj.results[0].annotations.timezone.offset_string;
			cs.now_in_dst = myObj.results[0].annotations.timezone.now_in_dst;

			//window.open(cs.urlOpenStreet, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=100,width=400,height=400")
		} else { alert('no result for ' + v) }
		// console.log(cs.urlOpenStreet);
	}
	xhttp.onerror = function () { // ne se déclenche que si la demande n'a pas pu être faite du tout
		alert(`Network Error`);
	};

	xhttp.onprogress = function (event) { // se déclenche périodiquement
		// event.loaded - combien d'octets téléchargés
		// event.lengthComputable = true si le serveur a envoyé l'en-tête Content-Length
		// event.total - nombre total d'octets (si lengthComputable)
		//alert(`Received ${event.loaded} of ${event.total}`);
	};
	// Send a request
	try {
		xhttp.open("GET", "https://api.opencagedata.com/geocode/v1/json?key=a110b502b29f4de9a47d95bc3b6c5e98&q=" + v + "&limit=1", []);
		xhttp.send();

	} catch (error) {
		alert('no connection')
	}

}

//----------------------------------------------------------------------------------------------------
function showPosition(position) {
	cs.lati = position.coords.latitude;
	cs.longi = position.coords.longitude;
}
export function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		alert("Geolocation is not supported by this browser.");
	}
}

// --------------------------------------------------------------------------------------------------------






