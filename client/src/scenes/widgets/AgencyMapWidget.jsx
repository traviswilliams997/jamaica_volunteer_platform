import { Box, useTheme, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { initializeAgencies } from '../../reducers/agencyReducer'
import agenciesService from '../../services/agencies'
import Map, { Marker, Popup } from 'react-map-gl'
import { Room, Star } from '@mui/icons-material'
import { format } from 'timeago.js'
import { styled } from '@mui/system'

// eslint-disable-next-line react/prop-types
const AgenciesWidget = ({}) => {
  const [showPopup, setShowPopup] = useState(false)

  const [agencies, setAgencies] = useState([])
  const { palette } = useTheme()
  const dispatch = useDispatch()

  const [viewState, setViewState] = useState({
    longitude: -76.8099,
    latitude: 18.0179,
    zoom: 11,
  })

  const PopupLabel = styled(Typography)(({}) => ({
    width: 'max-content',
    color: 'tomato',
    fontSize: '1rem',
    fontWeight: '500',
    margin: '3px 0',
  }))

  const PopupContent = styled(Typography)(({}) => ({
    width: 'max-content',
    color: 'black',
    fontSize: '1rem',
    fontWeight: '500',
    margin: '3px 0',
  }))

  const getAgencies = async () => {
    const res = await agenciesService.getAll()
    setAgencies(res)
    dispatch(initializeAgencies())
  }

  const handleMarkerClick = (id, lat, long) => {
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
              color="tomato"
              variant="h5"
              fontWeight="700"
              sx={{
                fontSize: `${viewState.zoom * 1}px`,
                '&:hover': {
                  color: palette.primary.main,
                },
              }}
            >
              {a.name}
            </Typography>
            <Room
              style={{
                fontSize: viewState.zoom * 2,
                color: 'tomato',
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
                  height: '200px',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Box
                  display="flex"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {' '}
                  <PopupLabel variant="h5">Agency:</PopupLabel>{' '}
                  <PopupLabel variant="h5">Type:</PopupLabel>{' '}
                  <PopupLabel variant="h5">Members:</PopupLabel>{' '}
                  <PopupLabel variant="h5">Rating:</PopupLabel>
                  <PopupLabel variant="h5">Founded:</PopupLabel>
                </Box>
                <Box
                  display="flex"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {' '}
                  <PopupContent variant="h5">{a.name}</PopupContent>{' '}
                  <PopupContent variant="h5">{a.type}</PopupContent>{' '}
                  <PopupContent variant="h5">10</PopupContent>{' '}
                  <PopupContent variant="h5" sx={{ color: 'gold' }}>
                    <PopupContent variant="h5">February 24, 2024</PopupContent>{' '}
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                  </PopupContent>
                </Box>
              </Box>
            </Popup>
          ) : null}
        </Box>
      ))}
    </Map>
  )
}

export default AgenciesWidget
