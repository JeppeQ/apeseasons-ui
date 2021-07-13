import { gql } from "@apollo/client"

export const TournamentsQuery = gql`
  query GetTournaments {
    tournaments {
      id
      startBlock
      endBlock
      ticketPrice
      playerCount
    }
  }
`