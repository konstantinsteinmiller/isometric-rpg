import { Action } from "@/actions";

/* Action for a melee attack class */
export default class RangedAttackAction extends Action {
  name = 'Ranged Attack'

  /**
   * @type {GameObject}
   */
  source = null

  /**
   * @type {GameObject}
   */
  target = null

  /**
   * @type {GameObject}
   */
  maxDistance = 5


  /**
   * @param {GameObject} source
   */
  constructor(source) {
    super(source)
    this.source = source
  }

  /** perform the action
   */
  perform() {
    this.target.dealDamage(3 + Math.floor(Math.random() * 5))
  }

  /**
   * @returns {boolean}
   */
  async canPerform() {
    this.target = await this.source.getTargetObject()

    if (!this.target) return { value: false, reason: 'Must be a valid target' }
    if (this.target === this.source) return { value: false, reason: 'Cannot target itself' }

    console.log('this.target: ', this.target)
    const targetCoords = this.target.coords.clone()
    const distance = targetCoords.sub(this.source.coords).length()

    console.log('distance: ', distance)
    // target must be within range
    if (distance > this.maxDistance) {
      console.log('target is too far')
      return { value: false, reason: 'target is too far, select another action' }
    }
    return { value: true }
  }
}
