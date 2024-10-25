import * as THREE from 'three'
import GameObject from "@/objects/GameObject"

const geometry = new THREE.CapsuleGeometry(.25, .5)
const material = new THREE.MeshStandardMaterial({ color: 0x4040c0 })

/* Base Player class that Human Player derives from */
export default class Player extends GameObject {
  name = 'Player'

  /**
   * @param {THREE.Vector3} coords
   */
  constructor(coords/*, world */) {
    super(coords, geometry, material);

    this.moveTo(coords)
    scene?.add(this)

    // window.addEventListener('mousedown', this.onMouseDown.bind(this))
  }

  /** Wait for the player to choose a target square
   * @returns {Promise<THREE.Vector3> | null}
   */
  async getTargetSquare() {
    return null
  }

  /** Wait for the player to choose a target Object
   * @returns {Promise<GameObject> | null}
   */
  async getTargetObject() {
    return null
  }

  /** Wait for the player to select an action to perform
   * @returns {Promise<Action> | null}
   */
  async requestAction() {
    return null
  }
}

