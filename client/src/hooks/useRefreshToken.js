import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setAccessToken } from '../reducers/globalReducer'
const BASE_URL = import.meta.env.VITE_BASE_URL

const useRefreshToken = () => {
  const dispatch = useDispatch()

  const refresh = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/refresh/volunteer`, {
        withCredentials: true,
      })

      dispatch(setAccessToken(response.data.accessToken))
      return response.data.accessToken
    } catch (err) {
      console.log('Error', err)
    }
  }
  return refresh
}

export default useRefreshToken
