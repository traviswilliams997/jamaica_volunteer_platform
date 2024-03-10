import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.js'
import volunteerRoutes from './routes/volunteers.js'
import postRoutes from './routes/posts.js'
import refreshRoutes from './routes/refresh.js'
import logoutRoutes from './routes/logout.js'
import agencyRoutes from './routes/agencies.js'
import eventRoutes from './routes/events.js'
import testingRoutes from './routes/testing.js'
import { errorHandler, unknownEndpoint } from './middleware/middleware.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/* CONFIGURATIONS */
const app = express()
// app.use(helmet())

app.use(morgan('common'))
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

let corsOptions = {
  origin: [
    'https://volunteer-platform-frontend.onrender.com',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:4173',
  ],
  credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
// app.use(express.static(path.join(__dirname, '../client/dist')))
// app.use(express.static('dist'))

/* ROUTES */
app.use('/api/auth', authRoutes)
app.use('/api/volunteers', volunteerRoutes)
app.use('/api/agencies', agencyRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/events', eventRoutes)

app.use('/api/refresh', refreshRoutes)
app.use('/api/logout', logoutRoutes)

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRoutes)
}

app.use(unknownEndpoint)
app.use(errorHandler)

export default app
