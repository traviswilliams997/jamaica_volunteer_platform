import {
  Volunteer,
  Agency,
  VolunteerToken,
  AgencyToken,
} from '../models/index.js'

export const logoutVolunteer = async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(204)
  const refreshToken = cookies.jwt

  const responseToken = await VolunteerToken.findAll({
    where: { token: refreshToken },
    include: {
      model: Volunteer,
    },
  })
  const foundVolunteer = responseToken[0].volunteer
  if (!foundVolunteer) {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
    })

    return res.sendStatus(204)
  }

  await VolunteerToken.destroy({
    where: { username: foundVolunteer.username },
  })

  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  })

  res.sendStatus(204)
}

export const logoutAgency = async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(204)
  const refreshToken = cookies.jwt

  const responseToken = await AgencyToken.findAll({
    where: { token: refreshToken },
    include: {
      model: Agency,
    },
  })
  const foundAgency = responseToken[0].agency
  if (!foundAgency) {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
    })

    return res.sendStatus(204)
  }

  await AgencyToken.destroy({
    where: { username: foundAgency.username },
  })

  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  })

  res.sendStatus(204)
}
