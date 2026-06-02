
// ── Botón leyenda ──────────────────────────────────────────────────
document.getElementById('categoriaBtn').addEventListener('click', () => {
  const leyenda = document.getElementById('leyenda');
  leyenda.style.display = leyenda.style.display === 'none' ? 'block' : 'none';
});

// ── Mapa ───────────────────────────────────────────────────────────
const map = L.map('map', { zoomControl: true }).setView([32.6245, -115.4523], 14);

window.map = map;

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  noWrap: true,
  attribution: '© OpenStreetMap'
}).addTo(map);

// ── Overlay: abrir y cerrar ────────────────────────────────────────
let modalLinkUrl = '';

function openOverlay(data) {
  document.getElementById('modal-bar-title').textContent = (data.title || 'INFO').toUpperCase().slice(0, 18);
  document.getElementById('modal-name').textContent      = data.title       || 'Sin nombre';
  document.getElementById('modal-cat').textContent       = (data.cat        || '').toUpperCase();
  document.getElementById('modal-desc').textContent      = data.desc        || '';
  modalLinkUrl = data.link || '';

  const media = document.getElementById('modal-media');
  media.innerHTML = data.img
    ? `<img class="modal-img" src="${data.img}" onerror="this.parentNode.innerHTML='<div class=modal-img-placeholder>📍</div>'">`
    : `<div class="modal-img-placeholder">📍</div>`;

  document.getElementById('overlay').classList.add('open');
}

window.openOverlay = openOverlay; // Exponer globalmente para poder llamarlo desde los popups de los markers

function openCreatorModal() {
  document.getElementById('modal-bar-title').textContent = 'CREAR MARCADOR';
  document.getElementById('modal-name').textContent      = '';
  document.getElementById('modal-cat').textContent       = '';
  document.getElementById('modal-desc').textContent      = '';
  modalLinkUrl = '';
    const media = document.getElementById('modal-media');
    media.innerHTML = `<div style="font-size:12px;color:#666;text-align:center;margin-top:20px;">
    Lat: ${pendingLatLng.lat.toFixed(5)}<br>Lng: ${pendingLatLng.lng.toFixed(5)}<br><br>
    <h3>Nombre del lugar:</h3>
    <input type="text" id="input-name" placeholder="Ej: Casa del Churro" style="width:80%;padding:6px;margin-bottom:10px;"><br>
    
    <h3>Url de la imagen (Opcional)</h3>
    <input type="text" id="input-img" placeholder="Ej: https://example.com/image.jpg" style="width:80%;padding:6px;margin-bottom:10px;"><br>
    
    <h3>Descripción:</h3>
    <textarea id="input-desc" placeholder="Escribe una descripción..." style="width:80%;height:80px;padding:6px;"></textarea><br>
    
    <button id="saveBtn" style="padding:6px 12px;margin-top:10px;">Guardar</button>
    </div>`;
    document.getElementById('overlay').
classList.add('open');

document.getElementById('saveBtn').addEventListener('click', async () => {
    const title = document.getElementById('input-name').value;
    const desc = document.getElementById('input-desc').value;
    const img = document.getElementById('input-img').value;
    const cat = "Propia"; // O puedes agregar un <select> en tu HTML para elegir la categoría

    if (!title) {
        alert("¡Ponle un nombre al marcador!");
        return;
    }

    // Llamamos a la función de Firebase que expondremos globalmente
    if (window.guardarMarcadorFirebase) {
        // Cambiamos el texto del botón para dar feedback
        document.getElementById('saveBtn').textContent = "Guardando...";
        
        await window.guardarMarcadorFirebase(title, cat, img, desc, pendingLatLng.lat, pendingLatLng.lng);
        closeOverlay();
    } else {
        console.error("La función de Firebase no está disponible.");
    }
  });
}



function closeOverlay() {
  document.getElementById('overlay').classList.remove('open');
}

function abrirLink() {
  if (modalLinkUrl) window.open(modalLinkUrl, '_blank');
}

// Cerrar al hacer clic en el fondo oscuro
document.getElementById('overlay').addEventListener('click', function(e) {
  if (e.target === this) closeOverlay();
});

// Cerrar con ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeOverlay();
});

