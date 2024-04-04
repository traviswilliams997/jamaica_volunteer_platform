import { Box, useTheme, Typography, useMediaQuery } from '@mui/material'
import { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import ReactMapGL, {
  Marker,
  Popup,
  NavigationControl,
  GeolocateControl,
} from 'react-map-gl'
import { Room, Star } from '@mui/icons-material'
import { format } from 'timeago.js'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import Geocoder from './GeocoderWidget'
// eslint-disable-next-line react/prop-types
const AgencyMapWidget = ({}) => {
  const [showPopup, setShowPopup] = useState(false)
  const [clickedPopUpId, setClickPopUpId] = useState(0)
  const navigate = useNavigate()
  const mapRef = useRef()
  const agencies = useSelector((state) => state.agency.agencies)
  const { palette } = useTheme()
  const isNonMobileScreen = useMediaQuery('(min-width: 1000px)')

  const [viewState, setViewState] = useState({
    longitude: -76.8099,
    latitude: 18.0179,
    zoom: 12,
  })

  const PopupLabel = styled(Typography)(({}) => ({
    width: 'max-content',
    color: 'tomato',
    fontSize: '1rem',
    fontWeight: '500',
    margin: '3px 0',
  }))

  const PopupContent = styled(Typography)(({}) => ({
    color: 'black',
    fontSize: '1rem',
    fontWeight: '500',
    margin: '3px 0',
  }))

  const handleMarkerClick = (id, lat, long) => {
    setViewState({ ...viewState, latitude: lat, longitude: long })
    setClickPopUpId(id)
    setShowPopup(true)
  }

  const handleGeoLocateClick = (lat, long) => {
    setViewState({ ...viewState, latitude: lat, longitude: long })
  }

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + '...'
    } else {
      return str
    }
  }

  if (!agencies) return
  return (
    <ReactMapGL
      ref={mapRef}
      mapboxAccessToken={import.meta.env.VITE_MAPBOX}
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      style={{
        width: isNonMobileScreen ? '70vw' : '100%',
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
              color="tomato"
              variant="h5"
              fontWeight="700"
              sx={{
                fontSize: `${viewState.zoom * 1.5}px`,
                '&:hover': {
                  color: palette.primary.main,
                },
              }}
              onClick={() => navigate(`/agency/${a.id}`)}
            >
              {a.name}
            </Typography>
            <Room
              style={{
                fontSize: viewState.zoom * 4,
                color: 'tomato',
                cursor: 'pointer',
              }}
              onClick={() => handleMarkerClick(a.id, a.latitude, a.longitude)}
            />
          </Marker>
          {showPopup && clickedPopUpId === a.id ? (
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
                  height: '350px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'left',
                }}
              >
                <Box
                  display="flex"
                  sx={{
                    display: 'column',
                    flexDirection: 'row',
                  }}
                >
                  {' '}
                  <PopupLabel variant="h3">Agency:</PopupLabel>{' '}
                  <PopupContent variant="h3">{a.name}</PopupContent>{' '}
                </Box>
                <Box
                  display="flex"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {' '}
                  <PopupLabel variant="h3">About:</PopupLabel>{' '}
                  <PopupContent variant="h3">
                    {truncateString(a.about, 250)}
                  </PopupContent>{' '}
                </Box>
                <Box
                  display="flex"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {' '}
                  <PopupLabel variant="h3">Members:</PopupLabel>{' '}
                  <PopupContent variant="h3">110</PopupContent>{' '}
                </Box>{' '}
                <Box
                  display="flex"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <PopupLabel variant="h3">Rating:</PopupLabel>
                  <PopupContent variant="h3" sx={{ color: 'gold' }}>
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                  </PopupContent>
                </Box>{' '}
              </Box>
            </Popup>
          ) : null}{' '}
        </Box>
      ))}
      <NavigationControl position="bottom-right" />
      <GeolocateControl
        position="top-left"
        trackUserLocation
        onGeolocate={(e) =>
          handleGeoLocateClick(e.coords.longitude, e.coords.latitude)
        }
      />
      <Geocoder viewState={viewState} setViewState={setViewState} />
    </ReactMapGL>
  )
}

export default AgencyMapWidget
