import { Box, Typography, useMediaQuery } from '@mui/material'
import './widgets.css'
import { useEffect } from 'react'

const CarouselItem = ({ title, imgUrl }) => {
  const isDesktop = useMediaQuery('(min-width:1600px)')

  return (
    <Box height={isDesktop ? '100vh' : '85vh'} position={'relative'}>
      <img
        className="carouselImg"
        src={imgUrl}
        height={'100%'}
        width={'100%'}
      />
    </Box>
  )
}

export default CarouselItem
