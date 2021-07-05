import Contests from "../containers/Contests";
import MyContests from "../containers/MyContests";
import LandingPage from "../containers/LandingPage";

export const routes = [
  {
    path: '/contests',
    content: Contests
  },
  {
    path: '/mycontests',
    content: MyContests
  },
  {
    path: '/*',
    content: LandingPage
  }
]