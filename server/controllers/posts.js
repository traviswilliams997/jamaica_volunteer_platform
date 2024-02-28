import Post from '../models/index.js'
import Volunteer from '../models/index.js'
import Reaction from '../models/index.js'

/* CREATE */
export const createVolunteerPost = async (req, res) => {
  try {
    const { volunteerId, content, picturePath } = req.body.dataValues
    const volunteer = await Volunteer.findByPk(volunteerId)

    const newPost = new Post({
      volunteerId,
      content,
      type: 'Volunteer',
      posterPicturePath: volunteer.picturePath,
      picturePath: picturePath,
    })
    await newPost.save()
    res.status(201).json()
  } catch (err) {
    res.status(409).json({ message: err.message })
  }
}

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({})
    res.status(200).json(posts)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

export const getVolunteerPosts = async (req, res) => {
  try {
    const { volunteerId } = req.params

    const posts = await Post.findAll({ where: { volunteerId: volunteerId } })
    const formmattedPosts = posts.map((post) => post.dataValues)

    res.status(200).json(formmattedPosts)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params
    const { volunteerId } = req.body

    const likes = await Reaction.findAll({
      where: {
        volunteerId: volunteerId,
        postId: id,
      },
    })

    const isAlreadyLiked = likes.length !== 0

    if (isAlreadyLiked) {
      likes[0].destroy()
    } else {
      const like = new Reaction({
        volunteerId: volunteerId,
        postId: id,
      })
      await like.save()
    }

    res.status(200).json()
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}
