import axios from 'axios'

const API_URL = 'https://api.coingecko.com/api/v3'

export async function getTokens(tokenIds) {
  try {
    const url = `${API_URL}/coins/markets?vs_currency=usd&ids=${tokenIds.join()}`
    const response = await axios.get(url).catch(err => console.log(err))
    return response.data
  } catch (ex) {
    console.log(ex)
  }
}