import { Box, Typography, useTheme } from '@mui/material'
import FollowedByYou from '../../components/Follow'
import AgencyPositionWidget from '../widgets/AgencyPositionWidget'
import WidgetWrapper from '../../components/WidgetWrapper'
import { useEffect, useState } from 'react'

// eslint-disable-next-line react/prop-types
const AgencyPositionsWidget = ({ agencyPositions }) => {
  const { palette } = useTheme()
  const [positions, setPositions] = useState([])

  useEffect(() => {
    setPositions(agencyPositions)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: '1.5rem' }}
      >
        Open Positions
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {!positions.empty ? (
          positions.map((p) => (
            <AgencyPositionWidget key={p.id} agencyPosition={p} />
          ))
        ) : (
          <Box>No positions posted</Box>
        )}
      </Box>
    </WidgetWrapper>
  )
}

export default AgencyPositionsWidget
