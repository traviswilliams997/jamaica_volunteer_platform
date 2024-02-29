import { Volunteer, Follower } from '../models/index.js'

/*READ */
export const getVolunteer = async (req, res) => {
  try {
    const { id } = req.params

    const volunteer = await Volunteer.findByPk(id)

    return res.status(200).json(volunteer.dataValues)
  } catch (err) {
    res.status(400).json({ message: err })
  }
}

export const getVolunteerFollowing = async (req, res) => {
  try {
    const { id } = req.params

    const followings = await Follower.findAll({
      where: { followingVolunteerId: id },
    })
    const peopleYouFollow = await Promise.all(
      followings.map((dataValues) =>
        Volunteer.findByPk(dataValues.followedVolunteerId)
      )
    )

    if (peopleYouFollow.length !== 0) {
      const peopleYouFollowFormatted = peopleYouFollow.map(
        (people) => people.dataValues
      )

      return res.status(200).json(peopleYouFollowFormatted)
    } else {
      return res.status(200).json(peopleYouFollow)
    }
  } catch (err) {
    res.status(400).json({ message: err })
  }
}

export const getVolunteerFollowers = async (req, res) => {
  try {
    const { id } = req.params
    const followings = await Follower.findAll({
      where: { followedVolunteerId: id },
    })
    const yourFollowers = await Promise.all(
      followings.map((dataValues) =>
        Volunteer.findByPk(dataValues.followingVolunteerId)
      )
    )
    const yourFollowersFormatted = yourFollowers.map(
      (people) => people.dataValues
    )

    res.status(200).json(yourFollowersFormatted)
  } catch (err) {
    res.status(400).json({ message: err })
  }
}

/* UPDATE */

export const followUnfollow = async (req, res) => {
  try {
    const { id, followedId } = req.params

    const following = await Follower.findAll({
      where: { followingVolunteerId: id, followedVolunteerId: followedId },
    })
    //Follower relationship doesnt exist
    if (following.length === 0) {
      let followerObject = new Follower({
        followingVolunteerId: id,
        followedVolunteerId: followedId,
      })
      await followerObject.save()
    }

    //Follower relationship does exist
    if (following.length === 1) {
      const follwerRelationID = following[0].dataValues.id
      await Follower.destroy({
        where: {
          id: follwerRelationID,
        },
      })
    }

    res.status(200).json()
  } catch (err) {
    res.status(400).json({ message: err })
  }
}
