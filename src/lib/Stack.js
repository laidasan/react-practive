import { empty, isEmpty, defaultTo, append, last, init, length } from 'ramda'
import { IStack } from './IStack'

/** 
 * @author samura.chiu
 * @implements {IStack}
 * @class Stack
 * @classdesc
 */
class Stack extends IStack { 
  store = []

  /**
   * @author samura.chiu
   * @constructor
   * @param {Array.<*>} [store]
   */
  constructor(store) {
    super(store)
    this.store = defaultTo([])(store)
  }

  /**
   * @function pop
   * @augments IStack.pop
   */
  pop() {
    const item = last(this.store)

    this.store = init(this.store)
    return item
  }

  /**
   * @function push
   * @augments IStack.push
   * @param {*} item
   * @returns undefined
   */
  push(item) {
    this.store = append(item, this.store)
  }

  /**
   * @function peek
   * @augments IStack.peek
   * @returns {*}
   */
  peek() {
    return last(this.store)
  }

  /**
   * @function isEmpty
   * @augments IStack.isEmpty
   * @returns {boolean}
   */
  isEmpty() {
    return isEmpty(this.store)
  }

  /**
   * @function size
   * @augments IStack.size
   * @returns {number}
   */
  size() {
    return length(this.store)
  }

  /**
   * @function clear
   * @augments IStack.clear
   * @returns undefined
   */
  clear() {
    this.store = empty(this.store)
  }

}

export { Stack }