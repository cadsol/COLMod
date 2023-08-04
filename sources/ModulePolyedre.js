


import * as THREE from '../build/three.module.js';  //version 149
//import Stats from './jsm/libs/stats.module.js';
//import { GUI } from './jsm/libs/lil-gui.module.min.js';

import { ConvexGeometry } from './jsm/geometries/ConvexGeometry.js';
//import * as BufferGeometryUtils from './jsm/utils/BufferGeometryUtils.js';
import { POLYHEDRA } from './polyhedra.js';
import { cs } from './colvars';
//import { Parser } from './parser.js';

export   let cadranPoly,torePoly

let categoryFolders,  meshFace,gnomonGeometry,
	nbFaces, nFace, normalFace, guiSectionPoly, polyhedre,
	quaternion = new THREE.Quaternion(),
	matCS,matGN,
	meshFaces=[],meshGnomons=[],normalFaces=[]

// const meshMaterialFace = new THREE.MeshStandardMaterial({
// 		color: 0x00ffff,
// 		opacity: 0.9,
// 		side: THREE.DoubleSide,
// 		transparent: true,
// 		//map: texture
// 		//syze:0.1
// 	});


	
	

function effacelisteMesh(listeMesh, group) {
	//Effacement des lignes existantes
	const lm = listeMesh.length;
	let mesh;
	for (let i = 0; i < lm; i++) {
		mesh = listeMesh[i];
		mesh.geometry.dispose();
		group.remove(mesh);
		mesh.clear
	}
	listeMesh = [];
}

export function displayFaces(Pol, group) {
	let nSommetsParFace = 0,  v
	let c1 = new THREE.Vector3(), c2 = new THREE.Vector3()
	let a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3()

	nbFaces = Pol.face.length
	//if (nf >= nbFaces) { nf = 0 }
	//console.log(nbFaces)
	const verticesFace = []
	const k = cs.rayonPolyedre
	effacelisteMesh(meshFaces, group)
	effacelisteMesh(meshGnomons, group)
	meshFaces=[],meshGnomons=[],normalFaces=[]
	//v3=new THREE.Vector3()
	//console.log(lf)
	for (let n = 0; n < nbFaces; n++) {
		let sx = 0, sy = 0, sz = 0
		const lf = Pol.face[n]
		for (let i = 0; i < lf.length; i++) {
			const j = Pol.face[n][i]
			nSommetsParFace = Pol.face[n].length
			v = Pol.vertex[j]							 
			sx += v[0] * k; sy += v[1] * k; sz += v[2] * k
			const verticeFace = new THREE.Vector3(v[0] * k, v[1] * k, v[2] * k);
			verticesFace.push(verticeFace);
			if (i == 0) { a = verticeFace.clone() }
			if (i == 1) { b = verticeFace.clone() }
			if (i == 2) { c = verticeFace.clone() }
			}
			c1 = c1.subVectors(b, a)
			c2 = c2.subVectors(c, a)
			//c1 = c1.cross(c2).normalize()
			normalFace =c1.cross(c2).normalize() 
			normalFaces.push(normalFace)
		
		const centerFace = new THREE.Vector3(sx / nSommetsParFace, sy / nSommetsParFace, sz / nSommetsParFace)
		verticesFace.push(centerFace)
		const meshGeometry = new ConvexGeometry(verticesFace);
		meshFace = new THREE.Mesh(meshGeometry, matCS);
		group.add(meshFace)
		meshFace.receiveShadow = true
		meshFaces.push(meshFace)

		
		
		//console.log(meshFace.rotation)
		const gnomonGeometry = new THREE.CylinderGeometry(cs.egnomon, cs.egnomon, cs.paramfacePolyedre.z)
		const gnomon = new THREE.Mesh(gnomonGeometry,matGN);meshGnomons.push(gnomon)
		meshFace.add(gnomon)
		
		//group.add(gnomon)
		gnomon.position.x = centerFace.x
		gnomon.position.y = centerFace.y
		gnomon.position.z = centerFace.z
		gnomon.lookAt(normalFace)
		gnomon.rotateX(Math.PI / 2)
		gnomon.castShadow = true
		meshGnomons.push(gnomon)
		// gnomon.translateY(-cs.paramfacePolyedre.x-20)
		// gnomon.translateZ(-cs.paramfacePolyedre.y-10)
	}
}




