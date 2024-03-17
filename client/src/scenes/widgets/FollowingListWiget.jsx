import { Box, Typography, useTheme } from '@mui/material'
import FollowedByYou from '../../components/Follow'
import WidgetWrapper from '../../components/WidgetWrapper'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import volunteerService from '../../services/volunteers'
// eslint-disable-next-line react/prop-types
const FollowingListWidget = ({ volunteerId }) => {
  const [volunteersYouFollow, setVolunteersYouFollow] = useState([])
  const dispatch = useDispatch()
  const { palette } = useTheme()
  const axiosPrivate = useAxiosPrivate()

  const getFollowedByVolunteer = async () => {
    const res = await volunteerService.getFollowing(volunteerId, axiosPrivate)
    setVolunteersYouFollow(res)
  }

  useEffect(() => {
    getFollowedByVolunteer()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (
    volunteersYouFollow.length === 0 ||
    typeof volunteersYouFollow === 'undefined'
  )
    return
  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: '1.5rem' }}
      >
        Following
      </Typography>

      <Box display="flex" flexDirection="column" gap="1.5rem">
        {volunteersYouFollow.length !== 0 ? (
          volunteersYouFollow.map(
            ({ id, firstName, lastName, about, picturePath }) => (
              <FollowedByYou
                key={id}
                followedId={id}
                name={`${firstName} ${lastName}`}
                subtitle={about}
                volunteerPicturePath={picturePath}
              />
            )
          )
        ) : (
          <Box>You are not following any one yet</Box>
        )}
      </Box>
    </WidgetWrapper>
  )
}

export default FollowingListWidget
