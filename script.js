var objectsJSON;

await fetch('listePrenoms.json')
	.then(response => {
		response.json()
	})
	.then(data => {
		objectsJSON = data;
		console.log(objectsJSON);
	})
	.catch(error => console.error('Error loading listePrenoms.json:', error));


const queryRequest = `
[out:json];
area(id:3600120965)->.searchArea;
(
  way["highway"]["name"](area.searchArea);
);
out;
`;

var uniqueStreet;

function getStreetArray(queryRequest) {
	fetch("https://overpass-api.de/api/interpreter", {
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
			uniqueStreet = Array.from(new Set(data.elements.map(element => element.tags.name))).filter(Boolean);
			console.log(uniqueStreet);
			return (uniqueStreet);
		})
		.catch(error => {
			console.error('There was a problem with the fetch operation:', error);
		});
}

getStreetArray(queryRequest);

function countGenre() {
	let countM = parseInt(0);
	let countF = parseInt(0);
	let countO = parseInt(0);
	let streets = getStreetArray(queryRequest);
	let otherTab = [];

	for (let i = 0; i < streets.length; i++) {
		let tempTab = streets[i].split(' ');
		for (let j = 0; j < tempTab.length; j++) {
			if (tempTab[j] === "Rue" || tempTab[j] === "de" ||
				tempTab[j] === "la" || tempTab[j] === "le" ||
				tempTab[j] === "du" || tempTab[j] === "Avenue" ||
				tempTab[j] === "Chemin" || tempTab[j] === "Route" ||
				tempTab[j] === "Tunnel") {
				continue;
			}
			for (let k = 0; k < objectsJSON.length; k++) {
				if (objectsJSON[k]['01_prenom'] === tempTab[j]) {
					if (objectsJSON[k]['02_genre'] === 'm') {
						countM += 1;
					} else if (objectsJSON[k]['02_genre'] === 'f') {
						countF += 1;
					} else {
						otherTab.push(streets[i])
						countO += 1;
					}
				}
			}
		}
	}
	return (otherTab);
}

countGenre();
