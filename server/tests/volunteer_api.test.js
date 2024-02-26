import { test, before, after, describe } from 'node:test'
import assert from 'node:assert'
import supertest from 'supertest'
import app from '../app.js'
import { sequelize } from '../utils/db.js'
import {
  initialVolunteersVolunteerApi,
  followerRelationsInDb,
} from './test_helper.js'
import Volunteer from '../models/volunteer.js'
import Follower from '../models/follower.js'

const api = supertest(app)
before(async () => {
  await sequelize.sync({})
  // Follower.sync({ alter: true })
})

describe('/api/volunteers', () => {
  before(async () => {
    const followings = await Follower.findAll({})
    if (followings.length !== 0) {
      await Follower.destroy({
        where: {},
      })
    }
    const volunteers = await Volunteer.findAll({})
    if (volunteers.length !== 0) {
      await Volunteer.destroy({
        where: {
          admin: false,
        },
      })
    }

    let volunteerObject1 = new Volunteer(initialVolunteersVolunteerApi[1])
    await volunteerObject1.save()
    let volunteerObject2 = new Volunteer(initialVolunteersVolunteerApi[2])
    await volunteerObject2.save()
    let volunteerObject3 = new Volunteer(initialVolunteersVolunteerApi[3])
    await volunteerObject3.save()
  })

  test('getVolunteer returns correct volunteer', async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJheTQ0NCIsImlkIjoxMTEsImlhdCI6MTcwODkzNjcwMX0.ToBqZx-WCY_-ZLj_OB8kF-OdpkKIZ7qJVCVKljtzpAY'

    const { id } = await Volunteer.findOne({ where: { username: 'daniel33' } })

    const response = await api
      .get(`/api/volunteers/${id}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.username, 'daniel33')
  })

  test('followUnfollow can follow ', async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJheTQ0NCIsImlkIjoxMTEsImlhdCI6MTcwODkzNjcwMX0.ToBqZx-WCY_-ZLj_OB8kF-OdpkKIZ7qJVCVKljtzpAY'
    const daniel33 = await Volunteer.findOne({
      where: { username: 'daniel33' },
    })
    const stacey45 = await Volunteer.findOne({
      where: { username: 'stacey45' },
    })

    const followerRelationsAtStart = await followerRelationsInDb()

    await api
      .patch(`/api/volunteers/${daniel33.id}/${stacey45.id}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const followerRelationsAtEnd = await followerRelationsInDb()
    assert.strictEqual(
      followerRelationsAtEnd.length,
      followerRelationsAtStart.length + 1
    )
  })
  test('followUnfollow can unfollow ', async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJheTQ0NCIsImlkIjoxMTEsImlhdCI6MTcwODkzNjcwMX0.ToBqZx-WCY_-ZLj_OB8kF-OdpkKIZ7qJVCVKljtzpAY'

    const stacey45 = await Volunteer.findOne({
      where: { username: 'stacey45' },
    })

    const ray45 = await Volunteer.findOne({
      where: { username: 'ray45' },
    })

    let followerObject1 = new Follower({
      followingVolunteerId: stacey45.id,
      followedVolunteerId: ray45.id,
    })
    await followerObject1.save()

    const followerRelationsAtStart = await followerRelationsInDb()

    await api
      .patch(`/api/volunteers/${stacey45.id}/${ray45.id}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const followerRelationsAtEnd = await followerRelationsInDb()
    assert.strictEqual(
      followerRelationsAtEnd.length,
      followerRelationsAtStart.length - 1
    )
  })

  test('getFollowing ', async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJheTQ0NCIsImlkIjoxMTEsImlhdCI6MTcwODkzNjcwMX0.ToBqZx-WCY_-ZLj_OB8kF-OdpkKIZ7qJVCVKljtzpAY'

    const daniel33 = await Volunteer.findOne({
      where: { username: 'daniel33' },
    })
    const ray45 = await Volunteer.findOne({
      where: { username: 'ray45' },
    })

    let followerObject1 = new Follower({
      followingVolunteerId: daniel33.id,
      followedVolunteerId: ray45.id,
    })
    await followerObject1.save()

    const response = await api
      .get(`/api/volunteers/${daniel33.id}/following`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body[0].username, 'stacey45')
    assert.strictEqual(response.body[1].username, 'ray45')
  })

  test('getFollowers ', async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJheTQ0NCIsImlkIjoxMTEsImlhdCI6MTcwODkzNjcwMX0.ToBqZx-WCY_-ZLj_OB8kF-OdpkKIZ7qJVCVKljtzpAY'

    const ray45 = await Volunteer.findOne({
      where: { username: 'ray45' },
    })

    const response = await api
      .get(`/api/volunteers/${ray45.id}/followers`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body[0].username, 'daniel33')
  })

  after(async () => {
    await Follower.destroy({
      where: {},
    })
    await Volunteer.destroy({
      where: {
        admin: false,
      },
    })
  })
})

after(async () => {
  await sequelize.close()
})
