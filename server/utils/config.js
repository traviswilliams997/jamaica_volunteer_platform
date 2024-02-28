import dotenv from 'dotenv'

dotenv.config()

export const DATABASE_URL =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL

export const PORT = process.env.PORT || 3003

export const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET

export const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET
