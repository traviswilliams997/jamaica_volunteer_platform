import express from 'express'
import {
  getVolunteers,
  getVolunteer,
  getVolunteerFollowing,
  getVolunteerFollowers,
  checkIsFollowing,
  followUnfollow,
} from '../controllers/volunteers.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

/* READ */
router.get('/', getVolunteers)

router.get('/:id', verifyToken, getVolunteer)
router.get('/:id/following', verifyToken, getVolunteerFollowing)
router.get('/:id/followers', verifyToken, getVolunteerFollowers)
router.get('/:id/:followedId', verifyToken, checkIsFollowing)

/* UPDATE */
router.patch('/:id/:followedId', verifyToken, followUnfollow)

export default router
