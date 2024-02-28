import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setAccessToken } from '../reducers/globalReducer'

const useRefreshToken = () => {
  const dispatch = useDispatch()

  const refresh = async () => {
    try {
      const response = await axios.get('/api/refresh', {
        withCredentials: true,
      })

      dispatch(setAccessToken(response.data.accessToken))
      return response.data.accessToken
    } catch (err) {
      console.log('Error', err.message)
    }
  }
  return refresh
}

export default useRefreshToken
