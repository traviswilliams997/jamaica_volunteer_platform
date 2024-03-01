import axios from '../api/axios'
const logoutEndpoint = 'api/logout'

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
