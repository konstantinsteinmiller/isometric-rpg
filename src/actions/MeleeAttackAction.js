import { Action } from "@/actions";
import {search} from "@//pathfinding";

/* Action for a melee attack class */
export default class MeleeAttackAction extends Action {
  name = 'Melee Attack'

  /**
   * @type {GameObject}
   */
  source = null

  /**
   * @type {GameObject}
   */
  target = null


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
    this.target.dealDamage(Math.floor(Math.random() * 5))
  }

  /**
   * @returns {boolean}
   */
  async canPerform() {
    this.target = await this.source.getTargetObject()

    if (!this.target) return { value: false, reason: 'Must be a valid target' }
    if (this.target === this.source) return { value: false, reason: 'Cannot target itself' }

    const targetCoords = this.target.coords.clone()
    const distance = targetCoords.sub(this.source.coords).length()

    console.log('distance: ', distance)
    if (distance > 1) {
      return { value: false, reason: 'target is too far, select another action' }
    }
    return { value: true }
  }
}
