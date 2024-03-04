import { test, before, after, afterEach, describe } from 'node:test'
import assert from 'node:assert'
import supertest from 'supertest'
import app from '../app.js'
import { sequelize } from '../utils/db.js'
import {
  initialVolunteersVolunteerApi,
  followerRelationsInDb,
  emptyDbTables,
  testtoken,
} from './test_helper.js'
import { Volunteer, Follower } from '../models/index.js'

const api = supertest(app)
before(async () => {
  // await sequelize.sync({})
})

describe('/api/volunteers', () => {
  before(async () => {
    await emptyDbTables(['Volunteer', 'Follower'])

    const volunteerObject1 = new Volunteer(initialVolunteersVolunteerApi[0])
    await volunteerObject1.save()
    const volunteerObject2 = new Volunteer(initialVolunteersVolunteerApi[1])
    await volunteerObject2.save()
    const volunteerObject3 = new Volunteer(initialVolunteersVolunteerApi[2])
    await volunteerObject3.save()
  })

  afterEach(async () => {
    await emptyDbTables(['Follower'])
  })

  test('getVolunteer returns correct volunteer', async () => {
    const { id } = await Volunteer.findOne({ where: { username: 'daniel33' } })

    const response = await api
      .get(`/api/volunteers/${id}`)
      .set({ Authorization: `Bearer ${testtoken}` })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.username, 'daniel33')
  })

  test('followUnfollow can follow ', async () => {
    const daniel33 = await Volunteer.findOne({
      where: { username: 'daniel33' },
    })
    const stacey45 = await Volunteer.findOne({
      where: { username: 'stacey45' },
    })

    const followerRelationsAtStart = await followerRelationsInDb()

    const response = await api
      .patch(`/api/volunteers/${daniel33.id}/${stacey45.id}`)
      .set({ Authorization: `Bearer ${testtoken}` })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const followerRelationsAtEnd = await followerRelationsInDb()

    assert.strictEqual(
      followerRelationsAtEnd.length,
      followerRelationsAtStart.length + 1
    )

    assert.strictEqual(daniel33.id, response.body.following_volunteer_id)
    assert.strictEqual(stacey45.id, response.body.followed_volunteer_id)
  })
  test('followUnfollow can unfollow ', async () => {
    const stacey45 = await Volunteer.findOne({
      where: { username: 'stacey45' },
    })

    const ray45 = await Volunteer.findOne({
      where: { username: 'ray45' },
    })

    const followerObject1 = new Follower({
      following_volunteer_id: stacey45.id,
      followed_volunteer_id: ray45.id,
    })
    await followerObject1.save()

    const followerRelationsAtStart = await followerRelationsInDb()

    await api
      .patch(`/api/volunteers/${stacey45.id}/${ray45.id}`)
      .set({ Authorization: `Bearer ${testtoken}` })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const followerRelationsAtEnd = await followerRelationsInDb()
    assert.strictEqual(
      followerRelationsAtEnd.length,
      followerRelationsAtStart.length - 1
    )
  })

  test('getFollowing ', async () => {
    const daniel33 = await Volunteer.findOne({
      where: { username: 'daniel33' },
    })
    const ray45 = await Volunteer.findOne({
      where: { username: 'ray45' },
    })

    const stacey45 = await Volunteer.findOne({
      where: { username: 'stacey45' },
    })

    const followerObject1 = new Follower({
      following_volunteer_id: ray45.id,
      followed_volunteer_id: daniel33.id,
    })
    await followerObject1.save()

    const followerObject2 = new Follower({
      following_volunteer_id: ray45.id,
      followed_volunteer_id: stacey45.id,
    })
    await followerObject2.save()

    const response = await api
      .get(`/api/volunteers/${ray45.id}/following`)
      .set({ Authorization: `Bearer ${testtoken}` })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const fetchedFollowing = response.body

    const usernames = fetchedFollowing.map((following) => following.username)

    assert(usernames.includes(stacey45.username))
    assert(usernames.includes(daniel33.username))
  })

  test('getFollowers ', async () => {
    const daniel33 = await Volunteer.findOne({
      where: { username: 'daniel33' },
    })
    const ray45 = await Volunteer.findOne({
      where: { username: 'ray45' },
    })

    const stacey45 = await Volunteer.findOne({
      where: { username: 'stacey45' },
    })

    const followerObject1 = new Follower({
      following_volunteer_id: ray45.id,
      followed_volunteer_id: stacey45.id,
    })
    await followerObject1.save()

    const followerObject2 = new Follower({
      following_volunteer_id: daniel33.id,
      followed_volunteer_id: stacey45.id,
    })
    await followerObject2.save()

    const response = await api
      .get(`/api/volunteers/${stacey45.id}/followers`)
      .set({ Authorization: `Bearer ${testtoken}` })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const fetchedFollowers = response.body

    const usernames = fetchedFollowers.map((follower) => follower.username)

    assert(usernames.includes(ray45.username))
    assert(usernames.includes(daniel33.username))
  })

  test('volunteer can check if they are following someone', async () => {
    const daniel33 = await Volunteer.findOne({
      where: { username: 'daniel33' },
    })
    const ray45 = await Volunteer.findOne({
      where: { username: 'ray45' },
    })

    const stacey45 = await Volunteer.findOne({
      where: { username: 'stacey45' },
    })

    const followerObject1 = new Follower({
      following_volunteer_id: ray45.id,
      followed_volunteer_id: daniel33.id,
    })
    await followerObject1.save()

    const isFollowing = await api
      .get(`/api/volunteers/${ray45.id}/${daniel33.id}`)
      .set({ Authorization: `Bearer ${testtoken}` })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const isNotFollowing = await api
      .get(`/api/volunteers/${ray45.id}/${stacey45.id}`)
      .set({ Authorization: `Bearer ${testtoken}` })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(isFollowing.body, true)
    assert.strictEqual(isNotFollowing.body, false)
  })

  after(async () => {
    await emptyDbTables(['Volunteer', 'Follower'])
  })
})

after(async () => {
  await sequelize.close()
})
