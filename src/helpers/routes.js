import Contests from "../containers/Contests";
import LandingPage from "../containers/LandingPage";

export const routes = [
  {
    path: '/contests',
    content: Contests
  },
  {
    path: '/*',
    content: LandingPage
  }
]