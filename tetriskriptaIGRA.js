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

let K = [
    { i: 0, j: 4 },
    { i: 0, j: 5 },
    { i: 1, j: 4 },
    { i: 1, j: 5 }
];


function obojiKoordinate() {
    let table = document.querySelector('#tetris table');
    let redovi = table.rows;

    for (let i = 0; i < redovi.length; i++) {
        let red = redovi[i];
        let celije = red.getElementsByTagName('td');
        for (let j = 0; j < celije.length; j++) {
            let celija = celije[j];
            celija.style.backgroundColor = '';
            celija.style.boxShadow = '';
        }
    }

    for (let i = 0; i < K.length; i++) {
        let coord = K[i];
        if (coord.i < redovi.length) {
            let red = redovi[coord.i];
            let celije = red.getElementsByTagName('td');
            if (coord.j < celije.length) {
                let celija = celije[coord.j];
                celija.style.backgroundColor = 'red';
                celija.style.boxShadow = 'inset 0 0 20px white';
            }
        }
    }
}

function spustiKoordinate() {
    let mozeSeSpustiti = true;
    for (let i = 0; i < K.length; i++) {
        
        K[i].i += 1;
    }

    let redovi = document.getElementById('tetris').getElementsByTagName('tr');
    let maxI = Math.max(...K.map(coord => coord.i));
    if (maxI >= redovi.length) {
        K = [
            { i: 0, j: 4 },
            { i: 0, j: 5 },
            { i: 1, j: 4 },
            { i: 1, j: 5 }
        ];
    }
    obojiKoordinate();
}

const interval = 500;
setInterval(spustiKoordinate, interval);

document.onkeydown = function(event) {
    switch (event.keyCode) {
        case 37: // Levo
            let levoOk = true;
            for (let i = 0; i < K.length; i++) {
                if (K[i].j <= 0) {
                    levoOk = false;
                    break;
                }
            }

            if (levoOk) {
                for (let i = 0; i < K.length; i++) {
                    K[i].j -= 1;
                }
                obojiKoordinate();
            }
            break;

        case 39: // Desno
            let desnoOk = true;
            for (let i = 0; i < K.length; i++) {
                if (K[i].j >= 9) {
                    desnoOk = false;
                    break;
                }
            }

            if (desnoOk) {
                for (let i = 0; i < K.length; i++) {
                    K[i].j += 1;
                }
                obojiKoordinate();
            }
            break;
    }
};


