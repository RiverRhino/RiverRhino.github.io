document.querySelector("#myFile").addEventListener("change", function(){
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        localStorage.setItem("recent-image", reader.result);
    });

    reader.readAsDataURL(this.files[0]);

});

document.addEventListener('DOMContentLoaded', () => {

    const recentImageDataUrl1 = localStorage.getItem("recent-image");

    if(recentImageDataUrl1){
        document.querySelector("#img1").setAttribute("src", recentImageDataUrl1);
    }

})


function IniciarSesion(){

  var imagen = document.querySelector('#Us');
  var usu = document.querySelector('#Sesion');
  var usuario = document.querySelector('#Usuariouwu');

  imagen.style.display = "block";

  usu.style.display = "none";

  imagen.src = localStorage.getItem("recent-image");

  usuario.innerHTML = localStorage.getItem("Jugador");

  usuario.style.display = "block";

}
