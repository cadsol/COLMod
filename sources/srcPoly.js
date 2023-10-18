///////////////////////////////////////////////////////////////////POLYEDRES/////////////////////////////////////////////////////////////////////////

let categoryFolders, meshFace, gnomonGeometry, Rpol,
nbFaces, nFace,nFaceMax, guiSectionPoly, guichoixPoly,
quaternion = new THREE.Quaternion(),
polyhedre,styleToriquePoly,geoTorePoly,gnomonPoly,Poly2D=false
let meshFacesGroup = new THREE.Group()
let meshFaces = [], meshGnomons = [], normalsFaces = [] ,hauteursGnomons=[],centersFaces=[]

function PlacerGnomonPoly(x,y){
    // gnomonPoly.position.x = centersFaces[nFace].x
    // gnomonPoly.position.y = centersFaces[nFace].y
    // gnomonPoly.position.z = centersFaces[nFace].z
    // gnomonPoly.lookAt(normalsFaces[nFace])
    // gnomonPoly.rotateX(Math.PI / 2)
//    gnomonPoly.position.set(centersFaces[nFace].x,centersFaces[nFace].y,centersFaces[nFace].z)
gnomonPoly.translateX(x)//cs.paramfacePolyedre.x)
gnomonPoly.translateZ(-y)//cs.paramfacePolyedre.y)
//croixSVG(x,-y)
   
}

function TracerGnomonPoly(h){
const p=0.5
if (gnomonPoly!=undefined){gnomonPoly.geometry.dispose()}
const geometryGnomonPoly = new THREE.CylinderGeometry(cs.egnomon*p, cs.egnomon/p, h, 16, 16);
gnomonPoly = new THREE.Mesh(geometryGnomonPoly, materialGnomon)

if (styleToriquePoly!=undefined){styleToriquePoly.geometry.dispose()}
const k=Math.max(cs.egnomon,0.2)
geoTorePoly= new THREE.TorusGeometry(5*k,k)
styleToriquePoly= new THREE.Mesh(geoTorePoly, materialSun);	

styleToriquePoly.receiveShadow=false
styleToriquePoly.castShadow = true;	

}

