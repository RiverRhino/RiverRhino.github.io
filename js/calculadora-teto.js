let numbers = document.querySelectorAll(".numeros");
let pantalla = document.getElementById("numero");
let borrador = document.getElementById("numeroborrar");

borrador.addEventListener("click", ()=>{
    pantalla.textContent = "";
})


// ---- Fish Audio Text-to-Speech ----
// ADVERTENCIA: no subas esta key a un repositorio publico ni a un sitio en linea.
// Esto es solo para probar localmente. Para produccion, esta llamada deberia
// hacerse desde un servidor tuyo que guarde la key de forma segura.
const FISH_AUDIO_API_KEY = "f335bbbb096846908d36706542d4f687"; // pegala aqui (Settings > API Keys en fish.audio)
const REFERENCE_ID = "0118a35dcb604837abe7961a43e13ba8"; // el id de voz que me diste
const FRASE_PREDETERMINADA = "¡Hola! Soy Teto."; // la frase que va a decir

async function reproducirFrase(texto) {
  try {
    const response = await fetch("https://api.fish.audio/v1/tts", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${FISH_AUDIO_API_KEY}`,
        "Content-Type": "application/json",
        "model": "s2.1-pro-free" // modelo gratuito de Fish Audio
      },
      body: JSON.stringify({
        text: texto,
        reference_id: REFERENCE_ID,
        format: "mp3"
      })
    });

    if (!response.ok) {
      console.error("Fish Audio respondio con error:", await response.text());
      return;
    }

    // la respuesta es el audio en binario, lo convertimos en algo que <audio> pueda reproducir
    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
  } catch (error) {
    console.error("Error al llamar a Fish Audio:", error);
  }
}

// en vez de agregar el evento uno por uno, recorremos la lista con forEach
numbers.forEach((boton) => {
  boton.addEventListener("click", () => {
    // aqui "boton" es el div que se hizo click, boton.textContent trae el numero/simbolo
    pantalla.textContent += boton.textContent;
    reproducirFrase(FRASE_PREDETERMINADA);
  });
});