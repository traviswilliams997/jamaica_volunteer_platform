import express from 'express'
import { handleVolunteerRefreshToken } from '../controllers/volunteerRefresh.js'

const router = express.Router()

router.get('/volunteer', handleVolunteerRefreshToken)
router.get('/agency')

export default router
