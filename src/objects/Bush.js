import * as THREE from 'three'
import GameObject from './GameObject'
import {getKey} from "@/utils"

const bushMaterial = new THREE.MeshStandardMaterial({
  color: 0x80a040,
  flatShading: true
})
const bushGeometry = new THREE.SphereGeometry(1, 6, 5)

export default class Bush extends GameObject {
  minBushRadius = 0.1
  maxBushRadius = 0.3
  // minBushHeight = 0.5
  // maxBushHeight = 0.8
  /**
   * @param coords
   */
  constructor(coords) {
    super(coords, bushGeometry, bushMaterial)

    this.name = `Bush ${getKey(coords)}`
    const radius = this.minBushRadius + Math.random() * (this.maxBushRadius - this.minBushRadius)
    // const height = this.minBushHeight + Math.random() * (this.maxBushHeight - this.minBushHeight)

    this.scale.set(radius, radius, radius)
    this.position.set (
      coords.x + .5,
      coords.y + radius,
      coords.z + .5
    )
  }
}