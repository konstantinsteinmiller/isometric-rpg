import * as THREE from 'three'

/**
 * Gets the map position as string
 * @param {THREE.Vector3} coords
 * @returns {string}
 */
export const getKey = (coords) => `${coords.x}-${coords.y}-${coords.z}`