import Volunteer from '../models/volunteer.js'
import Agency from '../models/agency.js'
import Follower from '../models/follower.js'
import Post from '../models/post.js'
import Reaction from '../models/reaction.js'

const initialVolunteersAuthApi = [
  {
    username: 'jane123',
    firstName: 'jane',
    lastName: 'doe',
    email: 'jane@gmail.com',
    phoneNumber: '(876)666-7767',
    password: '$2b$10$Np6l5ud3oK/sCxtPkLCze.jSZRAR6Og9vzSpKItE93LkGqU7ZuVpa',
    picturePath: '',
    latitude: 18.0059,
    longitude: -76.7468,
    about: 'Lady',
    skills: 'Sports',
    admin: false,
  },
]

const initialAgenciesAuthApi = [
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

const initialVolunteersVolunteerApi = [
  {
    username: 'daniel33',
    firstName: 'daniel',
    lastName: 'francis',
    email: 'daniel@gmail.com',
    phoneNumber: '(876)666-7777',
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

const initialVolunteersPostApi = [
  {
    username: 'andrew99',
    firstName: 'andrew',
    lastName: 'brown',
    email: 'andrewq@gmail.com',
    phoneNumber: '(876)234-7770',
    password: '$2b$10$Np6l5ud3oK/sCxtPkLCze.jSZRAR6Og9vzSpKItE93LkGqU7ZuVpa',
    picturePath: '',
    latitude: 18.0059,
    longitude: -76.7468,
    about: 'Loves chess',
    skills: 'Chess',
    admin: false,
  },
]
const initialPostsPostApi = [
  {
    volunteerId: 1,
    content: 'First Post',
    type: 'Volunteer',
    posterPicturePath: '',
    picturePath: '',
  },
  {
    volunteerId: 2,
    content: 'Second Post',
    type: 'Volunteer',
    posterPicturePath: '',
    picturePath: '',
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

const postsInDb = async () => {
  const posts = await Post.findAll({})
  return posts.map((post) => post.toJSON())
}

const reactionsInDb = async () => {
  const reactions = await Reaction.findAll({})
  return reactions.map((reaction) => reaction.toJSON())
}

export {
  initialVolunteersAuthApi,
  initialAgenciesAuthApi,
  initialVolunteersVolunteerApi,
  initialVolunteersPostApi,
  initialPostsPostApi,
  reactionsInDb,
  volunteersInDb,
  agenciesInDb,
  followerRelationsInDb,
  postsInDb,
}
