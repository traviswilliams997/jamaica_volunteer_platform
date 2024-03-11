import { Paper, Button, Box, Typography } from '@mui/material'
import './widgets.css'
import { useEffect } from 'react'
const CarouselItem = ({ title, imgUrl }) => {
  return (
    <Box height={'100vh'} position={'relative'}>
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
