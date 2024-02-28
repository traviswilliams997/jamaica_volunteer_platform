import express from 'express'
import { logoutVolunteer, logoutAgency } from '../controllers/logout.js'
const router = express.Router()

router.get('/volunteer', logoutVolunteer)
router.get('/agency', logoutAgency)

export default router
