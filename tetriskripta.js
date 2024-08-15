$(document).ready(function(){

refreshPage();

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
        let brzina;
        switch (slider.value) {
            default:
                label.textContent = 'Lako';
                brzina = 1000;
                break;
            case '1':
                label.textContent = 'Srednje';
                brzina = 800;
                break;
            case '2':
                label.textContent = 'Teško';
                brzina = 600;
                break;
        }
        localStorage.setItem('brzina', brzina);
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

    let korpa = [];


    function refreshPage(){
        localStorage.setItem("korpa", "");
    }



    function pokupiBlokove(){
        if(localStorage.getItem("korpa") == null){
            localStorage.setItem("korpa", korpa);
        }
        else {
            let tekstKorpe = localStorage.getItem("korpa");
            korpa = tekstKorpe.split(",");
        }
    }

    document.getElementById("igrajDugme").addEventListener("click", igrajIgru);


    function nekiDogadjaj(){
        document.getElementById("prikaz").addEventListener("click", prikaziBlokove);
        document.getElementById("isprazni").addEventListener("click", isprazniBlokove);
        let nizSlika = document.getElementsByTagName("img");

        for (let i = 0; i < nizSlika.length; i++) {
            nizSlika[i].addEventListener("click", function() {
                klikNaSliku(nizSlika[i].id);
                this.classList.toggle('selected');
            });
           
        }
    }

    function klikNaSliku(ime) {
        const index = korpa.indexOf(ime);
    
        if (index === -1) {
            korpa.push(ime);
        } else {
            korpa.splice(index, 1);
        }
        localStorage.setItem("korpa", korpa);
    
    }

    function prikaziBlokove(){
        alert(localStorage.getItem("korpa"));
    }

    function isprazniBlokove(){
        korpa = [];
        localStorage.setItem("korpa", "");
        let selectedImages = document.querySelectorAll('img.selected');
        selectedImages.forEach(function(makniSelected) {
            makniSelected.classList.remove('selected');
        });
    
    }

    function igrajIgru(){
        let testZaIgru = localStorage.getItem("korpa");
        if (!testZaIgru || testZaIgru === "[]"){
            alert("Izaberi bar jedan blok!");
            return;
        }
        else {
            window.location.href = "igrajIgru.html";
        }
    }






    ucitajSlike();
    nekiDogadjaj();
    


});



