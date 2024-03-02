import express from 'express'
import { getAgencies, getAgency } from '../controllers/agencies.js'

const router = express.Router()

/* READ */
router.get('/', getAgencies)
router.get('/:id', getAgency)

export default router
