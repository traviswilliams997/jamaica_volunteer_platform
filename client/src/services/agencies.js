import axios from 'axios'
const agenciesEndpoint = '/api/agencies'

const getAll = async () => {
  const response = await axios.get(agenciesEndpoint)

  return response.data
}

export default {
  getAll,
}
