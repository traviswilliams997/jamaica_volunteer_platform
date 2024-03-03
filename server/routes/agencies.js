import express from 'express'
import {
  getAgencies,
  getAgency,
  createPostion,
  createEvent,
} from '../controllers/agencies.js'

const router = express.Router()

/* READ */
router.get('/', getAgencies)
router.get('/:id', getAgency)

/* CREATE*/
router.post('/:id/position', createPostion)
router.post('/:id/event', createEvent)

export default router