function SommetsFace(N,Pol){
    const lf = Pol.face[N]
    const verticesFaceN = []
    for (let i = 0; i < lf.length; i++) {
        const j = Pol.face[N][i]			
        const v = Pol.vertex[j]
        let verticeFace = new THREE.Vector3(v[0], v[1], v[2])
        verticeFace.applyEuler( new THREE.Euler((cs.incli - 90) / 180 * Math.PI, cs.decli / 180 * Math.PI, cs.rot / 180 * Math.PI, 'YXZ'))
        verticeFace.multiplyScalar ( Rpol )	
        meshGnomons[N].worldToLocal(verticeFace)
        verticesFaceN.push(verticeFace);
    }
    return verticesFaceN
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
function displayFaces(Pol) {
let nSommetsParFace = 0, v,h,hmax

let a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3(), 
        normalFace = new THREE.Vector3()
        //,Oworld=new THREE.Vector3(0,0,0)

normalsFaces = [], hauteursGnomons=[],centersFaces=[]

//cs.decli=0;cs.incli=90;cs.rot=0;eulerCsGroup()
effacelisteMesh(meshFaces, meshFacesGroup)
effacelisteMesh(meshGnomons, meshFacesGroup)
nbFaces = Pol.face.length
hmax=0
Rpol = cs.rayonPolyedre
cs.typePolyedre = Pol.name
meshFaces = [], meshGnomons = [], normalsFaces = []
cs.paramfacesPolyedre = []

for (let f = 0; f < nbFaces; f++) 
{cs.paramfacesPolyedre.push(cs.paramfacePolyedre)}

for (let f = 0; f < nbFaces; f++) 
{
    let sx = 0, sy = 0, sz = 0
    const lf = Pol.face[f]
    const verticesFaces = []
    nSommetsParFace = lf.length
    for (let i = 0; i < lf.length; i++) {
        const j = Pol.face[f][i]
        
        v = Pol.vertex[j]
        let verticeFace = new THREE.Vector3(v[0], v[1], v[2])
        verticeFace.applyEuler( new THREE.Euler((cs.incli - 90) / 180 * Math.PI, cs.decli / 180 * Math.PI, cs.rot / 180 * Math.PI, 'YXZ'))
        verticeFace.multiplyScalar ( Rpol )
        sx += verticeFace.x; sy += verticeFace.y; sz += verticeFace.z
                    
        if (i == 0) { a = verticeFace.clone() }
        if (i == 1) { b = verticeFace.clone() }
        if (i == 2) { c = verticeFace.clone() }
        
        verticesFaces.push(verticeFace);
        let verticeFaceInt=new THREE.Vector3()
        verticeFaceInt=verticeFace.clone()
        verticeFaceInt.multiplyScalar(0.8)
        verticesFaces.push(verticeFaceInt);
    }
    b.sub(a); c.sub(a)
    normalFace.crossVectors(b, c).normalize()
    
    normalsFaces.push(normalFace.toArray())
    
    
    const centerFace = new THREE.Vector3(sx / nSommetsParFace, sy / nSommetsParFace, sz / nSommetsParFace)
    centersFaces.push (centerFace)
    //verticesFaces.push(Oworld)  //--------------------------------------------------------
    //verticesFace.push(centerFace)

    const meshGeometry = new ConvexGeometry(verticesFaces);

    meshFace = new THREE.Mesh(meshGeometry, materialCS);
    meshFace.lookAt(new THREE.Vector3(0,0,0))
    meshFace.receiveShadow = true
    meshFaces.push(meshFace)
    meshFacesGroup.add(meshFace)
    h=centerFace.distanceTo(a) / 3
    if(h>hmax){hmax=h;nFaceMax=f}  //recherche d'ine "grande" face
    cs.positionDevisex=-h;cs.positionDevisey=h;
    // cs.paramfacePolyedre.z = h
    // cs.paramfacesPolyedre.push(cs.paramfacePolyedre)
    // cs.paramfacesPolyedre[f].z=h
    
    
    //gnomon.scale.set(cs.egnomon, h, cs.egnomon)
    //h=2*h
    TracerGnomonPoly(h)
    meshFace.add(gnomonPoly)
    
    gnomonPoly.position.x = centerFace.x
    gnomonPoly.position.y = centerFace.y
    gnomonPoly.position.z = centerFace.z
    normalFace.add(centerFace)
    gnomonPoly.lookAt(normalFace)
    gnomonPoly.rotateX(Math.PI / 2)
    if (f==nFace){PlacerGnomonPoly(cs.xgnomon,cs.ygnomon)
            }

    gnomonPoly.translateY(h / 2)
    //meshFacesGroup.add(gnomonPoly)
    //meshFace.add(gnomonPoly)
    meshGnomons.push(gnomonPoly)
    hauteursGnomons.push(h)	 
    gnomonPoly.castShadow = true
    gnomonPoly.receiveShadow = false
    //console.log(meshGnomons[f].quaternion)		
} //f

for (let f = 0; f < nbFaces; f++) {
    cs.paramfacesPolyedre[f].x=meshGnomons[f].position.x
    cs.paramfacesPolyedre[f].y=meshGnomons[f].position.z
    cs.paramfacesPolyedre[f].z=meshGnomons[f].position.ypolyedric
}

//console.log(cs.paramfacesPolyedre)
cadran = meshFaces[nFace].clone()
cadranSolaireGroup.add(meshFacesGroup)
PlacerStyleToriquePoly(nFace,hauteursGnomons[nFace])
EcrireDevise(cs.devise, cs.positionDevisex, cs.positionDevisey)
guichoixPoly.close()		

}


function PlacerStyleToriquePoly(n,h) {
meshGnomons[n].receiveShadow=false	
styleToriquePoly.receiveShadow=false	

meshGnomons[n].add(styleToriquePoly)
styleToriquePoly.position.set(0,0,0)
styleToriquePoly.translateY(h/2)
rayOrigin=styleToriquePoly.position.clone()
meshGnomons[n].localToWorld(rayOrigin)
PlacerLeSoleil()
styleToriquePoly.castShadow=true	
//console.log(SommetsFace(n,polyhedre))

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function InitGuiPolyedres(gui, group) {

guiSectionPoly = gui.addFolder("POLYEDRA");
guichoixPoly = guiSectionPoly.addFolder("Choose polyedra")
polyhedre = POLYHEDRA.Dodecahedron
nbFaces = 12

categoryFolders = {};
let parameters = {}// {function(){}};
// check category[0]. if folder does not exist, create it, add it to that folder.
// if category field DNE, just add it to the end.

for (var arg in POLYHEDRA) {
    var guiSection = guichoixPoly
    if (POLYHEDRA[arg].hasOwnProperty("category")) {
        var category = POLYHEDRA[arg].category[0];
        if (!categoryFolders.hasOwnProperty(category))
            categoryFolders[category] = guichoixPoly.addFolder(category);
        guiSection = categoryFolders[category];
    }
    parameters[arg] = function () { };
    const g = guiSection.add(parameters, arg).name(POLYHEDRA[arg].name)

    const a = arg
    g.domElement.addEventListener("click", function () {
        polyhedre = POLYHEDRA[a]
        guiSectionPoly.title("POLYEDRA : " + polyhedre.name)
        nbFaces = polyhedre.face.length
        nFace = 0

        choixFace.max(nbFaces)
        choixFace.updateDisplay()
        
        cs.decli=0;cs.incli=90;cs.rot=0	
        PlacerStyleToriquePoly(nFace,hauteursGnomons[nFace])
        displayFaces(polyhedre)
        TracerHeuresEtArcs()
        //eulerCsGroup()
        faceSurBase(nFaceMax)
        SudSundial.show()
        
    })
}

for (var arg in categoryFolders) { categoryFolders[arg].close() }


let rotationFaces = {
    face: 1,
    
    rotationBase() {
        cs.decli=0;cs.incli=90;cs.rot=0	
        PlacerStyleToriquePoly(nFace,hauteursGnomons[nFace])
        displayFaces(polyhedre)			
        faceSurBase(nFace)	
        SudSundial.show()		
     },
    rotationSud(){
        //if((normalsFaces[nFace][2]!=0)&&(normalsFaces[nFace][0]!=0)){
        // const x=normalsFaces[nFace][0]/normalsFaces[nFace][2]
        // //console.log(x,normalsFaces[nFace][0],normalsFaces[nFace][2],Math.atan(x)*180/Math.PI,)
        // //cs.decli=Math.atan(x)*180/Math.PI
        // cs.decli=-Math.atan(x)*180/Math.PI
        // displayFaces(polyhedre)	
        // TracerHeuresEtArcs() 
        // EcrireDevise(cs.devise, cs.positionDevisex, cs.positionDevisey)	
        console.log((normalsFaces[nFace]))
        if((Math.abs(normalsFaces[nFace][0])>0.001)){
        //if((normalsFaces[nFace][2]!=0)&&(normalsFaces[nFace][0]!=0)){
        const vSud=new THREE.Vector3 (0,0,1)
        //vSud.normalize()
        const vNorm=new THREE.Vector3 (normalsFaces[nFace][0],0,normalsFaces[nFace][2])
        //vNorm.normalize()
        //console.log(x,normalsFaces[nFace][0],normalsFaces[nFace][2],Math.atan(x)*180/Math.PI,)
        //cs.decli=Math.atan(x)*180/Math.PI
        cs.decli=vNorm.angleTo(vSud)*180/Math.PI
        if(normalsFaces[nFace][0]>0){cs.decli=-cs.decli}
        
        displayFaces(polyhedre)	
        TracerHeuresEtArcs() 

        EcrireDevise(cs.devise, cs.positionDevisex, cs.positionDevisey)	
        SudSundial.hide()
        }
        //SudSundial.hide()
        // console.log(vSud,vNorm,cs.decli)
        // console.log(normalsFaces[nFace])
        //}
    
    
     //}
}
}

//function fonctionAExecuter(){}
const choixFace = guiSectionPoly.add(rotationFaces, "face", 1, nbFaces,1)
    .name(" Edit facet n°")
    .onChange(function (f) {
        //meshFaces[nFace].material.opacity=0
        nFace = f - 1
        if (nFace >= nbFaces) { nFace = 0 }
        //setTimeout(PlacerStyleToriquePoly(nFace,hauteursGnomons[nFace]), 5000);
        
        // for (let i = 0; i < nbFaces; i++) {
        // 	if (i != nFace) { meshFaces[i].material.opacity = 0.2 }
        // 	else { meshFaces[i].material.opacity = 1 }
        //setinterval(function(){},200)
        PlacerStyleToriquePoly(nFace, hauteursGnomons[nFace])
        //meshFaces[nFace].material.opacity=1
        })

    
    .onFinishChange(function () {
        PlacerLeSoleil()
        displayFaces(polyhedre)

        //Poly2D=true
        TracerHeuresEtArcs()
        Poly2D = false
        EcrireDevise(cs.devise, cs.positionDevisex, cs.positionDevisey)
        // for (let i = 0; i < nbFaces; i++) {
        // 	{ meshFaces[i].material.opacity = cs.opaciteCS }
        // }
    })    

    

const BaseSundial = guiSectionPoly.add(rotationFaces, "rotationBase").name("Base facet")
const SudSundial = guiSectionPoly.add(rotationFaces, "rotationSud").name("Sud facet")

guiSectionPoly.close()
guichoixPoly.close()
guiSectionPoly.hide()
SudSundial.show()

}  //InitGuiPolyedres

function voirSectionPoly(b) {
guiSectionPoly.title("POLYEDRA : " + polyhedre.name)
if (b) { guiSectionPoly.show() } else { guiSectionPoly.hide() }
}

function faceSurBase(n){
        const vNorm = new THREE.Vector3()
        const eul = new THREE.Euler()
        quaternion.setFromUnitVectors(vNorm.fromArray(normalsFaces[n]), new THREE.Vector3(0,-1, 0))
        eul.setFromQuaternion ( quaternion, 'YXZ' )
        //cs.decli=eul.y*180/Math.PI
        cs.decli=0
        cs.incli=eul.x*180/Math.PI+90
        cs.rot  =eul.z*180/Math.PI
        displayFaces(polyhedre)
        TracerHeuresEtArcs() 
}

function TracerToutesLesFaces(){
EffacerLesLignes=false
for (let f = 0; f < nbFaces; f++) {
    nFace=f
    PlacerGnomonPoly(cs.xgnomon,cs.ygnomon)
    displayFaces(polyhedre)
    //cadran = meshFaces[nFace].clone()
    
    TracerHeuresEtArcs() 			
}
EffacerLesLignes=true
}
function RTSpolyhedre (){
if ((cs.typeCadran == RTS)&&(cs.typeForme=="polyedric")){return true}else{return false}
}

function initPol(gui) {
polyhedre = POLYHEDRA.Dodecahedron
nbFaces = polyhedre.face.length
cs.xgnomon=0;cs.ygnomon=0
nFace = 0
cs.decli=0;cs.incli=90;cs.rot=0
Rpol = cs.rayonPolyedre
cs.largeur=Rpol*3
cs.hauteur=cs.largeur
displayFaces(polyhedre)
cadranSolaireGroup.add(groupAxes)	
TracerHeuresEtArcs()
faceSurBase(nFaceMax)
//TracerToutesLesFaces()	

}