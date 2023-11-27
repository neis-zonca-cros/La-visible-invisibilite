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
var pourcentO = 100*countO/streetsCount;
var pourcentP = 100*(countM+countF)/streetsCount;
var pourcentM = 100*countM/streetsCount;
var pourcentF = 100*countF/streetsCount;
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



//création de pourcentO rond container: noms autres
for (let i = 0; i<pourcentO; i++){
    var rond = document.createElement('div');
    rond.id = "rond" + i;
    rond.classList.add("rond");
    document.querySelector(".container").appendChild(rond);

	var pos_x = Math.round(Math.random()*1512);
	var pos_y = Math.round(Math.random()*200);

    document.getElementById("rond" + i).style.left = pos_x + "px";
    document.getElementById("rond" + i).style.top = pos_y + "px"; 
}

//création de pourcentP rond container1: noms personnes
for (let i = 0; i<pourcentP; i++){
    var rondp = document.createElement('div');
    rondp.id = "rondp" + i;
    rondp.classList.add("rondp");
    document.querySelector(".container1").appendChild(rondp);

    var pos_a = Math.round(Math.random()*1512);
    var pos_b = Math.round(Math.random()*200);

    document.getElementById("rondp" + i).style.left = pos_a + "px";
    document.getElementById("rondp" + i).style.top = pos_b + "px"; 
}

//création de pourcentM rond container2: noms hommes
for (let i = 0; i<= pourcentM; i++){
    var rondh = document.createElement('div');
    rondh.id = "rondh" + i;
    rondh.classList.add("rondh");
    document.querySelector(".container2").appendChild(rondh);

    var pos_c = Math.round(Math.random()*1512);
    var pos_d = Math.round(Math.random()*400);

    document.getElementById("rondh" + i).style.left = pos_c + "px";
    document.getElementById("rondh" + i).style.top= pos_d + "px"; 
}

//création de 49 rond container3: noms femmes
for (let i = 0; i <= pourcentF; i++){
    var rondf = document.createElement('div');
    rondf.id = "rondf" + i;
    rondf.classList.add("rondf");
    document.querySelector(".container3").appendChild(rondf);

    var pos_j = Math.round(Math.random()*1512);
    var pos_k = Math.round(Math.random()*400);

    document.getElementById("rondf" + i).style.left = pos_j + "px";
    document.getElementById("rondf" + i).style.top= pos_k + "px"; 
}

//création de pourcent M + F rond container4: graphique du tout
//rond 4 = Femmes
for (let i = 0; i <= pourcentF; i++){
    var rondff = document.createElement('div');
    rondff.id = "rondff" + i;
    rondff.classList.add("rondff");
    document.querySelector(".container4").appendChild(rondff);

    var pos_l = Math.round(Math.random()*1512);
    var pos_m = Math.round(Math.random()*768);

    document.getElementById("rondff" + i).style.left = pos_l + "px";
    document.getElementById("rondff" + i).style.top= pos_m + "px"; 
}

//rond 5 = Hommes
for (let i = 0; i<=pourcentM; i++){
    var rondhh = document.createElement('div');
    rondhh.id = "rondhh" + i;
    rondhh.dataset.aos="zoom-in";
    rondhh.classList.add("rondhh");
    document.querySelector(".container5").appendChild(rondhh);

    var pos_n = Math.round(Math.random()*1512);
    var pos_o = Math.round(Math.random()*768);

    document.getElementById("rondhh" + i).style.left = pos_n + "px";
    document.getElementById("rondhh" + i).style.top= pos_o + "px"; 
}