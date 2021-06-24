function verificar(){

    let Adiv = document.querySelector('#Acertijo').value;
    let ver = ["Acepto"];
    let mostrar = document.getElementById('BotonSorpresa');
    mostrar.style.display = 'none';

    if(Adiv == ver){
        mostrar.style.display='block';
    }

}

function VideoSorpresa(){

    location = "VideoSorpresa.html";

}

