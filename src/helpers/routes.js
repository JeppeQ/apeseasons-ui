import Contests from "../containers/Contests";
import PlayerContests from "../containers/PlayerContests";
import LandingPage from "../containers/LandingPage";

export const routes = [
  {
    path: '/contests',
    content: Contests
  },
  {
    path: '/mycontests',
    content: PlayerContests
  },
  {
    path: '/*',
    content: LandingPage
  }
]