import { Box, useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux'
import Navbar from '../navbar'
import UserWidget from '../widgets/UserWidget'
import MyPostWidget from '../widgets/MyPostWidget'
import PostsWidget from '../widgets/PostsWidget'
import AgencyListWidget from '../widgets/AgencyListWidget'
import SessionsWidget from '../widgets/SessionsWidget'
import FollowingListWidget from '../widgets/FollowingListWiget'
const HomePage = () => {
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)')
  const volunteer = useSelector((state) => state.volunteer.currentVolunteer)

  return (
    <Box>
      {' '}
      <Navbar />{' '}
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget volunteer={volunteer} />
          <Box m="2rem 0" />
          <FollowingListWidget volunteerId={volunteer.id} />
        </Box>

        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}
        >
          <MyPostWidget posterPicturePath={volunteer.picturePath} />
          <PostsWidget volunteerId={volunteer.id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            {volunteer.sessions.length !== 0 ? (
              <Box>
                <SessionsWidget volunteer={volunteer} />
                <Box m="2rem 0" />
              </Box>
            ) : null}
            <AgencyListWidget volunteer={volunteer} />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default HomePage
