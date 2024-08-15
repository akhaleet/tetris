
let rekord = 0;
let sledeciOblikType = '';
let currentShape = [];
let oldKocke = [];
let brojac = 0;
let shapeColor = 'red';
let shapeType = '';
let indexRotation = 0;
let ZRotate = false;
let slovorOk = false;

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

shapeP= {
    koordinate: [
        { i: 0, j: 3 }, { i: 0, j: 4 }, { i: 0, j: 5 }, { i: 0, j: 6 }
    ],
    shapeColor: 'blue',
    shapeType: 'P',
    cx: 0,
    cy: 4,
}

const izabraniOblik = {
    'blok1': 'P', 
    'blok2': 'LS',  
    'blok3': 'L',
    'blok4': 'K', 
    'blok5': 'Z',  
    'blok6': 'T', 
    'blok7': 'ZS'   
};

function rotiraj(cx, cy, x, y) {
    var radians = (Math.PI / 180) * 90,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = Math.round((cos * (x - cx)) + (sin * (y - cy)) + cx),
        ny = Math.round((cos * (y - cy)) - (sin * (x - cx)) + cy);
    
    return {i: nx, j: ny};
}

const sledeciOblikSlika = localStorage.getItem("korpa");

function ucitajSlike(){
    let kontejner = document.getElementById("sledeciOblik");
    if (!kontejner) {
        console.error('Element sa ID-jem "sledeciOblik" nije pronađen.');
        return;
    }
    let izabraniBlokovi = [];
    if (sledeciOblikSlika) {
        let blokoviString = sledeciOblikSlika.split(',').join(' '); 
        izabraniBlokovi = [];
        for (let i = 0; i < blokoviString.length; i++) {
            izabraniBlokovi.push(parseInt(blokoviString[i]));
        }
    }

    for (let i = 0; i < izabraniBlokovi.length; i++) {
        let blok = izabraniBlokovi[i];
            let slika = document.createElement("img");
            slika.src = "blokovi/blok" + blok + ".png"; 
            slika.id = "blok" + blok; 
            slika.style.width = 'auto'; 
            slika.style.height = '75px';
            slika.style.marginTop = '10px';
            slika.style.marginLeft = '10px';
            slika.style.padding = '10px';
            kontejner.appendChild(slika); 

    }
}

novaKockaDrop(); 
updateSledeciOblik();
obojiKoordinate();
ucitajSlike();



function novaKockaDrop() {
    const sledeciOblikSlika = localStorage.getItem('korpa');
    if (sledeciOblikSlika) {
        let izabraniBlokovi = sledeciOblikSlika.split(',');
        const dostupniOblici = izabraniBlokovi.map(blok => izabraniOblik[blok]);

        if (dostupniOblici.length > 0) {
            const shapeKeys = Object.keys(dostupniOblici);
            const randomKey = dostupniOblici[Math.floor(Math.random() * dostupniOblici.length)];
            currentShape = shapes[randomKey].map(k => ({ ...k }));
            sledeciOblikType = randomKey; 
        }
    }
    else {
            const shapeKeys = Object.keys(shapes);
            const randomKey = shapeKeys[Math.floor(Math.random() * shapeKeys.length)];
            currentShape = shapes[randomKey].map(k => ({ ...k }));
            sledeciOblikType = randomKey;
    }
    if (provjeriKoliziju()) {
        localStorage.setItem("rekord",brojac);
        let rekord = localStorage.getItem("rekord");
        
        // if (confirm("Kraj igre! Vaš skor: " + parseInt(rekord) + ". Da li želite da pregledate rekorde?") == true) {
        //     window.location.href="rekordi.html";
        //   } else {
        //     window.location.href="tetris-upustvo.html";
        //   }
    }

    if (isCurrentShape(shapes.P)) {
        shapeColor = '#007fff';
        shapeType = 'P';
        indexRotation = 1;
    }

    else if (isCurrentShape(shapes.LS)) {
        shapeColor = 'orange';
        shapeType = 'LS';
        indexRotation = 2;
    }
    else if (isCurrentShape(shapes.L)) {
        shapeColor = 'darkblue';
        shapeType = 'L';
        indexRotation = 2;
    }
    else if (isCurrentShape(shapes.K)) {
        shapeColor = '#e0bc00';
        shapeType = 'K';
    }
    else if (isCurrentShape(shapes.ZS)) {
        shapeColor = 'darkgreen';
        shapeType = 'ZS';
        indexRotation = 1;
    }
    else if (isCurrentShape(shapes.T)) {
        shapeColor = 'purple';
        shapeType = 'T';
        indexRotation = 2;
    }
    else if (isCurrentShape(shapes.Z)) {
        shapeColor = 'red';
        shapeType = 'Z';
        indexRotation = 0;
    }
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
                celija.style.backgroundColor = 'rgb(255,0,255)';
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
                celija.style.backgroundColor = shapeColor;
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
    obojiKoordinate();
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

            if (celija.style.backgroundColor == '') {

                punRed = false;
                break;
            }
        }

        if (punRed) {
            fullRows.push(i);
            brojac += 5 * (1000/intervalTime);
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
        if (shapeType != 'K'){
        slovorOk = true;
        for (let i = 0; i < currentShape.length; i++) {
            let kocka = currentShape[i];
            if (kocka.i >= redovi.length - 1 || oldKocke.some(oldKocka => oldKocka.i === kocka.i + 1 && oldKocka.j === kocka.j)) {
                slovorOk = false;
                break;
            }
        }
        if (currentShape.length > 0) {

            let cuvajOblik = structuredClone(currentShape);
            // Rotiraj sve kocke unutar oblika
            for (let i = 0; i < currentShape.length; i++) {

                let rotated = rotiraj(currentShape[indexRotation].i, currentShape[indexRotation].j,currentShape[i].i, currentShape[i].j);
                if (rotated.j >= 0 && rotated.j <=9 && rotated.i >= 0 && rotated.i <=9){
                    if (oldKocke.some(oldKocka => oldKocka.i === rotated.i && oldKocka.j === rotated.j)){
                    }
                    else {
                        currentShape[i].i = rotated.i;
                        currentShape[i].j = rotated.j;
                    }
          
                }
                else {
                    currentShape=cuvajOblik;
                    break;
                }

            }
            obojiKoordinate();
            console.log("Rotacija izvršena");
        }
    }
        slovorOk = false;
        break;
    }
}

let intervalTime = parseInt(localStorage.getItem('brzina'));
let gameInterval;
let prethodniBrojac = 0;

function postaviInterval() {
    gameInterval = setInterval(spustajElement, intervalTime); 
}

postaviInterval();

function ubrzajPadanje() {
    if (brojac >= prethodniBrojac + 25) { 
        prethodniBrojac = brojac;
        intervalTime -= 100; 
        

        if (intervalTime < 100){
            intervalTime = 100;
        }
        postaviInterval(); 
    
}
}


function spustajElement() {
    if (!slovorOk){
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
        provjeriIObrisiPuneRedove();
        novaKockaDrop();
        ucitajSlike();
    } else if (!provjera) {
        oldKocke = oldKocke.concat(currentShape);
        provjeriIObrisiPuneRedove();
        novaKockaDrop();
        ucitajSlike();
    } else {
        for (let i = 0; i < currentShape.length; i++) {
            currentShape[i].i += 1;
        }
    }

    obojiKoordinate();
    ubrzajPadanje();
} 
}



