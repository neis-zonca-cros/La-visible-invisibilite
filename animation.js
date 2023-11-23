
//création de 2216 carré 2px*2px en slide 2
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


for (let j = 0; j<101; j++) {
    console.log(j)
    for (let k=0; k<11)
    var carre50 = document.createElement('div');
    carre50.id = "carre50" + j;
    carre50.dataset.aos="zoom-in";
    carre50.dataset.aos.duration="3000";
    carre50.classList.add("carre50");
    document.querySelector(".container").appendChild(carre50);

    pourcentage = j;
    console.log(document.getElementById("carre50" + j).style.top = Math.round(Math.random()*90) + "%");


}
