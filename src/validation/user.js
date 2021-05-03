import Joi from '@hapi/joi'
import { checkParams } from '../util'

export const userValidation = (req) => {
  const schema = Joi.object().keys(
    {
      id: Joi.string().required(),
      login: Joi.string().required(),
      password: Joi.string().regex(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/),
      age: Joi.number().integer().min(4).max(130).required(),
      isDeleted: Joi.boolean().required()
    }
  )
  const result = schema.validate(req.body)
  checkParams(result)
}
