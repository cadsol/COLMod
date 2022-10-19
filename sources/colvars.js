import * as EQTIME from '../astronomia-master/src/eqtime.js';	
import * as JULIAN from '../astronomia-master/src/julian.js';	
import {apparentEquatorial} from '../astronomia-master/src/solar.js';
import {march,
	    june,
	    september,
	    december} from '../astronomia-master/src/solstice.js';

export const SP="Polar or straight style", BF="Bifilar (vertical)",BFG='Bifilar generalised', ANL='Analemmatic';///+++



export let  cs ={    version:"", 
						  hsol:13,
				          dayofYear:105,
						  year:2022,
						 
						  //geometry 
						  typeCadran:SP,			        
					      largeur:600,
				          hauteur:400,
				          epaisseur:30,
				          decli:0,
				          incli:90,
				          rot:0,

				          hgnomon:50,
				          egnomon:1,
				          xgnomon:0,				         
				          ygnomon:100, 
				          vgnomon:true,
				          vstyle:true,
				          vsousstyle:true,
						  angleStyleSousstylaire:0,
						  xPole:0,
						  yPole:0,
							///++++
							xdirect:0,			// Direction en ° /centre de projection cadran analemmatique, positif à droite du cadran
							ydirect:0,			// Directionen ° /centre de projection cadran analemmatique, positif en haut du cadran
							//zdirect:50,			// Direction/centre de projection cadran analemmatique, positif au dessus du cadran
							Hanalem:200,			// Hauteur du gnomon pour cadran analemmatique
							Ranalem:200,		// Rayon du cercle équatorial pour cadran analemmatique
							DatesAlalem:[],     // dates sur l'axe des dates
							colorAnalem:"rgb(100,10,100)",
							Canalem:false,	// Cadran analemmatique à projection centale   Non utilisé
							textSizeANL:1,	
							dateAnalem:21,	
							///++++

						  hfilHorizontal:30,
						  hfilVertical:50,
						  anglefilHorizontal:0,
						  anglefilVertical:90,
						  
								hA1:30,xA1:-300,yA1:100, //support1 du fil A
								hA2:30,xA2: 300,yA2:100, //support2 du fil A
								hB1:50,xB1:0,yB1:-200,  //support1 du fil B	
								hB2:50,xB2:0,yB2: 200,  //support2 du fil B
							   
						//colors sundial
						  colorCS: "rgb(200,200,200)",
				          emissiveCS:"rgb(100,100,100)",
				          specularCS:"rgb(0,0,0)",
						  metalness:0.5,
				          opaciteCS:0.8,
						  //texture:'acier',
				          
						 //geolocation
						  lati:43.6,
				          longi:3.9,
				          adresse:"",
				          urlOpenStreet:"",
				          timezone:"",
				          offset_sec:0,
				          offset_string:"",
				          now_in_dst:0,
				          dst:0,
						  autoLocation:false,

						 // hours
				          heuresSolaires:true,
						  heuresLegalesSummerAutums:false,
						  heuresLegalesWinterSpring:false,
						  heuresAntiques:false,
						  heuresBabyloniques:false,
						  heuresItaliques:false,
						  heuresSideralesWS:false,
						  heuresSideralesSA:false,
						  colorHS:"rgb(200,0,0)",
						  colorHLSummerAutums:"rgb(0,200,5)",
						  colorHLWinterSpring:"rgb(0,0,200)",
						  colorHeuresAntiques:"rgb(200,0,200)",
						  colorHeuresBabyloniques:"rgb(0,150,200)",
						  colorHeuresItaliques:"rgb(0,150,100)",
						  colorHeuresSDSA:"rgb(100,100,10)",
						  colorHeuresSDWS:"rgb(102,16,10)",
						  textSizeHS:1,
						  textSizeSA:1,
						  textSizeWS:1,
						  textSizeHA:1,
						  textSizeHB:1,
						  textSizeHI:1,
						  textSizeSDSA:1,
						  textSizeSDWS:1,
						  hoursTextSize:1,
						  subDivisions:1,
						  precisionHours:5,   // un point tous les 5 jours, tous les jours au voisinage des solstices 

						  //arcs diurnes
						  equinoxeAndSolstices:false,
						  colorequinoxeAndSolstice:"rgb(152,0,0)",
						  datesArcsDiurnes:[],  // [[date, dec en rad]]  tableau à deux dimensions
				          precisionArcs:15,   // un point toutes les 15 minutes

						  //display
						  devise:"Carpe Diem",
						  deviseSize:1,				          
				          axesESZ:true,
				          voirTerre:true,
				          vrotscene:0,					      
						  vrotSun:0,
						  //backgroundColor
						  background:"rgb(22,35,39)",
						  //export
						  unitSVG:'auto',
						  nameFile:"mySundial",						 
				          export:"Sundial(JSON)"
				          };




