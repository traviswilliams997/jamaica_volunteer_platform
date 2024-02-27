import { createSlice } from '@reduxjs/toolkit'
import postService from '../services/posts'

const postSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    appendPost(state, action) {
      state.push(action.payload)
    },
    setPosts(state, action) {
      return action.payload
    },
  },
})

export const { appendPost, setPosts } = postSlice.actions

export const initializePosts = () => {
  return async (dispatch) => {
    const posts = await postService.getAll()
    // const sortedPosts = [...posts]
    // sortedPosts.sort((a, b) => b.likes - a.likes)
    dispatch(setPosts(posts))
  }
}
export const createPost = (newObject) => {
  return async (dispatch) => {
    const newPost = await postService.createNew(newObject)
    dispatch(appendPost(newPost))
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

export const incrementLikes = (id) => {
  return async (dispatch) => {
    const posts = await postService.getAll()

    try {
      const posts = await posts.find((posts) => posts.id === id)
      const changedPost = { ...posts, likes: posts.likes + 1 }
      const returnedPost = await postService.update(id, changedPost)
      const newPosts = posts.map((post) =>
        post.id !== id ? posts : returnedPost
      )
      //  const sortedPosts= [...newPosts]
      // sortedPosts.sort((a, b) => b.likes - a.likes)
      dispatch(setPosts(newPosts))
    } catch (error) {
      //    likesErrorHandling(error)
      dispatch(setPosts(posts.filter((post) => post.id !== id)))
    }
  }
}

export const addComment = (id, commentContent) => {
  return async (dispatch) => {
    const posts = await postService.getAll()
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
      // const sortedPosts = [...newPosts]
      //sortedPosts.sort((a, b) => b.likes - a.likes)
      dispatch(setPosts(newPosts))
    } catch (error) {
      dispatch(setPosts(posts.filter((post) => post.id !== id)))
    }
  }
}

export default postSlice.reducer
