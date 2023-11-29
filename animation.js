import { main } from './script.js';

//Fonction aléatoire pour les ronds 
const divRond = ["rond", "rondp", "rondh", "rondf", "rondff", "rondhh"]
const containerRond = [".container", ".container1", ".container2", ".container3", ".container4", ".container5"]



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


