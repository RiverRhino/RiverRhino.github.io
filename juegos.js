String.prototype.replaceAt=function(index, character) { return this.substr(0, index) 
+ character + this.substr(index+character.length); } 

const palabras = ['musica','karaoke','Ablo','noche','viaje','dinosaurio','luna','acepto','gatito','ratoncita','pastel','chocolate','rawr','noche de chicas'];

const pal = palabras[Math.floor(Math.random()*palabras.length)];
let palabraguines = pal.replace(/./g, "_ ");
let contadorF  = 0;

document.querySelector('#Palabraad').innerHTML = palabraguines;
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
        if (contadorF == 6){
            alert("Vuelve a intenarlo");
            reiniciar();
        }
    }else{
        if(palabraguines.indexOf('_')<0){
            alert("Victoria :3")
        }
    }

    document.querySelector('#Palabraad').innerHTML = palabraguines;

    document.querySelector('#Letritas').value = '';


});

function reiniciar(){
    location = "jue.html"
}