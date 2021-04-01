import express from 'express';
import Joi from '@hapi/joi'

import { users } from './mock'
import { checkParams } from '../util'
import HttpException from '../expection';

const router = express.Router();

router.get('/user/:id', (req, res) => {
  let user = {}
  const u = users.filter((item) => item.id === req.params.id)
  if(u.length) { [user] = u }
  res.send(user)
})

/**
 * postman data: 
 * {
    "id": "f3db31b8",
    "login": "fin",
    "password": "123456",
    "age": 27,
    "isDeleted": false
  }
 */
router.post('/user', (req, res) => {
  const schema = Joi.object().keys(
    {
      id: Joi.string().required(),
      login: Joi.string().required(),
      password: Joi.string().regex(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/),
      age: Joi.number().integer().min(4).max(130).required(),
      isDeleted: Joi.boolean().required(),
    }
  )
  const result = schema.validate(req.body)
  checkParams(result)

  const user = req.body
  users.push(user)

  res
    .status(201)
    .send({
      code: 0,
      message: 'User added successfully!',
      users
    })
})

/**
 * {
    "id": "0e6bd69a",
    "login": "van",
    "password": "n123456",
    "age": 21,
    "isDeleted": false
  }
 */
router.put('/user', (req, res, next) => {
  const schema = Joi.object().keys(
    {
      id: Joi.string().required(),
      login: Joi.string().required(),
      password: Joi.string().regex(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/),
      age: Joi.number().integer().min(4).max(130).required(),
      isDeleted: Joi.boolean().required(),
    }
  )
  const result = schema.validate(req.body)
  checkParams(result)

  const user = req.body
  const t = users.filter((item) => item.id === user.id)

  if (!t.length) {
    throw new HttpException({ code: 10010, message: 'No matching user data' })
  }
  
  users.map((item) => {
    if (item.id === user.id) {
      item.password = user.password
    }
  })

  res.status(201)
  res.send({ code: 1, message: 'Update user password successfully!'})
})

router.delete('/user', (req, res) => {
  const user = req.body
  const t = users.filter((item) => item.id === user.id)

  if (!t.length) {
    throw new HttpException({ code: 10010, message: 'No matching user data' })
  }

  users.map(item => {
    if (item.id === user.id) {
      item.isDeleted = true      
    }
  })

  res.status(201)
  res.send({ code: 2, message: 'The current use has been deleted!'})
})

export default router;