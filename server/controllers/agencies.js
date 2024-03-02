import { Agency } from '../models/index.js'

/*READ */
export const getAgencies = async (req, res) => {
  try {
    const agencies = await Agency.findAll({
      where: {},
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    })

    const formattedAgencies = agencies.map((agency) => agency.dataValues)

    console.log(formattedAgencies)

    return res.status(200).json(formattedAgencies)
  } catch (err) {
    console.log('getAgency Error', err)
    res.status(400).json({ message: err })
  }
}
