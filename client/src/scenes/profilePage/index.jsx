import { Box, useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Navbar from '../navbar'
import MyPostWidget from '../widgets/MyPostWidget'
import PostsWidget from '../widgets/PostsWidget'
import UserWidget from '../widgets/UserWidget'
import FollowingListWidget from '../widgets/FollowingListWiget'
const ProfilePage = () => {
  const [volunteer, setVolunteer] = useState(null)
  const { volunteerId } = useParams()
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)')
  const currentVoluneerId = useSelector(
    (state) => state.volunteer.currentVolunteer.id
  )
  const volunteers = useSelector((state) => state.volunteer.volunteers)

  const getVolunteer = () => {
    const volunteer = volunteers.find((volunteer) => {
      return Number(volunteer.id) === Number(volunteerId)
    })
    setVolunteer(volunteer)
  }

  useEffect(() => {
    getVolunteer()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!volunteer) return null

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget
            volunteerId={volunteerId}
            picturePath={volunteer.picturePath}
          />
          <Box m="2rem 0" />
          <FollowingListWidget volunteerId={volunteerId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}
        >
          {Number(currentVoluneerId) === Number(volunteerId) ? (
            <MyPostWidget picturePath={volunteer.picturePath} />
          ) : null}
          <Box m="2rem 0" />
          <PostsWidget volunteerId={volunteerId} isProfile={true} />
        </Box>
      </Box>
    </Box>
  )
}

export default ProfilePage
