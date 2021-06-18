import { HttpException } from '../exception';

// eslint-disable-next-line no-unused-vars
export default (err, req, res, next) => {
  if (err instanceof HttpException) {
    res.status(err.status || 500);
    res.send({
      code: err.code,
      message: err.message
    });
  } else {
    res.status(500)
    res.send({
      code: 9999,
      message: 'Server exception'
    })
  }
}
