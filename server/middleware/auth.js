import jwt from 'jsonwebtoken'
import { ACCESS_SECRET } from '../utils/config.js'

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization')
    if (!authHeader) {
      return res.status(403).send('Access Denied')
    }

    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7, token.length).trimLeft()
      jwt.verify(token, ACCESS_SECRET, (err, decoded) => {
        if (err) return res.status(403).send('Invalid token')
        req.user = decoded.username
      })
      next()
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
