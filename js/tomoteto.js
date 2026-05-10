const canvas = document.getElementById("teto");
const ctx = canvas.getContext("2d");
const mostrarJuego = document.getElementById("contenedor");
const btnMostrar = document.getElementById("btnReiniciar");

var miimgagen = new Image();
miimgagen.src = "./imagenes/tetoplush.png";
 miimgagen.onload = function() {
    ctx.drawImage(miimgagen, 0, 0, canvas.width, canvas.height);
};

//Cambio de imagen

function tetoBano(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    miimgagen.src = "./imagenes/tetobano.jpg";
    ctx.restore();
}

function tetoNormal(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    miimgagen.src = "./imagenes/tetoplush.png";
    ctx.restore();
}

function tetoComiendo(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    miimgagen.src = "./imagenes/kasanecomiendopan.jpg";
    ctx.restore();
}

function tetoDurmiendo(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    miimgagen.src = "./imagenes/tetodurmiendo.png";
    ctx.restore();
}


// Variables sobre el estado
let energiaTeto = 100;
let felicidadTeto = 100;
let hambreTeto = 100;
let cagadaTeto = 100;
let durmiendo = false;
let comiendo = false;
let cagando = false;

// Texto a cambiar
const txtEnergia = document.getElementById("energiaCant");
const txtHambre = document.getElementById("hambreCant");
const txtFelicidad = document.getElementById("felicidadCant");
const txtCagada = document.getElementById("cagadaCant");
// Intervalo de energía con bandera
setInterval(() => {
    if (durmiendo) {
        if (energiaTeto < 100) energiaTeto += 5;
    } else {
        if (energiaTeto > 0) energiaTeto -= 5;
    }
    txtEnergia.textContent = energiaTeto + "%";
}, 8000);

// Intervalo de felicidad
setInterval(() => {
    if (felicidadTeto > 0) felicidadTeto -= 10;
    if (felicidadTeto == 20) alert("¡Se está quedando sin felicidad!");
    if (felicidadTeto < 0) felicidadTeto = 0;
    txtFelicidad.textContent = felicidadTeto + "%";
}, 9000);

//Intervalo de hambre
setInterval(() => {
if (comiendo) {
        if (hambreTeto < 100) hambreTeto += 5;
    } else {
        if (hambreTeto > 0) hambreTeto -= 5;
    }
    txtHambre.textContent = hambreTeto + "%";
}, 10000);

setInterval(() => {
    if (cagando) {
        if (cagadaTeto < 100) cagadaTeto += 5;
    } else {
        if (cagadaTeto > 0) cagadaTeto -= 5;
    }
    txtCagada.textContent = cagadaTeto + "%";
}, 11000);  

// Botones de acciones
var bathroom = document.getElementById("salud");
var felicidad = document.getElementById("felicidad");
var energia = document.getElementById("energia");
var hambre = document.getElementById("hambre");
var btnDormir = document.getElementById("btnDormir");

btnDormir.addEventListener("click", function () {
    durmiendo = true;
    comiendo = false;
    cagando = false;
    tetoDurmiendo();

});

hambre.addEventListener("click", function () {
    durmiendo = false;
    comiendo = true;
    cagando = false;
    tetoComiendo();
});

bathroom.addEventListener("click", function () {
    durmiendo = false;
    comiendo = false;
    cagando = true;
    tetoBano();
});

felicidad.addEventListener("click", function () {
    durmiendo = false;
    comiendo = false;
    cagando = false;
    tetoNormal();
    mostrarJuego.style.visibility = "visible";
    btnMostrar.style.visibility = "visible";
    
});



/*
// ── DIBUJO DE TETO ──
// El dibujo original ocupa coords de y≈82 a y≈420 (alto ~338) y x≈75 a x≈325 (ancho ~250)
// El canvas es 360×270, así que escalamos y centramos con ctx.save/translate/scale

function drawTeto() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    const escala = 0.55;
    // Centro del dibujo original: x≈200, y≈250
    // Lo trasladamos al centro del canvas: 180, 135
    ctx.translate(180 - 200 * escala, 135 - 250 * escala);
    ctx.scale(escala, escala);

    // --- 1. Cuerpo y Ropa ---
    ctx.fillStyle = '#3a3a45';
    ctx.fillRect(140, 280, 120, 100);

    ctx.fillStyle = '#d32b2b';
    ctx.beginPath();
    ctx.ellipse(150, 400, 30, 20, 0, 0, Math.PI * 2);
    ctx.ellipse(250, 400, 30, 20, 0, 0, Math.PI * 2);
    ctx.fill();

    // --- 2. Cabello Trasero (Coletas) ---
    ctx.fillStyle = '#d32b2b';
    ctx.beginPath();
    ctx.arc(110, 220, 45, 0, Math.PI * 2);
    ctx.arc(290, 220, 45, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(120, 260, 45, 0, Math.PI * 2);
    ctx.arc(290, 220, 45, 0, Math.PI * 2);
    ctx.fill();

    // --- 3. Piel (Cara) ---
    ctx.fillStyle = '#ffe0bd';
    ctx.beginPath();
    ctx.arc(200, 220, 80, 0, Math.PI * 2);
    ctx.fill();

    // --- 4. Ojos ---
    ctx.fillStyle = '#4a2c2a';
    ctx.beginPath();
    ctx.ellipse(170, 230, 15, 20, 0, 0, Math.PI * 2);
    ctx.ellipse(230, 230, 15, 20, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(165, 225, 5, 0, Math.PI * 2);
    ctx.arc(225, 225, 5, 0, Math.PI * 2);
    ctx.fill();

    // --- 5. Flequillo ---
    ctx.fillStyle = '#d32b2b';
    ctx.beginPath();
    ctx.moveTo(120, 200);
    ctx.lineTo(200, 210);
    ctx.lineTo(280, 200);
    ctx.arc(200, 200, 80, Math.PI, 0);
    ctx.fill();

    // --- 6. Gorra de Hélice ---
    ctx.fillStyle = '#e60000';
    ctx.beginPath();
    ctx.arc(200, 160, 70, Math.PI, 0);
    ctx.fill();

    ctx.fillStyle = '#008000';
    ctx.fillRect(130, 155, 140, 10);

    ctx.strokeStyle = '#333';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(200, 90);
    ctx.lineTo(200, 110);
    ctx.stroke();

    ctx.fillStyle = '#4caf50';
    ctx.beginPath();
    ctx.ellipse(170, 90, 35, 8, 0, 0, Math.PI * 2);
    ctx.ellipse(230, 90, 35, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

drawTeto();*/