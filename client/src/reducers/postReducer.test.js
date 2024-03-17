import postReducer from './postReducer'
import deepFreeze from 'deep-freeze'

describe('blogReducer', () => {
  test('returns new state with action posts/setPosts', () => {
    const state = []
    const action = {
      type: 'post/setPosts',
      payload: [
        {
          createdByVolunteerId: 1,
          createdByAgencyId: null,
          type: 'Volunteer',
          content: 'First post',
          posterPicturePath: 'some picture path',
          picturePath: 'some other picture path',
        },
      ],
    }

    deepFreeze(state)
    const newState = postReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState.createdByVolunteerId).toBe(
      action.payload.createdByVolunteerId
    )

    expect(newState.createdByAgencyId).toBe(action.payload.createdByAgencyId)
    expect(newState.type).toBe(action.payload.type)
    expect(newState.content).toBe(action.payload.content)
    expect(newState.posterPicturePath).toBe(action.payload.posterPicturePath)
    expect(newState.picturePath).toBe(action.payload.picturePath)
  })

  test('returns new state with action post/appendPost', () => {
    const posts = [
      {
        createdByVolunteerId: 1,
        createdByAgencyId: null,
        type: 'Volunteer',
        content: 'First post',
        posterPicturePath: 'some picture path',
        picturePath: 'some other picture path',
      },
      {
        createdByVolunteerId: null,
        createdByAgencyId: 1,
        type: 'Agency',
        content: 'Second',
        posterPicturePath: 'path 3',
        picturePath: 'path 4',
      },
    ]
    const state = { posts }
    const action = {
      type: 'post/appendPost',
      payload: {
        createdByVolunteerId: 2,
        createdByAgencyId: null,
        type: 'Volunteer',
        content: 'Third Post',
        posterPicturePath: 'path 4',
        picturePath: 'path 5',
      },
    }

    deepFreeze(state)
    const newState = postReducer(state, action)

    expect(newState.posts).toHaveLength(3)

    expect(newState.posts).toContainEqual(state.posts[0])

    expect(newState.posts).toContainEqual({
      createdByVolunteerId: 2,
      createdByAgencyId: null,
      type: 'Volunteer',
      content: 'Third Post',
      posterPicturePath: 'path 4',
      picturePath: 'path 5',
    })
  })
})
