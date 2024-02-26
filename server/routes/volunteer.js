import express from 'express'
import {
  getVolunteer,
  getVolunteerFollowing,
  getVolunteerFollowers,
  followUnfollow,
} from '../controllers/volunteers.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

/* READ */
router.get('/:id', verifyToken, getVolunteer)
router.get('/:id/following', verifyToken, getVolunteerFollowing)
router.get('/:id/followers', verifyToken, getVolunteerFollowers)

/* UPDATE */
router.patch('/:id/:followedId', verifyToken, followUnfollow)

export default router
