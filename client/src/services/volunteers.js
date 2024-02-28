import axios from '../api/axios'
const volunteersEndpoint = '/api/volunteers'

const getAll = async () => {
  const response = await axios.get(volunteersEndpoint)
  return response.data
}

export default { getAll }
