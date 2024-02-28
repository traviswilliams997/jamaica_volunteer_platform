import useAxiosPrivate from '../hooks/useAxiosPrivate'
const postsEndpoint = '/api/posts'

const getAll = async () => {
  const response = await useAxiosPrivate.get(postsEndpoint)
  return response.data
}

const getForPerson = async (id) => {
  const response = await useAxiosPrivate.get(`${postsEndpoint}/${id}`)
  return response.data
}

const createNew = async (newObject, token) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await useAxiosPrivate.post(postsEndpoint, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const response = await useAxiosPrivate.put(
    `${postsEndpoint}/${id}`,
    newObject
  )
  return response.data
}
const addComment = async (id, newObject) => {
  const response = await useAxiosPrivate.put(
    `${postsEndpoint}/${id}/comments`,
    newObject
  )
  return response.data
}

const likePost = async (id) => {
  const response = await useAxiosPrivate.patch(`${postsEndpoint}/${id}/like`)
  return response.data
}

const remove = async (id) => {
  await useAxiosPrivate.delete(`${postsEndpoint}/${id}`)
  return
}

export default {
  getAll,
  getForPerson,
  createNew,
  addComment,
  update,
  remove,
  likePost,
}
