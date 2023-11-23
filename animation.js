
//création de 2216 carré 2px*2px en slide 2
for (let i = 0; i<50; i++){
    var carre = document.createElement('div');
    carre.id = "carre" + i;
    carre.dataset.aos="zoom-in";
    carre.dataset.aos.duration="3000";
    carre.classList.add("carre");
    document.querySelector(".slide.three").appendChild(carre);

    pos_x = Math.round(Math.random()*1512);
    pos_y = Math.round(Math.random()*768);

    document.getElementById("carre" + i).style.left = pos_x + "px";
    document.getElementById("carre" + i).style.top= pos_y + "px"; 
}

//création de pleins de carrés sur 50% de l'écran
// for (let j = 10; j<150; j++) {

//         var carre50 = document.createElement('div');
//         carre50.id = "carre50" + j ;
//         carre50.dataset.aos="zoom-in";
//         carre50.classList.add("carre50");
//         document.querySelector(".container").appendChild(carre50);
    
//         pourcentage = j ;
//         console.log(document.getElementById("carre50" + j ).style.top = Math.round(Math.random()*90) + "%");



 



// }
