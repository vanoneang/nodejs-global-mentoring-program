import knex from '../db/knex'
import { HttpException } from '../exception'

const TABLE_NAME = 'users'

class Users {
  static query(params) {
    return new Promise(resolve => {
      knex(TABLE_NAME)
        .select()
        .where(params)
        .then(res => {
          resolve(res)
        })
    })
  }

  static async queryByLogin(str, limit) {
    let res = null
    if (limit) {
      res = await knex(TABLE_NAME).where('login', 'like', `%${str}%`).limit(limit).orderBy('login')
    } else {
      res = await knex(TABLE_NAME).where('login', 'like', `%${str}%`).select().orderBy('login')
    }
    return res
  }

  static async insert(params) {
    const user = await Users.query({ openid: params.openid })
    if (user.length) {
      return user
    }
    const res = await knex(TABLE_NAME).insert(params)
    return res
  }

  static async update(condition, params) {
    const user = await Users.query({ openid: params.openid })
    if (!user.length) {
      throw new HttpException({ code: 10010, message: 'No matching user data' })
    }
    const res = await knex(TABLE_NAME).where(condition).update(params)
    return res
  }

  static async drop(condition) {
    const user = await Users.query({ ...condition, is_deleted: false })
    if (!user.length) {
      return true
    }
    const res = await knex(TABLE_NAME).where(condition).update({ is_deleted: true })
    return res
  }
}

export default Users
