import { Box, useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux'
import Navbar from '../navbar'
import UserWidget from '../widgets/UserWidget'
import MyPostWidget from '../widgets/MyPostWidget'
import PostsWidget from '../widgets/PostsWidget'
import FollowingListWidget from '../widgets/FollowingListWiget'
import SessionsWidget from '../widgets/SessionsWidget'
const AgenciesPage = () => {
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
          <UserWidget
            volunteerId={volunteer.id}
            picturePath={volunteer.picturePath}
          />
        </Box>

        <Box
          flexBasis={isNonMobileScreens ? '68%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}
        ></Box>
      </Box>
    </Box>
  )
}

export default AgenciesPage
