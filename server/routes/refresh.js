import express from 'express'
import {
  refreshVolunteerAccessToken,
  refreshAgencyAccessToken,
} from '../controllers/refresh.js'

const router = express.Router()

router.get('/volunteer', refreshVolunteerAccessToken)
router.get('/agency', refreshAgencyAccessToken)

export default router
