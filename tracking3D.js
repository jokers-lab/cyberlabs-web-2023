import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const canvasThreeD = document.querySelector("#canvasBase");
const scene = new THREE.Scene();
// scene.background = new THREE.Color(0x000000);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  1000
);

const light = new THREE.PointLight(0xff0000, 2, 10);
light.position.set(1, 2, 5);
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0x38bdf8, 0.5);
scene.add(directionalLight);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

canvasThreeD.appendChild(renderer.domElement);
const loader = new GLTFLoader();

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 2, 5);
controls.update();

loader.load(
  "./assets/city-trace-model/city_3d.glb",
  function (gltf) {
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
