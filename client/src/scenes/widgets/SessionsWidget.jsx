import { Typography, useTheme } from '@mui/material'
import FlexBetween from '../../components/FlexBetween'
import WidgetWrapper from '../../components/WidgetWrapper'
import { useSelector } from 'react-redux'

const SessionsWidget = ({ volunteerId }) => {
  const volunteers = useSelector((state) => state.volunteer.volunteers)
  const agencies = useSelector((state) => state.agency.agencies)

  const volunteer = volunteers.find((volunteer) => {
    return Number(volunteer.id) === Number(volunteerId)
  })
  const sessions = volunteer.sessions
  const sessionStart = new Date(sessions[sessions.length - 1].sessionStart)
  const sessionEnd = new Date(sessions[sessions.length - 1].sessionEnd)
  const msHour = 60 * 60 * 1000
  const msDay = 60 * 60 * 24 * 1000
  const hours = Math.floor(((sessionEnd - sessionStart) % msDay) / msHour)

  const sessionAgency = agencies.find((agency) => {
    return Number(agency.id) === Number(sessions[1].createdByAgencyId)
  })

  const { palette } = useTheme()
  const dark = palette.neutral.dark
  const main = palette.neutral.main
  const medium = palette.neutral.medium

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} varaint="h5" fontWeight="500">
          Last Session
        </Typography>
        <Typography color={main}>{sessionAgency.name}</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="agencyImg"
        src={sessionAgency.picturePath}
        style={{ borderRadius: '0.75rem', margin: '0.75rem' }}
      />
      <FlexBetween>
        <Typography color={main}> {sessionStart.toDateString()}</Typography>
        <Typography color={main}>{hours} Hours</Typography>
      </FlexBetween>
      <Typography color={dark} varaint="h5" fontWeight="300" m="0.5rem 0">
        {sessions[sessions.length - 1].workDone}
      </Typography>
    </WidgetWrapper>
  )
}

export default SessionsWidget
