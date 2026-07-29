let numbers = document.querySelectorAll(".numeros");
let pantalla = document.getElementById("numero");
let borrador = document.getElementById("numeroborrar");

borrador.addEventListener("click", ()=>{
    pantalla.textContent = "";
})
// ---- Fish Audio Text-to-Speech (a traves de nuestro propio servidor) ----

// lo que dice cada boton al hacerle click. Cambia las palabras a tu gusto.
const FRASES = {
  "1": "uno",
  "2": "dos",
  "3": "tres",
  "4": "cuatro",
  "5": "cinco",
  "6": "seis",
  "7": "siete",
  "8": "ocho",
  "9": "nueve",
  "0": "cero",
  "+": "más",
  "-": "menos",
  "x": "multiplicado por",
  "/": "entre",
  "C": "borrado"
};

async function reproducirFrase(texto) {
  try {
    // ya no llamamos a Fish Audio directo (eso causaba el error de CORS),
    // le pedimos el audio a nuestro propio servidor, que es quien tiene la key
    const response = await fetch("https://riverrhino-github-io.onrender.com/api/tts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: texto })
    });

    if (!response.ok) {
      console.error("El servidor respondio con error:", await response.text());
      return;
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
  } catch (error) {
    console.error("Error al pedir el audio:", error);
  }
}

// en vez de agregar el evento uno por uno, recorremos la lista con forEach
numbers.forEach((boton) => {
  boton.addEventListener("click", () => {
    // aqui "boton" es el div que se hizo click, boton.textContent trae el numero/simbolo
    pantalla.textContent += boton.textContent;

    // buscamos que le toca decir a este boton especifico en el diccionario FRASES
    const texto = FRASES[boton.textContent] || boton.textContent;
    reproducirFrase(texto);
  });
});