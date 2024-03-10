import axios from 'axios'
const BASE_URL = import.meta.env.VITE_BASE_URL

const postsEndpoint = `${BASE_URL}/api/posts`

const getAll = async () => {
  const config = {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  }
  const response = await axios.get(postsEndpoint, config)
  return response.data
}

const getPost = async (postId, customAxios) => {
  const response = await customAxios.get(`${postsEndpoint}/${postId}`)
  return response.data
}

const getForPerson = async (id, customAxios) => {
  const response = await customAxios.get(`${postsEndpoint}/${id}`)

  return response.data
}

const createVolunteerPost = async (newObject, customAxios) => {
  const response = await customAxios.post(
    `${postsEndpoint}/volunteer`,
    newObject
  )
  return response.data
}

const update = async (id, newObject, customAxios) => {
  const response = await customAxios.put(`${postsEndpoint}/${id}`, newObject)
  return response.data
}
const addComment = async (id, newObject, customAxios) => {
  const response = await customAxios.put(
    `${postsEndpoint}/${id}/comments`,
    newObject
  )
  return response.data
}

const likePost = async (postId, volunteerId, customAxios) => {
  const response = await customAxios.patch(
    `${postsEndpoint}/${postId}/like`,
    volunteerId
  )
  return response.data
}

const remove = async (id, customAxios) => {
  await customAxios.delete(`${postsEndpoint}/${id}`)
  return
}

export default {
  getAll,
  getPost,
  getForPerson,
  createVolunteerPost,
  addComment,
  update,
  remove,
  likePost,
}
