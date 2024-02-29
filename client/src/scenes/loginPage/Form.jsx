import { useRef, useState } from 'react'
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { volunteerRegisterSchema, loginSchema } from '../../schemas'
import { Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import UploadWidget from '../widgets/UploadWidget'
import authService from '../../services/auth'
import { logInVolunteer } from '../../reducers/volunteerReducer'
import { setAccessToken, setAuthentication } from '../../reducers/globalReducer'

const initialValuesRegister = {
  username: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  picturePath: '',
  dateOfBirth: null,
  email: '',
  password: '',
  confirmPassword: '',
  about: '',
  skills: '',
}

const initialValuesLogin = {
  email: '',
  password: '',
}

const Form = () => {
  const [pageType, setPageType] = useState('login')
  const [birthday, setBirthday] = useState(null)
  const pictureRef = useRef()
  pictureRef.current = 'url'

  const { palette } = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isNonMobile = useMediaQuery('(min-width:600px)')
  const isLogin = pageType === 'login'
  const isRegister = pageType === 'register'

  const registerVolunteer = async (values, onSubmitProps) => {
    const newVolunteer = {
      username: values.username,
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      picturePath: values.picturePath,
      dateOfBirth: values.dateOfBirth,
      email: values.email,
      password: values.password,
      about: values.about,
      skills: values.skills,
    }

    try {
      await authService.registerVolunteer(newVolunteer)
      onSubmitProps.resetForm()
      setPageType('login')
    } catch (err) {
      console.log('error', err)
    }
  }

  const loginVolunteer = async (values, onSubmitProps) => {
    try {
      const loginCredentials = {
        email: values.email,
        password: values.password,
      }

      const loggedInResponse = await authService.logVolunteerIn(
        loginCredentials
      )

      const accessToken = loggedInResponse.accessToken
      dispatch(setAccessToken(accessToken))

      dispatch(setAuthentication(true))
      dispatch(logInVolunteer(loggedInResponse))

      onSubmitProps.resetForm()
      navigate('/home')
    } catch (err) {
      console.log('error', err)
    }
  }

  const handleFormSubmit = async (values, onSubmitProps) => {
    const utechLat = 18.0059
    const utechLong = -76.7468

    if (isRegister) {
      values.latitude = utechLat
      values.longitude = utechLong
      values.dateOfBirth = birthday
      values.picturePath = pictureRef.current.url
    }

    onSubmitProps.resetForm()

    if (isLogin) await loginVolunteer(values, onSubmitProps)
    if (isRegister) await registerVolunteer(values, onSubmitProps)
  }

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : volunteerRegisterSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  label="Username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  name="username"
                  error={Boolean(touched.username) && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                  sx={{ gridColumn: 'span 4' }}
                />
                <TextField
                  label="Phone Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phoneNumber}
                  name="phoneNumber"
                  error={
                    Boolean(touched.phoneNumber) && Boolean(errors.phoneNumber)
                  }
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  sx={{ gridColumn: 'span 4' }}
                />
                <TextField
                  label="About"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.about}
                  name="about"
                  multiline
                  error={Boolean(touched.about) && Boolean(errors.about)}
                  helperText={touched.about && errors.about}
                  sx={{ gridColumn: 'span 4' }}
                />
                <TextField
                  label="Skills"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.skills}
                  name="skills"
                  multiline
                  error={Boolean(touched.skills) && Boolean(errors.skills)}
                  helperText={touched.skills && errors.skills}
                  sx={{ gridColumn: 'span 4' }}
                />
                <DatePicker
                  label="Date Of Birth"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setBirthday(e.$d)
                  }}
                  value={values.dateOfBirth}
                  name="dateOfBirth"
                  error={
                    Boolean(touched.dateOfBirth) && Boolean(errors.dateOfBirth)
                  }
                  helperText={touched.dateOfBirth && errors.dateOfBirth}
                  sx={{ gridColumn: 'span 4' }}
                />

                <UploadWidget
                  setFieldValue={setFieldValue}
                  values={values}
                  pictureRef={pictureRef}
                />
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: 'span 4' }}
            />

            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: 'span 4' }}
            />

            {isRegister && (
              <TextField
                label="Confirm Password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmPassword}
                name="confirmPassword"
                error={
                  Boolean(touched.confirmPassword) &&
                  Boolean(errors.confirmPassword)
                }
                helperText={touched.confirmPassword && errors.confirmPassword}
                sx={{ gridColumn: 'span 4' }}
              />
            )}
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: '2rem 0',
                p: '1rem',
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                '&:hover': { color: palette.primary.main },
              }}
            >
              {isLogin ? 'LOGIN' : 'REGISTER'}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? 'register' : 'login')
                resetForm()
              }}
              sx={{
                textDecoration: 'underline',
                color: palette.primary.main,
                '&:hover': {
                  cursor: 'pointer',
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : 'Already have an account? Login here.'}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  )
}

export default Form
