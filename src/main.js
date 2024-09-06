import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module'
import GUI from 'lil-gui';

const stats = Stats()
document.body.appendChild(stats.dom)
const gui = new GUI();
const folder = gui.addFolder('Cube')


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const controls = new OrbitControls( camera, renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
const sun = new THREE.DirectionalLight()
sun.position.set(1,2,3)
const ambient = new THREE.AmbientLight('#ffffff', 1)

scene.add( cube );
scene.add( sun );
scene.add( ambient );
camera.position.z = 5;
controls.update();
folder.add(cube.position, 'x', -2, 2, 0.1).name('X Position')
folder.addColor(cube.material, 'color')

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