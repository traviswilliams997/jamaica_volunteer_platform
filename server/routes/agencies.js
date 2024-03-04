import express from 'express'
import {
  getAgencies,
  getAgency,
  createPostion,
  addMember,
} from '../controllers/agencies.js'
import { verifyToken } from '../middleware/auth.js'
const router = express.Router()

/* READ */
router.get('/', getAgencies)
router.get('/:id', getAgency)

/* CREATE*/
router.post('/:id/position', verifyToken, createPostion)
router.post('/join/', verifyToken, addMember)

export default router
