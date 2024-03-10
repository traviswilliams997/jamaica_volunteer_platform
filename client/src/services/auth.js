import axios from '../api/axios'
const BASE_URL = import.meta.env.VITE_BASE_URL
const authEndpoint = `/api/auth`

const logAgencyIn = async (credentials) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  }
  const response = await axios.post(
    `${authEndpoint}/login/agency`,
    credentials,
    config
  )
  return response.data
}

const logVolunteerIn = async (credentials) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  }
  const response = await axios.post(
    `${authEndpoint}/login/volunteer`,
    credentials,
    config
  )
  return response.data
}

const registerAgency = async (agencyObject) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  }
  const response = await axios.post(
    `${authEndpoint}/register/agency`,
    agencyObject,
    config
  )
  return response.data
}

const registerVolunteer = async (volunteerObject) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  }
  const response = await axios.post(
    `${authEndpoint}/register/volunteer`,
    volunteerObject,
    config
  )
  return response.data
}

export default {
  logAgencyIn,
  logVolunteerIn,
  registerAgency,
  registerVolunteer,
}
