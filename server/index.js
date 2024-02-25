import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { PORT } from './utils/config.js'
import { connectToDatabase } from './utils/db.js'
import authRoutes from './routes/auth.js'
import { verifyToken } from './middleware/auth.js'

/* CONFIGURATIONS */
const app = express()
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())
app.use(express.json())

/* ROUTES */
app.use('/api/auth', authRoutes)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
