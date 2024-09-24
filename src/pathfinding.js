import * as THREE from 'three'

/* return the key for a set of given coords */
export const getKey = (coords) => `${coords.x}-${coords.y}`

/**
 * @param {THREE.Vector2} coords
 * @param {world} world
 * @param {Set} visitedSet
 */
export const getNeighbors = (coords, world, visitedSet) => {
  const neighborsList = []

  // Up
  if (coords.y > 0) {
    neighborsList.push(new THREE.Vector2(coords.x, coords.y - 1))
  }
  // Left
  if (coords.x > 0) {
    neighborsList.push(new THREE.Vector2(coords.x - 1, coords.y))
  }
  // Down
  if (coords.y < world.width - 1) {
    neighborsList.push(new THREE.Vector2(coords.x, coords.y + 1))
  }
  // Right
  if (coords.x < world.width - 1) {
    neighborsList.push(new THREE.Vector2(coords.x + 1, coords.y))
  }

  /* exclude already visited squares */
  return neighborsList
    .filter(neighborCoords => !visitedSet.has(getKey(neighborCoords)))
}

/**
 * @param {THREE.Vector2} start
 * @param {THREE.Vector2} end
 * @param {world} world
 */
export const search = (start, end, world) => {
  const o = world.getObject(start)

  // if the end is equal to the start, stop searching
  if (start.x === end.x && start.y === end.y) return []

  console.log(`Searching for the path from (${start.x},${start.y}) to (${end.x},${end.y})`)

  const frontierList = [start]
  const visitedSet = new Set()
  const maxSearchDistance = 20
  let isEndFound = false
  while(frontierList.length > 0) {
    // Get the square with the shortest distance metric
    // Dijkstra - distance to origin
    // A* - distance to origin + estimated distance to destination
    frontierList.sort((v1, v2) => {
      const d1 = start.manhattanDistanceTo(v1)
      const d2 = start.manhattanDistanceTo(v2)

      return d1 - d2
    })
    const candidate = frontierList.shift()
    // console.log('candidate: ', candidate)

    // did we find the end square?
    if (candidate.x === end.x && candidate.y === end.y) {
      console.log("found the end")
      break
    }
    visitedSet.add(getKey(candidate))

    if (candidate.manhattanDistanceTo(start) > maxSearchDistance) {
      continue
    }

    // search the neighbors of the square
    const neighbors = getNeighbors(candidate, world, visitedSet)
    frontierList.push(...neighbors)
    // console.log('neighbors: ', neighbors)
  }
}