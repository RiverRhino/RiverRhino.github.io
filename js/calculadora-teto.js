let numbers = document.querySelectorAll(".numeros");
let pantalla = document.getElementById("numero");
let borrador = document.getElementById("numeroborrar");
let igual = document.getElementById("igual");
let cambiarGif = document.getElementById("Cambiar-Gif");
let gif = document.getElementById("gif");
let circulo = document.getElementById("tetogirando");

borrador.addEventListener("click", () => {
  pantalla.textContent = "";
})

cambiarGif.addEventListener("click", () => {
  // intercambiamos el gif grande (de fondo) con el de la burbuja:
  // el que estaba en el circulo pasa a la pantalla, y el que estaba
  // en la pantalla pasa al circulo. Cada click vuelve a intercambiarlos.
  const gifPrincipalActual = gif.src;
  const gifCirculoActual = circulo.src;

  gif.src = gifCirculoActual;
  circulo.src = gifPrincipalActual;
})
// ---- Fish Audio Text-to-Speech (a traves de nuestro propio servidor) ----

// lo que dice cada boton al hacerle click. Cambia las palabras a tu gusto.
const FRASES = {
  "1": "ichi",
  "2": "ni",
  "3": "san",
  "4": "shi",
  "5": "go",
  "6": "roku",
  "7": "shichi",
  "8": "hachi",
  "9": "kyuu",
  "0": "rei",
  "+": "tasu",
  "-": "hiku",
  "x": "kakeru",
  "/": "waru",
  "C": "Shoukyo suru",
  "=": "wa",
  ".": "「チョッチ (Txotx)」とは、樽から注がれるシードラ（リンゴ酒）を合図とともに皆で楽しむバスク地方の伝統的な習慣です"
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

igual.addEventListener("click", () => {
  calculate();

  setTimeout(() => {
    const textoresultado = pantalla.textContent;
    reproducirFrase(textoresultado);
  }, 1000);
})

function calculate() {
  try {
    // "x" no es un operador valido en JS (lo confunde con una variable),
    // y el "=" que ya quedo escrito en pantalla rompe el eval. Limpiamos ambos.
    let expresion = pantalla.innerText
      .replace(/x/g, "*")
      .replace(/=/g, "");

    pantalla.innerText = eval(expresion);

  } catch {
    pantalla.innerText = 'Error';
  }
}