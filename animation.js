
//création de 2216 carré en slide 2
for (let i = 0; i<2215; i++){
    var carre = document.createElement('div');
    carre.id = "carre" + i;
    carre.dataset.aos="zoom-in";
    carre.dataset.aos.duration="3000";
    carre.classList.add("carre");
    document.querySelector(".slide.two").appendChild(carre);

    pos_x = Math.round(Math.random()*1512);
    pos_y = Math.round(Math.random()*768);

    document.getElementById("carre" + i).style.left = pos_x + "px";
    document.getElementById("carre" + i).style.top= pos_y + "px"; 
}

