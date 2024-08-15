


function rekord() {
    let imeOsobe = localStorage.getItem("imeOsobe");
    let score = localStorage.getItem("rekord");

    if (imeOsobe && score) {
        let rekordList = JSON.parse(localStorage.getItem("rekordList")) || [];

        rekordList.push({ ime: imeOsobe, rezultat: score });

        localStorage.setItem("rekordList", JSON.stringify(rekordList));

        prikaziRekorde();
    }
}

function prikaziRekorde() {
    let rekordList = JSON.parse(localStorage.getItem("rekordList")) || [];
    let igracElement = document.getElementById("igrac");

    igracElement.innerHTML = "";

    if (rekordList.length > 0) {
        rekordList.forEach(rekord => {
            let rekordElement = document.createElement("div");
            rekordElement.textContent = rekord.ime + ": " + rekord.rezultat;
            igracElement.appendChild(rekordElement);
        });
    } else {
        igracElement.textContent = "Nema rekorda";
    }
}

function pocetnaStranica() {
    return window.location.href = "tetris-upustvo.html";
}

function isprazniRekorde() {
    localStorage.removeItem("rekordList");
    prikaziRekorde();
}


