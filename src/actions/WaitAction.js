import Action from "@/actions/Action";

export default class WaitAction extends Action {
  name = 'Wait'

  /**
   * @type {GameObject}
   */
  source = null


  /**
   * @param {GameObject} source
   */
  constructor(source) {
    super(source)
    this.source = source
  }

  /** perform the action
   */
  async perform() {
    console.log(this.name, ' performed')
  }

  /**
   * @returns {boolean}
   */
  async canPerform() {
    return { value: true }
  }
}
