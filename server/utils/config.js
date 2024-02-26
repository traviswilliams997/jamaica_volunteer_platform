import dotenv from 'dotenv'

dotenv.config()

export const DATABASE_URL =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL

export const PORT = process.env.PORT || 3001

export const SECRET = process.env.JWT_SECRET

export const DEVELOPMENT_USERNAME = process.env.DEVELOPMENT_USERNAME
export const DEVELOPMENT_PASSWORD = process.env.DEVELOPMENT_PASSWORD
export const DEVELOPMENT_DATABASE = process.env.DEVELOPMENT_DATABASE
export const DEVELOPMENT_HOST = process.env.DEVELOPMENT_HOST
export const DEVELOPMENT_DIALECT = process.env.DEVELOPMENT_DIALECT

export const TEST_USERNAME = process.env.TEST_USERNAME
export const TEST_PASSWORD = process.env.TEST_PASSWORD
export const TEST_DATABASE = process.env.TEST_DATABASE
export const TEST_HOST = process.env.TEST_HOST
export const TEST_DIALECT = process.env.TEST_DIALECT
