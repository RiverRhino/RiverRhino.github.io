String.prototype.replaceAt=function(index, character) { return this.substr(0, index) 
+ character + this.substr(index+character.length); } 

const palabras = ['musica','monas chinas','karaoke','ablo','noche','viaje','dinosaurio','luna','acepto','gatito','ratoncita','pastel','chocolate','rawr','noche de chicas','estrellita','maid'];

const pal = palabras[Math.floor(Math.random()*palabras.length)];
let palabraguines = pal.replace(/./g, "_ ");
let contadorF  = 0;
let contadorF2 = 5;
let victorias = 0;

document.querySelector('#Palabraad').innerHTML = palabraguines;
document.getElementById('Intento').innerHTML = "Intentos : "+contadorF2;
document.querySelector('#Adivinar').addEventListener('click', () =>{
     
    const letra = document.querySelector('#Letritas').value;
    let Fallo = true;

    for(const i in pal){
        if(letra == pal[i]){
            palabraguines = palabraguines.replaceAt(i*2,letra);
            Fallo = false;
        }

    }
    
    if(Fallo){
        contadorF++;
        contadorF2--;
        document.getElementById('Intento').innerHTML = "Intentos: " +contadorF2;
        document.querySelector('.Flechamedio2').style.backgroundPosition = -(225*contadorF) + '0px';
        if (contadorF == 5){
            alert("Vuelve a intenarlo");
            reiniciar();
        }
    }else{
        if(palabraguines.indexOf('_')<0){

          victorias.parseFloat(getElementById('Prueba').value);
          localStorage.setItem('Prueba',Prueba.value);

         document.getElementById('Prueba').innerHTML = "Victorias: "+localStorage.getItem('Prueba');
        
        }
    }

    document.querySelector('#Palabraad').innerHTML = palabraguines;

    document.querySelector('#Letritas').value = '';

});

function reiniciar(){
    location = "https://riverrhino.github.io/Ahorcado.html"
}
