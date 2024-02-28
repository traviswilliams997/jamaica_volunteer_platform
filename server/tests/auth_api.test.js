import { test, before, beforeEach, after, describe } from 'node:test'
import assert from 'node:assert'
import supertest from 'supertest'
import app from '../app.js'
import { sequelize } from '../utils/db.js'
import {
  volunteersInDb,
  agenciesInDb,
  emptyDbTables,
  volunteerTokensInDb,
  agencyTokensInDb,
} from './test_helper.js'

const api = supertest(app)

before(async () => {
  //await sequelize.sync({ force: true })
})

describe('volunteer auth', () => {
  beforeEach(async () => {
    await emptyDbTables(['Volunteer', 'VolunteerToken'])
  })

  test('volunteer can regsister', async () => {
    const volunteersAtStart = await volunteersInDb()

    const newVolunteer = {
      username: 'john123',
      firstName: 'john',
      lastName: 'doe',
      email: 'john@gmail.com',
      phoneNumber: '(876)444-5555',
      password: 'password',
      picturePath: '',
      latitude: 18.0059,
      longitude: -76.7468,
      about: 'Someone',
      skills: 'Living',
      admin: false,
    }

    await api
      .post('/api/auth/register/volunteer')
      .send(newVolunteer)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const volunteersAtEnd = await volunteersInDb()
    assert.strictEqual(volunteersAtEnd.length, volunteersAtStart.length + 1)

    const usernamesAtStart = volunteersAtStart.map((v) => v.username)
    const usernamesAtEnd = volunteersAtEnd.map((v) => v.username)

    assert(!usernamesAtStart.includes('john123'))
    assert(usernamesAtEnd.includes('john123'))
  })

  test('volunteer can login with correct credentials', async () => {
    const newVolunteer = {
      username: 'john123',
      firstName: 'john',
      lastName: 'doe',
      email: 'john@gmail.com',
      phoneNumber: '(876)444-5555',
      password: 'password',
      picturePath: '',
      latitude: 18.0059,
      longitude: -76.7468,
      about: 'Someone',
      skills: 'Living',
      admin: false,
    }

    await api
      .post('/api/auth/register/volunteer')
      .send(newVolunteer)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const loginCredentials = {
      email: 'john@gmail.com',
      password: 'password',
    }

    const response = await api
      .post('/api/auth/login/volunteer')
      .send(loginCredentials)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.username, newVolunteer.username)
  })

  test('volunteer cannot login without correct credentials', async () => {
    const newVolunteer = {
      username: 'john123',
      firstName: 'john',
      lastName: 'doe',
      email: 'john@gmail.com',
      phoneNumber: '(876)444-5555',
      password: 'password',
      picturePath: '',
      latitude: 18.0059,
      longitude: -76.7468,
      about: 'Someone',
      skills: 'Living',
      admin: false,
    }

    await api
      .post('/api/auth/register/volunteer')
      .send(newVolunteer)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const loginCredentials = {
      email: 'john@gmail.com',
      password: 'wongpassword',
    }

    await api
      .post('/api/auth/login/volunteer')
      .send(loginCredentials)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

  test('volunteer refresh token is created', async () => {
    const tokensAtStart = await volunteerTokensInDb()

    const newVolunteer = {
      username: 'john123',
      firstName: 'john',
      lastName: 'doe',
      email: 'john@gmail.com',
      phoneNumber: '(876)444-5555',
      password: 'password',
      picturePath: '',
      latitude: 18.0059,
      longitude: -76.7468,
      about: 'Someone',
      skills: 'Living',
      admin: false,
    }

    await api
      .post('/api/auth/register/volunteer')
      .send(newVolunteer)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const loginCredentials = {
      email: 'john@gmail.com',
      password: 'password',
    }

    const response = await api
      .post('/api/auth/login/volunteer')
      .send(loginCredentials)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const tokensAtEnd = await volunteerTokensInDb()

    assert.strictEqual(typeof response.body.accessToken === 'string', true)
    assert.strictEqual(tokensAtEnd.length, tokensAtStart.length + 1)
  })
  after(async () => {
    await emptyDbTables(['Volunteer', 'VolunteerToken'])
  })
})

describe('agency auth', () => {
  beforeEach(async () => {
    await emptyDbTables(['Agency', 'AgencyToken'])
  })

  test('agency can regesister', async () => {
    const agenciesAtStart = await agenciesInDb()
    const newAgency = {
      username: 'helpthepoor',
      name: 'helpthepoor',
      email: 'helpthepoor@gmail.com',
      phoneNumber: '(876)444-5555',
      password: 'secret',
      type: 'donations',
      picturePath: '',
      latitude: 18.0059,
      longitude: -76.7468,
      about: 'we help the needy',
      admin: false,
    }

    await api
      .post('/api/auth/register/agency')
      .send(newAgency)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const agenciesAtEnd = await agenciesInDb()
    assert.strictEqual(agenciesAtEnd.length, agenciesAtStart.length + 1)

    const usernamesAtStart = agenciesAtStart.map((u) => u.username)
    const usernamesAtEnd = agenciesAtEnd.map((u) => u.username)

    assert(!usernamesAtStart.includes('helpthepoor'))
    assert(usernamesAtEnd.includes('helpthepoor'))

    const usernames = agenciesAtEnd.map((u) => u.username)
    assert(usernames.includes('helpthepoor'))
  })

  test('agency can login with correct credentials', async () => {
    const newAgency = {
      username: 'helpthepoor',
      name: 'helpthepoor',
      email: 'helpthepoor@gmail.com',
      phoneNumber: '(876)444-5555',
      password: 'secret',
      type: 'donations',
      picturePath: '',
      latitude: 18.0059,
      longitude: -76.7468,
      about: 'we help the needy',
      admin: false,
    }

    await api
      .post('/api/auth/register/agency')
      .send(newAgency)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const loginCredentials = {
      email: 'helpthepoor@gmail.com',
      password: 'secret',
    }

    const response = await api
      .post('/api/auth/login/agency')
      .send(loginCredentials)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.username, newAgency.username)
  })

  test('agency refresh token is created', async () => {
    const tokensAtStart = await agencyTokensInDb()

    const newAgency = {
      username: 'helpthepoor',
      name: 'helpthepoor',
      email: 'helpthepoor@gmail.com',
      phoneNumber: '(876)444-5555',
      password: 'secret',
      type: 'donations',
      picturePath: '',
      latitude: 18.0059,
      longitude: -76.7468,
      about: 'we help the needy',
      admin: false,
    }

    await api
      .post('/api/auth/register/agency')
      .send(newAgency)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const loginCredentials = {
      email: 'helpthepoor@gmail.com',
      password: 'secret',
    }

    const response = await api
      .post('/api/auth/login/agency')
      .send(loginCredentials)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const tokensAtEnd = await agencyTokensInDb()

    assert.strictEqual(typeof response.body.accessToken === 'string', true)
    assert.strictEqual(tokensAtEnd.length, tokensAtStart.length + 1)
  })

  test('agency cannot login without correct credentials', async () => {
    const newAgency = {
      username: 'helpthepoor',
      name: 'helpthepoor',
      email: 'helpthepoor@gmail.com',
      phoneNumber: '(876)444-5555',
      password: 'secret',
      type: 'donations',
      picturePath: '',
      latitude: 18.0059,
      longitude: -76.7468,
      about: 'we help the needy',
      admin: false,
    }

    await api
      .post('/api/auth/register/agency')
      .send(newAgency)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const loginCredentials = {
      email: 'helpthepoor@gmail.com',
      password: 'wrongpassword',
    }

    await api
      .post('/api/auth/login/agency')
      .send(loginCredentials)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

  after(async () => {
    await emptyDbTables(['Agency', 'AgencyToken'])
  })
})

after(async () => {
  await sequelize.close()
})
