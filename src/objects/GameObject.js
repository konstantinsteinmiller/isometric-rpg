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
}