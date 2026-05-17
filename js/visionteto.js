// ── visionteto.js ──────────────────────────────────────────────────
// - Dibuja landmarks y conexiones de la mano sobre un canvas overlay
// - Detecta dedo índice levantado → simula tecla Space (salto del dino)

(async () => {

  const { FilesetResolver, HandLandmarker, DrawingUtils } = await import(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/vision_bundle.mjs"
  );

  // ── 1. Inicializar HandLandmarker ────────────────────────────────
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
  );

  const handLandmarker = await HandLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
      delegate: "GPU"
    },
    runningMode: "VIDEO",
    numHands: 1
  });

  // ── 2. Cámara ────────────────────────────────────────────────────
  const video = document.getElementById("video");

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 640, height: 480 }
    });
    video.srcObject = stream;
    await video.play();
  } catch (e) {
    console.error("Sin acceso a cámara:", e.message);
    return;
  }

  // ── 3. Canvas overlay encima del video ───────────────────────────
  // Creamos un <canvas> del mismo tamaño que el video y lo ponemos
  // encima con position:fixed igual que el video.
  const overlay = document.createElement("canvas");
  overlay.width  = 640;
  overlay.height = 480;

  const W = "220px";
  const H = "165px";

  video.style.position     = "fixed";
  video.style.bottom       = "8px";
  video.style.right        = "8px";
  video.style.width        = W;
  video.style.height       = H;
  video.style.borderRadius = "10px";
  video.style.zIndex       = "99";

  overlay.style.position     = "fixed";
  overlay.style.bottom       = "8px";
  overlay.style.right        = "8px";
  overlay.style.width        = W;
  overlay.style.height       = H;
  overlay.style.borderRadius = "10px";
  overlay.style.zIndex       = "100";
  overlay.style.pointerEvents = "none"; // no bloquea clics ni teclado
  document.body.appendChild(overlay);

  const ctx = overlay.getContext("2d");
  const drawUtils = new DrawingUtils(ctx);

  // ── 4. Control de salto con cooldown ────────────────────────────
  // Evita disparar el salto en cada frame mientras el dedo sigue arriba.
  let saltoCooldown = false;

  function dispararSalto() {
    if (saltoCooldown) return;
    saltoCooldown = true;

    // Simula keydown Space → lo recibe el listener del juego
    document.dispatchEvent(
      new KeyboardEvent("keydown", { keyCode: 32, code: "Space", bubbles: true })
    );

    // Llamada directa como respaldo
    if (typeof Saltar === "function") Saltar();

    // 700 ms de pausa antes de permitir otro salto
    setTimeout(() => { saltoCooldown = false; }, 700);
  }

  // ── 5. Lógica: índice levantado ──────────────────────────────────
  // Landmark 8 = punta del índice, 6 = articulación PIP del índice.
  // "Levantado" = la punta está al menos 4% de alto de pantalla
  // por encima del nudillo intermedio.
  function indiceEstaLevantado(hand) {
    return hand[8].y < hand[6].y - 0.04;
  }

  // ── 6. Render loop ───────────────────────────────────────────────
  let lastVideoTime = -1;

  function renderLoop() {
    if (video.currentTime !== lastVideoTime) {
      lastVideoTime = video.currentTime;

      const results = handLandmarker.detectForVideo(video, performance.now());

      ctx.save();
      ctx.clearRect(0, 0, overlay.width, overlay.height);

      // Espejo horizontal para que la mano coincida con lo que el
      // usuario ve (como en un espejo).
      ctx.scale(-1, 1);
      ctx.translate(-overlay.width, 0);

      if (results.landmarks && results.landmarks.length > 0) {
        for (const hand of results.landmarks) {

          // Conexiones (huesos de la mano)
          drawUtils.drawConnectors(
            hand,
            HandLandmarker.HAND_CONNECTIONS,
            { color: "#00e5ff", lineWidth: 3 }
          );

          // Articulaciones
          drawUtils.drawLandmarks(hand, {
            color: "#ff4081",
            fillColor: "#ffffff",
            lineWidth: 1,
            radius: 4
          });

          // Punta del índice resaltada: verde si levantado, rosa si no
          const tip = hand[8];
          const levantado = indiceEstaLevantado(hand);
          ctx.beginPath();
          ctx.arc(
            tip.x * overlay.width,
            tip.y * overlay.height,
            9, 0, Math.PI * 2
          );
          ctx.fillStyle = levantado ? "#00e676" : "#ff4081";
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 2;
          ctx.fill();
          ctx.stroke();
        }

        // Disparar salto si el índice de la primera mano está levantado
        if (indiceEstaLevantado(results.landmarks[0])) {
          dispararSalto();
        }
      }

      ctx.restore();
    }

    requestAnimationFrame(renderLoop);
  }

  video.addEventListener("loadeddata", () => {
    renderLoop();
  });

})();