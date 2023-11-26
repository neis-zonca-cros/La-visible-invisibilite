
//création de 49 rond container: noms autres
for (let i = 0; i<50; i++){
    var rond = document.createElement('div');
    rond.id = "rond" + i;
    rond.dataset.aos="zoom-in";
    rond.dataset.aos.duration="3000";
    rond.classList.add("rond");
    document.querySelector(".container").appendChild(rond);

    pos_x = Math.round(Math.random()*1512);
    pos_y = Math.round(Math.random()*200);

    document.getElementById("rond" + i).style.left = pos_x + "px";
    document.getElementById("rond" + i).style.top= pos_y + "px"; 
}

//création de 49 rond container1: noms personnes
for (let i = 0; i<50; i++){
    var rond1 = document.createElement('div');
    rond1.id = "rond1" + i;
    rond1.dataset.aos="zoom-in";
    rond1.dataset.aos.duration="3000";
    rond1.classList.add("rond1");
    document.querySelector(".container1").appendChild(rond1);

    pos_x = Math.round(Math.random()*1512);
    pos_y = Math.round(Math.random()*400);

    document.getElementById("rond1" + i).style.left = pos_x + "px";
    document.getElementById("rond1" + i).style.top= pos_y + "px"; 
}

//création de 49 rond container2: noms hommes
for (let i = 0; i<50; i++){
    var rond2 = document.createElement('div');
    rond2.id = "rond2" + i;
    rond2.dataset.aos="zoom-in";
    rond2.dataset.aos.duration="3000";
    rond2.classList.add("rond2");
    document.querySelector(".container2").appendChild(rond2);

    pos_x = Math.round(Math.random()*1512);
    pos_y = Math.round(Math.random()*400);

    document.getElementById("rond2" + i).style.left = pos_x + "px";
    document.getElementById("rond2" + i).style.top= pos_y + "px"; 
}

//création de 49 rond container3: noms femmes
for (let i = 0; i<50; i++){
    var rond3 = document.createElement('div');
    rond3.id = "rond3" + i;
    rond3.dataset.aos="zoom-in";
    rond3.dataset.aos.duration="3000";
    rond3.classList.add("rond3");
    document.querySelector(".container3").appendChild(rond3);

    pos_x = Math.round(Math.random()*1512);
    pos_y = Math.round(Math.random()*400);

    document.getElementById("rond3" + i).style.left = pos_x + "px";
    document.getElementById("rond3" + i).style.top= pos_y + "px"; 
}

//création de 49 rond container4: graphique du tout
//rond 4 = Femmes
for (let i = 0; i<50; i++){
    var rond4 = document.createElement('div');
    rond4.id = "rond4" + i;
    rond4.dataset.aos="zoom-in";
    rond4.dataset.aos.duration="3000";
    rond4.classList.add("rond4");
    document.querySelector(".container4").appendChild(rond4);

    pos_x = Math.round(Math.random()*1512);
    pos_y = Math.round(Math.random()*768);

    document.getElementById("rond4" + i).style.left = pos_x + "px";
    document.getElementById("rond4" + i).style.top= pos_y + "px"; 
}

//rond 5 = Hommes
for (let i = 0; i<50; i++){
    var rond5 = document.createElement('div');
    rond5.id = "rond5" + i;
    rond5.dataset.aos="zoom-in";
    rond5.dataset.aos.duration="3000";
    rond5.classList.add("rond5");
    document.querySelector(".container5").appendChild(rond5);

    pos_x = Math.round(Math.random()*1512);
    pos_y = Math.round(Math.random()*768);

    document.getElementById("rond5" + i).style.left = pos_x + "px";
    document.getElementById("rond5" + i).style.top= pos_y + "px"; 
}