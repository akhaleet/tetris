let K = [
    { i: 0, j: 4 },
    { i: 0, j: 5 },
    { i: 1, j: 4 },
    { i: 1, j: 5 }
];

let oldKocke = [];

function novaKockaDrop() {
    K = [
        { i: 0, j: 4 },
        { i: 0, j: 5 },
        { i: 1, j: 4 },
        { i: 1, j: 5 }
    ];
}

function obojiKoordinate(){
    let tabela = document.querySelector('#tetris table');
    let redovi = tabela.rows;

    for (let i = 0; i < redovi.length; i++) {
        let red = redovi[i];
        let celija = red.getElementsByTagName('td');
        for (let j = 0; j < celija.length; j++) {
            let celije = celija[j];
            celije.style.backgroundColor = '';
            celije.style.boxShadow = '';
        }
    } // cisti cijelu tabelu

    for (let k = 0; k < oldKocke.length; k++) {
        let koordinate = oldKocke[k];
        if (koordinate.i < redovi.length) {
            let red = redovi[koordinate.i];
            let celije = red.getElementsByTagName('td');
            if (koordinate.j < celije.length) {
                let celija = celije[koordinate.j];
                celija.style.backgroundColor = 'red';
                celija.style.boxShadow = 'inset 0 0 20px white';
            }
        }
    } // obojaj staru kocku

    for (let k = 0; k < K.length; k++) {
        let koordinate = K[k];
        if (koordinate.i < redovi.length) {
            let red = redovi[koordinate.i];
            let celije = red.getElementsByTagName('td');
            if (koordinate.j < celije.length) {
                let celija = celije[koordinate.j];
                celija.style.backgroundColor = 'red';
                celija.style.boxShadow = 'inset 0 0 20px white';
            }
        }
    } // obojaj trenutnu kocku
}

function provjeriKoliziju() {
    let tabela = document.querySelector('#tetris table');
    let redovi = tabela.rows;
    
    for (let i = 0; i < K.length; i++) {
        let kocka = K[i];
        if (oldKocke.some(oldKocka => oldKocka.i - 1 === kocka.i && oldKocka.j === kocka.j)) {
            return true;
        }
    }
    return false;
}

let brojac = 0;
function provjeriIObrisiPuneRedove() {
    let tabela = document.querySelector('#tetris table');
    let redovi = tabela.rows;
    let fullRows = [];

    // trazi sve redove koji su puni
    for (let i = redovi.length - 1; i >= 0; i--) { // od dna prema vrhu
        let red = redovi[i];
        let celije = red.getElementsByTagName('td');
        let punRed = true;

        for (let j = 0; j < celije.length; j++) {
            let celija = celije[j];
            if (celija.style.backgroundColor !== 'red') {
                punRed = false;
                break;
            }
        }

        if (punRed) {
            fullRows.push(i);
            brojac += 5;
            updateBrojacDisplay();

        }
    }

    // Ako ima punih redova, obrisi ih
    if (fullRows.length > 0) {
        fullRows.forEach(rowIndex => {
            // obrisi sve kocke u tom redu iz oldKocke
            oldKocke = oldKocke.filter(koordinate => koordinate.i !== rowIndex);
            
        });

        //posle brisanja punih redova, pomeri sve kocke iznad njih nadole
        for (let i = 0; i < fullRows.length; i++) {
            let removedRowIndex = fullRows[i];

            oldKocke.forEach(koordinate => {
                if (koordinate.i < removedRowIndex) {
                    koordinate.i += 1;
                }
            });

            // povecaj indekse redova koji su iznad obrisanog reda
            fullRows = fullRows.map(index => index + 1);
        }

        // iscrtaj opet
        obojiKoordinate();
    }
}

function updateBrojacDisplay() {
    let brojacElement = document.getElementById('brojacDisplay');
        brojacElement.textContent = parseInt(brojac); // Prikazuje samo brojčanu vrednost
}


document.onkeydown = function(event) {
    let tabela = document.querySelector('#tetris table');
    let redovi = tabela.rows;
    let dugmeProvjera = true;

    for (let i = 0; i < K.length; i++) {
        if (K[i].i >= redovi.length - 1) {
            dugmeProvjera = false;
        }
    }
    if (!dugmeProvjera) {
        return;
    }

    switch (event.keyCode) {
        case 37: // Levo
            let levoOk = true;
            for (let i = 0; i < K.length; i++) {
                let kocka = K[i];
                if (kocka.j <= 0 || oldKocke.some(oldKocka => oldKocka.i === kocka.i && oldKocka.j === kocka.j - 1)) {
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
                let kocka = K[i];
                if (kocka.j >= 9 || oldKocke.some(oldKocka => oldKocka.i === kocka.i && oldKocka.j === kocka.j + 1)) {
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

        case 40: // Dolje
            let doleOk = true;
            for (let i = 0; i < K.length; i++) {
                let kocka = K[i];
                if (kocka.i >= redovi.length - 1 || oldKocke.some(oldKocka => oldKocka.i === kocka.i + 1 && oldKocka.j === kocka.j)) {
                    doleOk = false;
                    break;
                }
            }

            if (doleOk) {
                for (let i = 0; i < K.length; i++) {
                    K[i].i += 1;
                }
                obojiKoordinate();
            }

            break;
    }
}

setInterval(function spustajElement() {
    let tabela = document.querySelector('#tetris table');
    let redovi = tabela.rows;
    let provjera = true;

    for (let i = 0; i < K.length; i++) {
        if (K[i].i >= redovi.length - 1) {
            provjera = false;
        }
    }
   

    if (provjeriKoliziju()) {
        oldKocke = oldKocke.concat(K);
        provjeriIObrisiPuneRedove(); // Check and remove full rows
        novaKockaDrop();
    } else if (!provjera) {
        oldKocke = oldKocke.concat(K);
        provjeriIObrisiPuneRedove(); // Check and remove full rows
        novaKockaDrop();
    } else {
        for (let i = 0; i < K.length; i++) {
            K[i].i += 1;
        }
    }

    obojiKoordinate();
}, 500);

// function provjeraGubitka(){
//     let tabela = document.querySelector('#tetris table');
//     let redovi = tabela.rows;
//     let provjera = true;

//     for (let i = 0; i < K.length; i++) {
//         if (K[i].i == 0) {
//             provjera = false;
//         }
//     }
//     if (!provjera){
//         alert("Izgubio si");
//         window.location.href = "rekordi.html";
//     }

// }

// provjeraGubitka();

