import * as THREE from 'three'

export default class Player extends THREE.Mesh {
  /** @type {THREE.Raycaster} */
  raycaster = new THREE.Raycaster()
  constructor() {
    super();
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
    const intersectionsList = this.raycaster.intersectObjects([terrain])


    intersectionsList.some((intersectee) => {
      // intersectee.object.material.color.set(0xff0000)
      console.log('intersectee: ', intersectee)
      this.position.set(
        Math.floor(intersectee.point.x) + 0.5,
        0.5,
        Math.floor(intersectee.point.z) + 0.5,
      )
      return intersectee
    })
  }
}

