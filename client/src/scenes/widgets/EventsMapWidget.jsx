import { Box, useTheme, Typography, useMediaQuery } from '@mui/material'
import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactMapGL, {
  Marker,
  Popup,
  NavigationControl,
  GeolocateControl,
} from 'react-map-gl'
import { Room } from '@mui/icons-material'
import { format } from 'timeago.js'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import Geocoder from './GeocoderWidget'
// eslint-disable-next-line react/prop-types
const EventMapsWidget = ({}) => {
  const isNonMobileScreen = useMediaQuery('(min-width: 1000px)')

  const [showPopup, setShowPopup] = useState(false)
  const [clickedPopUpId, setClickPopUpId] = useState(0)

  const events = useSelector((state) => state.events.events)
  const navigate = useNavigate()
  const mapRef = useRef()
  const { palette } = useTheme()

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

  // eslint-disable-line react-hooks/exhaustive-deps

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
      {events.map((e) => (
        <Box key={e.id}>
          <Marker
            longitude={e.longitude}
            latitude={e.latitude}
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
              onClick={() => handleMarkerClick(e.id, e.latitude, e.longitude)}
            >
              {truncateString(e.title, 11)}
            </Typography>
            <Room
              style={{
                width: 'min-content',

                fontSize: viewState.zoom * 4,
                color: 'tomato',
                cursor: 'pointer',
              }}
              onClick={() => handleMarkerClick(e.id, e.latitude, e.longitude)}
            />
          </Marker>
          {showPopup && clickedPopUpId === e.id ? (
            <Popup
              longitude={e.longitude}
              latitude={e.latitude}
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
                  <PopupLabel variant="h3">Title:</PopupLabel>{' '}
                  <PopupContent variant="h3">{e.title}</PopupContent>{' '}
                </Box>
                <Box
                  display="flex"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <PopupLabel variant="h3">Date:</PopupLabel>{' '}
                  <PopupContent variant="h3">
                    {new Date(e.date).toDateString()}
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
                  <PopupLabel variant="h3">Description:</PopupLabel>{' '}
                  <PopupContent variant="h3">
                    {truncateString(e.description, 200)}
                  </PopupContent>{' '}
                </Box>{' '}
                <Box
                  display="flex"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <PopupLabel variant="h3">Location:</PopupLabel>
                  <PopupContent variant="h3">{e.location}</PopupContent>{' '}
                </Box>{' '}
                <Box
                  display="flex"
                  sx={{
                    display: 'column',
                    flexDirection: 'row',
                  }}
                >
                  {' '}
                  <PopupLabel variant="h3">Agency:</PopupLabel>{' '}
                  <PopupContent
                    variant="h3"
                    sx={{
                      '&:hover': {
                        color: 'tomato',
                      },
                    }}
                    onClick={() => navigate(`/agency/${e.createdByAgencyId}`)}
                  >
                    {e.agencyName}
                  </PopupContent>{' '}
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

export default EventMapsWidget
