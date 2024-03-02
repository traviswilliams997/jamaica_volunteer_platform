import express from 'express'
import { getAgencies } from '../controllers/agencies.js'

const router = express.Router()

/* READ */
router.get('/', getAgencies)

export default router
