const request = require('supertest')
const app = require('../app')

// OWNER

describe('Endpoints owner/register', () => {
  // REDISTERED
  it('status code 201 logged as owner', async () => {
    const res = await request(app)
      .post('/owner/register')
      .send({
        name: 'test',
        email: 'test@email.com',
        password: '1234567'
      })
    expect(res.status).toEqual(201)
    expect(res.body.message).toBe('Successfully registered new owner')
  })
  // NAME Null
  it('status code 400 Name Null', async () => {
    const res = await request(app)
      .post('/owner/register')
      .send({
        
        email: 'test@email.com',
        password: '1234567'
      })
    expect(res.status).toEqual(400)
    expect(res.body.message).toBe('owner.name cannot be null')
  })
  // NAME LESS THAN 3
  it('status code 400 Name less than 3', async () => {
    const res = await request(app)
      .post('/owner/register')
      .send({
        name: 'te',
        email: 'test@email.com',
        password: '1234567'
      })
    expect(res.status).toEqual(400)
    expect(res.body.message).toBe('ownername needs to have at least 3 characters long!')
  })
  // EMAIL NULL
  it('status code 400 Email null', async () => {
    const res = await request(app)
      .post('/owner/register')
      .send({
        name: 'test',
        
        password: '1234567'
      })
    expect(res.status).toEqual(400)
    expect(res.body.message).toBe('owner.email cannot be null')
  })
  // EMAIL EMPTY
  it('status code 400 Email empty', async () => {
    const res = await request(app)
      .post('/owner/register')
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
      .post('/owner/register')
      .send({
        name: 'test',
        email: 'testemail.com',
        password: '1234567'
      })
    expect(res.status).toEqual(400)
    expect(res.body.message).toBe('The email is not in the right format!')
  })
  // owner DUPLICATE
  // it('status code 400 duplicate email', async () => {
  //   const res = await request(app)
  //     .post('/owner/register')
  //     .send({
  //       name: 'test',
  //       email: 'test@email.com',
  //       password: '1234567'
  //     })
  //   expect(res.status).toEqual(400)
  //   expect(res.body).toHaveProperty('data')
  //   expect(res.body).toHaveProperty('message')
  //   // expect(res.body.message).toBe('Successfully registered new owner')
  //
  // })
  // PASSWORD NULL
  it('status code 400 Password less than 7', async () => {
    const res = await request(app)
      .post('/owner/register')
      .send({
        name: 'test',
        email: 'testemail.com'
      })
    expect(res.status).toEqual(400)
    expect(res.body.message).toBe('owner.password cannot be null')
  })
  // PASSWORD EMPTY
  it('status code 400 Password less than 7', async () => {
    const res = await request(app)
      .post('/owner/register')
      .send({
        name: 'test',
        email: 'testemail.com',
        password: ''
      })
    expect(res.status).toEqual(400)
    expect(res.body.message).toBe('Password needs to have at least 7 characters!')
  })
})

describe('Endpoints owner/login', () => {
  // owner LOGGED
  it('status code 200 logged as owner', async () => {
    const res = await request(app)
      .post('/owner/login')
      .send({
        email: 'test@email.com',
        password: '1234567'
      })
    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('token')
    expect(res.body.message).toBe('Log in successful')
  })
  // EMAIL NULL
  it('status code 400 email null', async () => {
    const res = await request(app)
      .post('/owner/login')
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
      .post('/owner/login')
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
      .post('/owner/login')
      .send({
        email: 'test?@email.com',
        password: '1234567'
      })
    expect(res.status).toEqual(400)
    expect(res.body.message).toBe('Wrong email/password')
  })
})