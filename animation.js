import { main, loaderRightNumber } from './script.js';

//Fonction aléatoire pour les ronds 
const divRond = ["rond", "rondp", "rondh", "rondf", "rondff", "rondhh"]
const containerRond = [".container", ".container1", ".container2", ".container3", ".container4", ".container5"]
const targetO = document.getElementById("pourcentO");
const targetP = document.getElementById("pourcentP");
const targetM = document.getElementById("pourcentM");
const targetF = document.getElementById("pourcentF");


async function printRandomCircles(pourcent, divRond, containerRond) {
    for (let i = 0; i<pourcent; i++){
        var rondGx = document.createElement('div');
        rondGx.id = divRond + i;
        rondGx.dataset.aos = "zoom-in";
        rondGx.classList.add(divRond);
        document.querySelector(containerRond).appendChild(rondGx);

        var pos_x = Math.round(Math.random()* screen.width);
        var pos_y = Math.round(Math.random()* 400);

        document.getElementById(divRond + i).style.left = pos_x + "px";
        document.getElementById(divRond + i).style.top = pos_y + "px"; 

    }
}

main()
	.then((pourcents) => {
		let pourcentF = pourcents.pourcentF;
		let pourcentM = pourcents.pourcentM;
		let pourcentO = pourcents.pourcentO;
		let pourcentP = pourcents.pourcentP;

		loaderRightNumber(targetO, 2, pourcentO.toString());
		loaderRightNumber(targetP, 2, pourcentP.toString());
		loaderRightNumber(targetM, 2, pourcentM.toString());
		loaderRightNumber(targetF, 2, pourcentF.toString());

		printRandomCircles(pourcentO, divRond[0], containerRond[0]);
		printRandomCircles(pourcentP, divRond[1], containerRond[1]);
		printRandomCircles(pourcentM, divRond[2], containerRond[2]);
		printRandomCircles(pourcentF, divRond[3], containerRond[3]);
		printRandomCircles(pourcentF, divRond[4], containerRond[4]);
		printRandomCircles(pourcentM, divRond[5], containerRond[5]);
	})
	.catch((error) => {
		console.error('An error occurred in main:', error);
});


