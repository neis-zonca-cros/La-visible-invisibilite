const overpassQuery = `
  [out:json];
  area["name"="Lyon"]->.searchArea;
  ( 
      way["name"]["highway"~"residential|tertiary|primary|secondary|unclassified|road|living_street"](area.searchArea);
  );
  out body;
`;

const overpassApiUrl = 'https://overpass-api.de/api/interpreter';

fetch(overpassApiUrl, {
	method: 'POST',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
	},
	body: `data=${encodeURIComponent(overpassQuery)}`,
})
	.then(response => response.json())
	.then(data => {
		const uniqueNames = Array.from(new Set(data.elements.map(element => element.tags.name))).filter(Boolean);
		console.log(uniqueNames);
	})
	.catch(error => {
		console.error(error);
	});
