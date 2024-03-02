import { Typography, useTheme } from '@mui/material'
import FlexBetween from '../../components/FlexBetween'
import WidgetWrapper from '../../components/WidgetWrapper'

const SessionsWidget = () => {
  const { palette } = useTheme()
  const dark = palette.neutral.dark
  const main = palette.neutral.main
  const medium = palette.neutral.medium

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} varaint="h5" fontWeight="500">
          Last Sessions
        </Typography>
        <Typography color={medium}>Red Cross</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="agencyImg"
        src="https://our.today/wp-content/uploads/2023/04/Jamaica-Red-Cross1-1024x695.jpg"
        style={{ borderRadius: '0.75rem', margin: '0.75rem' }}
      />
      <FlexBetween>
        <Typography color={main}> Thursday, Feb 29, 2024</Typography>
        <Typography color={main}>3 Hours</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Distributed items of clothing, food, medical and household articles and
        supplies to persons in need.
      </Typography>
    </WidgetWrapper>
  )
}

export default SessionsWidget
