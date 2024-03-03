import express from 'express'
import {
  createVolunteerPost,
  getFeedPosts,
  getPost,
  getVolunteerPosts,
  likePost,
  createAgencyPost,
} from '../controllers/posts.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()
/* CREATE */
router.post('/volunteer', verifyToken, createVolunteerPost)
router.post('/agency', createAgencyPost)

/* READ */
router.get('/', getFeedPosts)
router.get('/:id', verifyToken, getPost)
router.get('/:volunteerId/posts', verifyToken, getVolunteerPosts)

/* UPDATE */
router.patch('/:id/like', verifyToken, likePost)

export default router
