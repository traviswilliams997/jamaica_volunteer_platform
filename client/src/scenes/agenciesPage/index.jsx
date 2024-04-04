import { Box, useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux'
import Navbar from '../navbar'
import UserWidget from '../widgets/UserWidget'
import AgencyMapWidget from '../widgets/AgencyMapWidget'
const AgenciesPage = () => {
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)')
  const volunteer = useSelector((state) => state.volunteer.currentVolunteer)

  return (
    <Box>
      {' '}
      <Navbar />{' '}
      <Box
        width="100%"
        padding="2rem 2%"
        mr={'2rem 3%'}
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap="0.5rem"
        justifyContent="space-between"
      >
        {isNonMobileScreens && (
          <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
            <UserWidget volunteer={volunteer} />
          </Box>
        )}

        <Box
          flexBasis={isNonMobileScreens ? '74%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}
        >
          <AgencyMapWidget />
        </Box>
      </Box>
    </Box>
  )
}

export default AgenciesPage
