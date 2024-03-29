import { Agency, Position, Membership, Session } from '../models/index.js'

/*READ */
export const getAgencies = async (req, res) => {
  try {
    const agencies = await Agency.findAll({
      where: {},
      include: [
        {
          model: Position,
        },
        {
          model: Membership,
        },
      ],
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

export const addMember = async (req, res) => {
  try {
    const { agencyId, volunteerId, position, status } = req.body

    const membershipObject = {
      agencyId,
      volunteerId,
      position,
      status,
    }
    const newMembership = new Membership(membershipObject)
    const savedMembership = await newMembership.save()

    return res.status(200).json(savedMembership)
  } catch (err) {
    console.log('addMember Error', err)
    res.status(400).json({ message: err })
  }
}

export const createSession = async (req, res) => {
  try {
    const { id } = req.params
    const { volunteerId, sessionStart, sessionEnd, workDone } = req.body

    const session = {
      createdByAgencyId: Number(id),
      volunteerId: Number(volunteerId),
      sessionStart,
      sessionEnd,
      workDone,
    }
    const newSession = new Session(session)
    const savedSession = await newSession.save()

    return res.status(200).json(savedSession)
  } catch (err) {
    console.log('createSession Error', err)
    res.status(400).json({ message: err })
  }
}
