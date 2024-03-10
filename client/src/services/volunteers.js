import axios from 'axios'
const volunteersEndpoint = '/api/volunteers'

const getAll = async () => {
  const config = {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  }

  const response = await axios.get(volunteersEndpoint, config)
  return response.data
}

const getById = async (id, customAxios) => {
  const response = await customAxios.get(`${volunteersEndpoint}/${id}`)
  return response.data
}

const getFollowing = async (id, customAxios) => {
  if (typeof id === 'undefined') return []
  const response = await customAxios.get(
    `${volunteersEndpoint}/${id}/following`
  )

  return response.data
}

const getFollowers = async (id, customAxios) => {
  const response = await customAxios.get(
    `${volunteersEndpoint}/${id}/followers`
  )
  return response.data
}

const checkIsFollowing = async (id, followedId, customAxios) => {
  const response = await customAxios.get(
    `${volunteersEndpoint}/${id}/${followedId}`
  )
  return response.data
}

const followUnfollow = async (id, follwedId, customAxios) => {
  const response = await customAxios.patch(
    `${volunteersEndpoint}/${id}/${follwedId}`
  )
  return response.data
}

export default {
  getAll,
  getById,
  getFollowing,
  getFollowers,
  checkIsFollowing,
  followUnfollow,
}
