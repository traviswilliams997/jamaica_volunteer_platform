import express from 'express'
import {
  getAgencies,
  getAgency,
  createNewPostion,
} from '../controllers/agencies.js'

const router = express.Router()

/* READ */
router.get('/', getAgencies)
router.get('/:id', getAgency)

/* CREATE*/
router.post('/position', createNewPostion)

export default router
