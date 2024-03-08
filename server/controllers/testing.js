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

export const resetDb = async (req, res) => {
  try {
    await Membership.destroy({ where: {} })
    await Position.destroy({ where: {} })
    await Follower.destroy({ where: {} })

    await Reaction.destroy({ where: {} })
    await Post.destroy({ where: {} })
    await Event.destroy({ where: {} })
    await AgencyToken.destroy({ where: {} })
    await VolunteerToken.destroy({ where: {} })
    await Agency.destroy({ where: {} })
    await Volunteer.destroy({ where: {} })

    res.status(204).end()
  } catch (err) {
    console.log('Error', err)
    res.status(400).end()
  }
}
