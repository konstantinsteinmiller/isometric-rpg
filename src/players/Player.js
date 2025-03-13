import * as THREE from 'three'
import GameObject from "@/objects/GameObject"
import {MeleeAttackAction, MovementAction, RangedAttackAction, WaitAction} from "@/actions"

const geometry = new THREE.CapsuleGeometry(.25, .5)
let material = null

/* Base Player class that Human Player derives from */
export default class Player extends GameObject {
  name = 'Player'

  destructor() {
    material.dispose()
  }
  /**
   * @param {THREE.Vector3} coords
   */
  constructor(coords) {
    material = new THREE.MeshStandardMaterial({ color: 0x4040c0 })
    const playerMesh = new THREE.Mesh(geometry, material)
    playerMesh.position.set(0.5, 0.5, 0.5);

    super(coords, playerMesh)

    this.healthOverlay.visible = true

    this.moveTo(coords)
  }

  /**
   * @returns {Action[] | null}
   */
  getActions() {
    return [
      new MovementAction(this),
      new MeleeAttackAction(this),
      new RangedAttackAction(this),
      new WaitAction(this)
    ]
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

