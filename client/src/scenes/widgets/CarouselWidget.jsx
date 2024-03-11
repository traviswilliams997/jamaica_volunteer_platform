import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import CarouselItem from './CarouselItem'

const CarouselWidget = ({ setCarouselText }) => {
  let items = [
    {
      title: 'Share Your Day',
      imgUrl:
        'https://res.cloudinary.com/ddrcxv4fg/image/upload/v1710136227/pvoywmwzzkbtv68txf4e.png',
    },
    {
      title: 'Find Agencies',
      imgUrl:
        'https://res.cloudinary.com/ddrcxv4fg/image/upload/v1710135386/fn4txelztzkgtpbf1990.png',
    },
    {
      title: 'Learn More',
      imgUrl:
        'https://res.cloudinary.com/ddrcxv4fg/image/upload/v1710135918/pcj0bjwppmgsciu8u4xd.png',
    },
    {
      title: 'Make Connections',
      imgUrl:
        'https://res.cloudinary.com/ddrcxv4fg/image/upload/v1710136103/ryrrcdorzzs6o9fc64as.png',
    },
    {
      title: 'Find Events',
      imgUrl:
        'https://res.cloudinary.com/ddrcxv4fg/image/upload/v1710135697/mj36vlxocfhz7ycakbbx.png',
    },
  ]

  return (
    <Carousel
      onChange={(now) => {
        setCarouselText(items[now].title)
      }}
    >
      {items.map((item, i) => (
        <CarouselItem key={i} title={item.title} imgUrl={item.imgUrl} />
      ))}
    </Carousel>
  )
}

export default CarouselWidget
