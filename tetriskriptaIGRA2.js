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


    for (let i=0; i<redovi.length; i++){
        let red = redovi[i];
        let celija = red.getElementsByTagName('td');
        for (let j=0; j<celija.length; j++){
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
    
    for (i=0; i<K.length; i++){
        let kocka = K[i];

        if (oldKocke.some(oldKocke => oldKocke.i-1 === kocka.i && oldKocke.j === kocka.j)){
            return true;
        }
    }
    return false;
    
}

document.onkeydown = function(event) {
    let tabela = document.querySelector('#tetris table');
    let redovi = tabela.rows;
    dugmeProvjera = true;
    for (let i = 1; i < K.length; i++) {
        if (K[i].i >= redovi.length-1) {
                dugmeProvjera = false;
            }
            if (!dugmeProvjera){
                return;
            }
        }
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
}

setInterval(function spustajElement() {
    let tabela = document.querySelector('#tetris table');
    let redovi = tabela.rows;
    provjera = true;

    for (let i = 0; i < K.length; i++) {
        if (K[i].i >= redovi.length-1) {
                provjera = false;
                break;
            }
        }
        if (provjeriKoliziju()) {
            oldKocke = oldKocke.concat(K);
            novaKockaDrop();
        }

            if (!provjera) {
                oldKocke = oldKocke.concat(K);
                novaKockaDrop();
            }
            else {
                for (let i = 0; i < K.length; i++) {
                    K[i].i += 1;
            }
            
        }
        obojiKoordinate();
}, 500);


obojiKoordinate();



