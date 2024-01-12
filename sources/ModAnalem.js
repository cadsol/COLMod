
import { cs } from './Modcolvars.js';
import * as THREE from 'three';



export function eclair() {
	var la = cs.lati * Math.PI / 180, ic = cs.incli * Math.PI / 180, dc = -cs.decli * Math.PI / 180;
	var amn, a1 = 5, a2, amx, ob = .4091;

	function alev(la, lo) {
		// Angle horaire local minimum au lever du soleil
		// à la latitude la et différence de longitude lo
		var al = -Math.acos(-Math.abs(Math.tan(la)) * Math.tan(ob)) + lo;
		if (al < -Math.PI) al += 2 * Math.PI;
		return al;
	}

	function acou(la, lo) {
		// Angle horaire local maximum au coucher du soleil
		// à la latitude la et différence de longitude lo
		var ac = Math.acos(-Math.abs(Math.tan(la)) * Math.tan(ob)) + lo;
		if (ac > Math.PI) ac -= 2 * Math.PI;
		return ac;
	}

	// Latitude du cadran horizontal équivalent (CHE)
	var lae = Math.asin(Math.sin(la) * Math.cos(ic) - Math.cos(la) * Math.cos(dc) * Math.sin(ic));
	// Différence de longitude du CHE (positive si le CHE est à l’ouest)
	var loe = Math.atan2(Math.sin(dc) * Math.sin(ic), Math.cos(la) * Math.cos(ic) + Math.sin(la) * Math.cos(dc) * Math.sin(ic));

	if (Math.abs(Math.cos(la) * Math.sin(dc)) >= Math.sin(ob)) {
		// Sur la sphère céleste les intersections des grands cercles
		// de l’horizon et du cadran (I1 et I2) sont hors des tropiques.
		// On se situe donc entre les cercles polaires, le CHE aussi.
		if (loe > 0) {
			// Le CHE est à l’ouest,
			// le cadran n’est pas éclairé le matin
			amn = alev(lae, loe); amx = acou(la, 0);
		} else {
			// Le CHE est à l’est,
			// le cadran n’est pas éclairé le soir
			amn = alev(la, 0); amx = acou(lae, loe);
		}
	} else {
		// Les points I1 et I2 sont entre les tropiques.
		if (la * lae < 0) {
			// Le CHE est situé dans l’autre hémisphère,
			// les points I1 et I2 marquent généralement les heures extrêmes.
			amn = Math.atan2(-Math.cos(dc) / Math.sin(la), Math.sin(dc));
			amx = Math.atan2(Math.cos(dc) / Math.sin(la), -Math.sin(dc));
			if (Math.cos(la) > Math.sin(ob) && Math.cos(lae) > Math.sin(ob) && Math.cos(loe) < 0) {
				// Quand on se situe entre les cercles polaires, le CHE aussi
				// et que la différence de longitude est importante.
				// Le cadran n’est pas éclairé une partie de la journée.
				if (Math.abs(la) > Math.abs(lae)) {
					// Les points I1 et I2 marquent la période sans éclairement
					// et le cadran peut être éclairé le reste de la journée.
					a1 = amx; a2 = amn;
					amn = alev(la, 0); amx = acou(la, 0);
				} else {
					// Les heures sans éclairement proviennent de la position du cadran
					a1 = acou(lae, loe); a2 = alev(lae, loe);
				}
			}
		} else {
			// Le CHE est dans le même hémisphère
			if (Math.cos(la) <= Math.sin(ob) && Math.cos(lae) <= Math.sin(ob)) {
				// On se situe dans la zone polaire, le CHE aussi.
				// Le cadran peut être éclairé toute la journée.
				amn = -Math.PI; amx = Math.PI;
			} else {
				if (Math.cos(la) > Math.sin(ob) && Math.cos(lae) > Math.sin(ob) && Math.cos(loe) < 0) {
					// On se situe entre les cercles polaires, le CHE aussi
					// et la différence de longitude est importante.
					// Le cadran n’est pas éclairé une partie de la journée.
					amn = alev(la, 0); a1 = acou(lae, loe);
					a2 = alev(lae, loe); amx = acou(la, 0);
				} else {
					if (Math.abs(la) <= Math.abs(lae)) {
						// Dans le cas où la latitude la est plus petite que lae,
						// c’est l’horizon qui limite l’éclairement.
						amn = alev(la, 0); amx = acou(la, 0);
					} else {
						// Sinon c’est le cadran qui limite son éclairement.
						amn = alev(lae, loe); amx = acou(lae, loe);
					}
				}
			}
		}
	}

	if (a1 == 5) { a1 = 0; a2 = 0; }
	if (amn > amx) amx += 2 * Math.PI;
	return [amn, a1, a2, amx];
}


export function Rot(x, y, r) {
    r *= Math.PI / 180;
    return [Math.cos(r) * x + Math.sin(r) * y, -Math.sin(r) * x + Math.cos(r) * y];
}

export function EtoC(x, y, z) {             // Changement de coordonnées équatoriales --> cadran
    [z, x] = Rot(z, x, 90 - cs.lati);  // ... dans le repère local
    [x, y] = Rot(x, y, cs.decli);
    [z, x] = Rot(z, x, cs.incli);      // ... dans le repère cadran
    return [x, y, z];
}


