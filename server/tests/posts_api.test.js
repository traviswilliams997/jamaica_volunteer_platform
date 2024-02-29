import { test, before, after, afterEach, describe } from 'node:test'
import assert from 'node:assert'
import supertest from 'supertest'
import app from '../app.js'
import { sequelize } from '../utils/db.js'
import {
  initialVolunteersPostApi,
  postsInDb,
  reactionsInDb,
  emptyDbTables,
  testtoken,
} from './test_helper.js'
import { Volunteer, Post } from '../models/index.js'

const api = supertest(app)

before(async () => {
  //await sequelize.sync({ force: true })
})

describe('posts api', () => {
  before(async () => {
    await emptyDbTables(['Post', 'Volunteer', 'Agency', 'Reaction', 'Comment'])
  })

  afterEach(async () => {
    await emptyDbTables(['Post', 'Volunteer', 'Agency', 'Reaction', 'Comment'])
  })

  test('volunteer can create post', async () => {
    const postsAtStart = await postsInDb()

    const volunteerObject = new Volunteer(initialVolunteersPostApi[0])
    await volunteerObject.save()
    const volunteerId = volunteerObject.dataValues.id

    const newPost = new Post({
      volunteerId,
      content: 'Hello World',
      picturePath: 'hello',
    })

    await api
      .post('/api/posts/')
      .send(newPost)
      .set({ Authorization: `Bearer ${testtoken}` })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const postsAtEnd = await postsInDb()
    assert.strictEqual(postsAtEnd.length, postsAtStart.length + 1)

    const contentAtStart = postsAtStart.map((p) => p.content)
    const contentAtEnd = postsAtEnd.map((p) => p.content)
    assert(!contentAtStart.includes('Hello World'))
    assert(contentAtEnd.includes('Hello World'))
  })

  test('volunteer can get post feed', async () => {
    const volunteerObject = new Volunteer(initialVolunteersPostApi[0])
    await volunteerObject.save()

    const volunteerId = volunteerObject.dataValues.id

    const newPost1 = new Post({
      volunteerId,
      content: 'First Post',
      picturePath: '',
    })
    const newPost2 = new Post({
      volunteerId,
      content: 'Second Post',
      picturePath: '',
    })
    await api
      .post('/api/posts/')
      .send(newPost1)
      .set({ Authorization: `Bearer ${testtoken}` })
      .expect(201)

    await api
      .post('/api/posts/')
      .send(newPost2)
      .set({ Authorization: `Bearer ${testtoken}` })
      .expect(201)

    await api
      .get('/api/posts/')
      .set({ Authorization: `Bearer ${testtoken}` })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const posts = await postsInDb()
    const contents = posts.map((p) => p.content)

    assert(contents.includes('First Post'))
    assert(contents.includes('Second Post'))
  })

  test.only('volunteer can retrieve their posts', async () => {
    const volunteerObject = new Volunteer(initialVolunteersPostApi[0])
    await volunteerObject.save()
    const volunteerId = volunteerObject.dataValues.id

    const newPost1 = new Post({
      volunteerId,
      content: 'Skate',
      picturePath: '',
    })
    const newPost2 = new Post({
      volunteerId,
      content: 'Board',
      picturePath: '',
    })
    await api
      .post('/api/posts/')
      .send(newPost1)
      .set({ Authorization: `Bearer ${testtoken}` })
      .expect(201)

    await api
      .post('/api/posts/')
      .send(newPost2)
      .set({ Authorization: `Bearer ${testtoken}` })
      .expect(201)

    const response = await api
      .get(`/api/posts/${volunteerId}/posts`)
      .set({ Authorization: `Bearer ${testtoken}` })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body[0].content, 'Skate')
    assert.strictEqual(response.body[1].content, 'Board')
  })

  test('volunteer can like post', async () => {
    const reactionsAtStart = await reactionsInDb()

    const volunteerObject = new Volunteer(initialVolunteersPostApi[0])
    await volunteerObject.save()
    const volunteerId = volunteerObject.dataValues.id

    const newPost1 = new Post({
      volunteerId,
      content: 'Skate',
      picturePath: '',
    })

    await api
      .post('/api/posts/')
      .send(newPost1)
      .set({ Authorization: `Bearer ${testtoken}` })
      .expect(201)

    const lastestPost = await Post.findOne({
      where: { volunteerId },
    })
    const lastestPostId = lastestPost.dataValues.id

    await api
      .patch(`/api/posts/${lastestPostId}/like`)
      .send({ volunteerId })
      .set({ Authorization: `Bearer ${testtoken}` })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const reactionsAtEnd = await reactionsInDb()

    assert.strictEqual(reactionsAtEnd.length, reactionsAtStart.length + 1)
  })

  test('volunteer can unlike post', async () => {
    const reactionsAtStart = await reactionsInDb()

    const volunteerObject = new Volunteer(initialVolunteersPostApi[0])
    await volunteerObject.save()
    const volunteerId = volunteerObject.dataValues.id

    const newPost1 = new Post({
      volunteerId,
      content: 'Skate',
      picturePath: '',
    })

    await api
      .post('/api/posts/')
      .send(newPost1)
      .set({ Authorization: `Bearer ${testtoken}` })
      .expect(201)

    const lastestPost = await Post.findOne({
      where: { volunteerId },
    })
    const lastestPostId = lastestPost.dataValues.id

    await api
      .patch(`/api/posts/${lastestPostId}/like`)
      .send({ volunteerId })
      .set({ Authorization: `Bearer ${testtoken}` })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    await api
      .patch(`/api/posts/${lastestPostId}/like`)
      .send({ volunteerId })
      .set({ Authorization: `Bearer ${testtoken}` })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const reactionsAtEnd = await reactionsInDb()

    assert.strictEqual(reactionsAtEnd.length, reactionsAtStart.length)
  })
  after(async () => {
    await emptyDbTables(['Post', 'Volunteer', 'Agency', 'Reaction', 'Comment'])
  })
})

after(async () => {
  await sequelize.close()
})
