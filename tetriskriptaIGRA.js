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

function traziIme(){
    while (true) {
        let imeOsobe = prompt("Kako se zovete?");
        
        if (imeOsobe === null) {
            window.location.href = "tetris-upustvo.html";
            alert("Vracam te na stranicu sa uputstvom!");
            break;
        } else if (imeOsobe === "") {
            // Korisnik je uneo prazan string
            alert("Moras unijeti svoje ime!");
        } else {
            // Validno ime
            document.getElementById("dobrodosaoIme").innerHTML =
            "Zdravo " + imeOsobe + "! Dobrodosao u igricu Tetris!";
            break; // Izlazi iz petlje kada je ime validno
        }
    }
}







