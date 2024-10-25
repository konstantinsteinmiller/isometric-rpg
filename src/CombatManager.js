export default class CombatManager {
  /** @type {Player[]} */
  players = []

  // /**
  //  * @param {Player} player
  //  */
  // constructor(players) {
  //   this.players = players
  // }

  /**
   * get players initiative and add them to the array of players
   * @param {Player} player
   */
  addPlayer(player) {
    this.players.push(player)
  }

  /**
   * Main combat loop
   */
  async takeTurns() {
    while (true) {
      for(const player of this.players) {
        let isActionPerformed = false

        do {
          const action = await player.requestAction()

          if (await action.canPerform()) {
            /* wait for the player to finish performing their action */
            await action.perform()
            isActionPerformed = true
          }
          else {
            alert('cant perform action, pick another action')
          }
        } while (!isActionPerformed)
      }
    }
    // this.players.sort((a, b) => a.initiative - b.initiative)
    // this.players.forEach(player => player.takeTurn())
  }
}