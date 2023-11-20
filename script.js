const apiUrl = "https://api-adresse.data.gouv.fr/search/?q=paris&type=street"

async function getLyonStreets(apiUrl) {
	let response = await fetch(apiUrl);
	let data = await response.json();

	if (data.error) {
		throw new Error('Erreur lors de la récupération des noms de rue.');
	}

	return (data);
}

getLyonStreets(apiUrl)
	.then((data) => {
		console.log(data);
	})
	.catch((error) => {
		console.error(error);
	})