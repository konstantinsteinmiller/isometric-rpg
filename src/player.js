import * as THREE from 'three'
import {search} from './pathfinding'
import GameObject from "@/objects/GameObject"

const geometry = new THREE.CapsuleGeometry(.25, .5)
const material = new THREE.MeshStandardMaterial({ color: 0x4040c0 })

export default class Player extends GameObject {
  /** @type {THREE.Raycaster} */
  raycaster = new THREE.Raycaster()
  path = []
  pathIndex = -1
  pathUpdaterTimer = null

  /**
   * @param {THREE.Vector3} coords
   * @param {World} world
   */
  constructor(coords, world) {
    super(coords, geometry, material);

    this.moveTo(coords)

    this.world = world
    scene?.add(this)

    window.addEventListener('mousedown', this.onMouseDown.bind(this))
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

  /* @params {MouseEvent} event */
  onMouseDown(event) {
    const coords = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      - (event.clientY / window.innerHeight) * 2 + 1
    );

    this.raycaster.setFromCamera(coords, camera)
    const intersectionsList = this.raycaster.intersectObject(terrain)


    intersectionsList.some((intersectee) => {
      // intersectee.object.material.color.set(0xff0000)
      const playerCoords = new THREE.Vector3(
        Math.floor(this.position.x),
        Math.floor(this.position.y),
        Math.floor(this.position.z)
      )
      const selectedCoords = new THREE.Vector3(
        Math.floor(intersectee.point.x),
        0,
        Math.floor(intersectee.point.z)
      )

      //
      clearInterval(this.pathUpdaterTimer)
      this.pathIndex = -1

      // find path from players current position to selected square
      this.path = search(playerCoords, selectedCoords, world)
      // console.log('path: ', this.path)

      /* if no path found return early */
      if (this.path === null || this.path.length === 0) return
      /*
       * DEBUG: Show Path bread crumbs
       */
      this.world.path.clear()
      this.path.forEach(coords => {
        const node = new THREE.Mesh(
          new THREE.SphereGeometry(0.1),
          new THREE.MeshBasicMaterial({ color: 0xff0000 })
        )
        node.position.set(coords.x + 0.5, 0, coords.z + 0.5)
        world.path.add(node)
      })

      /* move player */
      this.pathUpdaterTimer = setInterval(this.updatePosition.bind(this), 500)

      return intersectee
    })
  }
  updatePosition() {
    if (this.pathIndex === this.path.length - 1) {
      clearInterval(this.pathUpdaterTimer)
      return
    }
    const currPos = this.path[++this.pathIndex]
    this.moveTo(currPos)
  }
}