export function ddrte(pts, dx, dy, inv = false) {
    // Complète pts avec les points extrèmes d'une demi-droite à l'intérieur du cadran
    const xlm = cs.largeur / 2, ylm = cs.hauteur / 2;
    const pt0 = pts.pop(), i = pts.length;
    var sl, k = 0, rt = 0, xi, yi, m;
    pt0.z = Math.abs(pt0.z);
    if (Math.abs(pt0.x) <= xlm && Math.abs(pt0.y) <= ylm) {	// pts[i] est à l'intérieur du rectangle,
        rt = 2; pts.push(pt0); k++;						// le point est conservé.
    }
    while (k < 2) {
        if (dx != 0) {
            sl = (k == 0) ? -Math.sign(dx) : Math.sign(dx);	// Pour trouver, et dans le bon ordre.
            m = (sl * xlm - pt0.x) / dx;
            if (m > 0) {									// => La demi-droite coupe la droite x = sl * xlm,
                yi = m * dy + pt0.y;				// en y = yi.
                if (Math.abs(yi) <= ylm) {	// => yi est entre les limites,
                    if (k == 0) rt = 4;				// l'intersection est conservée.
                    pts.push(new THREE.Vector3(sl * xlm, yi, cs.epaisseur / 2));
                    if (pts.length == i + 2) break;
                }
            }
        }
        if (dy != 0) {
            sl = (k == 0) ? -Math.sign(dy) : Math.sign(dy);	// Pour trouver, et dans le bon ordre.
            m = (sl * ylm - pt0.y) / dy;
            if (m > 0) {									// => La demi-droite coupe la droite y = sl * ylm,
                xi = m * dx + pt0.x;				// en x = xi.
                if (Math.abs(xi) <= xlm) {	// => xi est entre les limites,
                    if (k == 0) rt = 4;				// l'intersection est conservée.
                    pts.push(new THREE.Vector3(xi, sl * ylm, cs.epaisseur / 2));
                    if (pts.length == i + 2) break;
                }
            }
        }
        k++;
    }
    if (inv) {										// La demi droite se termine par pt0
        if (rt == 0) pts.push(pt0);	// Pour un éventuel enchainement
        else {											// Inversion des deux points
            pt0 = pts[i]; pts.splice(i, 1); pts.push(pt0);
        }
    }
    return rt;
}

export function segm(pts, pt1) {
    // Complète pts avec les points extrèmes d'un segment à l'intérieur du cadran
    const xlm = cs.largeur / 2, ylm = cs.hauteur / 2;
    const pt0 = pts.pop(), i = pts.length;
    const dx = pt1.x - pt0.x, dy = pt1.y - pt0.y;
    var sl, k = 0, s = 1, rt = 0, xi, yi, m;
    if (Math.abs(pt0.x) <= xlm && Math.abs(pt0.y) <= ylm) {	// pts[i] est à l'intérieur du cadran,
        pts.push(pt0);						// le point est conservé.
        rt = 2; k++;
    }
    if (Math.abs(pt1.x) <= xlm && Math.abs(pt1.y) <= ylm) { // pt1 est à l'intérieur du cadran,
        pts.push(pt1);						// le point est conservé.
        rt++; k++; if (k == 1) s = -1;
    }
    while (k < 2) {
        if (dx != 0) {
            sl = (k == 0) ? -s * Math.sign(dx) : s * Math.sign(dx);	// Pour trouver, et dans le bon ordre.
            m = (sl * xlm - pt0.x) / dx;
            if (m > 0 && m <= 1) {				// => Le segment coupe la droite x = sl * xlm,
                yi = m * dy + pt0.y;				// en y = yi.
                if (Math.abs(yi) <= ylm) {	// => yi est entre les limites,
                    if (k == 0) rt = 4;				// l'intersection est conservée.
                    pts.push(new THREE.Vector3(sl * xlm, yi, cs.epaisseur / 2));
                    if (pts.length == i + 2) break;
                }
            }
        }
        if (dy != 0) {
            sl = (k == 0) ? -s * Math.sign(dy) : s * Math.sign(dy);	// Pour trouver, et dans le bon ordre.
            m = (sl * ylm - pt0.y) / dy;
            if (m > 0 && m < 1) {				// => Le segment coupe la droite y = sl * ylm,
                xi = m * dx + pt0.x;				// en x = xi.
                if (Math.abs(xi) <= xlm) {	// => xi est entre les limites,
                    if (k == 0) rt = 4;				// l'intersection est conservée.
                    pts.push(new THREE.Vector3(xi, sl * ylm, cs.epaisseur / 2));
                    if (pts.length == i + 2) break;
                }
            }
        }
        k++;
    }
    if (rt == 0) pts.push(pt1);	// Pour un éventuel enchainement le second point est placé dans le tableau.
    else if (s == -1) {					// Inversion des deux points
        pt1 = pts[i]; pts.splice(i, 1); pts.push(pt1);
    }
    return rt;
}


