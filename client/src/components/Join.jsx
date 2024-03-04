import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FlexBetween from './FlexBetween'
import UserImage from './UserImage'

const Join = ({ agencyId, name, subtitle, picturePath, isMember = false }) => {
  const navigate = useNavigate()
  const { id } = useSelector((state) => state.volunteer.currentVolunteer.id)
  const { palette } = useTheme()
  const primaryLight = palette.primary.light
  const primaryDark = palette.primary.dark
  const main = palette.neutral.main
  const medium = palette.neutral.medium

  const JoinAgency = async (id, agencyId) => {}

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={picturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/agency/${agencyId}`)
            navigate(0)
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              '&:hover': {
                color: palette.primary.light,
                cursor: 'pointer',
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>

      <IconButton
        onClick={() => JoinAgency(id, agencyId)}
        sx={{ backgroundColor: primaryLight, p: '0.6rem' }}
      >
        {!isMember ? (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  )
}

export default Join
