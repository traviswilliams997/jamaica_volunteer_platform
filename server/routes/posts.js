import express from 'express'
import {
  createVolunteerPost,
  getFeedPosts,
  getPost,
  getVolunteerPosts,
  likePost,
} from '../controllers/posts.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()
/* CREATE */
router.post('/', verifyToken, createVolunteerPost)
/*READ */
router.get('/', verifyToken, getFeedPosts)
router.get('/:id', verifyToken, getPost)

router.get('/:volunteerId/posts', verifyToken, getVolunteerPosts)

/*UPDATE */
router.patch('/:id/like', verifyToken, likePost)

export default router
