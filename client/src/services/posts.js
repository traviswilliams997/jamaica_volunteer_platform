const postsEndpoint = '/api/posts'

const getAll = async (customAxios) => {
  const response = await customAxios.get(postsEndpoint)
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

const createNew = async (newObject, customAxios) => {
  const response = await customAxios.post(postsEndpoint, newObject)
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
  createNew,
  addComment,
  update,
  remove,
  likePost,
}
