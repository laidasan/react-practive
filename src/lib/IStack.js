/**
 * @author samura.chiu
 * @interface IStack
 * @description Stack interface
 */
class IStack {
  store = []

  /**
   * @constructor 
   * @param {Array.<*>} store
   */
  constructor(store) {
    this.store = store
  }

  /**
   * @function pop
   * @abstract
   */
  pop() {}

  /**
   * @function push
   * @abstract
   */
  push() {}
}

export { IStack }