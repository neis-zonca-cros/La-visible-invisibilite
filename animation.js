import { main } from './script.js';

//Fonction aléatoire pour les ronds 
const divRond = ["rond", "rondp", "rondh", "rondf", "rondff", "rondhh"]
const containerRond = [".container", ".container1", ".container2", ".container3", ".container4", ".container5"]
const numbers = "0123456789";
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZà! ";
const targetWelcome = document.querySelector("h1");
const welcomeMsg = document.getElementById("welcomeMsg").innerText;

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
export function loaderRightNumber(target, count, string) {
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

function printRandomCircles(pourcent, divRond, containerRond) {
    for (let i = 0; i<pourcent; i++){
        var rondGx = document.createElement('div');
        rondGx.id = divRond + i;
        rondGx.dataset.aos = "zoom-in";
        rondGx.classList.add(divRond);
        document.querySelector(containerRond).appendChild(rondGx);

        var pos_x = Math.round(Math.random()*(1300-100)+100);
        var pos_y = Math.round(Math.random()*400);

        document.getElementById(divRond + i).style.left = pos_x + "px";
        document.getElementById(divRond + i).style.top = pos_y + "px"; 

    }
}


export function loaderAll() {
	loaderGlobal(targetStreets, 4);
	loaderGlobal(targetO, 2);
	loaderGlobal(targetP, 2);
	loaderGlobal(targetM, 2);
	loaderGlobal(targetF, 1);
	loaderWelcome(targetWelcome, welcomeMsg.length, welcomeMsg);
}

var pourcents = await main();
var pourcentF = pourcents.pourcentF;
var pourcentM = pourcents.pourcentM;
var pourcentO = pourcents.pourcentO;
var pourcentP = pourcents.pourcentP;

printRandomCircles(pourcentO, divRond[0], containerRond[0]);
printRandomCircles(pourcentP, divRond[1], containerRond[1]);
printRandomCircles(pourcentM, divRond[2], containerRond[2]);
printRandomCircles(pourcentF, divRond[3], containerRond[3]);
printRandomCircles(pourcentF, divRond[4], containerRond[4]);
printRandomCircles(pourcentM, divRond[5], containerRond[5]);


