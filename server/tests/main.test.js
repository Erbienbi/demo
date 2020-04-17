const request = require('supertest')
const app = require('../app')

let token = null
let tokenBroken = 'Br0k3nT0k3n'
let tokenUser = null

// USERS

describe('Endpoints User', () => {
  it('astatus code 201 logged as user', async () => {
    const res = await request(app)
      .post('/user/register')
      .send({
        name: 'test',
        email: 'test@email.com',
        password: '1234567'
      })
    expect(res.status).toEqual(201)
    expect(res.body).toHaveProperty('data')
    expect(res.body.message).toBe('Successfully registered new user')
    token = res.body.token
  })
  // NAME Null
  it('status code 400 Name empty', async () => {
    const res = await request(app)
      .post('/user/register')
      .send({
        
        email: 'test@email.com',
        password: '1234567'
      })
    expect(res.status).toEqual(400)
    expect(res.body.message).toBe('User.name cannot be null')
    token = res.body.token
  })
  // NAME LESS THAN 3
  it('status code 400 Name less than 3', async () => {
    const res = await request(app)
      .post('/user/register')
      .send({
        name: 'aa',
        email: 'test@email.com',
        password: '1234567'
      })
    expect(res.status).toEqual(400)
    expect(res.body.message).toBe('Username needs to have at least 3 characters long!')
    token = res.body.token
  })
})