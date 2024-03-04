import { test, before, after, afterEach, describe } from 'node:test'
import assert from 'node:assert'
import supertest from 'supertest'
import app from '../app.js'
import { sequelize } from '../utils/db.js'
import {
  initialAgenciesAgencyApi,
  emptyDbTables,
  testtoken,
  eventsInDb,
} from './test_helper.js'
import { Agency, Event } from '../models/index.js'

const api = supertest(app)
before(async () => {
  // await sequelize.sync({})
})

describe('/api/event', () => {
  before(async () => {
    await emptyDbTables(['Event', 'Agency'])
  })

  afterEach(async () => {
    await emptyDbTables(['Event', 'Agency'])
  })

  test('Event can be created', async () => {
    const agencyObject = new Agency(initialAgenciesAgencyApi[0])
    await agencyObject.save()

    const agencyId = agencyObject.dataValues.id

    const eventObject = {
      title: 'New Event',
      description: 'This is an event',
      date: '2024-03-29',
      location: '',
      latitude: 18,
      longitude: 17,
    }

    const response = await api
      .post(`/api/events/${agencyId}`)
      .send(eventObject)
      .set({ Authorization: `Bearer ${testtoken}` })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual('New Event', response.body.title)
  })

  test('Events can be retreived', async () => {
    const eventsAtStart = await eventsInDb()

    const agencyObject = new Agency(initialAgenciesAgencyApi[0])
    await agencyObject.save()

    const agencyId = agencyObject.dataValues.id

    const eventObject1 = new Event({
      createdByAgencyId: agencyId,
      title: 'First Event',
      agencyName: 'Agency 1',
      description: 'This is the first event',
      date: '2024-03-29',
      location: '',
      latitude: 18,
      longitude: 17,
    })

    await eventObject1.save()

    const eventObject2 = new Event({
      createdByAgencyId: agencyId,
      title: 'Second Event',
      agencyName: 'Agency 2',
      description: 'This is the second first event',
      date: '2024-03-29',
      location: '',
      latitude: 18,
      longitude: 17,
    })

    await eventObject2.save()

    const response = await api
      .get('/api/events')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const eventsAtEnd = await eventsInDb()

    assert.strictEqual(eventsAtEnd.length, eventsAtStart.length + 2)

    const titles = response.body.map((event) => event.title)

    assert(titles.includes('Second Event'))
    assert(titles.includes('First Event'))
  })

  after(async () => {
    await emptyDbTables(['Event', 'Agency'])
  })
})

after(async () => {
  await sequelize.close()
})
