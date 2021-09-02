let Musica = document.getElementById('Anillo');
let Audio1 = document.querySelector('audio');

Musica.addEventListener('click', ()=>{
    Audio1.setAttribute("src","audios/Boda.mp3");
    Audio1.play();
});