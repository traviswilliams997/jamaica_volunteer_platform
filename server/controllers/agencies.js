import { Agency } from '../models/index.js'

/*READ */
export const getAgencies = async (req, res) => {
  try {
    const agencies = await Agency.findAll({
      where: {},
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
      attributes: { exclude: ['password', 'updatedAt', 'admin'] },
    })

    return res.status(200).json(agency)
  } catch (err) {
    console.log('getAfency Error', err)
    res.status(400).json({ message: err })
  }
}
