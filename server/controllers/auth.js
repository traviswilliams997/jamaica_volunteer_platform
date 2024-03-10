import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ACCESS_SECRET, REFRESH_SECRET } from '../utils/config.js'
import {
  Volunteer,
  Agency,
  VolunteerToken,
  AgencyToken,
  Membership,
} from '../models/index.js'

/* REGISTER */
export const registerVolunteer = async (req, res) => {
  try {
    const {
      username,
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      dateOfBirth,
      picturePath,
      latitude,
      longitude,
      about,
      skills,
    } = req.body

    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    const passwordHash = await bcrypt.hash(password, salt)

    const newVolunteer = new Volunteer({
      username,
      firstName,
      lastName,
      email,
      phoneNumber,
      password: passwordHash,
      picturePath,
      dateOfBirth,
      latitude,
      longitude,
      about,
      skills,
      admin: false,
    })

    const savedVolunteer = await newVolunteer.save()

    res.status(201).json(savedVolunteer)
  } catch (err) {
    console.log('Error', err)
    res.status(500).json({ error: err })
  }
}

export const registerAgency = async (req, res) => {
  try {
    const {
      username,
      name,
      email,
      phoneNumber,
      password,
      type,
      picturePath,
      latitude,
      longitude,
      about,
    } = req.body

    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    const passwordHash = await bcrypt.hash(password, salt)

    const newAgency = new Agency({
      username,
      name,
      email,
      phoneNumber,
      password: passwordHash,
      type,
      picturePath,
      latitude,
      longitude,
      about,
      admin: false,
    })

    const savedAgency = await newAgency.save()

    res.status(201).json(savedAgency)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

/* LOGGING  */

export const loginVolunteer = async (req, res) => {
  try {
    const { email, password } = req.body

    const foundVolunteer = await Volunteer.findOne({
      where: {
        email: email,
      },
      include: {
        model: Membership,
      },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    })
    const passwordCorrect =
      foundVolunteer === null
        ? false
        : await bcrypt.compare(password, foundVolunteer.password)

    if (!(foundVolunteer && passwordCorrect)) {
      return res.status(401).json({
        error: 'Invalid username  or password',
      })
    }

    const volunteerForToken = {
      username: foundVolunteer.username,
      id: foundVolunteer.id,
    }

    const accessToken = jwt.sign(volunteerForToken, ACCESS_SECRET, {
      expiresIn: '600s',
    })
    const refreshToken = jwt.sign(volunteerForToken, REFRESH_SECRET, {
      expiresIn: '1d',
    })

    const newToken = new VolunteerToken({
      volunteerId: foundVolunteer.id,
      username: foundVolunteer.username,
      token: refreshToken,
    })
    await newToken.save()

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    })
    const volunteerWithoutPassword = {
      id: foundVolunteer.id,
      username: foundVolunteer.username,
      firstName: foundVolunteer.firstName,
      lastName: foundVolunteer.lastName,
      email: foundVolunteer.email,
      picturePath: foundVolunteer.picturePath,
      dateOfBirth: foundVolunteer.dateOfBirth,
      about: foundVolunteer.about,
      skills: foundVolunteer.skills,
      latitude: foundVolunteer.latitude,
      longitude: foundVolunteer.longitude,
      createdAt: foundVolunteer.createdAt,
      memberships: foundVolunteer.memberships,
    }

    const responseObj = {
      accessToken,
      volunteer: volunteerWithoutPassword,
    }

    res.header(
      'Access-Control-Allow-Origin',
      'https://volunteer-platform-frontend.onrender.com'
    ) // update to match the domain you will make the request from
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )

    res.status(200).json(responseObj)
  } catch (err) {
    console.log('loginVolunteer Error', err)

    res.status(500).json({ error: err })
  }
}

export const loginAgency = async (req, res) => {
  try {
    const { email, password } = req.body

    const foundAgency = await Agency.findOne({
      where: {
        email: email,
      },
    })

    const passwordCorrect =
      foundAgency === null
        ? false
        : await bcrypt.compare(password, foundAgency.password)

    if (!(foundAgency && passwordCorrect)) {
      return res.status(401).json({
        error: 'invalid username  or password',
      })
    }

    const agencyForToken = {
      username: foundAgency.username,
      id: foundAgency.id,
    }
    delete foundAgency.password

    const accessToken = jwt.sign(agencyForToken, ACCESS_SECRET, {
      expiresIn: '600s',
    })
    const refreshToken = jwt.sign(agencyForToken, REFRESH_SECRET, {
      expiresIn: '1d',
    })

    const newToken = new AgencyToken({
      agencyId: foundAgency.id,
      username: foundAgency.username,
      token: refreshToken,
    })
    await newToken.save()

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    })

    res.status(200).json({ accessToken, username: foundAgency.username })
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
