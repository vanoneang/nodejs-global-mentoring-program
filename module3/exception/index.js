/**
 * 自定义异常类
 * 使用方法 throw new HttpException({ message: 'Error Message', code: 10000 })
 */
export default class HttpException extends Error {
  /**
   * 构造函数
   * @param ex 可选参数，通过{}的形式传入
   */
  constructor (ex) {
    super()
    if (ex && ex.code) {
      this.code = ex.code
    }
    if (ex && ex.message) {
      this.message = ex.message
    }
  }
}
