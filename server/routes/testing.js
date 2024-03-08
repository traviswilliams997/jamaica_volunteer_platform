import express from 'express'
import { resetDb } from '../controllers/testing.js'

const router = express.Router()

router.post('/reset', resetDb)

export default router
