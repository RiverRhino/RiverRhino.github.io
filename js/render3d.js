import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 1. Escena, cámara y renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 100);
camera.position.set(0, 1.5, 4);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// 2. Iluminación
const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
dirLight.position.set(5, 10, 7);
dirLight.castShadow = true;
scene.add(dirLight);

// 3. Controles de órbita (rotar con mouse)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 4. Cargar el modelo GLB
const loader = new GLTFLoader();

loader.load(
  './models/Meshy_AI_Pink_Haired_Chibi_Plu_0620050644_texture.glb',   // ← ruta a tu archivo

  (gltf) => {
    const model = gltf.scene;

    // Centrar el modelo automáticamente
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);

    scene.add(model);
    console.log('Modelo cargado ✓');
  },

  (xhr) => {
    console.log(`Cargando: ${(xhr.loaded / xhr.total * 100).toFixed(0)}%`);
  },

  (error) => {
    console.error('Error al cargar el modelo:', error);
  }
);

// 5. Loop de animación
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// 6. Redimensionado
window.addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});