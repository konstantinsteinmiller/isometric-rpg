import GameObject from './GameObject'
import {getKey} from "@/utils"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {Group, Mesh} from "three";

const treeModel = await new GLTFLoader().loadAsync('assets/models/tree1.glb')

export default class Tree extends GameObject {
  /**
   * @param coords
   */
  constructor(coords) {
    const minScale = 0.9;
    const maxScale = 1.4;
    const minRotation = 0;
    const maxRotation = Math.PI * 2;

    const scale = minScale +
      (Math.random() * (maxScale - minScale));
    const rotation = minRotation +
      (Math.random() * (maxRotation - minRotation));

    const mesh = new Group()
    mesh.add(treeModel.scene.children[0].clone())
    mesh.scale.set(scale, scale, scale);
    mesh.position.set(0.5, 0, 0.5);
    mesh.rotation.set(0, rotation, 0);

    super(coords, mesh)

    this.name = `Tree ${getKey(coords)}`
  }
}