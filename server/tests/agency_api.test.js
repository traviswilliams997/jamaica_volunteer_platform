import { test, before, after, afterEach, describe } from 'node:test'
import assert from 'node:assert'
import supertest from 'supertest'
import app from '../app.js'
import { sequelize } from '../utils/db.js'
import {
  initialAgenciesAgencyApi,
  emptyDbTables,
  testtoken,
} from './test_helper.js'
import { Agency } from '../models/index.js'

const api = supertest(app)
before(async () => {
  // await sequelize.sync({})
})

describe('/api/agency', () => {
  before(async () => {
    await emptyDbTables(['Agency'])

    const agencyObject1 = new Agency(initialAgenciesAgencyApi[0])
    await agencyObject1.save()
    const agencyObject2 = new Agency(initialAgenciesAgencyApi[1])
    await agencyObject2.save()
    const agencyObject3 = new Agency(initialAgenciesAgencyApi[2])
    await agencyObject3.save()
  })

  afterEach(async () => {
    await emptyDbTables(['Agency'])
  })

  test('getVolunteer returns correct volunteer', async () => {
    const response = await api
      .get('/api/agencies')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usernames = response.body.map((agency) => agency.username)

    assert(usernames.includes('agency1'))
    assert(usernames.includes('agency2'))
    assert(usernames.includes('agency3'))
  })

  after(async () => {
    await emptyDbTables(['Agency'])
  })
})

after(async () => {
  await sequelize.close()
})
