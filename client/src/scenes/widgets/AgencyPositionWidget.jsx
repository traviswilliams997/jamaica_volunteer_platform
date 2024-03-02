import { Typography, Box, useTheme } from '@mui/material'
import FlexBetween from '../../components/FlexBetween'
import WidgetWrapper from '../../components/WidgetWrapper'
import { useEffect, useState } from 'react'

const AgencyPositionWidget = ({ agencyPosition }) => {
  const { palette } = useTheme()
  const [position, setPosition] = useState(false)
  const dark = palette.neutral.dark
  const main = palette.neutral.main
  const medium = palette.neutral.medium

  useEffect(() => {
    setPosition(agencyPosition)
  }, [])

  if (!position) return
  return (
    <WidgetWrapper>
      <Typography color={dark} varaint="h5" fontWeight="500">
        Title:
      </Typography>
      <Typography color={main}>{position.title}</Typography>

      <Typography color={dark} varaint="h5" fontWeight="500">
        {' '}
        Descripition:
      </Typography>
      <Typography color={main} m="0.5rem 0">
        {position.description}
      </Typography>
      <Typography color={dark} varaint="h5" fontWeight="500">
        {' '}
        Skills Wanted:
      </Typography>
      <Typography color={main} m="0.5rem 0">
        {position.skills}
      </Typography>
      <Typography color={dark} varaint="h5" fontWeight="500">
        {' '}
        Schedule:
      </Typography>
      <Typography color={main} m="0.5rem 0">
        {position.schedule}
      </Typography>
      <Typography color={dark} varaint="h5" fontWeight="500">
        {' '}
        Vacancies:
      </Typography>
      <Typography color={main} m="0.5rem 0">
        {position.vacancies}
      </Typography>

      <Typography color={dark} varaint="h5" fontWeight="500">
        {' '}
        Posted:
      </Typography>
      <Typography color={medium}>Thursday, Feb 29, 2024</Typography>
    </WidgetWrapper>
  )
}

export default AgencyPositionWidget
