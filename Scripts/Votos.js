function Esp(){
    let votoesposa = document.createElement("p");
    let texto = document.createTextNode("Esposa: Prometo que estaré contigo en cada momento de tu vida en el que estés, si está es un momento alegre , yo lo festejare contigo y lo recordaremos con alegría. Si es un momento, qué quisieras olvidar, estaré ahí para ti, para apoyarte de la forma en que yo lo puedo hacer, puede que no resuelva todo pero con qué pueda ayudarte aunque sea un poco de manera emocional, eso me alegraría. También te prometo que estaré contigo toda la vida, no importa los kilómetros que nos separen ni cualquier distancia en general, porque mientras pueda escuchar tu voz o tu grito uwu, eso es lo que más feliz me hace. Espero y algun dia, podamos reunirnos y así poder abrazarte y decirte lo mucho que te quiero....");
    votoesposa.appendChild(texto);
    document.getElementById("Texto").appendChild(votoesposa);
}

let Waifu = document.getElementById('Esposa');
 
Waifu.addEventListener('click', Esp);

Waifu.addEventListener('dblclick', eliminado);


function Espo(){
    let votoesposo = document.createElement("p");
    let texto = document.createTextNode("Esposo: Yo quiero y prometo, hacer del viaje una en mil aventuras, sin dejar que la rutina nos separe, tus sueños, metas y decisiones, tu felicidad, tus caidas, seran las mias, tu felicidad sera mi prioridad alla donde estemos. ¿Vendras conmigo?, Te aseguro protejere mi promesa, aunque me duela, porque se que contigo valdra la pena");
    votoesposo.appendChild(texto);
    document.getElementById("Texto").appendChild(votoesposo);
}

let Husbando = document.getElementById('Esposo');

Husbando.addEventListener('click', Espo);


Husbando.addEventListener('dblclick', eliminado);

function eliminado(){
let textoeliminado = document.getElementById('Texto');
while(textoeliminado.firstChild){
    textoeliminado.removeChild(textoeliminado.firstChild);
} 
}

