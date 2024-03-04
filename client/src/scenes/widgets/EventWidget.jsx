import { Typography, useTheme, Button, Box } from '@mui/material'
import FlexBetween from '../../components/FlexBetween'
import WidgetWrapper from '../../components/WidgetWrapper'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const EventWidget = ({ agencyId }) => {
  const events = useSelector((state) => state.events.events)
  const { palette } = useTheme()
  const dark = palette.neutral.dark
  const main = palette.neutral.main
  const medium = palette.neutral.medium

  const [agencyEvents, setAgencyEvents] = useState()
  const getAgencyEvents = () => {
    const agencyEvents = events.find((event) => {
      return Number(event.createdByAgencyId) === Number(agencyId)
    })
    setAgencyEvents(agencyEvents)
  }

  useEffect(() => {
    getAgencyEvents()
  }, [])

  if (!agencyEvents) return

  return (
    <WidgetWrapper>
      <Box>
        <Typography color={dark} varaint="h5" fontWeight="900">
          Upcoming Event
        </Typography>
        <Typography color={main}>{agencyEvents.title}</Typography>
      </Box>
      <Box>
        <Typography color={dark} varaint="h5" fontWeight="500">
          Description:
        </Typography>
        <Typography color={main}>{agencyEvents.description}</Typography>
      </Box>
      <Box>
        <Typography color={dark} varaint="h5" fontWeight="500">
          Location:
        </Typography>
        <Typography color={main}>{agencyEvents.location}</Typography>
      </Box>
      <Box>
        <Typography color={dark} varaint="h5" fontWeight="500">
          Date:
        </Typography>
        <Typography color={main}>
          {new Date(agencyEvents.date).toDateString()}
        </Typography>
      </Box>
    </WidgetWrapper>
  )
}

export default EventWidget
