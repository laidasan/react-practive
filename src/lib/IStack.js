/**
 * @author samura.chiu
 * @interface IStack
 * @description Stack interface
 */
class IStack {
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

  /**
   * @function peek
   * @abstract
   */
  peek() {}

  /**
   * @function isEmpty
   * @abstract
   */
  isEmpty() {}

  /**
   * @function size
   * @abstract
   */
  size() {}

  /**
   * @function clear
   * @abstract
   */
  clear() {}
}

export { IStack }