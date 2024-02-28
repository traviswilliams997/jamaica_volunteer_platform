import { test, before, beforeEach, after, describe } from 'node:test'
import assert from 'node:assert'
import supertest from 'supertest'
import app from '../app.js'
import { sequelize } from '../utils/db.js'
import {
  emptyDbTables,
  volunteerTokensInDb,
  agencyTokensInDb,
} from './test_helper.js'

const api = supertest(app)

before(async () => {
  //await sequelize.sync({ force: true })
})

describe('volunteer logout', () => {
  beforeEach(async () => {
    await emptyDbTables(['Volunteer', 'VolunteerToken'])
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

    await api
      .post('/api/auth/login/volunteer')
      .send(loginCredentials)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const tokensAfterLogin = await volunteerTokensInDb()
    assert.strictEqual(tokensAfterLogin.length, tokensAtStart.length + 1)

    const refreshToken = tokensAfterLogin[0].token

    await api
      .get('/api/logout/volunteer')
      .set('Cookie', `jwt=${refreshToken}`)
      .expect(204)

    const tokensAtEnd = await volunteerTokensInDb()

    assert.strictEqual(tokensAtEnd.length, 0)
  })
  after(async () => {
    await emptyDbTables(['Volunteer', 'VolunteerToken'])
  })
})

describe('agency logout', () => {
  beforeEach(async () => {
    await emptyDbTables(['Agency', 'Agency token'])
  })

  test('agency refresh token is destroyed', async () => {
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

    await api
      .post('/api/auth/login/agency')
      .send(loginCredentials)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const tokensAfterLogin = await agencyTokensInDb()
    assert.strictEqual(tokensAfterLogin.length, tokensAtStart.length + 1)

    const refreshToken = tokensAfterLogin[0].token

    await api
      .get('/api/logout/agency')
      .set('Cookie', `jwt=${refreshToken}`)
      .expect(204)

    const tokensAtEnd = await agencyTokensInDb()

    assert.strictEqual(tokensAtEnd.length, 0)
  })
  after(async () => {
    await emptyDbTables(['Agency', 'Agency'])
  })
})
after(async () => {
  await sequelize.close()
})
