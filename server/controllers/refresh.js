import jwt from 'jsonwebtoken'
import { ACCESS_SECRET, REFRESH_SECRET } from '../utils/config.js'
import {
  Agency,
  AgencyToken,
  Volunteer,
  VolunteerToken,
} from '../models/index.js'

export const refreshVolunteerAccessToken = async (req, res) => {
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
  console.log('found', foundVolunteer)
  if (!foundVolunteer) return res.sendStatus(403)

  jwt.verify(refreshToken, REFRESH_SECRET, (err, decoded) => {
    if (err || foundVolunteer.username !== decoded.username)
      return res.sendStatus(403)

    const accessToken = jwt.sign(
      { username: decoded.username },
      ACCESS_SECRET,
      { expiresIn: '600s' }
    )
    return res.json({ accessToken })
  })
}

export const refreshAgencyAccessToken = async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(401)
  const refreshToken = cookies.jwt

  const responseToken = await AgencyToken.findAll({
    where: { token: refreshToken },
    include: {
      model: Agency,
    },
  })
  const foundAgency = responseToken[0].agency
  if (!foundAgency) return res.sendStatus(403)

  jwt.verify(refreshToken, REFRESH_SECRET, (err, decoded) => {
    if (err || foundAgency.username !== decoded.username)
      return res.sendStatus(403)

    const accessToken = jwt.sign(
      { username: decoded.username },
      ACCESS_SECRET,
      { expiresIn: '600s' }
    )
    res.json({ accessToken })
  })
}
