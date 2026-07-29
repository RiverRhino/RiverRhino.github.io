const http = require('node:http');
require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// la key vive SOLO aqui, en el servidor, nunca en el navegador
const FISH_AUDIO_API_KEY = process.env.FISH_AUDIO_API_KEY;
const REFERENCE_ID = "0118a35dcb604837abe7961a43e13ba8"; // id de voz de Teto

app.use(express.json());

// sirve calculadorateto.html, css/, js/, imagenes/ tal cual estan en la carpeta del proyecto
app.use(express.static(path.join(__dirname)));

// el frontend llama a ESTE endpoint, nunca a Fish Audio directo
app.post("/api/tts", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Falta el texto a convertir en voz." });
  }

  if (!FISH_AUDIO_API_KEY) {
    return res.status(500).json({ error: "Falta configurar FISH_AUDIO_API_KEY en el archivo .env" });
  }

  try {
    const fishResponse = await fetch("https://api.fish.audio/v1/tts", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${FISH_AUDIO_API_KEY}`,
        "Content-Type": "application/json",
        "model": "s2.1-pro-free"
      },
      body: JSON.stringify({
        text,
        reference_id: REFERENCE_ID,
        format: "mp3"
      })
    });

    if (!fishResponse.ok) {
      const errorText = await fishResponse.text();
      console.error("Fish Audio respondio con error:", fishResponse.status, errorText);
      return res.status(fishResponse.status).json({ error: errorText });
    }

    // reenviamos el audio tal cual al navegador
    res.setHeader("Content-Type", "audio/mpeg");
    const audioBuffer = Buffer.from(await fishResponse.arrayBuffer());
    res.send(audioBuffer);

  } catch (error) {
    console.error("Error al llamar a Fish Audio:", error);
    res.status(500).json({ error: "No se pudo generar el audio." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});