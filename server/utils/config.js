import dotenv from 'dotenv'

dotenv.config()

const getDatabaseUrl = () => {
  if (process.env.NODE_ENV === 'test') return process.env.TEST_DATABASE_URL
  if (process.env.NODE_ENV === 'development')
    return process.env.DEV_DATABASE_URL
  if (process.env.NODE_ENV === 'production')
    return process.env.PROD_DATABASE_URL
}

export const DATABASE_URL = getDatabaseUrl()

export const PORT = process.env.PORT || 3003

export const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET

export const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET
