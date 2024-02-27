import axios from 'axios'
const baseUrl = '/api/posts'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getForPerson = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const createNew = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}
const addComment = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}/comments`, newObject)
  return response.data
}

const likePost = async (id) => {
  const response = await axios.patch(`${baseUrl}/${id}/like`)
  return response.data
}

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`)
  return
}

export default {
  getAll,
  getForPerson,
  createNew,
  addComment,
  update,
  remove,
  setToken,
  likePost,
}
