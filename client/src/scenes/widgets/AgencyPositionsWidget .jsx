import { Box, Button, Typography, useTheme } from '@mui/material'
import FollowedByYou from '../../components/Follow'
import AgencyPositionWidget from '../widgets/AgencyPositionWidget'
import WidgetWrapper from '../../components/WidgetWrapper'
import { useEffect, useState } from 'react'
import FlexBetween from '../../components/FlexBetween'

// eslint-disable-next-line react/prop-types
const AgencyPositionsWidget = ({ agencyPositions }) => {
  const { palette } = useTheme()
  const [positions, setPositions] = useState([])

  useEffect(() => {
    setPositions(agencyPositions)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={palette.neutral.dark} variant="h5" fontWeight="500">
          Open Positions
        </Typography>
        <Button
          disabled={!agencyPositions}
          onClick={() => {}}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: '3rem',
          }}
        >
          Apply
        </Button>
      </FlexBetween>

      <Box display="flex" flexDirection="column" gap="0.5rem">
        {positions.length !== 0 ? (
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
