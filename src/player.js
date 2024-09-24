import * as THREE from 'three'
import {search} from './pathfinding'

export default class Player extends THREE.Mesh {
  /** @type {THREE.Raycaster} */
  raycaster = new THREE.Raycaster()
  path = []
  pathIndex = -1
  pathUpdaterTimer = null

  constructor(world) {
    super();
    this.world = world
    this.geometry = new THREE.CapsuleGeometry(.25, .5)
    this.material = new THREE.MeshStandardMaterial({ color: 0x4040c0 })
    this.position.set(5.5, 0.5, 5.5)
    scene?.add(this)

    window.addEventListener('mousedown', this.onMouseDown.bind(this))
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
      // console.log('intersectee: ', intersectee)
      const playerCoords = new THREE.Vector2(
        Math.floor(this.position.x),
        Math.floor(this.position.z)
      )
      const selectedCoords = new THREE.Vector2(
        Math.floor(intersectee.point.x),
        Math.floor(intersectee.point.z)
      )

      //
      clearInterval(this.pathUpdaterTimer)
      this.pathIndex = -1

      // find path from players current position to selected square
      this.path = search(playerCoords, selectedCoords, world)
      console.log('path: ', this.path)

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
        node.position.set(coords.x + 0.5, 0, coords.y + 0.5)
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
    this.position.set(
      currPos.x + 0.5,
      0.5,
      currPos.y + 0.5,
    )
  }
}

