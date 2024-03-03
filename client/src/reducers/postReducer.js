import { createSlice } from '@reduxjs/toolkit'
import postService from '../services/posts'

const intialState = {
  posts: [],
}

const postSlice = createSlice({
  name: 'posts',
  initialState: intialState,
  reducers: {
    appendPost(state, action) {
      state.posts.push(action.payload)
    },
    setPosts(state, action) {
      return action.payload
    },
  },
})

export const {
  appendPost,
  setPosts,
  appendCurrentVolunteersPost,
  setCurrentVolunteersPosts,
} = postSlice.actions

export const initializePosts = () => {
  return async (dispatch) => {
    const posts = await postService.getAll()

    dispatch(setPosts(posts))
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
    dispatch(setPosts(newPosts))
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

      dispatch(setPosts(newPosts))
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

      dispatch(setPosts(newPosts))
    } catch (error) {
      dispatch(setPosts(posts.filter((post) => post.id !== id)))
    }
  }
}

export const clearPosts = () => {
  return async (dispatch) => {
    dispatch(setPosts([]))
  }
}

export default postSlice.reducer
