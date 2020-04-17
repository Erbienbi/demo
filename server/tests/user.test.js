const request = require('supertest')
const app = require('../app')

let token = null
let tokenBroken = 'Br0k3nT0k3n'
let tokenUser = null

// USERS

let TOKEN = null
describe('Endpoints User/register', () => {
  // REDISTERED
  it('status code 201 creeted new user', async () => {
    const res = await request(app)
      .post('/user/register')
      .send({
        name: 'test',
        email: 'test@email.com',
        password: '1234567'
      })
    expect(res.status).toEqual(201)
    expect(res.body.message).toBe('Successfully registered new user')
  })
  // NAME Null
  it('status code 400 Name Null', async () => {
    const res = await request(app)
      .post('/user/register')
      .send({
        
        email: 'test@email.com',
        password: '1234567'
      })
    expect(res.status).toEqual(400)
    expect(res.body.message).toBe('User.name cannot be null')
  })
  // NAME LESS THAN 3
  it('status code 400 Name less than 3', async () => {
    const res = await request(app)
      .post('/user/register')
      .send({
        name: 'te',
        email: 'test@email.com',
        password: '1234567'
      })
    expect(res.status).toEqual(400)
    expect(res.body.message).toBe('Username needs to have at least 3 characters long!')
  })
  // EMAIL NULL
  it('status code 400 Email null', async () => {
    const res = await request(app)
      .post('/user/register')
      .send({
        name: 'test',
        
        password: '1234567'
      })
    expect(res.status).toEqual(400)
    expect(res.body.message).toBe('User.email cannot be null')
  })
  // EMAIL EMPTY
  it('status code 400 Email empty', async () => {
    const res = await request(app)
      .post('/user/register')
      .send({
        name: 'test',
        email: '',
        password: '1234567'
      })
    expect(res.status).toEqual(400)
    expect(res.body.message).toBe('Please insert an email address!')
  })
  // EMAIL FORMAT
  it('status code 400 Email format', async () => {
    const res = await request(app)
      .post('/user/register')
      .send({
        name: 'test',
        email: 'testemail.com',
        password: '1234567'
      })
    expect(res.status).toEqual(400)
    expect(res.body.message).toBe('The email is not in the right format!')
  })
  // PASSWORD NULL
  it('status code 400 Password less than 7', async () => {
    const res = await request(app)
      .post('/user/register')
      .send({
        name: 'test',
        email: 'testemail.com'
      })
    expect(res.status).toEqual(400)
    expect(res.body.message).toBe('User.password cannot be null')
  })
  // PASSWORD EMPTY
  it('status code 400 Password less than 7', async () => {
    const res = await request(app)
      .post('/user/register')
      .send({
        name: 'test',
        email: 'testemail.com',
        password: ''
      })
    expect(res.status).toEqual(400)
    expect(res.body.message).toBe('Password needs to have at least 7 characters!')
  })
})

describe('Endpoints User/login', () => {
  // USER LOGGED
  it('status code 200 logged as user', async () => {
    const res = await request(app)
      .post('/user/login')
      .send({
        email: 'test@email.com',
        password: '1234567'
      })
    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('token')
    expect(res.body.message).toBe('Log in successful')
    TOKEN = res.body.token
  })
  // EMAIL NULL
  it('status code 400 email null', async () => {
    const res = await request(app)
      .post('/user/login')
      .send({
        // email: 'test@email.com',
        password: '1234567'
      })
    expect(res.status).toEqual(400)
    expect(res.body.message).toBe('Please insert a valid email')
  })
  // PASSWORD NULL
  it('status code 400 email null', async () => {
    const res = await request(app)
      .post('/user/login')
      .send({
        email: 'test@email.com',
        // password: '1234567'
      })
    expect(res.status).toEqual(400)
    expect(res.body.message).toBe('Please insert a password')
  })
  // EMAIL/PASSWORD WRONG
  it('status code 400 email null', async () => {
    const res = await request(app)
      .post('/user/login')
      .send({
        email: 'test?@email.com',
        password: '1234567'
      })
    expect(res.status).toEqual(400)
    expect(res.body.message).toBe('Wrong email/password')
  })
})

// GET PROFIL
describe('Endpoints user', () => {
  it('status code 200 get profil', async () => {
    const res = await request(app)
      .get('/user')
      .set('token', TOKEN)
    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('name')
  })
  // GET PROFIL FAILED
  it('status code 400 get profil failed', async () => {
    const res = await request(app)
      .get('/user')
    // .set('token', TOKEN)
    expect(res.status).toEqual(400)
    expect(res.body.message).toBe('You need to login first!')
  })
})