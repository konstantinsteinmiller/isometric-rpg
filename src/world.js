import * as THREE from 'three'
import {getKey} from "@/utils"
import Bush from "@/objects/Bush"
import Tree from "@/objects/Tree"
import Rock from "@/objects/Rock"

const textureLoader = new THREE.TextureLoader()
const gridTexture = textureLoader.load('assets/textures/grid.png')

export default class World extends THREE.Group {
  #objectMap = new Map()

  constructor(width, height) {
    super()
    window.world = this
    this.width = width
    this.height = height
    this.treeCount = 10
    this.rockCount = 20
    this.bushCount = 10

    this.trees = new THREE.Group()
    this.add(this.trees)

    this.rocks = new THREE.Group()
    this.add(this.rocks)

    this.bushes = new THREE.Group()
    this.add(this.bushes)

    this.path = new THREE.Group()
    this.add(this.path)

    this.generate()
    scene?.add(this)
  }

  generate() {
    this.clear()
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
    window.terrain = this.terrain
  }

  createTrees() {
    this.trees.clear()

    for (let i = 0; i < this.treeCount; i++) {
      const coords = new THREE.Vector3(
        Math.floor(this.width * Math.random()),
        0,
        Math.floor(this.height * Math.random())
      )
      this.addObject(new Tree(coords), coords, this.trees)
    }
  }

  createRocks() {
    this.rocks.clear()

    for (let i = 0; i < this.rockCount; i++) {
      const coords = new THREE.Vector3(
        Math.floor(this.width * Math.random()),
        0,
        Math.floor(this.height * Math.random())
      )
      this.addObject(new Rock(coords), coords, this.rocks)
    }
  }

  createBushes() {
    this.bushes.clear()

    for (let i = 0; i < this.bushCount; i++) {
      const coords = new THREE.Vector3(
        Math.floor(this.width * Math.random()),
        0,
        Math.floor(this.height * Math.random())
      )
      this.addObject(new Bush(coords), coords, this.bushes)
    }
  }

  /**
   * Add an object to the world at the given coordinates unless
   * there is already an object those coordinates
   * @param object
   * @param {THREE.Vector3} coords
   * @param {THREE.Group} group
   * @returns {boolean}
   */
  addObject(object, coords, group) {
    // don't place objects on top of each others
    if (this.#objectMap.has(getKey(coords))) {
      return false
    }
    group.add(object)
    this.#objectMap.set(getKey(coords), object)
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