var objectsJSON;
var uniqueStreets;
var streetsCount;
var countM = parseInt(0);
var countF = parseInt(0);
var countO = parseInt(0);
const queryRequest = `
[out:json];
area(id:3600120965)->.searchArea;
(
  way["highway"]["name"](area.searchArea);
);
out;
`;

await fetch('Liste_Prenoms.json')
	.then(response => {
		if (!response.ok) {
			throw new Error("Network response wasn't ok");
		}
		return response.json()
	})
	.then(data => {
		objectsJSON = data;
	})
	.catch(error => console.error('Error loading listePrenoms.json:', error));




async function getStreetArray(queryRequest) {
	return fetch("https://overpass-api.de/api/interpreter", {
		method: 'POST',
		mode: 'cors',
		body: "data=" + encodeURIComponent(queryRequest)
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return (response.json());
		})
		.then((data) => {
			if (data && data.elements) {
				uniqueStreets = Array.from(new Set(data.elements.map(element => element.tags.name))).filter(Boolean);
				streetsCount = uniqueStreets.length;
				return (uniqueStreets);
			} else {
				throw new Error('Invalid Data Format');
			}
		})
		.catch(error => {
			console.error('There was a problem with the fetch operation:', error);
		});
}


async function countGenre() {
	let streets = await getStreetArray(queryRequest);
	
	for (let i = 0; i < streets.length; i++) {
		let tempTab = streets[i].split(/\s|(?<=l'|s'|d'|L'|S'|D'|Saint-)|-/).filter(Boolean);
		for (let j = 0; j < tempTab.length; j++) {
			if (
				//to do a mettre dans une constante + rajouter les nombres
				tempTab[j] === "Rue" || tempTab[j] === "de" ||
				tempTab[j] === "la" || tempTab[j] === "le" ||
				tempTab[j] === "du" || tempTab[j] === "Avenue" ||
				tempTab[j] === "Chemin" || tempTab[j] === "Route" ||
				tempTab[j] === "Tunnel" || tempTab[j] === "Allée" ||
				tempTab[j] === "Place" || tempTab[j] === "Voie" ||
				tempTab[j] === "Boulevard" || tempTab[j] === "des" ||
				tempTab[j] === "Impasse" || tempTab[j] === "Quai" ||
				tempTab[j] === "Grande" || tempTab[j] === "et" ||
				tempTab[j] === "du" || tempTab[j] === "les" || 
				tempTab[j] == "" || tempTab[j] === "Montée") {
				continue;
			} else {
				let indexNameIn = objectsJSON.findIndex(obj => (obj.name.charAt(0).toLowerCase() + obj.name.slice(1)) === (tempTab[j].charAt(0).toLowerCase() + tempTab[j].slice(1)));
				if (indexNameIn >= 0) {
					if (objectsJSON[indexNameIn].genre === 'f') {
						countF += 1;
					} else {
						countM += 1;
					}
					break;
				} else {
					if (j + 1 >= tempTab.length) {
						console.log(tempTab);
						countO += 1;
					}
				}
			}
		}
	}
}


await countGenre();
console.log("Féminin : " + countF);
console.log("Masculin : " + countM);
console.log("Other : " + countO);
var pourcentO = Math.round(100*countO/streetsCount);
var pourcentP = Math.round(100*(countM+countF)/streetsCount);
var pourcentM = Math.round(100*countM/streetsCount);
var pourcentF = Math.round(100*countF/streetsCount);
console.log("Femmes : " + pourcentF)
console.log("Other : " + pourcentO)
console.log("Persons : " + pourcentP)
console.log("Hommes : " + pourcentM)

//afficher pourcentage Other
document.getElementById("pourcentO").innerHTML = pourcentO;

//afficher pourcentage Personnes
document.getElementById("pourcentP").innerHTML = pourcentP;

//afficher pourcentage Masculins
document.getElementById("pourcentM").innerHTML = pourcentM;

//afficher pourcentage Feminins
document.getElementById("pourcentF").innerHTML = pourcentF;

