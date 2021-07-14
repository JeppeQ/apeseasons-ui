import { gql } from "@apollo/client"
import { DateTime } from "luxon"

export const TournamentsQuery = gql`
  query GetTournaments {
    tournaments(where:{start_lt:${DateTime.utc()}}) {
      id
      start
      end
      startBlock
      endBlock
      ticketPrice
      playerCount
    }
  }
`

export const PlayersQuery = gql`
  query GetPlayers($id: String!, $first: Int, $skip: Int) {
    players(first:$first, skip:$skip, where:{tournament: $id}) {
      id
      tokensBalances {
        token
        amount
      }
    }
  }
`

export const PlayerTournamentsQuery = gql`
  query GetPlayerTournaments($id: ID!) {
    players(id:$id) {
      id
      tournament {
        id
        playerCount
      }
      tokensBalances {
        token
        amount
      }
    }
  }
`