
let rekord = 0;
let sledeciOblikType = '';
let currentShape = [];
let oldKocke = [];
let brojac = 0;

const shapes = {
    P: [
        { i: 0, j: 3 }, { i: 0, j: 4 }, { i: 0, j: 5 }, { i: 0, j: 6 }
    ],
    L: [
        { i: 0, j: 3 },
        { i: 1, j: 3 }, { i: 1, j: 4 }, { i: 1, j: 5 }
    ],
    LS: [
                                        { i: 0, j: 5 },
        { i: 1, j: 3 }, { i: 1, j: 4 }, { i: 1, j: 5 },
    ],
    K: [
        { i: 0, j: 4 }, { i: 0, j: 5 },
        { i: 1, j: 4 }, { i: 1, j: 5 }
    ],
    Z: [
                        { i: 0, j: 4 }, { i: 0, j: 5 },
        { i: 1, j: 3 }, { i: 1, j: 4 }
    ],
    ZS: [
        { i: 0, j: 4 }, { i: 0, j: 5 },
                        { i: 1, j: 5 }, { i: 1, j: 6 }
    ],
    T: [
                        { i: 0, j: 4 }, 
        { i: 1, j: 3 }, { i: 1, j: 4 }, { i: 1, j: 5 }
    ]
};

function rotiraj(cx, cy, x, y) {
    var radians = (Math.PI / 180) * 90,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = Math.round((cos * (x - cx)) + (sin * (y - cy)) + cx),
        ny = Math.round((cos * (y - cy)) - (sin * (x - cx)) + cy);
    return {i: nx, j: ny};
}


novaKockaDrop(); 
updateSledeciOblik();
obojiKoordinate();


function novaKockaDrop() {
    const shapeKeys = Object.keys(shapes);
    const randomKey = shapeKeys[Math.floor(Math.random() * shapeKeys.length)];
    currentShape = shapes[randomKey].map(k => ({ ...k }));

    if (provjeriKoliziju()) {
        localStorage.setItem("rekord",brojac);
        let rekord = localStorage.getItem("rekord");
        
        if (confirm("Kraj igre! Vaš skor: " + rekord + ". Da li želite da pregledate rekorde?")) {
            window.location.href="rekordi.html";
          } else {
            window.location.href="igrajIgru.html";
          }
        return;
    }

    sledeciOblikType = randomKey;
    obojiKoordinate();
    updateSledeciOblik();

}


function updateSledeciOblik() {
    let sledeciOblik = document.getElementById('sledeciOblik');
    if (sledeciOblikType) {
        sledeciOblik.textContent = sledeciOblikType;
    } else {
        sledeciOblik.textContent = 'Nema sledećeg oblika';
    }
}

function isCurrentShape(shape) {
    if (currentShape.length !== shape.length) {
        return false;
    }
    for (let i = 0; i < currentShape.length; i++) {
        let currentBlock = currentShape[i]; 
        let shapeBlock = shape[i]; 
        if (currentBlock.i !== shapeBlock.i || currentBlock.j !== shapeBlock.j) {
            return false; 
        }
    }
    return true;
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
    } // obojaj stari oblik

    for (let k = 0; k < currentShape.length; k++) {
        let koordinate = currentShape[k];
        if (koordinate.i < redovi.length) {
            let red = redovi[koordinate.i];
            let celije = red.getElementsByTagName('td');
            if (koordinate.j < celije.length) {
                let celija = celije[koordinate.j];
                celija.style.backgroundColor = 'red';
                celija.style.boxShadow = 'inset 0 0 20px white';
            }
        }
    } // obojaj trenutni oblik
}

function provjeriKoliziju() {
    let tabela = document.querySelector('#tetris table');
    let redovi = tabela.rows;
    
    for (let i = 0; i < currentShape.length; i++) {
        let kocka = currentShape[i];
        if (kocka.i >= redovi.length - 1 || 
            oldKocke.some(oldKocka => oldKocka.i === kocka.i + 1 && oldKocka.j === kocka.j)) {
            return true;
        }
    }
    return false;
}


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

    for (let i = 0; i < currentShape.length; i++) {
        if (currentShape[i].i >= redovi.length - 1) {
            dugmeProvjera = false;
        }
    }

    if (!dugmeProvjera) {
        return;
    }


    switch (event.keyCode) {
        case 37: // Levo
            let levoOk = true;
            for (let i = 0; i < currentShape.length; i++) {
                let kocka = currentShape[i];
                if (kocka.j <= 0 || oldKocke.some(oldKocka => oldKocka.i === kocka.i && oldKocka.j === kocka.j - 1)) {
                    levoOk = false;
                    break;
                }
            }

            if (levoOk) {
                for (let i = 0; i < currentShape.length; i++) {
                    currentShape[i].j -= 1;
                }  
                obojiKoordinate();
            }
            break;

        case 39: // Desno
            let desnoOk = true;
            for (let i = 0; i < currentShape.length; i++) {
                let kocka = currentShape[i];
                if (kocka.j >= 9 || oldKocke.some(oldKocka => oldKocka.i === kocka.i && oldKocka.j === kocka.j + 1)) {
                    desnoOk = false;
                    break;
                }
            }

            if (desnoOk) {
                for (let i = 0; i < currentShape.length; i++) {
                    currentShape[i].j += 1;
                }
                obojiKoordinate();
            }
            break;

        case 40: // Dolje
            let doleOk = true;
            for (let i = 0; i < currentShape.length; i++) {
                let kocka = currentShape[i];
                if (kocka.i >= redovi.length - 1 || oldKocke.some(oldKocka => oldKocka.i === kocka.i + 1 && oldKocka.j === kocka.j)) {
                    doleOk = false;
                    break;
                }
            }

            if (doleOk) {
                for (let i = 0; i < currentShape.length; i++) {
                    currentShape[i].i += 1;
                }
                obojiKoordinate();
            }

            break;
        
        case 82: //rotacija
        let slovorOk = true;
        for (let i = 0; i < currentShape.length; i++) {
            let kocka = currentShape[i];
            if (kocka.i >= redovi.length - 1 || oldKocke.some(oldKocka => oldKocka.i === kocka.i + 1 && oldKocka.j === kocka.j)) {
                slovorOk = false;
                break;
            }
        }
        if (currentShape.length > 0) {
            // Pronađi centar rotacije, obično je to prva kocka u obliku
            let cx = currentShape[0].i;
            let cy = currentShape[0].j;

            // Rotiraj sve kocke unutar oblika
            for (let i = 0; i < currentShape.length; i++) {
                let rotated = rotiraj(cx, cy, currentShape[i].i, currentShape[i].j);
                currentShape[i].i = rotated.i;
                currentShape[i].j = rotated.j;
            }
            obojiKoordinate();
            console.log("Rotacija izvršena");
        }
        break;
    }
}

setInterval(function spustajElement() {
    let tabela = document.querySelector('#tetris table');
    let redovi = tabela.rows;
    let provjera = true;

    for (let i = 0; i < currentShape.length; i++) {
        if (currentShape[i].i >= redovi.length - 1) {
            provjera = false;
        }
    }
   

    if (provjeriKoliziju()) {
        oldKocke = oldKocke.concat(currentShape);
        provjeriIObrisiPuneRedove(); // Check and remove full rows
        novaKockaDrop();
    } else if (!provjera) {
        oldKocke = oldKocke.concat(currentShape);
        provjeriIObrisiPuneRedove(); // Check and remove full rows
        novaKockaDrop();
    } else {
        for (let i = 0; i < currentShape.length; i++) {
            currentShape[i].i += 1;
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

