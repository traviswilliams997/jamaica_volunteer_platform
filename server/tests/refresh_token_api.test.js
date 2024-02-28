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

describe('Volunteer refresh token api', () => {
  beforeEach(async () => {
    await emptyDbTables(['Volunteer', 'VolunteerToken'])
  })

  test('Access token is refreshed', async () => {
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

    const loginReponse = await api
      .post('/api/auth/login/volunteer')
      .send(loginCredentials)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const originalAccessToken = loginReponse.body.accessToken

    const tokensAfterLogin = await volunteerTokensInDb()
    const refreshToken = tokensAfterLogin[0].token

    const refreshTokenResponse = await api
      .get('/api/refresh/volunteer')
      .set('Cookie', `jwt=${refreshToken}`)
      .expect(200)

    const newToken = refreshTokenResponse.body.accessToken

    assert.notStrictEqual(originalAccessToken, newToken)
  })
  after(async () => {
    await emptyDbTables(['Volunteer', 'VolunteerToken'])
  })
})

after(async () => {
  await sequelize.close()
})
