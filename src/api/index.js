import { createClient } from 'urql';

export function buildApiHeaders(token = localStorage.getItem('jwtToken')) {
  return {
    Authorization: `Bearer ${token}`
  }
}

const hostname = window && window.location && window.location.hostname

let API_ENDPOINT = ''
let URL = ''
let GRAPH_URL = ''
if (hostname.indexOf('localhost') > -1) {
  URL = 'http://localhost'
  API_ENDPOINT = 'http://localhost:8080/api'
  GRAPH_URL = 'https://api.thegraph.com/subgraphs/id/QmP7iKBzdRnMp49vSYNaNdVXd4F6MzBztLSdGnvTPquQtY'
} else {
  URL = ''
  API_ENDPOINT = ''
  GRAPH_URL = 'https://api.thegraph.com/subgraphs/id/QmP7iKBzdRnMp49vSYNaNdVXd4F6MzBztLSdGnvTPquQtY'
}

const graphClient = createClient({ url: GRAPH_URL })

export {
  API_ENDPOINT,
  URL,
  GRAPH_URL,
  graphClient
}
