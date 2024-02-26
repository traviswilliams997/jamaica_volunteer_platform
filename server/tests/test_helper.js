import Volunteer from '../models/volunteer.js'
import Agency from '../models/agency.js'
import Follower from '../models/follower.js'

const initialVolunteersAuthApi = [
  {
    username: 'jane123',
    firstName: 'jane',
    lastName: 'doe',
    email: 'jane@gmail.com',
    phoneNumber: '(876)666-777',
    password: '$2b$10$Np6l5ud3oK/sCxtPkLCze.jSZRAR6Og9vzSpKItE93LkGqU7ZuVpa',
    picturePath: '',
    latitude: 18.0059,
    longitude: -76.7468,
    about: 'Lady',
    skills: 'Sports',
    admin: false,
  },
]

const initialVolunteersVolunteerApi = [
  {
    username: 'jane123',
    firstName: 'jane',
    lastName: 'doe',
    email: 'jane@gmail.com',
    phoneNumber: '(876)666-777',
    password: '$2b$10$Np6l5ud3oK/sCxtPkLCze.jSZRAR6Og9vzSpKItE93LkGqU7ZuVpa',
    picturePath: '',
    latitude: 18.0059,
    longitude: -76.7468,
    about: 'Lady',
    skills: 'Sports',
    admin: false,
  },
  {
    username: 'daniel33',
    firstName: 'daniel',
    lastName: 'francis',
    email: 'daniel@gmail.com',
    phoneNumber: '(876)666-777',
    password: '$2b$10$Np6l5ud3oK/sCxtPkLCze.jSZRAR6Og9vzSpKItE93LkGqU7ZuVpa',
    picturePath: '',
    latitude: 18.0059,
    longitude: -76.7468,
    about: 'Guy',
    skills: 'Basketball',
    admin: false,
  },
  {
    username: 'ray45',
    firstName: 'ray',
    lastName: 'wells',
    email: 'jess@gmail.com',
    phoneNumber: '(876)999-1777',
    password: '$2b$10$Np6l5ud3oK/sCxtPkLCze.jSZRAR6Og9vzSpKItE93LkGqU7ZuVpa',
    picturePath: '',
    latitude: 18.0059,
    longitude: -76.7468,
    about: 'Playful',
    skills: 'Soccer',
    admin: false,
  },
  {
    username: 'stacey45',
    firstName: 'stacey',
    lastName: 'bell',
    email: 'stacey@gmail.com',
    phoneNumber: '(876)333-1877',
    password: '$2b$10$Np6l5ud3oK/sCxtPkLCze.jSZRAR6Og9vzSpKItE93LkGqU7ZuVpa',
    picturePath: '',
    latitude: 18.0059,
    longitude: -76.7468,
    about: 'Chill',
    skills: 'Makeup',
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

const followerRelationsInDb = async () => {
  const relations = await Follower.findAll({})
  return relations.map((relation) => relation.toJSON())
}

export {
  initialVolunteersAuthApi,
  initialVolunteersVolunteerApi,
  initialAgencies,
  volunteersInDb,
  agenciesInDb,
  followerRelationsInDb,
}
