import { graphClient } from './';

export async function getTournaments() {
  const query = `
    query {
      tournaments {
        id
        startBlock
        endBlock
        ticketPrice
        playerCount
      }
    }
  `
  const data = await graphClient.query(query).toPromise();
  return data.data.tournaments
}