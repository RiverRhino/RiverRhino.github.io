// ── visionteto.js ──────────────────────────────────────────────────

(async () => {

  // ── 1. Cargar tasks-vision ───────────────────────────────────────
  let FilesetResolver, HandLandmarker;
  try {
    const mod = await import(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/vision_bundle.mjs"
    );
    FilesetResolver = mod.FilesetResolver;
    HandLandmarker  = mod.HandLandmarker;
    console.log("[Vision] modulo cargado OK");
  } catch (e) {
    console.error("[Vision] ERROR cargando modulo:", e);
    return;
  }

  // ── 2. Inicializar HandLandmarker ────────────────────────────────
  let handLandmarker;
  try {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
    );
    handLandmarker = await HandLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
        delegate: "GPU"
      },
      runningMode: "VIDEO",
      numHands: 1
    });
    console.log("[Vision] HandLandmarker listo");
  } catch (e) {
    console.error("[Vision] ERROR creando HandLandmarker:", e);
    return;
  }

  // ── 3. Cámara ────────────────────────────────────────────────────
  const video = document.getElementById("video");
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 640, height: 480 }
    });
    video.srcObject = stream;
    await video.play();
    console.log("[Vision] Camara activa");
  } catch (e) {
    console.error("[Vision] ERROR camara:", e.message);
    return;
  }

  // ── 4. Wrapper + canvas overlay ──────────────────────────────────
  const wrapper = document.createElement("div");
  wrapper.style.cssText = [
    "position:fixed",
    "bottom:8px",
    "right:8px",
    "width:240px",
    "height:180px",
    "border-radius:10px",
    "overflow:hidden",
    "z-index:9999",
    "border:6px solid #bd1313",
    "background:#000"
  ].join(";");

  // El video ocupa todo el wrapper, espejado
  video.style.cssText = [
    "position:absolute",
    "top:0",
    "left:0",
    "width:100%",
    "height:100%",
    "object-fit:cover",
    "transform:scaleX(-1)"
  ].join(";");

  // Canvas encima del video
  const overlay = document.createElement("canvas");
  overlay.width  = 640;
  overlay.height = 480;
  overlay.style.cssText = [
    "position:absolute",
    "top:0",
    "left:0",
    "width:100%",
    "height:100%",
    "pointer-events:none",
    "transform:scaleX(-1)"
  ].join(";");

  // Insertar wrapper donde estaba el video
  video.parentNode.insertBefore(wrapper, video);
  wrapper.appendChild(video);
  wrapper.appendChild(overlay);

  const ctx = overlay.getContext("2d");

  // ── 5. Conexiones de la mano (pares de índices de landmarks) ─────
  const CONNECTIONS = [
    [0,1],[1,2],[2,3],[3,4],
    [0,5],[5,6],[6,7],[7,8],
    [0,9],[9,10],[10,11],[11,12],
    [0,13],[13,14],[14,15],[15,16],
    [0,17],[17,18],[18,19],[19,20],
    [5,9],[9,13],[13,17]
  ];

  function dibujarMano(lms, levantado) {
    const W = overlay.width;
    const H = overlay.height;

    // Líneas
    ctx.strokeStyle = "#fc0303c0";
    ctx.lineWidth = 3;
    for (const [a, b] of CONNECTIONS) {
      ctx.beginPath();
      ctx.moveTo(lms[a].x * W, lms[a].y * H);
      ctx.lineTo(lms[b].x * W, lms[b].y * H);
      ctx.stroke();
    }

    // Puntos
    for (let i = 0; i < lms.length; i++) {
      const x = lms[i].x * W;
      const y = lms[i].y * H;
      const esPunta = i === 8;

      ctx.beginPath();
      ctx.arc(x, y, esPunta ? 10 : 5, 0, Math.PI * 2);
      ctx.fillStyle = esPunta ? (levantado ? "#3cff00" : "#791436") : "#4d4d4dc7";
      ctx.strokeStyle = "#610202";
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();
    }
  }

  // ── 6. Gesto: índice levantado ────────────────────────────────────
  // landmark 8 = punta del índice, 6 = nudillo PIP
  function indiceEstaLevantado(hand) {
    return hand[8].y < hand[6].y - 0.04;
  }

  function pulgarLevantado(hand){
    return hand[4].x < hand[2].x - 0.05;
  }

  let pulgarCooldown = false;

  function dispararPulgar(){
    if(pulgarCooldown) return;
    pulgarCooldown = true;

    const btnReiniciar = document.getElementById("btnReiniciar");
    btnReiniciar.click();
    
    setTimeout(() => {pulgarCooldown = false;},800);

  }

  // ── 7. Disparar salto con cooldown ───────────────────────────────
  let saltoCooldown = false;

  function dispararSalto() {
    if (saltoCooldown) return;
    saltoCooldown = true;
    console.log("[Vision] SALTO!");

    // Evento de teclado (lo recibe el listener del juego)
    document.dispatchEvent(new KeyboardEvent("keydown", { keyCode: 32, code: "Space", bubbles: true }));
    // Llamada directa como respaldo
    if (typeof Saltar === "function") Saltar();

    setTimeout(() => { saltoCooldown = false; }, 700);
  }

  // ── 8. Loop de detección ─────────────────────────────────────────
  let lastVideoTime = -1;
  let frameCount = 0;

  function renderLoop() {
    frameCount++;
    if (frameCount % 60 === 0) {
      console.log("[Vision] frame", frameCount, "| videoTime:", video.currentTime.toFixed(2));
    }

    if (video.readyState >= 2 && video.currentTime !== lastVideoTime) {
      lastVideoTime = video.currentTime;

      let results;
      try {
        results = handLandmarker.detectForVideo(video, performance.now());
      } catch (err) {
        console.error("[Vision] detectForVideo error:", err);
        requestAnimationFrame(renderLoop);
        return;
      }

      ctx.clearRect(0, 0, overlay.width, overlay.height);

      if (results.landmarks && results.landmarks.length > 0) {
        const hand = results.landmarks[0];
        const levantado = indiceEstaLevantado(hand);
        const pulgar = pulgarLevantado(hand);
        dibujarMano(hand, levantado);
        if (levantado) dispararSalto();
        if(pulgar) dispararPulgar();
      }
    }

    requestAnimationFrame(renderLoop);
  }

  // Iniciar cuando el video tenga frames
  if (video.readyState >= 2) {
    console.log("[Vision] video ya listo, arrancando loop");
    renderLoop();
  } else {
    video.addEventListener("loadeddata", () => {
      console.log("[Vision] loadeddata, arrancando loop");
      renderLoop();
    });
  }

})();