var mapObjects = new Map();
var uniqueStreets;
var streetsCount;
var streetsCountStr;
var countM = parseInt(0);
var countF = parseInt(0);
var countO = parseInt(0);
var pourcentO = Math.round(100*countO/streetsCount);
var pourcentP = Math.round(100*(countM+countF)/streetsCount);
var pourcentM = Math.round(100*countM/streetsCount);
var pourcentF = Math.round(100*countF/streetsCount);

const numbers = "0123456789";
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZà! ";
const targetStreets = document.getElementById("numberOfStreets");
const targetO = document.getElementById("pourcentO");
const targetP = document.getElementById("pourcentP");
const targetM = document.getElementById("pourcentM");
const targetF = document.getElementById("pourcentF");
const targetWelcome = document.querySelector("h1");
const welcomeMsg = document.getElementById("welcomeMsg").innerText;

//Mot de liaisons des rues à skip
const COMMON_STREET_WORDS = [
    "Rue", "de", "la", "le", "du", "Avenue", "Chemin", "Route", "Tunnel",
    "Allée", "Place", "Voie", "Boulevard", "des", "Impasse", "Quai",
    "Grande", "et", "du", "les", "", "Montée", "La", "Le", "Du", "Les",
	"rue", "route", "Des"
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
				uniqueStreets = uniqueStreets.filter(street => !/parking|n°|accès|sortie|acces|vélos/i.test(street) && street.split(/\s+/).length > 1 && !/\d/.test(street));
				streetsCount = uniqueStreets.length;
				streetsCountStr = streetsCount.toString();
				return (uniqueStreets);
			} else {
				throw new Error('Invalid Data Format');
			} à	
		})
		.catch(error => {
			console.error('There was a problem with the fetch operation:', error);
		});
}


//Fonction pour animer les chiffres en attendant la valeur
function loaderGlobal(target, count) {
	let iterations = 0;
	let interval = setInterval(() => {
		let nbr = "";
		for (let i=0; i<count; i++) {
			nbr += Math.floor(Math.random() * 10).toString();
		}
		target.innerText = nbr;
		if (iterations >= count) {
			clearInterval(interval);
		}

		iterations += 1/10; 
	}, 50);
}

//Fonction pour animer les chiffres lorsqu'on à la valeur
function loaderRightNumber(target, count, string) {
	let iterations = 0;
	let interval = setInterval(() => {
		target.innerText = target.innerText.split("")
		.map((number, index) => {
			if (index < iterations) {
				return string[index];
			}
			return numbers[Math.floor(Math.random() * 10)]
		})
		.join("");
		if (iterations >= count) {
			clearInterval(interval);
		}
		iterations += 1/10; 
	}, 50);
}

function loaderWelcome(target, count, string) {
	let iterations = 0;
	let interval = setInterval(() => {
		target.innerText = target.innerText.split("")
		.map((letter, index) => {
			if (index < iterations) {
				return string[index];
			}
			return alphabet[Math.floor(Math.random() * 29)]
		})
		.join("");
		if (iterations >= count) {
			clearInterval(interval);
		}
		iterations += 1; 
	}, 30);
}


//Fonction pour compter le genre des rues
async function countGenre(streets) {

	// Parcours tout notre tableau de rue, 
	// et check si c'est compris dans notre map et check son genre
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
					console.log(tempTab);
					countO += 1;
				}
			}
		}
	}
	console.log("Féminin : " + countF);
	console.log("Masculin : " + countM);
	console.log("Other : " + countO);

	pourcentO = Math.round(100*countO/streetsCount);
	pourcentP = Math.round(100*(countM+countF)/streetsCount);
	pourcentM = Math.round(100*countM/streetsCount);
	pourcentF = Math.round(100*countF/streetsCount);

	loaderRightNumber(targetO, 2, pourcentO.toString());
	loaderRightNumber(targetP, 2, pourcentP.toString());
	loaderRightNumber(targetM, 2, pourcentM.toString());
	loaderRightNumber(targetF, 1, pourcentF.toString());	

	console.log("Femmes : " + pourcentF + "%")
	console.log("Other : " + pourcentO + "%")
	console.log("Persons : " + pourcentP + "%")
	console.log("Hommes : " + pourcentM + "%")

	return { pourcentO, pourcentP, pourcentM, pourcentF };
}







export async function main() {
	let streets = await getStreetArray(queryRequest);
	//Attends la requete API et mets le tableau de rue uniques dans streets
	loaderRightNumber(targetStreets, streetsCountStr.length, streetsCountStr);
	return await countGenre(streets);
}


/*---------------------------------*/

loaderGlobal(targetStreets, 4);
loaderGlobal(targetO, 2);
loaderGlobal(targetP, 2);
loaderGlobal(targetM, 2);
loaderGlobal(targetF, 1);
loaderWelcome(targetWelcome, welcomeMsg.length, welcomeMsg);

document.getElementById("numberOfStreets").onmouseover = event => {
	loaderRightNumber(event.target, streetsCountStr.length, streetsCountStr);
}