$(document).ready(function(){


    $("#prikaziDugme").click(function(){
        $("#uputstvo").toggle(1500);
    });

    $("#prikaziTezinuIgreDugme").click(function(){
        $("#tezinaIgre").toggle(1500);
    });

    $("#prikaziBlokove").click(function(){
        $("#blokovi").toggle(1500);
    });


    /*function prikaziTezinuIgre(){
        let tezinaIgreDiv = document.getElementById("tezinaIgre");
        console.log(tezinaIgreDiv);
        
        if (tezinaIgreDiv.style.display == "none"){
            tezinaIgreDiv.style.display = "block";
        }
        else {
            tezinaIgreDiv.style.display = "none";
        }
    }*/


    const slider = document.getElementById('tezinaNivoa');
    const label = document.getElementById('tezinaNivoaLabel');
    

    slider.addEventListener('input', function() {
        switch (slider.value) {
            case '0':
                label.textContent = 'Lako';
                break;
            case '1':
                label.textContent = 'Srednje';
                break;
            case '2':
                label.textContent = 'Teško';
                break;
        }
    });

    function ucitajSlike(){
        let kontejner = document.getElementById("blokovi");

        for (let i=1;i<8;i++){
            let slika = document.createElement("img");
            slika.src = "blokovi/blok"+ i + ".png";
            slika.id = "blok"+i;
            slika.style.width = 'auto';
            slika.style.height = '75px';
            slika.style.marginTop = '10px';
            slika.style.marginLeft = '10px';
            slika.style.padding = '10px';
            kontejner.appendChild(slika);
            
            }
    }

    ucitajSlike();


});

