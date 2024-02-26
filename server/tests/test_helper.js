import Volunteer from '../models/volunteer.js'
import Agency from '../models/agency.js'

const initialVolunteers = [
  {
    username: 'jane123',
    firstName: 'jane',
    lastName: 'doe',
    email: 'jane@gmail.com',
    phoneNumber: '(876)666-777',
    password: '$2b$10$ig0b628/I1btIwlbqlT4SOUalbBEzkHMBl34/SL2GTwXTMtSr7d0i',
    picturePath: '',
    latitude: 18.0059,
    longitude: -76.7468,
    about: 'Lady',
    skills: 'Sports',
    admin: false,
  },
]

const initialAgencies = [
  {
    username: 'tutorkids',
    name: 'tutorkids',
    email: 'tutorkids@gmail.com',
    phoneNumber: '(876)666-5555',
    password: '$2b$10$ig0b628/I1btIwlbqlT4SOUalbBEzkHMBl34/SL2GTwXTMtSr7d0i',
    type: 'tutoring',
    picturePath: '',
    latitude: 18.0059,
    longitude: -76.7468,
    about: 'we help the kids',
    admin: false,
  },
]

const volunteersInDb = async () => {
  const volunteers = await Volunteer.findAll({})
  return volunteers.map((volunteer) => volunteer.toJSON())
}

const agenciesInDb = async () => {
  const agencies = await Agency.findAll({})
  return agencies.map((agency) => agency.toJSON())
}

export { initialVolunteers, initialAgencies, volunteersInDb, agenciesInDb }
