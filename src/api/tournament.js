import axios from 'axios'
import { API_ENDPOINT } from './'

const API_ROUTE = `${API_ENDPOINT}/tournament`

export async function getUpcoming() {
  const url = `${API_ROUTE}/upcoming`
  const response = await axios.get(url)
    .catch(err => console.log(err))

  return response ? response.data : null
}

export async function getRunning() {
  const url = `${API_ROUTE}/running`
  const response = await axios.get(url)
    .catch(err => console.log(err))

  return response ? response.data : null
}

export async function getPlayers(tournamentId) {
  const url = `${API_ROUTE}/players`
  const response = await axios.get(url, {
    params: {
      tournamentId,
    }
  })
    .catch(err => console.log(err))

  return response ? response.data : null
}