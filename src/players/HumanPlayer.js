import Player from "@/players/Player";
import * as THREE from "three";
import {updateStatusText} from "@/utils";
import inputManager from "@/InputManager";


export default class HumanPlayer extends Player {
  name = 'Human Player'

  /**
   * @param {THREE.Vector3} coords
   * @param {string} name
   */
  constructor(coords, name) {
    super(coords);
    this.name = name
  }

  /** Wait for the player to choose a target square
   * @returns {Promise<THREE.Vector3> | null}
   */
  async getTargetSquare() {
    return inputManager.getTargetSquare()
  }

  /** Wait for the player to choose a target Object
   * @returns {Promise<GameObject> | null}
   */
  async getTargetObject() {
    return inputManager.getTargetObject()
  }

  /** Wait for the player to select an action to perform
   * @returns {Promise<Action> | null}
   */
  async requestAction() {
    const $actionsContainer =  document.querySelector('.actions')
    $actionsContainer.innerHTML = ''
    const actions = this.getActions()

    return new Promise((resolve, reject) => {
      actions.forEach((action) => {
        const button = document.createElement('button')
        button.dataset.action = action.name
        button.innerText = action.name + ' ('+action.name[0].toLowerCase()+')'
        const onAction = (evt) => {
          if ((evt?.key?.toLowerCase() === 'm' && action.name === 'Move') ||
            (evt?.key?.toLowerCase() === 'w' && action.name === 'Wait') ||
            (evt?.key?.toLowerCase() === 'f' && action.name === 'Melee Attack') ||
            (evt?.key?.toLowerCase() === 'r' && action.name === 'Ranged Attack') ||
            !evt.key && action.name === button.dataset.action)
          {
            resolve(action)
          }
        }
        button.addEventListener('click', onAction)
        document.addEventListener('keydown', onAction)
        $actionsContainer.appendChild(button)
      })
    })
  }
}