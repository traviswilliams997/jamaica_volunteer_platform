import { createSlice } from '@reduxjs/toolkit'
import postService from '../services/posts'

const intialState = {
  currentVolunteersPosts: [],
  allPosts: [],
}

const postSlice = createSlice({
  name: 'posts',
  initialState: intialState,
  reducers: {
    appendPost(state, action) {
      state.allPosts.push(action.payload.post)
    },
    setPosts(state, action) {
      return action.payload.posts
    },
    appendCurrentVolunteersPost(state, action) {
      state.currentVolunteersPosts.push(action.payload.post)
    },
    setCurrentVolunteersPosts(state, action) {
      return action.payload.posts
    },
  },
})

export const {
  appendPost,
  setPosts,
  appendCurrentVolunteersPost,
  setCurrentVolunteersPosts,
} = postSlice.actions

export const initializePosts = (customAxios) => {
  return async (dispatch) => {
    const posts = await postService.getAll(customAxios)

    dispatch(setPosts({ posts: posts }))
  }
}
export const initializeVolunteerPost = (id, customAxios) => {
  return async (dispatch) => {
    const posts = await postService.getForPerson(id, customAxios)

    dispatch(setCurrentVolunteersPosts({ posts: posts }))
  }
}
export const createVolunteerPost = (newObject, customAxios) => {
  return async (dispatch) => {
    const newPost = await postService.createVolunteerPost(
      newObject,
      customAxios
    )
    dispatch(appendPost({ post: newPost }))
  }
}

export const removePost = (id) => {
  return async (dispatch) => {
    const posts = await postService.getAll()
    await postService.remove(id)
    const newPosts = posts.filter((b) => b.id !== id)
    dispatch(setPosts({ posts: newPosts }))
  }
}

export const likeUnlikePost = (postId, volunteerId, customAxios) => {
  return async (dispatch) => {
    const posts = await postService.getAll(customAxios)

    try {
      await postService.likePost(postId, volunteerId, customAxios)

      const updatedPost = await postService.getPost(postId, customAxios)

      const newPosts = posts.map((post) =>
        post.id !== postId ? post : updatedPost
      )

      dispatch(setPosts({ posts: newPosts }))
    } catch (error) {
      console.log('error', error)
    }
  }
}

export const addComment = (id, commentContent, customAxios) => {
  return async (dispatch) => {
    const posts = await postService.getAll(customAxios)
    const comment = {
      content: commentContent,
    }
    try {
      const post = await post.find((post) => post.id === id)
      const changedPost = { ...post }
      changedPost.comments.push(comment)
      const returnedPost = await postService.addComment(id, comment)
      const newPosts = posts.map((post) =>
        post.id !== id ? post : returnedPost
      )

      dispatch(setPosts({ posts: newPosts }))
    } catch (error) {
      dispatch(setPosts(posts.filter((post) => post.id !== id)))
    }
  }
}

export const clearPosts = () => {
  return async (dispatch) => {
    dispatch(setPosts([]))
    dispatch(setCurrentVolunteersPosts([]))
  }
}

export default postSlice.reducer