// ── Modelos de markers personalizados ─────────────────────────────
const MARKER_MODELS = {
  'casa-churro': {
    iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLgwwPM1BugLqVrvkg7Z-WZmJBm8_ifg-CRQ&s',
    size: [40, 40],
    popup: {
      title: 'Casa del Churro',
      cat:   'Propia',
      desc:  'Aqui vive el churro. Mendigo churro esta en todas partes w',
      img:   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLgwwPM1BugLqVrvkg7Z-WZmJBm8_ifg-CRQ&s',
      link:  '',
    }
  },
  'casa-letty': {
    iconUrl: 'https://periodicocorreo.com.mx/__export/sites/correo/img/2022/08/12/destruccion-de-oxxo-en-Guanajuato-820365497.jpg',
    size: [40, 40],
    popup: {
      title: 'Casa de Letty',
      cat:   'Propia',
      desc:  'La esposa del churro. Todo esto empezo por una señora del oxxo que nos quiso correr por andar metiendonos a un refrigerador para sentirse una caguama pero nos saco de ahi y queria llamar a la policia bru',
      img:   'https://periodicocorreo.com.mx/__export/sites/correo/img/2022/08/12/destruccion-de-oxxo-en-Guanajuato-820365497.jpg',
      link:  '',
    }
  },
  'casa-kasaneteto': {
    iconUrl: 'https://preview.redd.it/any-guide-on-what-to-do-when-your-teto-plush-started-talking-v0-g890tf0bp8df1.png?auto=webp&s=20d8409b87280f54ed1965e3e4a9ba6303b2eac1',
    size: [40, 40],
    popup: {
      title: 'Casa de Kasaneteto',
      cat:   'Propia',
      desc:  'La casa de kasaneteto, la mascota del churro. Es un lugar muy tranquilo donde el kasaneteto puede descansar y estar lejos de los peligros del mundo exterior.',
      img:   'https://http2.mlstatic.com/D_NQ_NP_741270-CBT107797078278_032026-O.webpf1.png?auto=webp&s=20d8409b87280f54ed1965e3e4a9ba6303b2eac1',
      link:  '',
    }
},


};

// ── Factory: crea icono desde modelo ──────────────────────────────
function buildIcon(model) {
  const [w, h] = model.size || [40, 40];
  const inner = model.iconUrl
    ? `<img src="${model.iconUrl}" width="${w}" height="${h}" style="object-fit:cover;border-radius:3px;image-rendering:pixelated;">`
    : `<span style="font-size:${w * 0.5}px">${model.emoji || '📍'}</span>`;

  return L.divIcon({
    html: `<div style="
      width:${w}px;height:${h}px;
      background:#1a1a1a;
      border:3px solid #666;
      border-radius:4px;
      box-shadow:3px 3px 0 #000;
      display:flex;align-items:center;justify-content:center;
      overflow:hidden;
    ">${inner}</div>`,
    className: '',
    iconSize: [w, h],
    iconAnchor: [w / 2, h],
    popupAnchor: [0, -h],
  });
}

// ── Agrega un marker del modelo al mapa ───────────────────────────
function addMarker(modelId, lat, lng) {
  const model = MARKER_MODELS[modelId];
  if (!model) return;
  const marker = L.marker([lat, lng], { icon: buildIcon(model) });
  marker.on('click', () => openOverlay(model.popup));
  marker.addTo(map);
  return marker;
}

// ── Markers personalizados ────────────────────────────────────────
addMarker('casa-churro', 32.620, -115.480);
addMarker('casa-letty',  32.63530003199846, -115.44225505368144);
addMarker('casa-kasaneteto',  24.023985745720612, -98.99091725289493);

// ── Jugador (geolocalización) ─────────────────────────────────────
const playerIcon = L.icon({
  iconUrl:   'https://i.pinimg.com/originals/80/23/9d/80239d4ac2c183b7f35586a425dd324f.png',
  iconSize:  [40, 40],
  iconAnchor:[24, 48],
  popupAnchor:[0, -50]
});

let playerMarker;
if (navigator.geolocation) {
  navigator.geolocation.watchPosition(function(pos) {
    const { latitude: lat, longitude: lng } = pos.coords;
    if (playerMarker) {
      playerMarker.setLatLng([lat, lng]);
    } else {
      playerMarker = L.marker([lat, lng], { icon: playerIcon })
        .bindPopup('<b style="font-size:9px">Estás aquí</b>')
        .addTo(map);
    }
  }, err => console.error('Geolocalización:', err.message));
}

