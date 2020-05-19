import Dashboard from '@material-ui/icons/Dashboard'
import Person from '@material-ui/icons/Person'
import TimeToLeaveIcon from '@material-ui/icons/TimeToLeave'
import DashboardPage from './views/Dashboard/Dashboard'
import UserProfile from './views/UserProfile/UserProfile'
import GroupIcon from '@material-ui/icons/Group'
import AssignmentIcon from '@material-ui/icons/Assignment'
import Projects from './views/Project/Projects'
// import Employee from './components/Employee/EmployeeSearch'
import Employee from './views/Employee/Employee'
import SelfReview from './views/SelfReview/SelfReview'
import PeerReview from './views/PeerReview/PeerReview'
import SelfReviewHistory from './views/SelfReviewHistory/SelfReviewHistory'
import PeerReviewHistory from './views/PeerReviewHistory/PeerReviewHistory'
import ProjectHistory from './views/projectHistory/projectHistory'
import Leaves from './views/Leaves/leaves'

export const dashboardRoutesAdmin = [
  {
    path: '/employee',
    name: 'Employees',
    icon: GroupIcon,
    component: Employee,
    layout: '/admin',
    showLink: true
  },

  {
    path: '/projects',
    name: 'Projects',
    icon: AssignmentIcon,
    component: Projects,
    layout: '/admin',
    showLink: true
  },
  {
    path: '/peerReview',
    name: 'Peer Review',
    icon: GroupIcon,
    component: PeerReview,
    layout: '/admin',
    showLink: true
  },
  {
    path: '/selfReview',
    name: 'Self Review',
    icon: Person,
    component: SelfReview,
    layout: '/admin',
    showLink: true
  }
]
export const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: Dashboard,
    component: DashboardPage,
    layout: '/admin',
    showLink: true
  },
  {
    path: '/user',
    name: 'User Profile',
    icon: Person,
    component: UserProfile,
    layout: '/admin',
    showLink: true
  },
  {
    path: '/projectDetails',
    name: 'Project History',
    icon: AssignmentIcon,
    component: ProjectHistory,
    layout: '/admin',
    showLink: true
  },
  {
    path: '/reviewPeerHistory',
    name: 'Peer Review History',
    icon: GroupIcon,
    component: PeerReviewHistory,
    layout: '/admin',
    showLink: true
  },
  {
    path: '/reviewSelfHistory',
    name: 'Self Review History',
    icon: Person,
    component: SelfReviewHistory,
    layout: '/admin',
    showLink: true
  },
  {
    path: '/leaves',
    name: 'Leaves',
    icon: TimeToLeaveIcon,
    component: Leaves,
    layout: '/admin',
    showLink: true
  }
]
