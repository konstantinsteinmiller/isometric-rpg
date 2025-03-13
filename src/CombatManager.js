import * as THREE from 'three'
import {updateStatusText} from "@//utils";

export default class CombatManager {
  /** @type {Player[]} */
  players = []

  /**
   * Main combat loop
   */
  async takeTurns() {
    while (true) {
      // console.log('world.players.children: ', world.players.children)
      for(const player of world.players.children) {
        if (player.isDead) continue

        let isActionPerformed = false

        updateStatusText(`Waiting for ${player.name} to select an action`)

        player.mesh.material.color = new THREE.Color(0xffff00)
        do {
          const action = await player.requestAction()

          const { value, reason } = await action.canPerform()
          if (value) {
            /* wait for the player to finish performing their action */
            await action.perform()
            isActionPerformed = true
          }
          else {
            console.error(reason)
            updateStatusText(reason)
          }
        } while (!isActionPerformed)
        player.mesh.material.color = new THREE.Color(0x0000ff)
      }
    }
    // this.players.sort((a, b) => a.initiative - b.initiative)
    // this.players.forEach(player => player.takeTurn())
  }
}