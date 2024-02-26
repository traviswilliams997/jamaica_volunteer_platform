import app from './app.js'
import { PORT } from './utils/config.js'
import { connectToDatabase } from './utils/db.js'

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
