import express from 'express'
import { getEvents, createEvent } from '../controllers/events.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

/* READ */
router.get('/', getEvents)
router.post('/:id', verifyToken, createEvent)

export default router
