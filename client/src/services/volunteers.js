import axios from '../api/axios'

const volunteersEndpoint = '/api/volunteers'

const getAll = async () => {
  const response = await axios.get(volunteersEndpoint)
  return response.data
}

const getVolunteer = async (id) => {
  const response = await axios(`${volunteersEndpoint}/${id}`)
  return response.data
}

const getVolunteerFollowing = async (id) => {
  const response = await axios.get(`${volunteersEndpoint}/${id}`)
  return response.data
}

const getVolunteerFollowers = async (id) => {
  const response = await axios.get(`${volunteersEndpoint}/${id}`)
  return response.data
}

export default {
  getAll,
  getVolunteer,
  getVolunteerFollowing,
  getVolunteerFollowers,
}
