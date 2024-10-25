import * as THREE from 'three'
import World from '@/world'
import {getKey} from "@/utils"

/* return the key for a set of given coords */
const costMap = new Map()
const cameFromMap = new Map()

/**
 * @param {THREE.Vector3} coords
 * @param {World} world
 * @param {Map} costMap
 */
export const getNeighbors = (coords, world, costMap) => {
  const neighborsList = []

  // Up
  if (coords.z > 0) {
    neighborsList.push(new THREE.Vector3(coords.x, 0, coords.z - 1))
  }
  // Left
  if (coords.x > 0) {
    neighborsList.push(new THREE.Vector3(coords.x - 1, 0, coords.z))
  }
  // Down
  if (coords.z < world.width - 1) {
    neighborsList.push(new THREE.Vector3(coords.x, 0, coords.z + 1))
  }
  // Right
  if (coords.x < world.width - 1) {
    neighborsList.push(new THREE.Vector3(coords.x + 1, 0, coords.z))
  }


  // cost to get to neighbor square
  const newCost  = costMap.get(getKey(coords)) + 1
  /* exclude already visited squares and blocked squares */
  return neighborsList
    .filter(neighborCoords => {
      // if square has not been visited yet or newCost is cheaper path cost, include
      if (!costMap.has(getKey(neighborCoords)) || newCost < costMap.get(getKey(neighborCoords))) {
        costMap.set(getKey(neighborCoords), newCost)
        return true
      }
      return false
    })
    .filter(neighborCoords => !world.getObject(neighborCoords))
}

/**
 * @param {THREE.Vector3} start
 * @param {THREE.Vector3} end
 * @param {World} world
 * @returns {THREE.Vector3[] | null} if path is found, returns the list of coords,
 * otherwise null
 */
export const search = (start, end, world) => {
  const o = world.getObject(start)

  // if the end is equal to the start, stop searching
  if (start.equals(end)) return []

  console.log(`Searching for the path from (${start.x},${start.z}) to (${end.x},${end.z})`)

  let isPathFound = false
  const frontierList = [start]
  costMap.clear()
  cameFromMap.clear()
  const maxSearchDistance = 20
  let isEndFound = false
  let counter = 0

  costMap.set(getKey(start), 0)

  while(frontierList.length > 0) {
    // Get the square with the shortest distance metric
    // Dijkstra - distance to origin
    // A* - distance to origin + estimated distance to destination
    frontierList.sort((v1, v2) => {
      const g1 = start.manhattanDistanceTo(v1)
      const g2 = start.manhattanDistanceTo(v2)
      const h1 = v1.manhattanDistanceTo(end)
      const h2 = v2.manhattanDistanceTo(end)
      const f1 = g1 + h1
      const f2 = g2 + h2

      return f1 - f2
    })
    counter++
    const candidate = frontierList.shift()
    // console.log('candidate: ', candidate)

    // did we find the end square?
    if (candidate.equals(end)) {
      isPathFound = true
      console.log(`found the end: ${counter} candidates visited`)
      break
    }

    if (candidate.manhattanDistanceTo(start) > maxSearchDistance) {
      continue
    }

    // search the neighbors of the square
    const neighbors = getNeighbors(candidate, world, costMap)
    neighbors.forEach(neighborCoords => {
      cameFromMap.set(getKey(neighborCoords), candidate)
    })
    frontierList.push(...neighbors)
  }

  if (!isPathFound) null

  let curr = end
  const path = [curr]

  try {
    while(getKey(curr) !== getKey(start)) {
      const prev = cameFromMap.get(getKey(curr))
      path.push(prev)
      curr = prev
    }
    path.reverse()
    path.shift()
  } catch (e) {
    // console.error('No path found', e)
    return []
  }

  // console.log('counter: ', counter)
  return path
}