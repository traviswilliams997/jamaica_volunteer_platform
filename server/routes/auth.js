import express from 'express'
import { loginVolunteer, loginAgency } from '../controllers/auth.js'
import { registerVolunteer, registerAgency } from '../controllers/auth.js'

const router = express.Router()

router.post('/login/volunteer', loginVolunteer)
router.post('/register/volunteer', registerVolunteer)

router.post('/login/agency', loginAgency)
router.post('/register/agency', registerAgency)

export default router
