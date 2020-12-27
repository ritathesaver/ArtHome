import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import {store} from '../redux'
import {signOut} from '../redux/actions/authActions'

const BASE_URL = 'http://localhost:3000'

const GUARDED_BASE_URL = `${BASE_URL}/660`

const getToken = () => {
  return AsyncStorage.getItem('userToken')
}

const getAuthHeader = async () => {
  const token = await getToken()
  return {Authorization: `Bearer ${token}`}
}

const getFn = async (path: string) => {
  try {
    const headers = await getAuthHeader()

    const result = await axios.get(`${GUARDED_BASE_URL}/${path}`, {headers})

    return result
  } catch (error) {
    if (error.message.includes('401')) {
      store.dispatch(signOut())
      return
    }
    throw error
  }
}
const postFn = async (path: string, data: any) => {
  try {
    const headers = await getAuthHeader()

    const result = await axios.post(`${GUARDED_BASE_URL}/${path}`, data, {
      headers,
    })

    return result
  } catch (error) {
    if (error.message.includes('401')) {
      store.dispatch(signOut())
      return
    }
    throw error
  }
}
const putFn = async (path: string, data: any) => {
  try {
    const headers = await getAuthHeader()

    const result = await axios.put(`${GUARDED_BASE_URL}/${path}`, data, {
      headers,
    })

    return result
  } catch (error) {
    if (error.message.includes('401')) {
      store.dispatch(signOut())
      return
    }
    throw error
  }
}
const deleteFn = async (path: string) => {
  try {
    const headers = await getAuthHeader()

    const result = await axios.delete(`${GUARDED_BASE_URL}/${path}`, {headers})

    return result
  } catch (error) {
    if (error.message.includes('401')) {
      store.dispatch(signOut())
      return
    }
    throw error
  }
}

const api = {get: getFn, post: postFn, put: putFn, delete: deleteFn}
export default api
