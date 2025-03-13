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
  async perform() {
    console.log(this.name, ' performed')
  }

  /**
   * @returns {Promise<{ value: Boolean, reason: string? }>}
   */
  async canPerform() {
    return Promise.resolve({ value: true })
  }
}
