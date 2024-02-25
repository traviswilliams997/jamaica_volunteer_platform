import express from 'express'
import { loginVolunteer } from '../controllers/auth.js'
import { registerVolunteer } from '../controllers/auth.js'

const router = express.Router()

router.post('/login/volunteer', loginVolunteer)
router.post('/register/volunteer', registerVolunteer)

export default router
