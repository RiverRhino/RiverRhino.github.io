let mostrar = document.getElementById('tru');

function verificar(){
    
    let Adiv = document.querySelector('#Acertijo').value;   // El input donde va introducido el texto
    let ver = "Acepto";                                     // La respuesta
    let respuesta = document.getElementById('Sorpresalink');

    if(Adiv == ver){

        respuesta.style.display = 'block';

    }
    
    if(Adiv != ver){

        
    }

}

mostrar.addEventListener('click' , verificar);
