import { Box, Typography, useTheme } from '@mui/material'
import Join from '../../components/Join'
import WidgetWrapper from '../../components/WidgetWrapper'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
// eslint-disable-next-line react/prop-types
const AgencyListWidget = ({ volunteerId }) => {
  const allAgencies = useSelector((state) => state.agency.agencies)
  const allVolunteers = useSelector((state) => state.volunteer.volunteers)
  const [yourAgencies, setYourAgencies] = useState([])
  const { palette } = useTheme()

  const findMemberships = (volunteerId) => {
    const volunteer = allVolunteers.find((volunteer) => {
      return Number(volunteer.id) === Number(volunteerId)
    })

    return volunteer.memberships
  }

  const getYourAgencies = () => {
    const memberships = findMemberships(volunteerId)

    const agencies = memberships.map((membership) => {
      const agency = allAgencies.find((agency) => {
        return Number(agency.id) === Number(membership.agencyId)
      })
      const joinedDate = new Date(membership.createdAt).toDateString()
      const agencyAndJoinedDate = { joinedDate, ...agency }
      return agencyAndJoinedDate
    })

    setYourAgencies(agencies)
  }

  useEffect(() => {
    getYourAgencies()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (yourAgencies.length === 0) return
  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: '1.5rem' }}
      >
        Agencies
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {yourAgencies.length !== 0 ? (
          yourAgencies.map((agency) => (
            <Join
              key={agency.id}
              agencyId={agency.id}
              name={`${agency.name}`}
              subtitle={agency.joinedDate}
              picturePath={agency.picturePath}
              isMember={true}
            />
          ))
        ) : (
          <Box>You are not a member of any agencyt</Box>
        )}
      </Box>
    </WidgetWrapper>
  )
}

export default AgencyListWidget
