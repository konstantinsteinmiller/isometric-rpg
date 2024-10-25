import * as THREE from 'three'

export default class GameObject extends THREE.Mesh{
    /**
     * @type {THREE.Vector3}
     */
  coords

  /**
   * @param coords
   * @param {THREE.BufferGeometry} geometry
   * @param {THREE.Material} material
   */
  constructor(coords, geometry, material) {
    super(geometry, material)
    this.coords = coords
  }

  /**
   * Moves the player to the coordinates
   * @param {THREE.Vector3} coords
   */
  moveTo(coords) {
    this.coords = coords
    this.position.set(
      this.coords.x + .5,
      this.coords.y + .5,
      this.coords.z + .5
    )
  }
}