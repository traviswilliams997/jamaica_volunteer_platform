import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET } from '../utils/config.js'
import Volunteer from '../models/volunteer.js'
import Agency from '../models/agency.js'

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
      picturePath,
      latitude,
      longitude,
      about,
      skills,
      admin,
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
      dateOfBirth: Date.now(),
      latitude,
      longitude,
      about,
      skills,
      admin,
    })

    const savedVolunteer = await newVolunteer.save()
    res.status(201).json(savedVolunteer)
  } catch (err) {
    res.status(500).json({ error: err.message })
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
      admin,
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
      admin,
    })

    const savedAgency = await newAgency.save()
    res.status(201).json(savedAgency)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

/* LOGGING  */

export const loginVolunteer = async (req, res) => {
  try {
    const { username, password } = req.body

    const volunteer = await Volunteer.findOne({
      where: {
        username: username,
      },
    })

    const passwordCorrect =
      volunteer === null
        ? false
        : await bcrypt.compare(password, volunteer.password)

    if (!(volunteer && passwordCorrect)) {
      return res.status(401).json({
        error: 'invalid username  or password',
      })
    }

    const volunteerForToken = {
      username: volunteer.username,
      id: volunteer.id,
    }

    const token = jwt.sign(volunteerForToken, SECRET)
    delete volunteer.password

    res.status(200).send({ token, username: volunteer.username })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const loginAgency = async (req, res) => {
  try {
    const { username, password } = req.body

    const agency = await Agency.findOne({
      where: {
        username: username,
      },
    })

    const passwordCorrect =
      agency === null ? false : await bcrypt.compare(password, agency.password)

    if (!(agency && passwordCorrect)) {
      return res.status(401).json({
        error: 'invalid username  or password',
      })
    }

    const agencyForToken = {
      username: agency.username,
      id: agency.id,
    }

    const token = jwt.sign(agencyForToken, SECRET)
    delete agency.password

    res.status(200).send({ token, username: agency.username })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
