import Player from "@/players/Player";
import * as THREE from "three";
import MovementAction from "@//actions/MovementAction";

const geometry = new THREE.CapsuleGeometry(.25, .5)
const material = new THREE.MeshStandardMaterial({ color: 0x4040c0 })

export default class HumanPlayer extends Player {
  name = 'Human Player'

  /** @type {THREE.Raycaster} */
  raycaster = new THREE.Raycaster()

  /**
   * @param {THREE.Vector3} coords
   */
  constructor(coords) {
    super(coords, geometry, material);

    // window.addEventListener('mousedown', this.onMouseDown.bind(this))
  }

  /** Wait for the player to choose a target square
   * @returns {Promise<THREE.Vector3> | null}
   */
  async getTargetSquare() {
    return new Promise((resolve, reject) => {

      /** Event handler when user clicks on the screen
       * @param {MouseEvent} event */
      const onMouseDown = (event) => {
        const coords = new THREE.Vector2(
          (event.clientX / window.innerWidth) * 2 - 1,
          - (event.clientY / window.innerHeight) * 2 + 1
        );

        this.raycaster.setFromCamera(coords, camera)
        const intersectionsList = this.raycaster.intersectObject(terrain)

        intersectionsList.some((intersectee) => {
          const selectedCoords = new THREE.Vector3(
            Math.floor(intersectee.point.x),
            0,
            Math.floor(intersectee.point.z)
          )

          window.removeEventListener('mousedown', onMouseDown)
          resolve(selectedCoords)
        })
      }
      onMouseDown.bind(this)

      /* wait for player to select a square */
      console.log("Waiting for player to select a square")
      window.addEventListener('mousedown', onMouseDown)
    })

  }

  /** Wait for the player to choose a target Object
   * @returns {Promise<GameObject> | null}
   */
  async getTargetObject() {
    return new Promise((resolve, reject) => {

    })
  }

  /** Wait for the player to select an action to perform
   * @returns {Promise<Action> | null}
   */
  async requestAction() {
    console.log('Requesting action...')
    const selectedAction = new MovementAction(this)
    console.log(`Player ${this.name} selected action ${selectedAction.name}`)
    return selectedAction
  }
}