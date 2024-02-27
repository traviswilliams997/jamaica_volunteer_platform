import axios from 'axios'
const baseUrl = '/api/auth'

const logAgencyIn = async (credentials) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  }
  const response = await axios.post(
    `${baseUrl}/login/agency`,
    credentials,
    config
  )
  return response.data
}

const logVolunteerIn = async (credentials) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  }
  const response = await axios.post(
    `${baseUrl}/login/volunteer`,
    credentials,
    config
  )
  return response.data
}

const registerAgency = async (agencyObject) => {
  const response = await axios.post(`${baseUrl}/register/agency`, agencyObject)
  return response.data
}

const registerVolunteer = async (volunteerObject) => {
  const response = await axios.post(
    `${baseUrl}/register/volunteer`,
    volunteerObject
  )
  return response.data
}

export default {
  logAgencyIn,
  logVolunteerIn,
  registerAgency,
  registerVolunteer,
}
