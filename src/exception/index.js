/**
 * 自定义异常类
 * 使用方法 throw new HttpException({ message: 'Error Message', code: 10000 })
 */
export class HttpException extends Error {
  /**
   * 构造函数
   * @param ex 可选参数，通过{}的形式传入
   */

  constructor(ex) {
    super()
    this.exceptionHandler(ex)
  }

  exceptionHandler(ex) {
    if (ex && ex.code) {
      this.code = ex.code;
    }
    if (ex && ex.message) {
      this.message = ex.message;
    }
  }
}

export class NotFound extends HttpException {
  constructor(ex) {
    super();
    this.status = 404
    this.exceptionHandler(ex);
  }
}

export class Unauthorized extends HttpException {
  constructor(ex) {
    super();
    this.status = 401
    this.exceptionHandler(ex);
  }
}

export class Forbidden extends HttpException {
  constructor(ex) {
    super();
    this.status = 403
    this.exceptionHandler(ex);
  }
}
