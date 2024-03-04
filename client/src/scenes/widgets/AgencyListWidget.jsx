import { Box, Typography, useTheme } from '@mui/material'
import Join from '../../components/Join'
import WidgetWrapper from '../../components/WidgetWrapper'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import volunteers from '../../services/volunteers'
// eslint-disable-next-line react/prop-types
const AgencyListWidget = ({ volunteerId }) => {
  const allAgencies = useSelector((state) => state.agency.agencies)
  const allVolunteers = useSelector((state) => state.volunteer.volunteers)
  const [thisPageVolunteer, setThisPageVolunteer] = useState()
  const [yourAgencies, setYourAgencies] = useState([])
  const { palette } = useTheme()

  const findMemberships = (volunteerId) => {
    const volunteer = allVolunteers.find((volunteer) => {
      return Number(volunteer.id) === Number(volunteerId)
    })

    setThisPageVolunteer(volunteer)
    if (!Object.prototype.hasOwnProperty.call(volunteer, 'memberships')) {
      return []
    }
    return volunteer.memberships
  }

  const getYourAgencies = () => {
    const memberships = findMemberships(volunteerId)

    const agencies = memberships.map((membership) => {
      const agency = allAgencies.find((agency) => {
        return Number(agency.id) === Number(membership.agencyId)
      })
      const position = membership.position
      const agencyAndPosition = { position, ...agency }
      return agencyAndPosition
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
        {`${thisPageVolunteer.firstName}'s Agencies`}
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {yourAgencies.length !== 0 ? (
          yourAgencies.map((agency) => (
            <Join
              key={agency.id}
              agencyId={agency.id}
              name={`${agency.name}`}
              subtitle={agency.position}
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
