import { Event } from '../models/index.js'

export const getEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      where: {},
      attributes: { exclude: ['updatedAt'] },
    })

    const formattedEvents = events.map((events) => events.dataValues)

    return res.status(200).json(formattedEvents)
  } catch (err) {
    console.log('getEvents Error', err)
    res.status(400).json({ message: err })
  }
}
