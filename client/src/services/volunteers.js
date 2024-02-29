const volunteersEndpoint = '/api/volunteers'

const getAll = async (customAxios) => {
  const response = await customAxios.get(volunteersEndpoint)

  return response.data
}

const getById = async (id, customAxios) => {
  const response = await customAxios.get(`${volunteersEndpoint}/${id}`)
  return response.data
}

const getFollowing = async (id, customAxios) => {
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
  followUnfollow,
}
