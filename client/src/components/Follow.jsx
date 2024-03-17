import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FlexBetween from './FlexBetween'
import UserImage from './UserImage'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import volunteerService from '../services/volunteers'
import { useState, useEffect } from 'react'
// import { setVolunteersYouFollow } from '../reducers/volunteerReducer'

const FollowedByYou = ({
  followedId,
  name,
  subtitle,
  volunteerPicturePath,
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useSelector((state) => state.volunteer.currentVolunteer)

  const [isfollowedByYou, setIsfollowedByYou] = useState(false)

  const axiosPrivate = useAxiosPrivate()

  const { palette } = useTheme()
  const primaryLight = palette.primary.light
  const primaryDark = palette.primary.dark
  const main = palette.neutral.main
  const medium = palette.neutral.medium

  const checkIsFollowing = async () => {
    if (id && followedId) {
      const response = await volunteerService.checkIsFollowing(
        id,
        followedId,
        axiosPrivate
      )

      setIsfollowedByYou(response)
    } else {
      setIsfollowedByYou(false)
    }
  }
  useEffect(() => {
    checkIsFollowing()
  }, [])

  const followUnfollow = async (id, followedId) => {
    const response = await volunteerService.followUnfollow(
      id,
      followedId,
      axiosPrivate
    )

    setIsfollowedByYou(!isfollowedByYou)

    navigate(0)
  }

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={volunteerPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${followedId}`)
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              '&:hover': {
                color: palette.primary.light,
                cursor: 'pointer',
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => followUnfollow(id, followedId)}
        sx={{ backgroundColor: primaryLight, p: '0.6rem' }}
      >
        {isfollowedByYou ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  )
}

export default FollowedByYou
