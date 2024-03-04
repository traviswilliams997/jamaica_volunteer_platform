import { test, before, after, afterEach, describe } from 'node:test'
import assert from 'node:assert'
import supertest from 'supertest'
import app from '../app.js'
import { sequelize } from '../utils/db.js'
import {
  initialAgenciesAgencyApi,
  emptyDbTables,
  positionsInDb,
  membershipsInDb,
  testtoken,
} from './test_helper.js'
import { Agency, Position, Volunteer } from '../models/index.js'

const api = supertest(app)
before(async () => {
  // await sequelize.sync({})
})

describe('/api/agency', () => {
  before(async () => {
    await emptyDbTables(['Agency', 'Position', 'Volunteer'])

    const agencyObject1 = new Agency(initialAgenciesAgencyApi[0])
    await agencyObject1.save()
    const agencyObject2 = new Agency(initialAgenciesAgencyApi[1])
    await agencyObject2.save()
    const agencyObject3 = new Agency(initialAgenciesAgencyApi[2])
    await agencyObject3.save()
  })

  afterEach(async () => {
    await emptyDbTables(['Agency', 'Position', 'Volunteer'])
  })

  test('getAgencies returns alls agencies', async () => {
    const response = await api
      .get('/api/agencies')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usernames = response.body.map((agency) => agency.username)

    assert(usernames.includes('agency1'))
    assert(usernames.includes('agency2'))
    assert(usernames.includes('agency3'))
  })

  test('getAgency returns correct ', async () => {
    const agencyObject1 = new Agency(initialAgenciesAgencyApi[0])
    const savedAgency = await agencyObject1.save()

    const response = await api
      .get(`/api/agencies/${savedAgency.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.username, savedAgency.username)
    assert.strictEqual(response.body.email, savedAgency.email)
  })

  test('createPostion can create position ', async () => {
    const positionsAtStart = await positionsInDb()
    const agencyObject1 = new Agency({
      username: 'agency4',
      name: 'Agency4',
      email: 'agency4@gmail.com',
      phoneNumber: '(876)4565-7777',
      password: '$2b$10$Np6l5ud3oK/sCxtPkLCze.jSZRAR6Og9vzSpKItE93LkGqU7ZuVpa',
    })
    const savedAgency = await agencyObject1.save()

    const postionObject = {
      agencyId: savedAgency.id,
      title: 'New position',
      description: 'positioning',
      skills: 'zero skills',
      schedule: 'every day',
      vacancies: -20,
    }

    const response = await api
      .post(`/api/agencies/${savedAgency.id}/position`)
      .send(postionObject)
      .set({ Authorization: `Bearer ${testtoken}` })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const positionsAtEnd = await positionsInDb()

    assert.strictEqual(positionsAtEnd.length, positionsAtStart.length + 1)
    assert.strictEqual(response.body.title, postionObject.title)
    assert.strictEqual(response.body.description, postionObject.description)
    assert.strictEqual(response.body.agencyId, postionObject.agencyId)
  })

  test('addMember works ', async () => {
    const membersAtStart = await membershipsInDb()
    const agencyObject1 = new Agency(initialAgenciesAgencyApi[0])
    const savedAgency = await agencyObject1.save()

    const volunteerObject = new Volunteer({
      username: 'Person1',
      firstName: 'Person',
      email: 'person4@gmail.com',
      phoneNumber: '(876)4565-7777',
      password: '$2b$10$Np6l5ud3oK/sCxtPkLCze.jSZRAR6Og9vzSpKItE93LkGqU7ZuVpa',
    })
    const savedVolunteer = await volunteerObject.save()

    const membershipObject = {
      agencyId: savedAgency.id,
      volunteerId: savedVolunteer.id,
      position: 'Lead',
      status: 'Pending',
    }

    const response = await api
      .post('/api/agencies/join')
      .send(membershipObject)
      .set({ Authorization: `Bearer ${testtoken}` })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const membersAtEnd = await membershipsInDb()

    assert.strictEqual(membersAtEnd.length, membersAtStart.length + 1)
  })
})

after(async () => {
  await sequelize.close()
})
