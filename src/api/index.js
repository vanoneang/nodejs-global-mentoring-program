import express from 'express';

import { userValidation } from '../validation/user'
import { NotFound } from '../exception';
import Users from '../model/users';
import { wrap } from '../util'

const router = express.Router();

router.get('/user/:openid', wrap(async (req, res) => {
  const { openid } = req.params
  const u = await Users.query({ openid })

  if (!u.length) {
    throw new NotFound({ code: 10010, message: 'No matching user data' })
  }

  const [user] = u
  res.send(user)
}))

/**
 * http://localhost:3000/user?subString=a&limit=2
 */
router.get('/user', wrap(async (req, res) => {
  const { subString, limit } = req.query
  const suggestUsers = await Users.queryByLogin(subString, limit)
  res.send(suggestUsers)
}))

/**
 * postman data:
 * {
    "openid": "f3db31b8",
    "login": "fin",
    "password": "123456",
    "age": 27,
    "is_deleted": false
  }
 */
router.post('/user', userValidation, wrap(async (req, res) => {
  await Users.insert(req.body)

  res
    .status(201)
    .send({
      code: 0,
      message: 'User added successfully!'
    })
}))

/**
 * {
    "openid": "0e6bd69a",
    "login": "van",
    "password": "n123456",
    "age": 21,
    "is_deleted": false
  }
 */
router.put('/user', userValidation, wrap(async (req, res) => {
  const user = req.body
  await Users.update({ openid: user.openid }, user)
  res.send({ code: 1, message: 'Update user password successfully!' })
}))

/**
 * {"openid": "0e6bd69a"}
 */
router.delete('/user', wrap(async (req, res) => {
  const user = req.body
  await Users.drop({ openid: user.openid })
  res.status(204).json()
}))

export default router;
