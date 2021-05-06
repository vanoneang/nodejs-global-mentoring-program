import Joi from '@hapi/joi'
import { checkParams } from '../util'

export const userValidation = (req, res, next) => {
  const schema = Joi.object().keys(
    {
      openid: Joi.string().required(),
      login: Joi.string().required(),
      password: Joi.string().regex(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/),
      age: Joi.number().integer().min(4).max(130).required(),
      is_deleted: Joi.boolean().required()
    }
  )
  const result = schema.validate(req.body)
  checkParams(result)
  next()
}
