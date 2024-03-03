import { Box, useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from '../navbar'
import MyPostWidget from '../widgets/MyPostWidget'
import PostsWidget from '../widgets/PostsWidget'
import UserWidget from '../widgets/UserWidget'
import FollowingListWidget from '../widgets/FollowingListWiget'
import AgencyPositionsWidget from '../widgets/AgencyPositionsWidget '
import AgencyWidget from '../widgets/AgencyWidget'

const ProfilePage = () => {
  const [agency, setAgency] = useState(null)

  const agencies = useSelector((state) => state.agency.agencies)

  const { agencyId } = useParams()
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)')

  const getAgency = async () => {
    const agency = agencies.find((agency) => {
      return Number(agency.id) === Number(agencyId)
    })
    setAgency(agency)
  }

  useEffect(() => {
    getAgency()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!agency) return null

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
          <AgencyWidget agencyId={agency.id} picturePath={agency.picturePath} />
          <Box m="2rem 0" />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}
        >
          {/*<MyPostWidget picturePath={volunteer.picturePath} /> */}
          <Box m="2rem 0" />
          <PostsWidget agencyId={agencyId} isProfile={true} isAgency={true} />
        </Box>

        <Box
          flexBasis={isNonMobileScreens ? '26%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}
        >
          <AgencyPositionsWidget agencyPositions={agency.positions} />
          <Box m="2rem 0" />
          <AgencyPositionsWidget agencyPositions={agency.positions} />
        </Box>
      </Box>
    </Box>
  )
}

export default ProfilePage
