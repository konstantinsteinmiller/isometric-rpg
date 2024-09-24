import * as THREE from 'three'
import { getKey } from "@/pathfinding";

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

    if (this.trees) {
      this.trees.children.forEach((tree) => {
        tree.geometry?.dispose()
        tree.material?.dispose()
        // this.remove()
      })
    }

    if (this.rocks) {
      this.rocks.children.forEach((rock) => {
        rock.geometry?.dispose()
        rock.material?.dispose()
      })
    }

    if (this.bushes) {
      this.bushes.children.forEach((bush) => {
        bush.geometry?.dispose()
        bush.material?.dispose()
      })
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
    const treeRadius = 0.2
    const treeHeight = 1
    const treeGeometry = new THREE.ConeGeometry(treeRadius, treeHeight, 8)
    const treeMaterial = new THREE.MeshStandardMaterial({
      color: 0x305010,
      flatShading: true
    })

    this.trees.clear()

    for (let i = 0; i < this.treeCount; i++) {
      const coords = new THREE.Vector2(
        Math.floor(this.width * Math.random()),
        Math.floor(this.height * Math.random())
      )

      // don't place objects on top of each others
      if (this.#objectMap.has(getKey(coords))) continue

      const treeMesh = new THREE.Mesh(treeGeometry, treeMaterial)

      treeMesh.position.set (
        coords.x + .5,
        treeHeight / 2,
        coords.y + .5
      )
      this.#objectMap.set(getKey(coords), treeMesh)
      treeMesh.name = `Tree ${getKey(coords)}`
      this.trees.add(treeMesh)
    }
  }

  createRocks() {
    const minRockRadius = 0.1
    const maxRockRadius = 0.3
    const minRockHeight = 0.5
    const maxRockHeight = 0.8
    const rockMaterial = new THREE.MeshStandardMaterial({
      color: 0xb0b0b0,
      flatShading: true
    })

    this.rocks.clear()

    for (let i = 0; i < this.rockCount; i++) {
      const radius = minRockRadius + Math.random() * (maxRockRadius - minRockRadius)
      const height = minRockHeight + Math.random() * (maxRockHeight - minRockHeight)
      const rockGeometry = new THREE.SphereGeometry(radius, 6, 5)

      const coords = new THREE.Vector2(
        Math.floor(this.width * Math.random()),
        Math.floor(this.height * Math.random())
      )

      // don't place objects on top of each others
      if (this.#objectMap.has(`${coords.x}-${coords.y}`)) continue

      const rockMesh = new THREE.Mesh(rockGeometry, rockMaterial)

      rockMesh.position.set (
        coords.x + .5,
        0,
        coords.y + .5
      )
      this.#objectMap.set(getKey(coords), rockMesh)
      rockMesh.name = `Rock ${getKey(coords)}`
      rockMesh.scale.y = height
      this.rocks.add(rockMesh)
    }
  }

  createBushes() {
    const minBushRadius = 0.1
    const maxBushRadius = 0.3
    const minBushHeight = 0.5
    const maxBushHeight = 0.8
    const bushMaterial = new THREE.MeshStandardMaterial({
      color: 0x80a040,
      flatShading: true
    })


    this.bushes.clear()

    for (let i = 0; i < this.bushCount; i++) {
      const radius = minBushRadius + Math.random() * (maxBushRadius - minBushRadius)
      const height = minBushHeight + Math.random() * (maxBushHeight - minBushHeight)
      const bushGeometry = new THREE.SphereGeometry(radius, 6, 5)

      const coords = new THREE.Vector2(
        Math.floor(this.width * Math.random()),
        Math.floor(this.height * Math.random())
      )

      // don't place objects on top of each others
      if (this.#objectMap.has(`${coords.x}-${coords.y}`)) continue

      const bushMesh = new THREE.Mesh(bushGeometry, bushMaterial)

      bushMesh.position.set (
        coords.x + .5,
        radius,
        coords.y + .5
      )
      this.#objectMap.set(getKey(coords), bushMesh)
      bushMesh.name = `Bush ${getKey(coords)}`
      this.bushes.add(bushMesh)
    }
  }

  /** return the object at coords if one exists, otherwise return null
   * @param {Vector2} coords
   * @returns {object|null}
   */
  getObject(coords) {
    return this.#objectMap.get(getKey(coords)) ?? null
  }
}