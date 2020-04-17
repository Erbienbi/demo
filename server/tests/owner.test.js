const request = require('supertest')
const app = require('../app')

// OWNER
let TOKEN = null
describe('Endpoints owner/register', () => {
  // REDISTERED
  it('status code 201 created new Owner', async () => {
    const res = await request(app)
      .post('/owner/register')
      .send({
        name: 'test',
        email: 'test@email.com',
        password: '1234567',
        phone: "085222686058",
        ktp: "101112131415"
      })
    expect(res.status).toEqual(201)
    expect(res.body.message).toBe('Successfully registered new Owner')
  })
  // NAME Null
  it('status code 400 Name Null', async () => {
    const res = await request(app)
      .post('/owner/register')
      .send({
        
        email: 'test@email.com',
        password: '1234567',
        phone: "085222686058",
        ktp: "101112131415"
      })
    expect(res.status).toEqual(400)
    expect(res.body.message).toBe('Owner.name cannot be null')
  })
  // NAME LESS THAN 3
  it('status code 400 Name less than 3', async () => {
    const res = await request(app)
      .post('/owner/register')
      .send({
        name: 'te',
        email: 'test@email.com',
        password: '1234567',
        phone: "085222686058",
        ktp: "101112131415"
      })
    expect(res.status).toEqual(400)
    expect(res.body.message).toBe('Username needs to have at least 3 characters long!')
  })
  // EMAIL NULL
  it('status code 400 Email null', async () => {
    const res = await request(app)
      .post('/owner/register')
      .send({
        name: 'test',
        
        password: '1234567',
        phone: "085222686058",
        ktp: "101112131415"
      })
    expect(res.status).toEqual(400)
    expect(res.body.message).toBe('Owner.email cannot be null')
  })
  // EMAIL EMPTY
  it('status code 400 Email empty', async () => {
    const res = await request(app)
      .post('/owner/register')
      .send({
        name: 'test',
        email: '',
        password: '1234567',
        phone: "085222686058",
        ktp: "101112131415"
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
        password: '1234567',
        phone: "085222686058",
        ktp: "101112131415"
      })
    expect(res.status).toEqual(400)
    expect(res.body.message).toBe('The email is not in the right format!')
  })
  // PASSWORD NULL
  it('status code 400 Password less than 7', async () => {
    const res = await request(app)
      .post('/owner/register')
      .send({
        name: 'test',
        email: 'teste@mail.com',

        phone: "085222686058",
        ktp: "101112131415"
      })
    expect(res.status).toEqual(400)
    expect(res.body.message).toBe('Owner.password cannot be null')
  })
  // PASSWORD EMPTY
  it('status code 400 Password less than 7', async () => {
    const res = await request(app)
      .post('/owner/register')
      .send({
        name: 'test',
        email: 'teste@mail.com',
        password: '',
        phone: "085222686058",
        ktp: "101112131415"
      })
    expect(res.status).toEqual(400)
    expect(res.body.message).toBe('Password needs to have at least 7 characters!')
  })
  // PHONE NULL
  it('status code 400 Phone null', async () => {
    const res = await request(app)
      .post('/owner/register')
      .send({
        name: 'test',
        email: 'teste@mail.com',
        password: '1234567',
        // phone: "085222686058",
        ktp: "101112131415"
      })
    expect(res.status).toEqual(400)
    expect(res.body.message).toBe('Owner.phone cannot be null')
  })
  // PHONE EMPTY
  it('status code 400 Phone empty', async () => {
    const res = await request(app)
      .post('/owner/register')
      .send({
        name: 'test',
        email: 'teste@mail.com',
        password: '1234567',
        phone: "",
        ktp: "101112131415"
      })
    expect(res.status).toEqual(400)
    expect(res.body.message).toBe('Please insert phone number')
  })
  // KTP NULL
  it('status code 400 KTP null', async () => {
    const res = await request(app)
      .post('/owner/register')
      .send({
        name: 'test',
        email: 'teste@mail.com',
        password: '1234567',
        phone: "085222686058",
        // ktp: "101112131415"
      })
    expect(res.status).toEqual(400)
    expect(res.body.message).toBe('Owner.ktp cannot be null')
  })
  // KTP EMPTY
  it('status code 400 KTP empty', async () => {
    const res = await request(app)
      .post('/owner/register')
      .send({
        name: 'test',
        email: 'test@email.com',
        password: '1234567',
        phone: "08XXXXXXXX",
        ktp: ""
      })
    expect(res.status).toEqual(400)
    expect(res.body.message).toBe('Please insert KTP number')
  })
})

describe('Endpoints owner/login', () => {
  // owner LOGGED
  it('status code 200 logged as Owner', async () => {
    const res = await request(app)
      .post('/owner/login')
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

// GET PROFIL
describe('Endpoints owner', () => {
  it('status code 200 get profil', async () => {
    const res = await request(app)
      .get('/owner')
      .set('token', TOKEN)
    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('id')
    expect(res.body).toHaveProperty('name')
  })
  // GET PROFIL FAILED
  it('status code 400 get profil failed', async () => {
    const res = await request(app)
      .get('/owner')
      // .set('token', TOKEN)
    expect(res.status).toEqual(400)
    expect(res.body.message).toBe('You need to login first!')
  })
})