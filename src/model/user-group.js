import Groups from './groups'
import { HttpException } from '../exception'
import knex from '../db/knex'

const TABLE_NAME = 'user_group'

class UserGroup {
  static async addUsersToGroup(groupId, userIds) {
    const group = await Groups.query({ id: groupId })
    if (!group.length) {
      throw new HttpException({ code: 10010, message: 'No matching group data' })
    }
    try {
      const rows = []
      userIds.forEach(u => {
        rows.push({ group_id: groupId, user_id: u })
      });
      await knex.transaction(async trx => {
        return knex.batchInsert(TABLE_NAME, rows).transacting(trx)
      })
    } catch (error) {
      // Throwing an error directly from the transaction handler function automatically rolls back the transaction, same as returning a rejected promise.
      console.error(error);
    }
  }
}

export default UserGroup
