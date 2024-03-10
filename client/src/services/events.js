import axios from 'axios'
const eventsEndpoint = '/api/events'

const getAll = async () => {
  const config = {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  }

  const response = await axios.get(eventsEndpoint, config)
  return response.data
}
export default {
  getAll,
}
