var objectsJSON;
var uniqueStreets;
var numberOfStreets;
const queryRequest = `
[out:json];
area(id:3600120965)->.searchArea;
(
  way["highway"]["name"](area.searchArea);
);
out;
`;


await fetch('listePrenoms.json')
	.then(response => {
		if (!response.ok) {
			throw new Error("Network response wasn't ok");
		}
		return response.json()
	})
	.then(data => {
		objectsJSON = data;
		console.log(objectsJSON);
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
				numberOfStreets = uniqueStreets.length;
				document.getElementById("numberOfStreets").innerHTML = numberOfStreets;
				return (uniqueStreets);
			} else {
				throw new Error('Invalid Data Format');
			}
		})
		.catch(error => {
			console.error('There was a problem with the fetch operation:', error);
		});
}


async function countGenre(streets) {
	let countM = parseInt(0);
	let countF = parseInt(0);
	let countO = parseInt(0);
	let otherTab = [];
	console.log(streets);

	for (let i = 0; i < streets.length; i++) {
		let tempTab = streets[i].split(' ');
		for (let j = 0; j < tempTab.length; j++) {
			if (tempTab[j] === "Rue" || tempTab[j] === "de" ||
				tempTab[j] === "la" || tempTab[j] === "le" ||
				tempTab[j] === "du" || tempTab[j] === "Avenue" ||
				tempTab[j] === "Chemin" || tempTab[j] === "Route" ||
				tempTab[j] === "Tunnel" || tempTab[j] === "Allée" ||
				tempTab[j] === "Place" || tempTab[j] === "Voie" ||
				tempTab[j] === "Boulevard" || tempTab[j] === "des" ||
				tempTab[j] === "Impasse" || tempTab[j] === "Quai" ||
				tempTab[j] === "Grande" || tempTab[j] === "et" ||
				tempTab[j] === "du" || tempTab[j] === "les" ||
				tempTab[j] === "") {
				continue;
			} else {

				console.log(objectsJSON[k]['02_genre'])
				if (objectsJSON[k]['02_genre'] === "m") {
					countM += 1;
				} else if (objectsJSON[k]['02_genre'] === "f") {
					countF += 1;
				} else {
					otherTab.push(streets[i]);
					countO += 1;
				}
			}
		}
	}
}
	}
return (otherTab);
}


let result = await countGenre(await getStreetArray(queryRequest));
console.log("Result : " + result);
