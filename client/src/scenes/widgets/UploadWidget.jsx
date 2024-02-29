/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react'
import { Box, Button, Typography, useTheme } from '@mui/material'
import FlexBetween from '../../components/FlexBetween'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

const UploadWidget = ({ pictureRef }) => {
  const { palette } = useTheme()
  const cloudinaryRef = useRef()
  const widgetRef = useRef()

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: 'ddrcxv4fg',
        uploadPreset: 'bms1p4mn',
      },
      function (error, result) {
        if (result.event === 'success') {
          pictureRef.current = result.info
        }
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Box
      gridColumn="span 4"
      border={`1px solid ${palette.neutral.medium}`}
      borderRadius="5px"
      p="1rem"
    >
      <Box
        border={`2px dashed ${palette.primary.main}`}
        p="1rem"
        sx={{ '&:hover': { cursor: 'pointer' } }}
      >
        {pictureRef.current === 'url' ? (
          <Button onClick={() => widgetRef.current.open()}>
            <Typography>Click to Add or Drop Profile Picture</Typography>
          </Button>
        ) : (
          <FlexBetween>
            <Typography>{pictureRef.current.original_filename}</Typography>
            <EditOutlinedIcon />
          </FlexBetween>
        )}
      </Box>{' '}
    </Box>
  )
}

export default UploadWidget
