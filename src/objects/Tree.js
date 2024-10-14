import * as THREE from 'three'
import GameObject from './GameObject'
import {getKey} from "@/utils"

const treeGeometry = new THREE.ConeGeometry(0.2, 1, 8)
const treeMaterial = new THREE.MeshStandardMaterial({
  color: 0x305010,
  flatShading: true
})

export default class Tree extends GameObject{
  /**
   * @param coords
   */
  constructor(coords) {
    super(coords, treeGeometry, treeMaterial)

    this.name = `Tree ${getKey(coords)}`

    this.position.set (
      coords.x + .5,
      coords.y + .5,
      coords.z + .5
    )
  }
}