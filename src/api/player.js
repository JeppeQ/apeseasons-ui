import axios from 'axios'
import { API_ENDPOINT } from './'

const API_ROUTE = `${API_ENDPOINT}/player`

export async function getUpcoming(address) {
  const url = `${API_ROUTE}/tournaments/upcoming`
  const response = await axios.get(url, {
    params: {
      address,
    }
  }).catch(err => console.log(err))

  return response ? response.data : null
}

export async function getRunning(address) {
  const url = `${API_ROUTE}/tournaments/running`
  const response = await axios.get(url, {
    params: {
      address,
    }
  }).catch(err => console.log(err))

  return response ? response.data : null
}

export async function getCompleted(address) {
  const url = `${API_ROUTE}/tournaments/completed`
  const response = await axios.get(url, {
    params: {
      address,
    }
  }).catch(err => console.log(err))

  return response ? response.data : null
}