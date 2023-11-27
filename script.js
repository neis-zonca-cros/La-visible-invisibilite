var mapObjects = new Map();
var uniqueStreets;
var streetsCount;
var streetsCountStr;
var countM = parseInt(0);
var countF = parseInt(0);
var countO = parseInt(0);
const numbers = "0123456789";
const target = document.getElementById("numberOfStreets");

//Mot de liaisons des rues à skip
const COMMON_STREET_WORDS = [
    "Rue", "de", "la", "le", "du", "Avenue", "Chemin", "Route", "Tunnel",
    "Allée", "Place", "Voie", "Boulevard", "des", "Impasse", "Quai",
    "Grande", "et", "du", "les", "", "Montée"
];

//Syntaxe de la request à faire pour utiliser l'API
const queryRequest = `
[out:json];
area(id:3600120965)->.searchArea;
(
  way["highway"]["name"](area.searchArea);
);
out;
`;

//Récupère la base de donnée des prénoms et le transforme en un objet map
await fetch('Liste_Prenoms.json')
	.then(response => {
		if (!response.ok) {
			throw new Error("Network response wasn't ok");
		}
		return response.json()
	})
	.then(data => {
		for (let i=0; i<data.length; i++) {
			mapObjects.set(data[i].name.charAt(0).toLowerCase() + data[i].name.slice(1), data[i].genre);
		}
	})
	.catch(error => console.error('Error loading listePrenoms.json:', error));



//Fonction qui fait la requête à l'API
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
				//Fait un tableau de noms de rue unique sans doublons
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


//Fonction pour animer les chiffres en attendant la valeur
function loaderGlobal(target) {
	let iterations = 0;
	let interval = setInterval(() => {
		let nbr = "";
		for (let i=0; i<4; i++) {
			nbr += Math.floor(Math.random() * 10).toString();
		}
		target.innerText = nbr;
		if (iterations >= 4) {
			clearInterval(interval);
		}

		iterations += 1/10; 
	}, 50);
}

//Fonction pour animer les chiffres lorsqu'on à la valeur
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
		if (iterations >= 4) {
			clearInterval(interval);
		}

		iterations += 1/10; 
	}, 50);
}


//Fonction pour compter le genre des rues
async function countGenre() {
	loaderGlobal(target);
	//Attends la requete API et mets le tableau de rue uniques dans streets
	let streets = await getStreetArray(queryRequest);
	loaderStr(target);
	document.getElementById("numberOfStreets").onmouseover = event => {
		loaderStr(event.target);
	}

	//Parcours tout notre tableau de rue, 
	//et check si c'est compris dans notre map et check son genre
	for (let i = 0; i < streets.length; i++) {
		let tempTab = streets[i].split(/\s|(?<=l'|s'|d'|L'|S'|D'|Saint-)|-/).filter(Boolean);
		for (let j = 0; j < tempTab.length; j++) {
			if (COMMON_STREET_WORDS.includes(tempTab[j])) {
				continue;
			} else {
				tempTab[j] = tempTab[j].charAt(0).toLowerCase() + tempTab[j].slice(1);
				if (mapObjects.get(tempTab[j]) === 'f') {
					countF += 1;
					break;
				} else if (mapObjects.get(tempTab[j]) === 'm') {
					countM += 1;
					break;
				}
				if (j + 1 >= tempTab.length) {
					// console.log(tempTab);
					countO += 1;
				}
			}
		}
	}
}


await countGenre();
document.getElementById("numberOfStreets").innerHTML = streetsCountStr;
console.log("Féminin : " + countF);
console.log("Masculin : " + countM);
console.log("Other : " + countO);


function loader2digit(target) {
	let iterations = 0;
	let interval = setInterval(() => {
		let nbr = "";
		for (let i=0; i<2; i++) {
			nbr += Math.floor(Math.random() * 10).toString();
		}
		target.innerText = nbr;
		if (iterations >= 4) {
			clearInterval(interval);
		}

		iterations += 1/10; 
	}, 50);
}

export var pourcentO = Math.round(100*countO/streetsCount);
export var pourcentP = Math.round(100*(countM+countF)/streetsCount);
export var pourcentM = Math.round(100*countM/streetsCount);
export var pourcentF = Math.round(100*countF/streetsCount);


//afficher pourcentage Other
document.getElementById("pourcentO").innerHTML = pourcentO;

//afficher pourcentage Personnes
document.getElementById("pourcentP").innerHTML = pourcentP;

//afficher pourcentage Masculins
document.getElementById("pourcentM").innerHTML = pourcentM;

//afficher pourcentage Feminins
document.getElementById("pourcentF").innerHTML = pourcentF;



console.log("Femmes : " + pourcentF + "%")
console.log("Other : " + pourcentO + "%")
console.log("Persons : " + pourcentP + "%")
console.log("Hommes : " + pourcentM + "%")