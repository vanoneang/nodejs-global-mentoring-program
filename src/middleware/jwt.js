import jwt from 'jsonwebtoken'

import config from '../config'
import { Forbidden, Unauthorized } from '../exception'


export default () => (req, res, next) => {

  if (config.jwt.unless.includes(req.url)) {
    return next()
  }

  const token = req.header('authorization')
  if (!token) {
    throw new Unauthorized({
      code: 30010,
      message: 'Token should be required!'
    })
  }

  jwt.verify(token, config.jwt.secret, (err, decoded) => {
    if (err) {
      throw new Forbidden({
        code: 30020,
        message: 'invalid token!'
      })
    }
    const { openid } = decoded
    req.openid = openid
  })

  next()
}
