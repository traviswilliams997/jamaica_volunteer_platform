import { Agency, Position, Event, Membership } from '../models/index.js'

/*READ */
export const getAgencies = async (req, res) => {
  try {
    const agencies = await Agency.findAll({
      where: {},
      include: {
        model: Position,
      },
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    })

    const formattedAgencies = agencies.map((agency) => agency.dataValues)

    return res.status(200).json(formattedAgencies)
  } catch (err) {
    console.log('getAgencies Error', err)
    res.status(400).json({ message: err })
  }
}

export const getAgency = async (req, res) => {
  try {
    const { id } = req.params

    const agency = await Agency.findByPk(Number(id), {
      include: {
        model: Position,
      },
      attributes: { exclude: ['password', 'updatedAt', 'admin'] },
    })
    return res.status(200).json(agency)
  } catch (err) {
    console.log('getAgency Error', err)
    res.status(400).json({ message: err })
  }
}

export const createPostion = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, skills, schedule, vacancies } = req.body

    const postion = {
      agencyId: Number(id),
      title,
      description,
      skills,
      schedule,
      vacancies,
    }
    const newPosition = new Position(postion)
    const savedPosition = await newPosition.save()

    return res.status(200).json(savedPosition)
  } catch (err) {
    console.log('createPosition Error', err)
    res.status(400).json({ message: err })
  }
}
export const createEvent = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, date, location, latitude, longitude } = req.body

    console.log(req.body)

    const eventObject = {
      createdByAgencyId: Number(id),
      title,
      description,
      date,
      location,
      latitude,
      longitude,
    }
    const newEvent = new Event(eventObject)
    const savedEvent = await newEvent.save()

    return res.status(200).json(savedEvent)
  } catch (err) {
    console.log('createEvent Error', err)
    res.status(400).json({ message: err })
  }
}

export const addMember = async (req, res) => {
  try {
    const { agencyId, volunteerId, position, status } = req.body

    console.log('body', req.body)

    const membershipObject = {
      agencyId,
      volunteerId,
      position,
      status,
    }
    const newMembership = new Membership(membershipObject)
    const savedMembership = await newMembership.save()

    console.log('saved membership', savedMembership)

    return res.status(200).json(savedMembership)
  } catch (err) {
    console.log('createEvent Error', err)
    res.status(400).json({ message: err })
  }
}
