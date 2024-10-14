import * as THREE from 'three'
import GameObject from './GameObject'
import {getKey} from "@/utils"

const rockGeometry = new THREE.SphereGeometry(1, 1, 5)
const rockMaterial = new THREE.MeshStandardMaterial({
  color: 0xb0b0b0,
  flatShading: true
})

export default class Rock extends GameObject{
  minRockRadius = 0.1
  maxRockRadius = 0.3
  minRockHeight = 0.5
  maxRockHeight = 0.8
  /**
   * @param coords
   */
  constructor(coords) {
    super(coords, rockGeometry, rockMaterial)

    this.name = `Rock ${getKey(coords)}`
    const radius = this.minRockRadius + Math.random() * (this.maxRockRadius - this.minRockRadius)
    const height = this.minRockHeight + Math.random() * (this.maxRockHeight - this.minRockHeight)

    this.position.set (
      coords.x + .5,
      coords.y + height / 4,
      coords.z + .5
    )
    this.scale.set(radius, height, radius)
  }
}