var objectsJSON;
var uniqueStreets;
var streetsCount;
var streetsCountStr;
var countM = parseInt(0);
var countF = parseInt(0);
var countO = parseInt(0);
const numbers = "0123456789";
const target = document.getElementById("numberOfStreets");
const COMMON_STREET_WORDS = [
    "Rue", "de", "la", "le", "du", "Avenue", "Chemin", "Route", "Tunnel",
    "Allée", "Place", "Voie", "Boulevard", "des", "Impasse", "Quai",
    "Grande", "et", "du", "les", "", "Montée"
];
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
				streetsCountStr = streetsCount.toString();
				return (uniqueStreets);
			} else {
				throw new Error('Invalid Data Format');
			}
		})
		.catch(error => {
			console.error('There was a problem with the fetch operation:', error);
		});
}


function loaderStr(target) {
	let iterations = 0;
	let interval = setInterval(() => {
		target.innerText = target.innerText.split("")
		.map((number, index) => {
			if (index < iterations) {
				return streetsCountStr[index];
			}
			return numbers[Math.floor(Math.random() * 10)]
		})
		.join("");
		if (iterations >= streetsCountStr.length) {
			clearInterval(interval);
		}

		iterations += 1/10; 
	}, 50);
}

async function countGenre() {
	let streets = getStreetArray(queryRequest);
	loaderStr(target);
	document.getElementById("numberOfStreets").onmouseover = event => {
		loaderStr(event.target);
	}

	for (let i = 0; i < streets.length; i++) {
		let tempTab = streets[i].split(/\s|(?<=l'|s'|d'|L'|S'|D'|Saint-)|-/).filter(Boolean);
		for (let j = 0; j < tempTab.length; j++) {
			if (COMMON_STREET_WORDS.includes(tempTab[j])) {
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
document.getElementById("numberOfStreets").innerHTML = streetsCountStr;
console.log(streetsCountStr);
for (let i=0; i<4; i++) {
	loaderStr(target);
}
console.log("Féminin : " + countF);
console.log("Masculin : " + countM);
console.log("Other : " + countO);
export var pourcentO = 100*countO/streetsCount;
export var pourcentP = 100*(countM+countF)/streetsCount;
export var pourcentM = 100*countM/streetsCount;
export var pourcentF = 100*countF/streetsCount;
console.log("Femmes : " + pourcentF)
console.log("Other : " + pourcentO)
console.log("Persons : " + pourcentP)
console.log("Hommes : " + pourcentM)