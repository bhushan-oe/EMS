import Dashboard from '@material-ui/icons/Dashboard'
import Person from '@material-ui/icons/Person'
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

export const dashboardRoutesAdmin = [
  {
    path: '/employee',
    name: 'Employees',
    rtlName: 'ملف تعريفي للمستخدم',
    icon: GroupIcon,
    component: Employee,
    layout: '/admin',
    showLink: true
  },

  {
    path: '/projects',
    name: 'Projects',
    rtlName: 'قائمة الجدول',
    icon: AssignmentIcon,
    component: Projects,
    layout: '/admin',
    showLink: true
  },
  {
    path: '/peerReview',
    name: 'Peer Review',
    rtlName: 'ملف تعريفي للمستخدم',
    icon: GroupIcon,
    component: PeerReview,
    layout: '/admin',
    showLink: true
  },
  {
    path: '/selfReview',
    name: 'Self Review',
    rtlName: 'ملف تعريفي للمستخدم',
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
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: DashboardPage,
    layout: '/admin',
    showLink: true
  },
  {
    path: '/user',
    name: 'User Profile',
    rtlName: 'ملف تعريفي للمستخدم',
    icon: Person,
    component: UserProfile,
    layout: '/admin',
    showLink: true
  },
  {
    path: '/projectDetails',
    name: 'Project History',
    rtlName: 'قائمة الجدول',
    icon: AssignmentIcon,
    component: ProjectHistory,
    layout: '/admin',
    showLink: true
  },
  {
    path: '/peerReviewDetails',
    name: 'Peer Review History',
    rtlName: 'ملف تعريفي للمستخدم',
    icon: GroupIcon,
    component: PeerReviewHistory,
    layout: '/admin',
    showLink: true
  },
  {
    path: '/selfReviewDetails',
    name: 'Self Review History',
    rtlName: 'ملف تعريفي للمستخدم',
    icon: Person,
    component: SelfReviewHistory,
    layout: '/admin',
    showLink: true
  }
]