// ── Iconos POI por categoría ──────────────────────────────────────
const iconoURLs = {
  restaurant: 'https://pbs.twimg.com/media/GZvlAwaagAABbPx.jpg',
  cafe:       'https://pbs.twimg.com/media/GjnTdKDXAAA0C7v.jpg',
  bar:        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz3OvSdpqrlsghf9oHIM2J2dE-edzVoBaQ8A&s',
  museum:     'https://www.dondeir.com/wp-content/uploads/2024/05/vocaloid-exposicion-cdmx.jpg',
  hotel:      'https://i.pinimg.com/236x/e1/1b/0a/e11b0a9e77d9a1b405cc119d806424cf.jpg',
  hospital:   'https://preview.redd.it/why-do-yall-call-this-teto-dr-kidori-v0-dm5b7fgbtv2f1.jpeg?auto=webp&s=96c454d243c914a9707218c50275e0aad4f1f95b',
  school:     'https://preview.redd.it/highschool-teto-v0-tz6md2by5jhf1.png?width=1300&format=png&auto=webp&s=4555235838e1046f37f7402bad664930c82cda84',
  bank:       'https://preview.redd.it/any-guide-on-what-to-do-when-your-teto-plush-started-talking-v0-g890tf0bp8df1.png?auto=webp&s=20d8409b87280f54ed1965e3e4a9ba6303b2eac1',
  park:       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbl1hwNUCk2XfGoFEOD5Ks4_iGspSNjaqbYw&s',
  default:    'https://cdn-icons-png.flaticon.com/32/684/684908.png',
};

const iconCache = {};

function crearIcono(tipo) {
  const key = iconoURLs[tipo] ? tipo : 'default';
  if (iconCache[key]) return iconCache[key];
  iconCache[key] = L.divIcon({
    html: `<div style="
      width:36px;height:36px;
      background:#1a1a1a;
      border:3px solid #666;
      border-radius:4px;
      box-shadow:3px 3px 0 #000;
      display:flex;align-items:center;justify-content:center;
      overflow:hidden;
    ">
      <img src="${iconoURLs[key]}" width="34" height="34"
           style="image-rendering:pixelated;display:block;object-fit:cover;border-radius:3px;">
    </div>`,
    className: '',
    iconSize:   [36, 36],
    iconAnchor: [18, 36],
    popupAnchor:[0, -36]
  });
  return iconCache[key];
}

// ── Carga de POIs desde Overpass ──────────────────────────────────
let marcadoresPOI = [];
let cargando = false;
const loadingEl = document.getElementById('loading');

async function cargarPOIs() {
  if (cargando) return;
  cargando = true;
  loadingEl.style.display = 'block';

  marcadoresPOI.forEach(m => map.removeLayer(m));
  marcadoresPOI = [];

  const b    = map.getBounds();
  const bbox = `${b.getSouth()},${b.getWest()},${b.getNorth()},${b.getEast()}`;

  const query = `
    [out:json][timeout:25];
    (
      node[amenity=restaurant](${bbox});
      node[amenity=cafe](${bbox});
      node[amenity=bar](${bbox});
      node[amenity=hospital](${bbox});
      node[amenity=school](${bbox});
      node[amenity=bank](${bbox});
      node[leisure=park](${bbox});
    );
    out body;
  `;

  try {
    const res  = await fetch('https://overpass-api.de/api/interpreter', { method: 'POST', body: query });
    const data = await res.json();

    data.elements.forEach(poi => {
      if (!poi.lat || !poi.lon) return;

      const nombre = poi.tags.name || 'Sin nombre';
      const tipo   = poi.tags.amenity || poi.tags.leisure || poi.tags.tourism || 'default';

      const poiData = {
        title: nombre,
        cat:   tipo,
        img:   '',
      };

      const marker = L.marker([poi.lat, poi.lon], { icon: crearIcono(tipo) });
      marker.on('click', () => openOverlay(poiData));
      marker.addTo(map);
      marcadoresPOI.push(marker);
    });

  } catch (e) {
    console.error('Error cargando POIs:', e);
  }

  cargando = false;
  loadingEl.style.display = 'none';
}

cargarPOIs();

let timer;
map.on('moveend', () => {
  clearTimeout(timer);
  timer = setTimeout(cargarPOIs, 800);
});


map.on('click', (e) =>{
    pendingLatLng = e.latlng;
    openCreatorModal();
  });
