import Player from "@/players/Player";
import * as THREE from "three";
import {updateStatusText} from "@//utils";

export default class HumanPlayer extends Player {
  name = 'Human Player'

  /** @type {THREE.Raycaster} */
  raycaster = new THREE.Raycaster()

  /**
   * @param {THREE.Vector3} coords
   */
  constructor(coords, name) {
    super(coords);
    this.name = name
    this.raycaster.layers.disable(1)

    // window.addEventListener('mousedown', this.onMouseDown.bind(this))
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

  /** Wait for the player to select an action to perform
   * @returns {Promise<Action> | null}
   */
  async requestAction() {
    const $actionsContainer =  document.querySelector('.actions')
    $actionsContainer.innerHTML = ''
    const actions = this.getActions()

    return new Promise((resolve, reject) => {
      actions.forEach((action) => {
        const button = document.createElement('button')
        button.dataset.action = action.name
        button.innerText = action.name + ' ('+action.name[0].toLowerCase()+')'
        const onAction = (evt) => {
          if ((evt?.key?.toLowerCase() === 'm' && action.name === 'Move') ||
            (evt?.key?.toLowerCase() === 'w' && action.name === 'Wait') ||
            (evt?.key?.toLowerCase() === 'f' && action.name === 'Melee Attack') ||
            (evt?.key?.toLowerCase() === 'r' && action.name === 'Ranged Attack')) {
            // if (evt?.key?.toLowerCase() === 'm' && action.name === 'Move') {
            //   updateStatusText(`Waiting for ${this.name} to select a square`)
            // } else {
            // }
            resolve(action)
          } else if(!evt.key && action.name === button.dataset.action) {
            // if (button.dataset.action === 'Move') {
            //   updateStatusText(`Waiting for ${this.name} to select a square`)
            // } else {
            //   updateStatusText(`Waiting for ${this.name} to select an object`)
            // }
            resolve(action)
          }
        }
        button.addEventListener('click', onAction)
        document.addEventListener('keydown', onAction)
        $actionsContainer.appendChild(button)
      })
    })
  }
}