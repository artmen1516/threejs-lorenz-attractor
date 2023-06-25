import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// Set up the scene
const scene = new THREE.Scene();

// Set up the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Set up the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let controls;
controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, -50.58, 0);
controls.screenSpacePanning = true;
controls.minDistance = -70;
controls.maxDistance = 60;
controls.target.set(0, 0, 1);
// controls.position.set(0, 0, 0);
controls.update();

// Create geometry and material
const geometry = new THREE.BufferGeometry();
const material = new THREE.LineBasicMaterial({ vertexColors: true });

// Define parameters and initial conditions
const sigma = 10;
const rho = 28;
const beta = 8 / 3;
let x = 0.1;
let y = 0;
let z = 0;

// Arrays to store positions and colors of the lines
const positions = [];
const colors = [];

function updateCameraInfo() {
  const cameraInfoElement = document.getElementById('camera-info');
  cameraInfoElement.textContent = `Position: (${camera.position.x.toFixed(2)}, ${camera.position.y.toFixed(2)}, ${camera.position.z.toFixed(2)}) - Rotation: (${camera.rotation.x.toFixed(2)}, ${camera.rotation.y.toFixed(2)}, ${camera.rotation.z.toFixed(2)}) - Datapoints: ${positions.length / 3}`;
}

function handleMouseEvents(event) {
  // ...

  // Actualizar los valores de la cámara en cada fotograma
  updateCameraInfo();
}

// Simulation loop
function simulate() {
  // Update variables using Lorenz attractor equations
  const dt = 0.01;
  const dx = sigma * (y - x) * dt;
  const dy = (x * (rho - z) - y) * dt;
  const dz = (x * y - beta * z) * dt;
  x += dx;
  y += dy;
  z += dz;

  // Store new positions and colors
  positions.push(x, y, z);
  colors.push(x / 30 + 0.5, y / 30 + 0.5, z / 30 + 0.5);

  // Update positions and colors in the geometry
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  // Render the scene
  renderer.render(scene, camera);
}

// Create a line segments object
const line = new THREE.Line(geometry, material);

// Add the lines to the scene
scene.add(line);

// Render the scene
function animate() {
requestAnimationFrame(animate);
simulate();
updateCameraInfo();
}

animate();
