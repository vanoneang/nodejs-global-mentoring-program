import Joi from '@hapi/joi'
import { checkParams } from '../util'

export const groupValidation = (req, res, next) => {
  const schema = Joi.object().keys(
    {
      id: Joi.string().required().guid({
        version: [
          'uuidv4',
          'uuidv5'
        ]
      }),
      name: Joi.string().required(),
      permissions: Joi.string().pattern(/^((\w,)+(\w))|(\w)$/).required()
    }
  )
  const result = schema.validate(req.body)
  checkParams(result)
  next()
}

export const groupIdValidation = (req, res, next) => {
  const schema = Joi.object().keys(
    {
      id: Joi.string().required().guid({
        version: [
          'uuidv4',
          'uuidv5'
        ]
      })
    }
  )
  const result = schema.validate(req.params)
  checkParams(result)
  next()
}

export const updateGroupValidation = (req, res, next) => {
  const schema = Joi.object().keys(
    {
      id: Joi.string().required().guid({
        version: [
          'uuidv4',
          'uuidv5'
        ]
      }),
      name: Joi.string().allow(''),
      permissions: Joi.string().pattern(/^((\w,)+(\w))|(\w)$/).allow('')
    }
  )
  const result = schema.validate(req.body)
  checkParams(result)
  next()
}

export const groupUsersValidation = (req, res, next) => {
  const schema = Joi.object().keys(
    {
      groupId: Joi.string().required().guid({
        version: [
          'uuidv4',
          'uuidv5'
        ]
      }),
      users: Joi.array().items(Joi.string())
    }
  )
  const result = schema.validate(req.body)
  checkParams(result)
  next()
}
