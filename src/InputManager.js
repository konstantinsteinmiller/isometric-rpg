import * as THREE from "three";
import {updateStatusText} from "@/utils";

class InputManager {
  /** @type {THREE.Raycaster} */
  raycaster = new THREE.Raycaster()
  camera = null
  world = null

  constructor() {
    this.raycaster.layers.disable(1)
  }

  init = (camera, world) => {
    this.camera = camera
    this.world = world
  }

  /** Wait for the player to choose a target square
   * @returns {Promise<THREE.Vector3> | null}
   */
  async getTargetSquare() {
    updateStatusText(`Select a target square`)
    return new Promise((resolve, reject) => {

      /** Event handler when user clicks on the screen
       * @param {MouseEvent} event */
      const onMouseDown = (event) => {
        const coords = new THREE.Vector2(
          (event.clientX / window.innerWidth) * 2 - 1,
          - (event.clientY / window.innerHeight) * 2 + 1
        );

        this.raycaster.setFromCamera(coords, camera)
        const intersectionsList = this.raycaster.intersectObject(world.terrain)

        intersectionsList.some((intersectee) => {
          const selectedCoords = new THREE.Vector3(
            Math.floor(intersectee.point.x),
            0,
            Math.floor(intersectee.point.z)
          )

          window.removeEventListener('mousedown', onMouseDown)
          resolve(selectedCoords)
          return true
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
    updateStatusText(`Select a target`)
    return new Promise((resolve, reject) => {

      /** Event handler when user clicks on the screen
       * @param {MouseEvent} event */
      const onMouseDown = (event) => {
        const coords = new THREE.Vector2(
          (event.clientX / window.innerWidth) * 2 - 1,
          - (event.clientY / window.innerHeight) * 2 + 1
        );

        this.raycaster.setFromCamera(coords, camera)
        const intersectionsList = this.raycaster.intersectObject(world.objects, true)

        // console.log('intersectionsList: ', intersectionsList)
        intersectionsList.some((intersectee) => {
          /* the intersection with the world is happening with the mesh
          the parent of the mesh is the GameObject */
          window.removeEventListener('mousedown', onMouseDown)
          resolve(intersectee.object?.parent)
          return intersectee.object
        })
      }
      onMouseDown.bind(this)

      /* wait for player to select an object */
      window.addEventListener('mousedown', onMouseDown)
    })
  }
}

const inputManager = new InputManager()
export default inputManager