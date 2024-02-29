import jwt from 'jsonwebtoken'
import { ACCESS_SECRET } from '../utils/config.js'

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization')

    if (!authHeader) {
      return res.status(401).send('Access Denied')
    }

    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7, authHeader.length).trimLeft()

      jwt.verify(token, ACCESS_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403)
        req.user = decoded.username
        next()
      })
    }
  } catch (err) {
    return res.status(500).json({ error: err })
  }
}
