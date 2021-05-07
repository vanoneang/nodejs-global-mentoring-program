import express from 'express';

import { userValidation } from '../validation/user'
import { groupValidation, groupIdValidation, updateGroupValidation, groupUsersValidation } from '../validation/group'
import { NotFound } from '../exception';
import Users from '../model/users';
import { wrap } from '../util'
import Groups from '../model/groups';
import UserGroup from '../model/user-group';

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

/**
 * {
    "id": "4d1c7ce9-ac82-4347-90d6-8f3f84d3d17d",
    "name": "develop",
    "permissions": "READ,WRITE"
  }
 */
router.post('/group', groupValidation, wrap(async (req, res) => {
  await Groups.insert(req.body)
  res
    .status(201)
    .send({
      code: 0,
      message: 'Group added successfully!'
    })
}))

router.get('/group/all', wrap(async (req, res) => {
  const groups = await Groups.queryAll()
  res.send(groups)
}))

/**
 * 4d1c7ce9-ac82-4347-90d6-8f3f84d3d17d
 */
router.get('/group/:id', groupIdValidation, wrap(async (req, res) => {
  const { id } = req.params
  const u = await Groups.query({ id })

  if (!u.length) {
    throw new NotFound({ code: 10010, message: 'No matching user data' })
  }

  const [group] = u
  res.send(group)
}))

/**
 * {
    "id": "4d1c7ce9-ac82-4347-90d6-8f3f84d3d17d",
    "name": "develop",
    "permissions": "READ,WRITE"
  }
 */
router.put('/group', updateGroupValidation, wrap(async (req, res) => {
  await Groups.update(req.body)
  res.send({
    code: 5,
    message: 'Update group info successfully!'
  })
}))

/**
 * 4d1c7ce9-ac82-4347-90d6-8f3f84d3d17d
 */
router.delete('/group/:id', groupIdValidation, wrap(async (req, res) => {
  await Groups.drop(req.params.id)
  res.status(204).json()
}))

/**
 * {
    "groupId": "4d1c7ce9-ac82-4347-90d6-8f3f84d3d17d",
    "users": ["0e6bd69a", "50ed476d"]
    }
 */
router.post('/group/users', groupUsersValidation, wrap(async (req, res) => {
  const { groupId, users } = req.body
  await UserGroup.addUsersToGroup(groupId, users)
  res
    .status(201)
    .send({
      code: 7,
      message: 'Users added group successfully!'
    })
}))

export default router;
