import * as THREE from 'three'
import GameObject from './GameObject'
import {clamp, getKey} from "@/utils"
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

const rockModel1 = await new GLTFLoader().loadAsync('assets/models/rock1.glb')
const rockModel2 = await new GLTFLoader().loadAsync('assets/models/rock2.glb')
const rockModel3 = await new GLTFLoader().loadAsync('assets/models/rock3.glb')

export default class Rock extends GameObject {
  /**
   * @param coords
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

    const randomModel = [rockModel1, rockModel2, rockModel3][clamp(Math.floor(Math.random() * 3), 0, 2)]

    const mesh = randomModel.scene.children[0].clone();
    mesh.scale.set(scale, scale, scale);
    mesh.position.set(0.5, 0, 0.5);
    mesh.rotation.set(0, rotation, 0);

    super(coords, mesh);

    this.name = `Rock ${getKey(coords)}`
  }
}