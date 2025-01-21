import * as THREE from 'three'
import {createTextMaterial} from "@//utils";

export default class GameObject extends THREE.Group {
  /**
   * @type {THREE.Vector3}
   */
  coords

  /**
   * @type {THREE.Mesh}
   */
  mesh

  /**
   * @type {number}
   */
  hp = 10

  /**
   * @type {number}
   */
  maxHp = 10

  /**
   * @type {THREE.Sprite}
   */
  healthOverlay = null

  /**
   * @param {GameObject} object
   * @param {THREE.Vector3} oldCoords
   * @param {THREE.Vector3} newCoords
   */
  onMove = (object, oldCoords, newCoords) => {}

  /** The object is being destroyed
   * @param {GameObject} object
   */
  onDestroy = (object) => {}
  /**
   * @param coords
   * @param {THREE.Mesh} mesh
   */
  constructor(coords, mesh) {
    super()
    this.coords = coords
    this.position.copy(coords)

    this.mesh = mesh
    this.add(mesh)

    this.healthOverlay = new THREE.Sprite()
    this.healthOverlay.position.set(0.5, 1.2, 0.5);
    this.healthOverlay.visible = false;
    // this.healthOverlay.layers.set(1);
    this.add(this.healthOverlay)

    this.updateHpOverlay()
  }

  /**
   * @param {number} damage
   */
  get isDead() {
    return this.hp === 0
  }

  /** Destroy the object
   */
  destroy() {
    this.healthOverlay.material.dispose()
    this?.onDestroy?.(this)
  }
  /**
   * @param {number} damage
   */
  dealDamage(damage) {
    this.hp = this.hp >= damage ? this.hp - damage : 0

    if (this.hp === 0) {
      this.destroy()
    }

    this.updateHpOverlay()
  }

  /**
   * Moves the player to the coordinates
   * @param {THREE.Vector3} coords
   */
  moveTo(coords) {
    const oldCoords = this.coords.clone()
    this.coords = coords
    this.position.copy(coords)

    this?.onMove?.(this, oldCoords, coords)
  }

  updateHpOverlay() {
    if (this.healthOverlay.material) {
      this.healthOverlay.material.dispose()
    }
    this.healthOverlay.material = createTextMaterial(`${this.hp}/${this.maxHp}`)
  }
}