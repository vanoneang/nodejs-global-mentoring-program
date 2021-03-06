import { HttpException } from '../exception'

export const checkParams = (result) => {
  if (result.error) {
    throw new HttpException({
      code: 10030,
      message: result.error.details[0].message
    })
  }
}

export const wrap = fn => (...args) => fn(...args).catch(args[2])
