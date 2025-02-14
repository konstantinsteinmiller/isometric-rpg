import GameObject from './GameObject'
import {getKey} from "@/utils"
import {GLTFLoader} from "three/addons/loaders/GLTFLoader";

const bushModel = await new GLTFLoader().loadAsync('assets/models/bush1.glb')

export default class Bush extends GameObject {
  /**
   * @param {THREE.Vector3} coords
   */
  constructor(coords) {
    const minScale = 1.0;
    const maxScale = 1.5;
    const minRotation = 0;
    const maxRotation = Math.PI * 2;

    const scale = minScale +
      (Math.random() * (maxScale - minScale));
    const rotation = minRotation +
      (Math.random() * (maxRotation - minRotation));

    const mesh = bushModel.scene.children[0].clone();
    mesh.scale.set(scale, scale, scale);
    mesh.position.set(0.5, 0, 0.5);
    mesh.rotation.set(0, rotation, 0);

    super(coords, mesh);

    this.name = `Bush ${getKey(coords)})`
  }
}