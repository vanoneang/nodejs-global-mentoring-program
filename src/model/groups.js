import knex from '../db/knex'
import { HttpException } from '../exception'

const TABLE_NAME = 'groups'
const PERMISSIONS = ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']

class Groups {
  static async query(params) {
    const res = await knex(TABLE_NAME).where(params).select()
    return res
  }

  static async queryAll() {
    const res = await knex(TABLE_NAME).select()
    return res
  }

  static async insert(params) {
    const group = await Groups.query({ id: params.id })
    if (group.length) {
      return group
    }
    const currentPermissions = Groups.checkPermissions(params.permissions)
    try {
      console.log('JSON.stringify(currentPermissions)', JSON.stringify(currentPermissions));

      await knex(TABLE_NAME).insert({
        id: params.id,
        name: params.name,
        permissions: JSON.stringify(currentPermissions)
      })
    } catch (error) {
      console.log(error);
    }
  }

  static async update(params) {
    const group = await Groups.query({ id: params.id })
    console.log('group', params);

    if (!group.length) {
      throw new HttpException({ code: 10010, message: 'No matching user data' })
    }
    const updateValues = {}
    if (params.permissions) {
      const currentPermissions = Groups.checkPermissions(params.permissions)

      updateValues.permissions = JSON.stringify(currentPermissions)
    }
    if (params.name) {
      updateValues.name = params.name
    }

    await knex(TABLE_NAME).where('id', params.id).update(updateValues)
  }

  static async drop(id) {
    try {
      await knex(TABLE_NAME).where({ id }).del()
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @param {*} permissions 'READ, WRITE'
   */
  static checkPermissions(permissions) {
    let valid = true
    const currentPermissions = Array.from(new Set(permissions.split(',')))

    currentPermissions.forEach(p => {
      if (!PERMISSIONS.includes(p)) {
        valid = false
      }
    });
    if (!valid) {
      throw new HttpException({
        code: 10071,
        message: 'invalid permissions!'
      })
    }
    return currentPermissions
  }
}

export default Groups
