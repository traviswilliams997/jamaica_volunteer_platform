import { Box, Typography, useTheme } from '@mui/material'
import FollowedByYou from '../../components/Follow'
import WidgetWrapper from '../../components/WidgetWrapper'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { setVolunteersYouFollow } from '../../reducers/volunteerReducer'
const FollowingListWidget = ({ volunteerId }) => {
  const volunteersYouFollow = useSelector(
    (state) => state.volunteer.volunteersYouFollow
  )
  const dispatch = useDispatch()
  const { palette } = useTheme()
  const axiosPrivate = useAxiosPrivate()

  const getFollowedByVolunteer = async () => {
    dispatch(setVolunteersYouFollow(volunteerId, axiosPrivate))
  }

  useEffect(() => {
    getFollowedByVolunteer()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
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
        {!volunteersYouFollow.empty ? (
          volunteersYouFollow.map((followed) => (
            <FollowedByYou
              key={followed.id}
              followedId={followed.id}
              name={`${followed.firstName} ${followed.lastName}`}
              subtitle={followed.about}
              volunteerPicturePath={followed.picturePath}
            />
          ))
        ) : (
          <Box>You are not following any one yet</Box>
        )}
      </Box>
    </WidgetWrapper>
  )
}

export default FollowingListWidget
