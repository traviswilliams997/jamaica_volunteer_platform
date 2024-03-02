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
import { corsOptions } from './config/corsOptions.js'
import { errorHandler, unknownEndpoint } from './middleware/middleware.js'

/* CONFIGURATIONS */
const app = express()
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

/* ROUTES */
app.use('/api/auth', authRoutes)
app.use('/api/volunteers', volunteerRoutes)
app.use('/api/agencies', agencyRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/refresh', refreshRoutes)
app.use('/api/logout', logoutRoutes)

app.use(unknownEndpoint)
app.use(errorHandler)

export default app
