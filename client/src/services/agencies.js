import axios from 'axios'
const agenciesEndpoint = '/api/agencies'

const getAll = async () => {
  const response = await axios.get(agenciesEndpoint)
  return response.data
}

const getById = async (id, customAxios) => {
  const response = await customAxios.get(`${agenciesEndpoint}/${id}`)
  return response.data
}

export default {
  getAll,
  getById,
}
