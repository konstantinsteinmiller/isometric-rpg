import * as THREE from "three"
import {search} from '@/pathfinding'
import Action from "@/actions/Action"
import {updateStatusText} from "@//utils";


const pathBreadcrumb = new THREE.Mesh(
  new THREE.SphereGeometry(0.1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
const MOVEMENT_SPEED = 200

export default class MovementAction extends Action {
  name = 'Move'
  path = []
  pathIndex = -1
  pathUpdaterTimer = null

  /**
   * @param {Player} source
   */
  constructor(source) {
    super(source)
  }

  /** perform the action
   */
  async perform() {
    return new Promise((resolve, reject) => {
      const updateSourcePosition = () => {
        /* if we reached the end of the path, then stop the movement update interval
        * clear the path and resolve the action to unblock combat manager */
        if (this.pathIndex === this.path.length - 1) {
          clearInterval(this.pathUpdaterTimer)
          world.path.clear()
          resolve()
        } else {
          /* otherwise move source object to next path node */
          const currPos = this.path[++this.pathIndex]
          this.source.moveTo(currPos)
        }
      }

      console.log('Movement Action performed')

      clearInterval(this.pathUpdaterTimer)
      updateStatusText('Moving...')
      /* DEBUG: show path breadcrumbs in the world
       */
      this.path.forEach(coords => {
        const node = pathBreadcrumb.clone()
        node.position.set(coords.x + 0.5, 0, coords.z + 0.5)
        world.path.add(node)
      })

      /* move player */
      this.pathUpdaterTimer = setInterval(updateSourcePosition.bind(this), MOVEMENT_SPEED)
    })
  }

  /**
   * @returns Promise<{boolean}>
   */
  async canPerform() {
    // intersectee.object.material.color.set(0xff0000)
    const selectedCoords = await this.source.getTargetSquare()

    console.log('selectedCoords: ', selectedCoords.x, selectedCoords.y, selectedCoords.z)
    world.path.clear()
    this.pathIndex = -1

    // find path from players current position to selected square
    this.path = search(
      this.source.coords,
      selectedCoords,
      world
    )
    // console.log('path: ', this.path)

    if (this.path === null || this.path.length === 0) {
      return Promise.resolve({ value: false, reason: 'Could not find path to target square' })
    }
    // if (this.path.length === 0) {
    //   return Promise.resolve({ value: false, reason: 'Pick square other than starting square' })
    // }
    return Promise.resolve({ value: true })
  }
}