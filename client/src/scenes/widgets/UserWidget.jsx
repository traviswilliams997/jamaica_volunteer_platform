import {
  ManageAccountsOutlined,
  EditOutlined,
  WorkOutlineOutlined,
  BuildOutlined,
} from '@mui/icons-material'
import WhatshotTwoToneIcon from '@mui/icons-material/WhatshotTwoTone'
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import { Box, Typography, Divider, useTheme, IconButton } from '@mui/material'
import UserImage from '../../components/UserImage'
import FlexBetween from '../../components/FlexBetween'
import WidgetWrapper from '../../components/WidgetWrapper'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { setVolunteersYouFollow } from '../../reducers/volunteerReducer'
import volunteerService from '../../services/volunteers'
const UserWidget = ({ volunteer }) => {
  const [followers, setFollowers] = useState([])
  const [followings, setFollowings] = useState([])
  const dispatch = useDispatch()
  const { palette } = useTheme()
  const navigate = useNavigate()
  const axiosPrivate = useAxiosPrivate()

  const dark = palette.neutral.dark
  const medium = palette.neutral.medium
  const main = palette.neutral.main

  const getVolunteersYouFollow = async () => {
    const response = await volunteerService.getFollowing(
      volunteerId,
      axiosPrivate
    )

    setFollowings(response.data)
  }

  const getFollowers = async () => {
    const response = await volunteerService.getFollowers(
      volunteerId,
      axiosPrivate
    )
    setFollowers(response.data)
  }

  const getFollowedByVolunteer = async () => {
    dispatch(setVolunteersYouFollow(volunteerId, axiosPrivate))
  }

  if (!volunteer) {
    return null
  }

  const { firstName, lastName, phoneNumber, dateOfBirth, about, skills } =
    volunteer

  return (
    <WidgetWrapper>
      {/* FIRST ROW*/}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${volunteer.id}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={volunteer.picturePath} />

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
            <Typography color={medium}> 5 followers</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      {/* SECOND ROW*/}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <PhoneIphoneOutlinedIcon fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{phoneNumber}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <DescriptionOutlinedIcon fontSize="medium" sx={{ color: main }} />
          <Typography color={medium}>{about}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <BuildOutlined fontSize="medium" sx={{ color: main }} />
          <Typography color={medium}>{skills}</Typography>
        </Box>
      </Box>
      <Divider />

      {/* THIRD ROW*/}
      <Box p="1rem 0">
        <FlexBetween>
          <Box display="flex">
            <Typography color={medium}>Current streak</Typography>
            <WhatshotTwoToneIcon fontSize="medium" sx={{ color: main }} />
          </Box>
          <Typography color={medium} fontWeight="500">
            10 Weeks
          </Typography>
        </FlexBetween>
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Hours Volunteered</Typography>
          <Typography color={medium} fontWeight="500">
            2100
          </Typography>
        </FlexBetween>

        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Rank</Typography>
          <Typography color={medium} fontWeight="500">
            #2 By Hours Volunteered
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Likes</Typography>
          <Typography color={medium} fontWeight="500">
            5000
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
            <img
              height="50px"
              width="50px"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png"
              alt="twitter"
            />
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
            <img
              height="50px"
              width="50px"
              src="https://store-images.s-microsoft.com/image/apps.31120.9007199266245564.44dc7699-748d-4c34-ba5e-d04eb48f7960.bc4172bd-63f0-455a-9acd-5457f44e4473"
              alt="linkedin"
            />
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
