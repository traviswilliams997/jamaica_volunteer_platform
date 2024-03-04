import axios from 'axios'
const eventsEndpoint = '/api/events'

const getAll = async () => {
  const response = await axios.get(eventsEndpoint)
  return response.data
}
export default {
  getAll,
}
