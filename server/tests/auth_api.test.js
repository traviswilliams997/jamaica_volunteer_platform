import { test, before, beforeEach, after, describe } from 'node:test'
import assert from 'node:assert'
import supertest from 'supertest'
import app from '../app.js'
import { sequelize } from '../utils/db.js'
import {
  initialVolunteersAuthApi,
  initialAgenciesAuthApi,
  volunteersInDb,
  agenciesInDb,
  emptyDbTables,
} from './test_helper.js'
import Volunteer from '../models/index.js'
import Agency from '../models/index.js'

const api = supertest(app)

before(async () => {
  // await sequelize.sync({ force: true })
})
describe('volunteer auth', () => {
  beforeEach(async () => {
    await emptyDbTables(['Volunteer'])

    const volunteerObject = new Volunteer(initialVolunteersAuthApi[0])
    await volunteerObject.save()
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
      username: 'john123',
      password: 'password',
    }

    const response = await api
      .post('/api/auth/login/volunteer')
      .send(loginCredentials)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.username, loginCredentials.username)
  })

  test('volunteer cannot login without correct credentials', async () => {
    const loginCredentials = {
      username: 'john123',
      password: 'wongpassword',
    }

    await api
      .post('/api/auth/login/volunteer')
      .send(loginCredentials)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

  after(async () => {
    await emptyDbTables(['Volunteer'])
  })
})

describe('agency auth', () => {
  before(async () => {
    await emptyDbTables(['Agency'])

    const agencyObject = new Agency(initialAgenciesAuthApi[0])
    await agencyObject.save()
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
    const loginCredentials = {
      username: 'helpthepoor',
      password: 'secret',
    }

    const response = await api
      .post('/api/auth/login/agency')
      .send(loginCredentials)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.username, loginCredentials.username)
  })

  test('agency cannot login without correct credentials', async () => {
    const loginCredentials = {
      username: 'helpthepoor',
      password: 'wrongpassword',
    }

    await api
      .post('/api/auth/login/agency')
      .send(loginCredentials)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

  after(async () => {
    await emptyDbTables(['Agency'])
  })
})

after(async () => {
  await sequelize.close()
})
