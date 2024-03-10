import axios from 'axios'
const BASE_URL = import.meta.env.VITE_BASE_URL

const agenciesEndpoint = `${BASE_URL}/api/agencies`

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
