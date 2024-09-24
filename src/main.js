import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module'
import GUI from 'lil-gui';
import World from './world';
import Player from "@/player";
const gui = new GUI();

const stats = Stats()
document.body.appendChild(stats.dom)


window.renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild( renderer.domElement );

window.scene = new THREE.Scene();
window.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
window.controls = new OrbitControls( camera, renderer.domElement );

const world = new World(10, 10)

const player = new Player(world)
const sun = new THREE.DirectionalLight()
sun.position.set(1,2,3)
sun.intensity = 3
const ambient = new THREE.AmbientLight('#ffffff', 1)

const axesHelper = new THREE.AxesHelper( 2 );
scene.add( axesHelper );
scene.add( sun );
scene.add( ambient );
// camera.position.z = -1;
// camera.position.x = -10;
// camera.position.y = 4;
camera.position.set(10, 3, 10)
controls.target.set(5, 0, 5);
controls.update();

const worldFolder = gui.addFolder('Terrain')
worldFolder.add(world, 'width', 1, 20, 1).name('width')
worldFolder.add(world, 'height', 1, 20, 1).name('height')
worldFolder.addColor(world.terrain.material, 'color')
worldFolder.add(world, 'treeCount').name('Tree Count')
worldFolder.add(world, 'rockCount').name('rock Count')
worldFolder.add(world, 'bushCount').name('Bush Count')
worldFolder.add(world, 'generate').name('Generate')

function animate() {
  requestAnimationFrame( animate );
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  stats.update()
  controls.update();

  renderer.render( scene, camera );
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerWidth
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight);
})