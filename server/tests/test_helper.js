import Volunteer from '../models/index.js'
import Agency from '../models/index.js'
import Follower from '../models/index.js'
import Post from '../models/index.js'
import Reaction from '../models/index.js'

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

const emptyDbTables = async (models) => {
  if (models.includes('Follower')) {
    await Follower.destroy({
      where: {},
    })
  }
  if (models.includes('Reaction')) {
    await Reaction.destroy({
      where: {},
    })
  }

  if (models.includes('Post')) {
    await Post.destroy({
      where: {},
    })
  }
  if (models.includes('Agency')) {
    await Agency.destroy({
      where: { admin: false },
    })
  }
  if (models.includes('Volunteer')) {
    await Volunteer.destroy({
      where: { admin: false },
    })
  }
}

const testtoken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJheTQ0NCIsImlkIjoxMTEsImlhdCI6MTcwODkzNjcwMX0.ToBqZx-WCY_-ZLj_OB8kF-OdpkKIZ7qJVCVKljtzpAY'

export {
  testtoken,
  initialVolunteersAuthApi,
  initialAgenciesAuthApi,
  initialVolunteersVolunteerApi,
  initialVolunteersPostApi,
  emptyDbTables,
  reactionsInDb,
  volunteersInDb,
  agenciesInDb,
  followerRelationsInDb,
  postsInDb,
}
