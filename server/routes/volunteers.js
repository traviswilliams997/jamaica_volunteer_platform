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

router.get('/:id', getVolunteer)
router.get('/:id/following', getVolunteerFollowing)
router.get('/:id/followers', getVolunteerFollowers)
router.get('/:id/:followedId', checkIsFollowing)

/* UPDATE */
router.patch('/:id/:followedId', verifyToken, followUnfollow)

export default router
