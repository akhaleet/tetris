$(document).ready(function(){

let brojKlikova = 0;


    document.getElementById("klikaj").addEventListener("click", function() {
        brojKlikova++;
        document.getElementById("brojac").textContent = "Klikovi: " + brojKlikova;
        localStorage.setItem("brojKlikova", brojKlikova);
    });

    document.getElementById("prazni").addEventListener("click", function() {
        brojKlikova=0;
        document.getElementById("brojac").textContent = "Klikovi: " + brojKlikova;
        localStorage.setItem("brojKlikova", brojKlikova);
    });



});

function salji(){
    alert(localStorage.getItem("brojKlikova"));

}

function rekord(){
    score = localStorage.getItem("brojKlikova");
    document.getElementById("igrac").textContent = "Neki igrac: " + score;

}







