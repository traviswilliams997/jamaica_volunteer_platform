import { Box, Typography, useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from '../navbar'
import PostsWidget from '../widgets/PostsWidget'
import AgencyPositionsWidget from '../widgets/AgencyPositionsWidget '
import AgencyWidget from '../widgets/AgencyWidget'
import EventWidget from '../widgets/EventWidget'
import WidgetWrapper from '../../components/WidgetWrapper'

const ProfilePage = () => {
  const [agency, setAgency] = useState(null)
  const [hasPosts, setHasPosts] = useState(true)

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

    if (agency && Object.prototype.hasOwnProperty.call(agency, 'posts')) {
      setHasPosts(true)
    }
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
          mt={isNonMobileScreens ? undefined : '1rem'}
        >
          {hasPosts ? (
            <PostsWidget agencyId={agencyId} isProfile={true} isAgency={true} />
          ) : (
            <WidgetWrapper>
              <Box display="flex" justifyContent="center">
                <Typography variant="h6" fontSize="3rem">
                  {' '}
                  No Posts Yet
                </Typography>
              </Box>
            </WidgetWrapper>
          )}
        </Box>

        <Box
          flexBasis={isNonMobileScreens ? '26%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}
        >
          <EventWidget agencyId={agencyId} />
          <Box m="2rem 0" />
          <AgencyPositionsWidget agencyPositions={agency.positions} />
        </Box>
      </Box>
    </Box>
  )
}

export default ProfilePage
