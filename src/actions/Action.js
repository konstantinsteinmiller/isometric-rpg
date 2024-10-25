/* Base Player class that Human Player derives from */
export default class Action {
  name = 'BaseAction'

  /**
   * @type {GameObject}
   */
  source = null


  /**
   * @param {GameObject} source
   */
  constructor(source) {
    this.source = source
  }

  /** perform the action
   */
  perform() {
    console.log('Base Action performed')
  }

  /**
   * @returns {boolean}
   */
  canPerform() {
    return true
  }
}
