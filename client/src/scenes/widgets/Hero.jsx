import React from 'react'
import { Box, useMediaQuery } from '@mui/material'
import CarouselWidget from './CarouselWidget'
const Hero = ({ setCarouselText }) => {
  const isDesktop = useMediaQuery('(min-width:1600px)')

  return (
    <Box
      height={isDesktop ? '100vh' : '85vh'}
      width={isDesktop ? '50vw' : '100vw'}
    >
      <CarouselWidget setCarouselText={setCarouselText} />
    </Box>
  )
}

export default Hero
