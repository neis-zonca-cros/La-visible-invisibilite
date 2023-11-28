import { main } from './script.js';

var pourcents = await main();
var pourcentF = pourcents.pourcentF;
var pourcentM = pourcents.pourcentM;
var pourcentO = pourcents.pourcentO;
var pourcentP = pourcents.pourcentP;
//Fonction aléatoire pour les ronds 
var divRond = ["rond", "rondp", "rondh", "rondf", "rondff", "rondhh"]
var containerRond = [".container", ".container1", ".container2", ".container3", ".container4", ".container5"]
function aleatoire (pourcent, divRond, containerRond, taillex, tailley){
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

console.log(aleatoire (pourcentO, divRond[0], containerRond[0]));
aleatoire (pourcentP, divRond[1], containerRond[1]);
aleatoire (pourcentM, divRond[2], containerRond[2]);
aleatoire (pourcentF, divRond[3], containerRond[3]);
aleatoire (pourcentF, divRond[4], containerRond[4]);
aleatoire (pourcentM, divRond[5], containerRond[5]);

