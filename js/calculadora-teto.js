let numbers = document.querySelectorAll(".numeros");
let pantalla = document.getElementById("numero");

// en vez de agregar el evento uno por uno, recorremos la lista con forEach
numbers.forEach((boton) => {
  boton.addEventListener("click", () => {
    // aqui "boton" es el div que se hizo click, boton.textContent trae el numero/simbolo
    pantalla.textContent += boton.textContent;
  });
});