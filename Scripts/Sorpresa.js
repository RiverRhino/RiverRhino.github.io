function verificar(){
    
    var cambiar = document.getElementById('Respuesta');
    let Adiv = document.querySelector('#Acertijo').value;
    let img = document.querySelector('#imag');
    let ver = "Acepto";
    let mostrar = document.getElementById('BotonSorpresa');
    mostrar.style.display = 'none';

    if(Adiv == ver){
        mostrar.style.display='block';
        cambiar.innerHTML = "Correcto :3";
        img.src="imagenes/dinosaurio corazon.gif";
    }
    
    if(Adiv != ver){
        cambiar.innerHTML = "No es correcto :(";
        img.src="imagenes/rikkatriste.gif";
        
    }

}

function VideoSorpresa(){

    location = "VideoSorpresa.html";

}

