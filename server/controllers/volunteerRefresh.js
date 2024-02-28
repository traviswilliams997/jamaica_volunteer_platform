import jwt from 'jsonwebtoken'
import { ACCESS_SECRET, REFRESH_SECRET } from '../utils/config.js'
import { VolunteerToken, Volunteer } from '../models/index.js'
export const handleVolunteerRefreshToken = async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(401)
  const refreshToken = cookies.jwt

  const responseToken = await VolunteerToken.findAll({
    where: { token: refreshToken },
    include: {
      model: Volunteer,
    },
  })
  const foundVolunteer = responseToken[0].volunteer
  if (!foundVolunteer) return res.sendStatus(403)

  jwt.verify(refreshToken, REFRESH_SECRET, (err, decoded) => {
    if (err || foundVolunteer.username !== decoded.username)
      return res.sendStatus(403)

    const accessToken = jwt.sign(
      { username: decoded.username },
      ACCESS_SECRET,
      { expiresIn: '600s' }
    )
    res.json({ accessToken })
  })
}
