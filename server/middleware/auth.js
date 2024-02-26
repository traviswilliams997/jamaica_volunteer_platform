import jwt from 'jsonwebtoken'
import { SECRET } from '../utils/config.js'
export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header('Authorization')
    if (!token) {
      return res.status(403).send('Access Denied')
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft()
    }

    req.decodedToken = jwt.verify(token, SECRET)
    next()
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
