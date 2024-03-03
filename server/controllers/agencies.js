import { Agency, Position } from '../models/index.js'

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
    console.log('getAgency Error', err)
    res.status(400).json({ message: err })
  }
}

export const getAgency = async (req, res) => {
  try {
    const { id } = req.params

    const agency = await Agency.findByPk(id, {
      include: {
        model: Position,
      },
      attributes: { exclude: ['password', 'updatedAt', 'admin'] },
    })
    return res.status(200).json(agency)
  } catch (err) {
    console.log('getAfency Error', err)
    res.status(400).json({ message: err })
  }
}

export const createPostion = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, skills, schedule, vacancies } = req.body

    const postion = {
      agencyId: id,
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
    console.log('getAgency Error', err)
    res.status(400).json({ message: err })
  }
}