export function InitGuiPolyedres(gui,group,cadran) {

		guiSectionPoly = gui.addFolder("POLYEDRA");
		polyhedre = POLYHEDRA.Dodecahedron
		nbFaces=12

	categoryFolders = {};
	let parameters = {}// {function(){}};
		// check category[0]. if folder does not exist, create it, add it to that folder.
		// if category field DNE, just add it to the end.

		for (var arg in POLYHEDRA) {
			var guiSection = guiSectionPoly;
			if (POLYHEDRA[arg].hasOwnProperty("category")) {
				var category = POLYHEDRA[arg].category[0];
				if (!categoryFolders.hasOwnProperty(category))
					categoryFolders[category] = guiSectionPoly.addFolder(category);
				guiSection = categoryFolders[category];
			}
			parameters[arg] = function () { };
			const g = guiSection.add(parameters, arg).name(POLYHEDRA[arg].name)

			const a = arg
			g.domElement.addEventListener("click", function () {
				polyhedre = POLYHEDRA[a]
				guiSectionPoly.title("POLYEDRA : " + polyhedre.name)
				nbFaces =polyhedre.face.length
				nFace=0
				displayFaces(polyhedre, group)
				})
		}
		for (var arg in categoryFolders) { categoryFolders[arg].close() }


	let sundial = {
		face: 1,
		rotationBase() {
			quaternion.setFromUnitVectors(normalFaces[nFace], new THREE.Vector3(0, -1, 0))
			group.setRotationFromQuaternion(quaternion)
			//displayFaces(polyhedre,nFace, group)
			// const a = new THREE.Euler()
			// a.setFromQuaternion(quaternion,'YXZ')
			// cs.incli=a.x*180/Math.PI;cs.decli=a.y*180/Math.PI,cs.rot=a.z*180/Math.PI
			//group.rotation=quaternion.identity()
		}
	};

	const choixFace = guiSectionPoly.add(sundial, "face", 1, nbFaces, 1)
		.name(" Edit facet ...")
		.onChange(function (f) {
			nbFaces = polyhedre.face.length
			choixFace.max(nbFaces)
			choixFace.updateDisplay()
			//meshFaces[nFace].material = matCS
			nFace = f-1
			if (nFace>=nbFaces){nFace=0}
			cadranPoly=meshFaces[nFace]
			meshGnomons[nFace].add(torePoly)
			torePoly.position.x=0
			torePoly.position.y=-cs.paramfacePolyedre.z/2
			torePoly.position.z=0
			torePoly.lookAt(normalFaces[nFace])
			
		
			//cam.lookAt(normalFaces[nFace])
		    //styleTorique.rotateX(Math.PI / 2)
			
			//meshFaces[nFace].material.emissive.setHex(0xff0000)
			//material.emissive.setHex( 0xff0000 )
			//meshFaces[nFace].material=matGN
			//displayFaces(polyhedre, nFace, group)

		})

	const BaseSundial = guiSectionPoly.add(sundial, "rotationBase").name("Base facet")
		
	guiSectionPoly.close()
	guiSectionPoly.hide()
	cs.axesXYZ=false
	
		
	} //InitGuiPolyedres

export function voirSectionPoly(b){
	guiSectionPoly.title("POLYEDRA : " + polyhedre.name)
	if (b){guiSectionPoly.show()}else {guiSectionPoly.hide()}
	}

export function initPol( cadran,group,materialCS,materialGN) {
	//polyhedre = POLYHEDRA.Dodecahedron
	
	polyhedre = cs.typePolyedre
	nbFaces =polyhedre.face.length
	nFace=1
	matCS=materialCS;matGN=materialGN
	displayFaces(polyhedre, group)

	cadran=meshFaces[0]
    //cadran=polyhedre
	const k=Math.max(cs.egnomon,1)
	const geoTore= new THREE.TorusGeometry(k*5,k,32,32)
	torePoly= new THREE.Mesh(geoTore,materialGN);
	// meshGnomons[nFace].add(torePoly)
	// torePoly.position.set(0,-cs.paramfacePolyedre.z/2,0)
	// torePoly.lookAt(normalFaces[nFace])
	torePoly.castShadow = true;	
	

}

		


