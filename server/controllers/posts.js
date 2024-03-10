import { Post, Reaction, Comment, Volunteer, Agency } from '../models/index.js'

/* CREATE */
export const createVolunteerPost = async (req, res) => {
  try {
    const { volunteerId, content, picturePath, posterPicturePath } = req.body

    const newPost = new Post({
      createdByVolunteerId: volunteerId,
      content,
      type: 'Volunteer',
      posterPicturePath: posterPicturePath,
      picturePath: picturePath,
    })

    const response = await newPost.save()

    res.status(201).json(response)
  } catch (err) {
    console.log('createVolunteerPost err', err)

    res.status(409).json({ message: err })
  }
}

export const createAgencyPost = async (req, res) => {
  try {
    const { agencyId, content, picturePath, posterPicturePath } = req.body

    const newPost = new Post({
      createdByAgencyId: agencyId,
      content,
      type: 'Agency',
      posterPicturePath: posterPicturePath,
      picturePath: picturePath,
    })

    const response = await newPost.save()

    res.status(201).json(response)
  } catch (err) {
    console.log('createAgencyPost err', err)

    res.status(409).json({ message: err })
  }
}

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: {},
      include: [
        {
          model: Comment,
          attributes: ['content'],
        },
        {
          model: Reaction,
        },
      ],
    })

    const formattedPosts = await Promise.all(
      posts.map(async (post) => {
        if (post.type === 'Volunteer') {
          const volunteer = await Volunteer.findByPk(
            post.createdByVolunteerId,
            {
              where: {},
            }
          )

          const formattedPost = {
            id: post.id,
            volunteerId: post.createdByVolunteerId,
            type: post.type,
            content: post.content,
            picturePath: post.picturePath,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            posterPicturePath: volunteer.dataValues.picturePath,
            posterFirstName: volunteer.dataValues.firstName,
            posterLastName: volunteer.dataValues.lastName,
            posterUsername: volunteer.dataValues.username,
            comments: post.comments,
            reactions: post.reactions,
          }

          return formattedPost
        } else {
          const agency = await Agency.findByPk(post.createdByAgencyId, {
            where: {},
          })

          const formattedPost = {
            id: post.id,
            agencyId: post.createdByAgencyId,
            type: post.type,
            content: post.content,
            picturePath: post.picturePath,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            posterPicturePath: agency.dataValues.picturePath,
            posterName: agency.dataValues.name,
            posterUsername: agency.dataValues.username,
            comments: post.comments,
            reactions: post.reactions,
          }

          return formattedPost
        }
      })
    )

    res.status(200).json(formattedPosts)
  } catch (err) {
    console.log('getFeedPosts err', err)

    res.status(404).json({ message: err })
  }
}

export const getVolunteerPosts = async (req, res) => {
  try {
    const { volunteerId } = req.params

    const posts = await Post.findAll({
      where: { createdByVolunteerId: volunteerId },
      include: [
        {
          model: Comment,
          attributes: ['content'],
        },
        {
          model: Volunteer,
          as: 'createdByVolunteer',
          attributes: ['firstName', 'lastName', 'picturePath', 'username'],
        },
        {
          model: Reaction,
        },
      ],
    })

    const formattedPosts = posts.map((post) => {
      const formattedPost = {
        id: post.id,
        createdByVolunteerId: post.createdByVolunteerId,
        type: post.type,
        content: post.content,
        picturePath: post.picturePath,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        posterPicturePath: post.createdByVolunteer.picturePath,
        posterFirstName: post.createdByVolunteer.firstName,
        posterLastName: post.createdByVolunteer.lastName,
        posterUsername: post.createdByVolunteer.username,
        comments: post.comments,
        reactions: post.reactions,
      }

      return formattedPost
    })

    res.status(200).json(formattedPosts)
  } catch (err) {
    console.log('getVolunteerPosts err', err)

    res.status(404).json({ message: err })
  }
}

export const getPost = async (req, res) => {
  try {
    const { id } = req.params

    const post = await Post.findByPk(Number(id), {
      include: [
        {
          model: Comment,
          attributes: ['content'],
        },
        {
          model: Volunteer,
          as: 'createdByVolunteer',
          attributes: ['firstName', 'lastName', 'picturePath', 'username'],
        },
        {
          model: Reaction,
        },
      ],
    })

    const formattedPost = {
      id: post.id,
      type: post.type,
      content: post.content,
      picturePath: post.picturePath,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      posterPicturePath: post.createdByVolunteer.picturePath,
      posterFirstName: post.createdByVolunteer.firstName,
      posterLastName: post.createdByVolunteer.lastName,
      posterUsername: post.createdByVolunteer.username,
      comments: post.comments,
      reactions: post.reactions,
    }

    res.status(200).send(formattedPost)
  } catch (err) {
    console.log('getPost err', err)
    res.status(404).json({ message: err })
  }
}

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params
    const { volunteerId } = req.body

    const likes = await Reaction.findAll({
      where: {
        createdByVolunteerId: volunteerId,
        postId: Number(id),
      },
    })

    const isAlreadyLiked = likes.length !== 0

    if (isAlreadyLiked) {
      const deletedLike = await likes[0].destroy()

      res.status(200).json()
    } else {
      const like = new Reaction({
        createdByVolunteerId: volunteerId,
        postId: Number(id),
      })

      const newLike = await like.save()
      res.status(200).json(newLike)
    }
  } catch (err) {
    console.log('likePost err', err)
    res.status(404).json({ message: err })
  }
}
