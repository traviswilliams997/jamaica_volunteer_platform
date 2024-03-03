import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { useControl } from 'react-map-gl'

const Geocoder = ({ viewState, setViewState }) => {
  const ctrl = new MapBoxGeocoder({
    accessToken: import.meta.env.VITE_MAPBOX,
    marker: false,
    collapsed: true,
  })
  useControl(() => ctrl)
  ctrl.on('result', (e) => {
    const coords = e.result.geometry.coordinates

    setViewState({ ...viewState, latitude: coords[1], longitude: coords[0] })
  })
  return <></>
}

export default Geocoder
