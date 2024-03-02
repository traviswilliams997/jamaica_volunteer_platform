import { Box, useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../navbar'
import MyPostWidget from '../widgets/MyPostWidget'
import PostsWidget from '../widgets/PostsWidget'
import UserWidget from '../widgets/UserWidget'
import FollowingListWidget from '../widgets/FollowingListWiget'
import AgencyPositionsWidget from '../widgets/AgencyPositionsWidget '
import AgencyWidget from '../widgets/AgencyWidget'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

import agencyService from '../../services/agencies'
const ProfilePage = () => {
  const [agency, setAgency] = useState(null)
  const { agencyId } = useParams()
  const privateAxios = useAxiosPrivate()
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)')

  const getAgency = async () => {
    const data = await agencyService.getById(agencyId, privateAxios)
    setAgency(data)
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
        {/*<Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}
        >
          <MyPostWidget picturePath={volunteer.picturePath} />
          <Box m="2rem 0" />
          <PostsWidget volunteerId={volunteerId} isProfile={true} />
        </Box> */}

        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
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
