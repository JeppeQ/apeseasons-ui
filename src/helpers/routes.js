import Contests from "../containers/Contests";
import MyContests from "../containers/MyContests";
import LandingPage from "../containers/LandingPage";
import AdminPage from "../containers/AdminPage";
import DocsPage from "../containers/DocsPage";

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
    path: '/docs',
    content: DocsPage
  },
  {
    path: '/*',
    content: LandingPage
  }
]