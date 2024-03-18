import {
  Box,
  Button,
  Menu,
  MenuItem,
  Link,
  Typography,
  useMediaQuery,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import { useDispatch } from 'react-redux'
import authService from '../../services/auth'
import { useNavigate } from 'react-router-dom'
import Hero from '../widgets/Hero'
import { useState } from 'react'
import { logInVolunteer } from '../../reducers/volunteerReducer'
import { setAccessToken, setAuthentication } from '../../reducers/globalReducer'
const LandingPage = () => {
  const isDesktop = useMediaQuery('(min-width:1600px)')
  const isMobile = useMediaQuery('(min-width:700px)')

  const [carouselText, setCarouselText] = useState('Find Agencies')
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLoginGuest = async () => {
    console.log('clicked')
    try {
      const loginCredentials = {
        email: 'guest@gmail.com',
        password: 'Pass100%',
      }

      const loggedInResponse = await authService.logVolunteerIn(
        loginCredentials
      )

      const accessToken = loggedInResponse.accessToken
      dispatch(setAccessToken(accessToken))

      dispatch(setAuthentication(true))
      dispatch(logInVolunteer(loggedInResponse.volunteer))

      navigate('/home')
    } catch (err) {
      console.log('error', err)
    }
  }

  return (
    <Box
      height={'100vh'}
      width={'100vw'}
      display={'flex'}
      flexDirection={isDesktop ? 'row' : 'column'}
    >
      {' '}
      <Box
        display="flex"
        flexDirection={isDesktop ? 'column' : 'row'}
        alignItems={isDesktop ? 'center' : 'space-between'}
        justifyContent={isDesktop ? 'center' : 'space-between'}
        height={isDesktop ? '100vh' : '15vh'}
        width={isDesktop ? '50vw' : '100vw'}
        bgcolor={'#77A6F7'}
      >
        <Box
          mt={isDesktop ? '5vh' : '10px'}
          display="flex"
          width={isDesktop ? '40vw' : '100vw'}
          alignItems={isDesktop ? 'space-between' : 'center'}
          justifyContent={isDesktop ? 'space-between' : 'space-between'}
          flexDirection={isDesktop ? 'column' : 'row'}
        >
          <Typography
            variant="h1"
            display={isMobile ? 'block' : 'none'}
            fontSize={isDesktop ? '120px' : '60px'}
            fontWeight={900}
            color={'#FFFFFF'}
          >
            {isDesktop ? 'VolunteerJA' : 'VolJA'}
          </Typography>
          <Typography
            variant="h1"
            fontSize={isDesktop ? '90px' : '50px'}
            fontWeight={900}
            color={'#FFFFFF'}
          >
            {carouselText}
          </Typography>
          <Box
            display={isDesktop ? 'flex' : 'none'}
            justifyContent={'space-between'}
            width={isDesktop ? '500px' : '200px'}
            mt={'30px'}
          >
            <Button
              sx={{
                height: isDesktop ? '80px' : '40px',
                width: isDesktop ? '200px' : '140px',
                bgcolor: '#FFFFFF',
                borderRadius: '5%',
              }}
              onClick={() => {
                navigate(`/login`)
              }}
            >
              <Typography
                variant={isDesktop ? 'h4' : 'h7'}
                color={'#77A6F7'}
                fontWeight={700}
                sx={{
                  '&:hover': {
                    color: '#FFFFFF',
                    fontWeight: '500',
                  },
                }}
              >
                {' '}
                Login/Register
              </Typography>
            </Button>
            <Button
              sx={{
                height: isDesktop ? '80px' : '40px',
                width: isDesktop ? '200px' : '140px',
                bgcolor: '#FFFFFF',
                borderRadius: '5%',
              }}
              onClick={handleLoginGuest}
            >
              <Typography
                variant={isDesktop ? 'h4' : 'h7'}
                color={'#77A6F7'}
                fontWeight={700}
                sx={{
                  '&:hover': {
                    color: '#FFFFFF',
                    fontWeight: '900',
                  },
                }}
              >
                {' '}
                Login As Guest
              </Typography>
            </Button>
          </Box>
          <Box mt={'10px'} mr={'20px'} display={isDesktop ? 'none' : 'block'}>
            <MenuIcon
              onClick={() => setOpen(true)}
              sx={{
                height: '60px',
                width: '60px',
                color: 'white',
              }}
            />
            <Menu
              id="positioned-menu"
              aria-labelledby="positioned-button"
              open={open}
              onClose={(e) => setOpen(false)}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem>
                <Link variant="h5" color={'#77A6F7'} href="/login">
                  Login/Register
                </Link>{' '}
              </MenuItem>
              <MenuItem
                onClick={handleLoginGuest}
                sx={{
                  '&:hover': {
                    color: '#FFFFFF',
                    fontWeight: '500',
                  },
                }}
              >
                <Link variant="h5" color={'#77A6F7'} href="# ">
                  LoginAsGuest
                </Link>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Box>
      <Hero setCarouselText={setCarouselText} />
    </Box>
  )
}

export default LandingPage
