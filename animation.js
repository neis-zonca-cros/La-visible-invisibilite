import { pourcentF } from './script.js';
import { pourcentM } from './script.js';
import { pourcentO } from './script.js';
import { pourcentP } from './script.js';

//création de pourcentO rond container: noms autres
for (let i = 0; i<pourcentO; i++){
    var rond = document.createElement('div');
    rond.id = "rond" + i;
    rond.dataset.aos = "zoom-in";
    rond.classList.add("rond");
    document.querySelector(".container").appendChild(rond);


	var pos_x = Math.round(Math.random()*(1300-100)+100);
	var pos_y = Math.round(Math.random()*400);
    
    document.getElementById("rond" + i).style.left = pos_x + "px";
    document.getElementById("rond" + i).style.top = pos_y + "px"; 

}

//création de pourcentP rond container1: noms personnes
for (let i = 0; i<pourcentP; i++){
    var rondp = document.createElement('div');
    rondp.id = "rondp" + i;
    rondp.dataset.aos = "zoom-in";
    rondp.classList.add("rondp");
    document.querySelector(".container1").appendChild(rondp);

    var pos_a = Math.round(Math.random()*(1300-100)+100);
    var pos_b = Math.round(Math.random()*400);

    document.getElementById("rondp" + i).style.left = pos_a + "px";
    document.getElementById("rondp" + i).style.top = pos_b + "px"; 
}

//création de pourcentM rond container2: noms hommes
for (let i = 0; i<= pourcentM; i++){
    var rondh = document.createElement('div');
    rondh.id = "rondh" + i;
    rondh.dataset.aos = "zoom-in";
    rondh.classList.add("rondh");
    document.querySelector(".container2").appendChild(rondh);

    var pos_c = Math.round(Math.random()*(1300-100)+100);
    var pos_d = Math.round(Math.random()*400);

    document.getElementById("rondh" + i).style.left = pos_c + "px";
    document.getElementById("rondh" + i).style.top= pos_d + "px"; 
}

//création de 49 rond container3: noms femmes
for (let i = 0; i <= pourcentF; i++){
    var rondf = document.createElement('div');
    rondf.id = "rondf" + i;
    rondf.dataset.aos = "zoom-in";
    rondf.classList.add("rondf");
    document.querySelector(".container3").appendChild(rondf);

    var pos_j = Math.round(Math.random()*(1300-100)+100);
    var pos_k = Math.round(Math.random()*400);

    document.getElementById("rondf" + i).style.left = pos_j + "px";
    document.getElementById("rondf" + i).style.top= pos_k + "px"; 
}

//création de pourcent M + F rond container4: graphique du tout
//rond 4 = Femmes
for (let i = 0; i <= pourcentF; i++){
    var rondff = document.createElement('div');
    rondff.id = "rondff" + i;
    rond.dataset.aos = "zoom-in";
    rondff.classList.add("rondff");
    document.querySelector(".container4").appendChild(rondff);

    var pos_l = Math.round(Math.random()*(1300-100)+100);
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

    var pos_n = Math.round(Math.random()*(1300-100)+100);
    var pos_o = Math.round(Math.random()*768);

    document.getElementById("rondhh" + i).style.left = pos_n + "px";
    document.getElementById("rondhh" + i).style.top= pos_o + "px"; 
}

