import axios from 'axios'
const BASE_URL = import.meta.env.VITE_BASE_URL

const eventsEndpoint = `${BASE_URL}/api/events`

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
