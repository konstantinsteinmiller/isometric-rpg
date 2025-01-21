import * as THREE from 'three'
import GameObject from './GameObject'
import {getKey} from "@/utils"

const treeGeometry = new THREE.ConeGeometry(0.2, 1, 8)
const treeMaterial = new THREE.MeshStandardMaterial({
  color: 0x305010,
  flatShading: true
})

export default class Tree extends GameObject {
  /**
   * @param coords
   */
  constructor(coords) {
    const treeMesh = new THREE.Mesh(treeGeometry, treeMaterial)
    treeMesh.position.set(0.5, 0.5, 0.5)

    super(coords, treeMesh)

    this.name = `Tree ${getKey(coords)}`
  }
}