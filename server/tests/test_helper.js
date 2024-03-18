import {
  Volunteer,
  Agency,
  Follower,
  Post,
  Reaction,
  VolunteerToken,
  AgencyToken,
  Position,
  Event,
  Membership,
} from '../models/index.js'

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

const initialAgenciesAgencyApi = [
  {
    username: 'agency1',
    name: 'Agency1',
    email: 'agency1@gmail.com',
    phoneNumber: '(876)666-7777',
    password: '$2b$10$Np6l5ud3oK/sCxtPkLCze.jSZRAR6Og9vzSpKItE93LkGqU7ZuVpa',
  },
  {
    username: 'agency2',
    name: 'Agency2',
    email: 'agency2@gmail.com',
    phoneNumber: '(876)999-1777',
    password: '$2b$10$Np6l5ud3oK/sCxtPkLCze.jSZRAR6Og9vzSpKItE93LkGqU7ZuVpa',
    picturePath: '',
  },
  {
    username: 'agency3',
    name: 'Agency3',
    email: 'agency3@gmail.com',
    phoneNumber: '(876)333-1877',
    password: '$2b$10$Np6l5ud3oK/sCxtPkLCze.jSZRAR6Og9vzSpKItE93LkGqU7ZuVpa',
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

const volunteerTokensInDb = async () => {
  const tokens = await VolunteerToken.findAll({})
  return tokens.map((token) => token.toJSON())
}

const agencyTokensInDb = async () => {
  const tokens = await AgencyToken.findAll({})
  return tokens.map((token) => token.toJSON())
}

const eventsInDb = async () => {
  const events = await Event.findAll({})
  return events.map((e) => e.toJSON())
}

const positionsInDb = async () => {
  const positions = await Position.findAll({})
  return positions.map((p) => p.toJSON())
}

const membershipsInDb = async () => {
  const memberships = await Membership.findAll({})
  return memberships.map((m) => m.toJSON())
}

const emptyDbTables = async (models) => {
  console.log('EMPTYING DATABASE')
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
  if (models.includes('Position')) {
    await Position.destroy({
      where: {},
    })
  }
  if (models.includes('Event')) {
    await Event.destroy({
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
  if (models.includes('VolunteerToken')) {
    await VolunteerToken.destroy({ where: {} })
  }
  if (models.includes('AgencyToken')) {
    await AgencyToken.destroy({ where: {} })
  }
  if (models.includes('Event')) {
    await Event.destroy({ where: {} })
  }
}

const testtoken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJheTQ0NCIsImlkIjoxMTEsImlhdCI6MTcwODkzNjcwMX0.ToBqZx-WCY_-ZLj_OB8kF-OdpkKIZ7qJVCVKljtzpAY'

export {
  testtoken,
  initialVolunteersVolunteerApi,
  initialVolunteersPostApi,
  initialAgenciesAgencyApi,
  emptyDbTables,
  reactionsInDb,
  volunteersInDb,
  agenciesInDb,
  followerRelationsInDb,
  postsInDb,
  volunteerTokensInDb,
  agencyTokensInDb,
  eventsInDb,
  positionsInDb,
  membershipsInDb,
}
