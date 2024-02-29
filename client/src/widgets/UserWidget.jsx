import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from '@mui/icons-material'
import { Box, Typography, Divider, useTheme } from '@mui/material'
import UserImage from '../components/UserImage'
import FlexBetween from '../components/FlexBetween'
import WidgetWrapper from '../components/WidgetWrapper'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

const UserWidget = ({ volunteerId, picturePath }) => {
  const [user, setUser] = useState(null)
  const [followers, setFollowers] = useState([])
  const { palette } = useTheme()
  const navigate = useNavigate()
  const axiosPrivate = useAxiosPrivate()

  const dark = palette.neutral.dark
  const medium = palette.neutral.medium
  const main = palette.neutral.main

  useEffect(() => {
    const getVolunteer = async () => {
      const response = await axiosPrivate.get(`/api/volunteers/${volunteerId}`)
      setUser(response.data)
    }

    const getFollowers = async () => {
      const response = await axiosPrivate.get(
        `/api/volunteers/${volunteerId}/following`
      )
      setFollowers(response.data)
    }

    getVolunteer()

    getFollowers()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!user) {
    return null
  }

  const {
    firstName,
    lastName,
    phoneNumber,
    picture,
    dateOfBirth,
    about,
    skills,
  } = user

  return (
    <WidgetWrapper>
      {/* FIRST ROW*/}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${volunteerId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage
            image={
              'https://www.google.com/search?sca_esv=a1ed381ddb91d5f7&sca_upv=1&sxsrf=ACQVn091AAmhIYQsnk6ZISq9jb712feF4Q:1709160722939&q=image&tbm=isch&source=lnms&sa=X&ved=2ahUKEwjXsITuj8-EAxXiTDABHWpZA9MQ0pQJegQIDRAB&biw=1660&bih=966&dpr=1.5#imgrc=aVgXecnmQ_f1MM'
            }
          />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                '&:hover': {
                  color: palette.primary.light,
                  cursor: 'pointer',
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>
              {' '}
              {followers && followers.length} followers
            </Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      {/* SECOND ROW*/}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{phoneNumber}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{about}</Typography>
        </Box>
      </Box>
      <Divider />

      {/* THIRD ROW*/}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who has viewed your profile</Typography>
          <Typography color={medium} fontWeight="500">
            1000
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={medium} fontWeight="500">
            200000
          </Typography>
        </FlexBetween>
      </Box>
      <Divider />

      {/* FOURTH ROW*/}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  )
}
export default UserWidget
