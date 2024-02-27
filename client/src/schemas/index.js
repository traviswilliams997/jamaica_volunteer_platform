import * as yup from 'yup'

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const volunteerRegisterSchema = yup.object().shape({
  username: yup.string().required('required'),
  firstName: yup
    .string()
    .min(2, 'First name too short')
    .max(30, 'First name too long')
    .required('Required'),
  lastName: yup
    .string()
    .min(2, 'Last name too short')
    .max(30, 'Last name too long')
    .required('Required'),
  phoneNumber: yup.string().required('Required'),
  email: yup.string().email('invalid email').required('Required'),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: 'Please create a stronger password' })
    .required('Required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
  about: yup.string(),
  skills: yup.string(),
  dateOfBirth: yup.date(),
  picturePath: yup.string(),
})

export const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string().required('Required'),
})
