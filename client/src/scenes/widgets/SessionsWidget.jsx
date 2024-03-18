import { Typography, useTheme } from '@mui/material'
import FlexBetween from '../../components/FlexBetween'
import WidgetWrapper from '../../components/WidgetWrapper'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

const SessionsWidget = ({ volunteerId }) => {
  const volunteers = useSelector((state) => state.volunteer.volunteers)
  const agencies = useSelector((state) => state.agency.agencies)
  const [sessions, setSessions] = useState([])
  const [sessionStart, setSessionStart] = useState(new Date())
  const [sessionEnd, setSessionEnd] = useState(new Date())
  const [sessionAgency, setSessionAgency] = useState('')
  const [hours, setHours] = useState('0')

  const { palette } = useTheme()
  const dark = palette.neutral.dark
  const main = palette.neutral.main
  const medium = palette.neutral.medium

  useEffect(() => {
    const volunteer = volunteers.find((volunteer) => {
      return Number(volunteer.id) === Number(volunteerId)
    })

    if (typeof volunteer !== 'undefined') {
      setSessions(volunteer.sessions)

      const sessAgency = agencies.find((agency) => {
        return (
          Number(agency.id) ===
          Number(
            volunteer.sessions[volunteer.sessions.length - 1].createdByAgencyId
          )
        )
      })
      setSessionAgency(sessAgency)

      setSessionStart(
        new Date(volunteer.sessions[volunteer.sessions.length - 1].sessionStart)
      )
      setSessionEnd(
        new Date(volunteer.sessions[volunteer.sessions.length - 1].sessionEnd)
      )
      const msHour = 60 * 60 * 1000
      const msDay = 60 * 60 * 24 * 1000
      setHours(Math.floor(((sessionEnd - sessionStart) % msDay) / msHour))
    }
  }, [])

  if (sessions.length === 0) return null
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
