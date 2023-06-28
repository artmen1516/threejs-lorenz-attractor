import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import img from './textures/sprites/circle.png';

// Set up the scene
const scene = new THREE.Scene();

// Set up the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0.00, 60.00, 0.00);
camera.lookAt(0, 0, 30);

// Set up the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
const main = document.querySelector('main');
main.appendChild(renderer.domElement);

// let controls;
// controls = new OrbitControls(camera, renderer.domElement);
// controls.screenSpacePanning = true;
// controls.minDistance = -70;
// controls.maxDistance = 60;
// controls.target.set(0, 0, 30);
// controls.update();

// Create a parent group to hold the axes helpers and drawing group
const parentGroup = new THREE.Group();
scene.add(parentGroup);

// Create axes helpers
const axesHelper = new THREE.AxesHelper(5); // Specify the size of the axes
parentGroup.add(axesHelper);

// Create a group to hold your drawing
const drawingGroup = new THREE.Group();
parentGroup.add(drawingGroup);

// Create geometry and material for the dots
const loader = new THREE.TextureLoader();
const sprite = loader.load( img );
sprite.colorSpace = THREE.SRGBColorSpace;
const pointGeometry = new THREE.BufferGeometry();
const pointMaterial = new THREE.PointsMaterial( { size: 3, sizeAttenuation: true, map: sprite, alphaTest: 0.5, transparent: true } );
// pointMaterial.color.setHSL( 1.0, 0.3, 0.7, THREE.SRGBColorSpace );

// Create geometry and material for the lines
const lineGeometry = new THREE.BufferGeometry();
const lineMaterial = new THREE.LineBasicMaterial({ vertexColors: true });

// Define parameters and initial conditions
const sigma = 10;
const rho = 28;
const beta = 8 / 3;
let x = 0.1;
let y = 0;
let z = 0;

// Arrays to store positions and colors of the lines
let dotPosition = [];
const positions = [];
const colors = [];
const size = [];

function init() {
  // ...
}

function updateCameraInfo() {
  // const cameraInfoElement = document.getElementById('camera-info');
  // cameraInfoElement.textContent = `Position: (${parentGroup.position.x.toFixed(2)}, ${parentGroup.position.y.toFixed(2)}, ${parentGroup.position.z.toFixed(2)}) - Rotation: (${parentGroup.rotation.x.toFixed(2)}, ${parentGroup.rotation.y.toFixed(2)}, ${parentGroup.rotation.z.toFixed(2)})`;
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
  dotPosition.push(x, y, z);
  colors.push(x / 30 + 0.5, y / 30 + 0.5, z / 30 + 0.5);
  size.push(10);

  // Update positions and colors in the geometry
  pointGeometry.setAttribute('position', new THREE.Float32BufferAttribute(dotPosition, 3));
  // pointGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  // pointGeometry.setAttribute('size', new THREE.Float32BufferAttribute(size, 1));
  lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  // Render the scene
  drawingGroup.add(camera);
  parentGroup.rotation.z -= 0.005;
  renderer.render(scene, camera);
  dotPosition = [];
  if (positions.length > 5000) {
    positions.splice(0, 3);
    colors.splice(0, 3);
  }
}

// Create a line segments object
const dot = new THREE.Points(pointGeometry, pointMaterial);
const line = new THREE.Line(lineGeometry, lineMaterial);

// Add the lines to the scene
scene.add(dot);
scene.add(line);

// Render the scene
function animate() {
requestAnimationFrame(animate);
simulate();
updateCameraInfo();
}

animate();