//TableSol------------------------
export function TableSol(year) {
	let jde,ae,dec,eqt,jdes,eqts,decs;
	let decSunMin=0,decSunMax=0,jdecSunMin=0,jdecSunMax=0,j=0;
	jdes=[];eqts=[];decs=[]
	jde= JULIAN.CalendarGregorianToJD(year, 1, 1.5);  //Premier Janvier à 12h
	while (jde<=JULIAN.CalendarGregorianToJD(year, 12, 31.5))//31 decembre à 12h
	  { 
	  ae=apparentEquatorial(jde);
	  dec=ae.dec;
	  if (dec>decSunMax){decSunMax=dec;jdecSunMax=j};
	  if (dec<decSunMin){decSunMin=dec;jdecSunMin=j};
	  eqt=EQTIME.eSmart(jde);
	  jdes.push(jde);eqts.push(eqt);decs.push(dec)
	  jde+=1;j+=1
	   };
   // console.log(jdecSunMin,jdecSunMax);
	return {//Tableaux à 365 ou 366 elements, valeurs calculées à 12h, index: 0...364 ou 0...365
			decSuns:decs,  //radians
			eqtimes:eqts,  //equation of time as an hour angle in radians.
			jdates:jdes,    //jourjulien
			//jours des solstices
			jdecSunMin,
			jdecSunMax,
			eqMars:march(cs.year),
			eqSeptembre:september(cs.year),
			solDecembre:december(cs.year),
			solJuin:june(cs.year)
			}             
  
  }

//--------------------------------------------------------------------------------------------------------
export function RechercheParAdresse(v){
	//  adrAPIOpenStreet :=
	//       'http://api.opencagedata.com/geocode/v1/json?key=a110b502b29f4de9a47d95bc3b6c5e98&q='
	//       + adresse + '&limit=1';
	//  OpenStreetURL: String = 'https://www.openstreetmap.org/#map=15/%s/%s';
	
			   // Create an XMLHttpRequest object
				 const xhttp = new XMLHttpRequest();
	
			   // Define a callback function
				 xhttp.onload = function() {
					  // Here you can use the Data
						 let myObj = JSON.parse(this.responseText);
						 //console.log(JSON.stringify(myObj,null,2));
						 if (myObj.total_results>0) {           
						  cs.adresse=myObj.results[0].formatted;          
						  cs.lati=myObj.results[0].geometry.lat;
						  cs.longi=myObj.results[0].geometry.lng;
						  cs.urlOpenStreet=myObj.results[0].annotations.OSM.url;
						  cs.timezone=myObj.results[0].annotations.timezone.name;
						  cs.offset_sec=myObj.results[0].annotations.timezone.offset_sec;
						  cs.offset_string=myObj.results[0].annotations.timezone.offset_string;
						  cs.now_in_dst=myObj.results[0].annotations.timezone.now_in_dst;				  
	
						//window.open(cs.urlOpenStreet, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=100,width=400,height=400")
						  }else {alert('no result for '+v)}
				  // console.log(cs.urlOpenStreet);
	
				 }
			  // Send a request
			  try {xhttp.open("GET", "https://api.opencagedata.com/geocode/v1/json?key=a110b502b29f4de9a47d95bc3b6c5e98&q="+ v + "&limit=1",false);
				 xhttp.send();
				  
			  } catch (error) {
				 alert('no connection') 
			  }
				 
			   }

//----------------------------------------------------------------------------------------------------
function showPosition(position) {
		cs.lati = position.coords.latitude ; 
		cs.longi= position.coords.longitude;
	  }			   
export function getLocation() {	
	if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(showPosition);
	} else { 
	  alert("Geolocation is not supported by this browser.") ;
	}
  }







 