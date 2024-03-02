import * as React from 'react'
import { Box, useTheme, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { initializeAgencies } from '../../reducers/agencyReducer'
import agenciesService from '../../services/agencies'
import WidgetWrapper from '../../components/WidgetWrapper'
import Map, { Marker, Popup } from 'react-map-gl'
import { Room, Star } from '@mui/icons-material'
import './agencies.css'
import { format } from 'timeago.js'
import { styled } from '@mui/system'

// eslint-disable-next-line react/prop-types
const AgenciesWidget = ({ volunteerId }) => {
  const [showPopup, setShowPopup] = useState(false)

  const [agencies, setAgencies] = useState([])
  const { palette } = useTheme()
  const dispatch = useDispatch()

  const [viewState, setViewState] = useState({
    longitude: -76.8099,
    latitude: 18.0179,
    zoom: 12,
  })

  const PopupLabel = styled(Typography)(({}) => ({
    width: 'max-content',
    color: palette.primary.main,
    fontsize: '24px',
    borderbottom: '0.5px solid tomato',
    margin: '3px 0',
  }))

  const getAgencies = async () => {
    const res = await agenciesService.getAll()

    setAgencies(res)
    dispatch(initializeAgencies())
  }

  const handleMarkerClick = (volunteerId, lat, long) => {
    setViewState({ ...viewState, latitude: lat, longitude: long })
    setShowPopup(true)
  }

  useEffect(() => {
    getAgencies()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Map
      mapboxAccessToken={import.meta.env.VITE_MAPBOX}
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      style={{
        width: '70vw',
        height: '82vh',
        backgroundColor: palette.background.alt,
        borderRadius: '1.5rem',
        padding: '1.5rem 1.5rem 0.75rem 1.5rem',
      }}
    >
      {' '}
      {agencies.map((a) => (
        <Box key={a.username}>
          <Marker
            longitude={a.longitude}
            latitude={a.latitude}
            anchor="bottom"
            style={{ width: 30, height: 30, margin: 0 }}
          >
            <Typography
              color={palette.primary.main}
              variant="h5"
              fontWeight="700"
              sx={{
                '&:hover': {
                  color: palette.primary.dark,
                  cursor: 'pointer',
                },
              }}
            >
              {a.name}
            </Typography>
            <Room
              style={{
                fontSize: viewState.zoom * 5,
                color: palette.primary.main,
                cursor: 'pointer',
              }}
              onClick={() => handleMarkerClick(a.id, a.latitude, a.longitude)}
            />
          </Marker>

          {showPopup ? (
            <Popup
              longitude={a.longitude}
              latitude={a.latitude}
              anchor="right"
              closeOnClick={false}
              closeButton={true}
            >
              <Box
                display="flex"
                sx={{
                  width: '250px',
                  height: '250px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <PopupLabel variant="h5">Agency</PopupLabel>
                <Typography className="place">{a.name}</Typography>
                <PopupLabel variant="h5">Type</PopupLabel>
                <Typography className="desc">{a.type}</Typography>
                <PopupLabel>Founded</PopupLabel>
                <Typography className="username">February 24, 2024 </Typography>
                <PopupLabel>Members</PopupLabel>
                <Typography className="username">10</Typography>
                <PopupLabel variant="h5">Rating</PopupLabel>
                <Typography sx={{ color: 'gold' }}>
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </Typography>
              </Box>
            </Popup>
          ) : null}
        </Box>
      ))}
    </Map>
  )
}

export default AgenciesWidget
