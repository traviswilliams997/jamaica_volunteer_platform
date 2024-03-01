import { Box, Button, useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../navbar'
import MyPostWidget from '../widgets/MyPostWidget'
import PostsWidget from '../widgets/PostsWidget'
import UserWidget from '../widgets/UserWidget'
import FollowingListWidget from '../widgets/FollowingListWiget'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

import volunteerService from '../../services/volunteers'
const ProfilePage = () => {
  const [volunteer, setVolunteer] = useState(null)
  const { volunteerId } = useParams()
  const privateAxios = useAxiosPrivate()
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)')

  const getVolunteer = async () => {
    const data = await volunteerService.getById(volunteerId, privateAxios)

    setVolunteer(data)
  }

  useEffect(() => {
    getVolunteer()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!volunteer) return null

  return (
    <Box>
      <Navbar />
      <Button onClick={() => console.log(volunteer)}>Button</Button>
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
          <MyPostWidget picturePath={volunteer.picturePath} />
          <Box m="2rem 0" />
          Profile
          <PostsWidget volunteerId={volunteerId} isProfile />
        </Box>
      </Box>
    </Box>
  )
}

export default ProfilePage
