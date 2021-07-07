import Contests from "../containers/Contests";
import MyContests from "../containers/MyContests";
import LandingPage from "../containers/LandingPage";
import AdminPage from "../containers/AdminPage";

export const routes = [
  {
    path: '/admin',
    content: AdminPage
  },
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