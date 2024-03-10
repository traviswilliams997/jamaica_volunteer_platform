import axios from '../api/axios'
const BASE_URL = import.meta.env.VITE_BASE_URL

const logoutEndpoint = `${BASE_URL}api/logout`

const logOutVolunteer = async () => {
  const response = await axios.get(`${logoutEndpoint}/volunteer`)

  return response.data
}

const logOutAgency = async () => {
  const response = await axios.get(`${logoutEndpoint}/volunteer`)

  return response.data
}

export default {
  logOutVolunteer,
  logOutAgency,
}
