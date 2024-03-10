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

export const createEvent = async (req, res) => {
  try {
    const { id } = req.params
    const {
      title,
      description,
      date,
      location,
      latitude,
      longitude,
      agencyName,
    } = req.body

    const eventObject = {
      createdByAgencyId: Number(id),
      agencyName,
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
