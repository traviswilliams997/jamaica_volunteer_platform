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
      createdAgencyId: agencyId,
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
    console.log('Inside get posts')
    const posts = await Post.findAll({
      where: {},
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
          model: Agency,
          as: 'createdByAgency',
          attributes: ['name', 'picturePath', 'username'],
        },
        {
          model: Reaction,
        },
      ],
    })

    console.log('get [posts res', posts)

    const formattedPosts = posts.map((post) => {
      if (post.type === 'Volunteer') {
        const formattedPost = {
          id: post.id,
          volunteerId: post.createdByVolunteerId,
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
      } else {
        const formattedPost = {
          id: post.id,
          agencyId: post.createdByAgencyId,
          type: post.type,
          content: post.content,
          picturePath: post.picturePath,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          posterPicturePath: post.createdByAgency.picturePath,
          posterName: post.createdByAgency.name,
          posterUsername: post.createdByAgency.username,
          comments: post.comments,
          reactions: post.reactions,
        }
        return formattedPost
      }
    })

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

    const post = await Post.findByPk(id, {
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
        postId: id,
      },
    })

    const isAlreadyLiked = likes.length !== 0

    if (isAlreadyLiked) {
      likes[0].destroy()
    } else {
      const like = new Reaction({
        createdByVolunteerId: volunteerId,
        postId: id,
      })
      await like.save()
    }

    res.status(200).json()
  } catch (err) {
    console.log('likePost err', err)
    res.status(404).json({ message: err })
  }
}
