const overpassQuery = `
[out:json][timeout:2500];
area(id:3600120965)->.searchArea;
(
  way["highway"]["name"](area.searchArea);
);
for (t["name"])
{
  make street name=_.val;
  out;
}
`;

fetch("https://overpass-api.de/api/interpreter", {
	method: 'POST',
	mode: 'cors',
	body: "data=" + encodeURIComponent(overpassQuery)
})
	.then((response) => {
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return response.json();
	})
	.then((data) => {
		console.log(data);
		const uniqueNames = Array.from(new Set(data.elements.map(element => element.tags.name))).filter(Boolean);
		console.log(uniqueNames);
	})
	.catch(error => {
		console.error('There was a problem with the fetch operation:', error);
	});
