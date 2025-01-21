import * as THREE from 'three'
import GameObject from './GameObject'
import {getKey} from "@/utils"

const bushGeometry = new THREE.SphereGeometry(1, 6, 5)

const bushMaterial = new THREE.MeshStandardMaterial({
  color: 0x80a040,
  flatShading: true
})

export default class Bush extends GameObject {
  /**
   * @param {THREE.Vector3} coords
   */
  constructor(coords) {
    const minRadius = 0.1;
    const maxRadius = 0.3;
    const radius = minRadius +
      (Math.random() * (maxRadius - minRadius));

    const bushMesh = new THREE.Mesh(bushGeometry, bushMaterial);
    bushMesh.scale.set(radius, radius, radius);
    bushMesh.position.set(0.5, radius, 0.5);

    super(coords, bushMesh);

    this.name = `Bush ${getKey(coords)})`
  }
}