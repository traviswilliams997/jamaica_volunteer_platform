import { Volunteer, Follower } from '../models/index.js'

/*READ */

export const getVolunteers = async (req, res) => {
  try {
    const response = await Volunteer.findAll({
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    })

    return res.status(200).json(response)
  } catch (err) {
    console.log('getVolunteers Error', err)
    res.status(400).json({ message: err })
  }
}
export const getVolunteer = async (req, res) => {
  try {
    const { id } = req.params

    const volunteer = await Volunteer.findByPk(id, {
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    })

    return res.status(200).json(volunteer)
  } catch (err) {
    console.log('getVolunteer Error', err)
    res.status(400).json({ message: err })
  }
}

export const getVolunteerFollowing = async (req, res) => {
  try {
    const { id } = req.params

    if (id === 'undefined') return res.status(422)

    const volunteer = await Volunteer.findByPk(id, {
      where: {},
      include: {
        model: Volunteer,
        as: 'followingVolunteer',
        through: {},
      },
    })

    const followings = volunteer.followingVolunteer

    const formattedFollowings = followings.map((following) => {
      const formattedFollowing = {
        id: following.id,
        username: following.username,
        firstName: following.firstName,
        lastName: following.lastNsme,
        email: following.email,
        picturePath: following.picturePath,
        dateOfBirth: following.dateOfBirth,
        about: following.about,
        skills: following.skills,
        createdAt: following.createdAt,
      }

      return formattedFollowing
    })
    return res.status(200).json(formattedFollowings)
  } catch (err) {
    console.log('getVolunteerFollowing Error', err)
    res.status(400).json({ message: err })
  }
}

export const checkIsFollowing = async (req, res) => {
  try {
    const { id, followedId } = req.params

    const followings = await Follower.findOne({
      where: { following_volunteer_id: id, followed_volunteer_id: followedId },
    })

    const isFollowing = followings !== null

    return res.status(200).json(isFollowing)
  } catch (err) {
    console.log('checkIsFollowing Error', err)
    res.status(400).json({ message: err })
  }
}

export const getVolunteerFollowers = async (req, res) => {
  try {
    const { id } = req.params

    const volunteer = await Volunteer.findByPk(id, {
      where: {},
      include: {
        model: Volunteer,
        as: 'followedVolunteer',
        through: {},
      },
    })

    const followers = volunteer.followedVolunteer

    const formattedFollowers = followers.map((follower) => {
      const formattedFollower = {
        id: follower.id,
        username: follower.username,
        firstName: follower.firstName,
        lastName: follower.lastNsme,
        email: follower.email,
        picturePath: follower.picturePath,
        dateOfBirth: follower.dateOfBirth,
        about: follower.about,
        skills: follower.skills,
        createdAt: follower.createdAt,
      }

      return formattedFollower
    })

    res.status(200).json(formattedFollowers)
  } catch (err) {
    console.log('getVolunteerFollowers Error', err)
    res.status(400).json({ message: err })
  }
}

/* UPDATE */

export const followUnfollow = async (req, res) => {
  try {
    const { id, followedId } = req.params

    const following = await Follower.findAll({
      where: { following_volunteer_id: id, followed_volunteer_id: followedId },
    })

    //Follower relationship doesnt already exist
    if (following.length === 0) {
      const followerObject = new Follower({
        followed_volunteer_id: followedId,
        following_volunteer_id: id,
      })

      const follow = await followerObject.save()

      return res.status(200).json(follow)
    }

    //Follower relationship does exist
    if (following.length === 1) {
      const follwerRelationID = following[0].dataValues.id

      await Follower.destroy({
        where: {
          id: follwerRelationID,
        },
      })

      return res.status(200).json({})
    }
  } catch (err) {
    console.log('followUnfollow ERROR', err)
    res.status(400).json({ message: err })
  }
}
