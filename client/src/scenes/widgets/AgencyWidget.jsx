import {
  ManageAccountsOutlined,
  EditOutlined,
  BuildOutlined,
} from '@mui/icons-material'
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import { Box, Typography, Divider, useTheme, IconButton } from '@mui/material'
import UserImage from '../../components/UserImage'
import FlexBetween from '../../components/FlexBetween'
import WidgetWrapper from '../../components/WidgetWrapper'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AgencyWidget = ({ agencyId, picturePath }) => {
  const agencies = useSelector((state) => state.agency.agencies)
  const [agency, setAgency] = useState(false)
  const { palette } = useTheme()
  const navigate = useNavigate()

  const dark = palette.neutral.dark
  const medium = palette.neutral.medium
  const main = palette.neutral.main

  const getAgency = async () => {
    const currentAgency = agencies.find((a) => {
      return Number(a.id) === Number(agencyId)
    })

    setAgency(currentAgency)
  }

  const getNumMembersText = () => {
    if (!Object.prototype.hasOwnProperty.call(agency, 'memberships'))
      return ` 0 members`
    if (agency.memberships.length === 1) {
      return ` 1 member`
    }
    return `${agency.memberships.length} members`
  }

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + '...'
    } else {
      return str
    }
  }
  useEffect(() => {
    getAgency()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!agency) {
    return null
  }

  const { name, phoneNumber, about } = agency

  return (
    <WidgetWrapper>
      {/* FIRST ROW*/}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/agency/${agencyId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />

          <Box>
            <Typography
              variant="h4"
              color={dark}
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
            <Typography color={medium}> {getNumMembersText()}</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      {/* SECOND ROW*/}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <PhoneIphoneOutlinedIcon fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{phoneNumber}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <DescriptionOutlinedIcon fontSize="medium" sx={{ color: main }} />
          <Typography color={medium}>{truncateString(about, 400)}</Typography>
        </Box>
      </Box>
      <Divider />

      {/* THIRD ROW*/}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}> Time Volunteered At</Typography>
          <Typography color={medium} fontWeight="500">
            167.8 Years
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Box display="flex">
            <Typography color={medium}> Rank</Typography>
          </Box>
          <Typography color={medium} fontWeight="500">
            #1 By Hours Volunteered At
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Karma</Typography>
          <Typography color={medium} fontWeight="500">
            7098239812
          </Typography>
        </FlexBetween>
      </Box>
      <Divider />

      {/* FOURTH ROW*/}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img
              height="50px"
              width="50px"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png"
              alt="twitter"
            />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img
              height="50px"
              width="50px"
              src="https://store-images.s-microsoft.com/image/apps.31120.9007199266245564.44dc7699-748d-4c34-ba5e-d04eb48f7960.bc4172bd-63f0-455a-9acd-5457f44e4473"
              alt="linkedin"
            />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  )
}
export default AgencyWidget
