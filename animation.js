

for (let i=0; i<10 ; i++){
    pos_x = Math.round(Math.random()*1024);
    pos_y = Math.round(Math.random()*768);

    document.getElementById("carre").style.left = pos_x + "px";
    document.getElementById("carre").style.top= pos_y + "py"; 
}


