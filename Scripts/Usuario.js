var ref = document.getElementById('Reg');

const boton = document.getElementById('Enviar')

 boton.onclick = () => {
     
     let Nombre = document.querySelector("#Usuario");
     
     localStorage.setItem("Jugador", Nombre.value);

     location = "Menu de juegos.html";
 }


function Reg(){
    location="Registrarse.html";
}


