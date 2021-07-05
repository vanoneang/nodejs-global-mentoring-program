const app = require('../../../src/app')
const supertest = require('supertest');

describe('User module', () => {
  test('Should tip no matching user data', async () => {
    await supertest(app)
      .post('/login')
      .send({
        username: 'mockUsername',
        password: 'mockPassword'
      })
      .then(response => {
        expect(response.body.code).toBe(10010)
      })
  })

  test('Should return token successfully', async () => {
    const response = await supertest(app)
      .post('/login')
      .send({
        username: 'van',
        password: 'a123456'
      })
    expect(response.status).toBe(200);
    expect(response.type).toMatch(/json/);
  })
})
