import * as THREE from 'three'
import {getKey} from "@/utils"
import Bush from "@/objects/Bush"
import Tree from "@/objects/Tree"
import Rock from "@/objects/Rock"
import HumanPlayer from "@//players/HumanPlayer";

const textureLoader = new THREE.TextureLoader()
const gridTexture = textureLoader.load('assets/textures/grid.png')

export default class World extends THREE.Group {
  #objectMap = new Map()

  constructor(width, height) {
    super()
    window.world = this
    this.width = width
    this.height = height
    this.treeCount = 50
    this.rockCount = 50
    this.bushCount = 50

    this.objects = new THREE.Group()
    this.add(this.objects)

    this.players = new THREE.Group()
    this.objects.add(this.players)

    this.props = new THREE.Group()
    this.objects.add(this.props)

    this.path = new THREE.Group()
    this.add(this.path)

    this.generate()
    scene?.add(this)
  }

  generate() {
    this.clear()

    // const player1 = new HumanPlayer(new THREE.Vector3(5, 0, 5), 'Player 1')
    // const player2 = new HumanPlayer(new THREE.Vector3(1, 0, 2), 'Player 2')
    const player1 = new HumanPlayer(new THREE.Vector3(1, 0, 5), 'Player 1')
    const player2 = new HumanPlayer(new THREE.Vector3(8, 0, 3), 'Player 2')
    this.addObject(player1, 'players')
    this.addObject(player2, 'players')

    this.createTerrain()
    this.createTrees()
    this.createRocks()
    this.createBushes()
  }

  clear() {
    if ( this.terrain) {
      this.terrain.geometry.dispose()
      this.terrain.material.dispose()
      this.remove(this.terrain)
    }

    // this.objects.clear()
    this.players.clear()
    this.props.clear()
    this.#objectMap.clear()
  }

  createTerrain() {
    gridTexture.repeat = new THREE.Vector2(this.width, this.height)
    gridTexture.wrapS = THREE.RepeatWrapping
    gridTexture.wrapT = THREE.RepeatWrapping
    gridTexture.colorSpace = THREE.SRGBColorSpace

    const terrainGeometry = new THREE.PlaneGeometry(
      this.width,
      this.height,
      this.width,
      this.height
    )
    const terrainMaterial = new THREE.MeshStandardMaterial({
      // color:'#50a000',
      map: gridTexture
      // wireframe: true
    })
    this.terrain = new THREE.Mesh(terrainGeometry, terrainMaterial)
    this.terrain.rotation.x = -Math.PI / 2
    this.terrain.position.set(this.width /2, 0, this.height/2)
    this.terrain.name = 'Terrain'
    this.add(this.terrain)
  }

  createTrees() {
    for (let i = 0; i < this.treeCount; i++) {
      const coords = new THREE.Vector3(
        Math.floor(this.width * Math.random()),
        0,
        Math.floor(this.height * Math.random())
      )
      this.addObject(new Tree(coords), 'props')
    }
  }

  createRocks() {
    for (let i = 0; i < this.rockCount; i++) {
      const coords = new THREE.Vector3(
        Math.floor(this.width * Math.random()),
        0,
        Math.floor(this.height * Math.random())
      )
      this.addObject(new Rock(coords), 'props')
    }
  }

  createBushes() {
    for (let i = 0; i < this.bushCount; i++) {
      const coords = new THREE.Vector3(
        Math.floor(this.width * Math.random()),
        0,
        Math.floor(this.height * Math.random())
      )
      this.addObject(new Bush(coords), 'props')
    }
  }

  /**
   * Add an object to the world at the given coordinates unless
   * there is already an object those coordinates
   * @param object
   * @param { 'players' | 'props' } group
   * @returns {boolean}
   */
  addObject(object, group) {
    // don't place objects on top of each others
    if (this.#objectMap.has(getKey(object.coords))) {
      return false
    }
    switch (group) {
      case 'players':
        this.players.add(object)
        break
      case 'props':
        this.props.add(object)
        break
    }

    object.onMove = (object, oldCoords, newCoords) => {
      this.#objectMap.delete(getKey(oldCoords))
      this.#objectMap.set(getKey(newCoords), object)
    }
    object.onDestroy = (object) => {
      this.#objectMap.delete(getKey(object.coords))
      object.removeFromParent()
    }

    this.#objectMap.set(getKey(object.coords), object)
    return true
  }

  /** return the object at coords if one exists, otherwise return null
   * @param {THREE.Vector2} coords
   * @returns {object|null}
   */
  getObject(coords) {
    return this.#objectMap.get(getKey(coords)) ?? null
  }
}