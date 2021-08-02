import axios from 'axios'
import { API_ENDPOINT } from './'

const API_ROUTE = `${API_ENDPOINT}/token`

export async function getTokens() {
  const url = `${API_ROUTE}/all`
  const response = await axios.get(url)
    .catch(err => console.log(err))

  return response ? response.data : null
}