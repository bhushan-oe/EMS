import Dashboard from '@material-ui/icons/Dashboard'
import Person from '@material-ui/icons/Person'
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate'
import AssignmentIcon from '@material-ui/icons/Assignment';
import HomeWorkIcon from '@material-ui/icons/HomeWork'
import GroupIcon from '@material-ui/icons/Group';
import DashboardPage from './views/Dashboard/Dashboard.js'
import UserProfile from './views/UserProfile/UserProfile.js'
import TableList from './views/TableList/TableList.js'
import LeaveForm from './views/LeaveForm/LeaveForm.js'
import WFHForm from './views/WFHForm/WFHForm.js'
import Projects from './views/Project/Project';
import Employee from './views/Employee/Employee';

const dashboardRoutes = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        rtlName: 'لوحة القيادة',
        icon: Dashboard,
        component: DashboardPage,
        layout: '/admin'
    },
    {
        path: '/user',
        name: 'User Profile',
        rtlName: 'ملف تعريفي للمستخدم',
        icon: Person,
        component: UserProfile,
        layout: '/admin'
    },
    {
        path: '/table',
        name: 'All Employees',
        rtlName: 'قائمة الجدول',
        icon: 'content_paste',
        component: TableList,
        layout: '/admin'
    },
    {
        path: '/employee',
        name: 'Employees',
        rtlName: 'ملف تعريفي للمستخدم',
        icon: GroupIcon,
        component: Employee,
        layout: '/admin'
    },
    {
        path: '/projects',
        name: 'Projects',
        rtlName: 'قائمة الجدول',
        icon: AssignmentIcon,
        component: Projects,
        layout: '/admin'
    },
    {
        path: '/LeaveForm',
        name: 'Leave Request',
        rtlName: 'قائمة الجدول',
        icon: AssignmentLateIcon,
        component: LeaveForm,
        layout: '/admin'
    },
    {
        path: '/WFHForm',
        name: 'WFH Request',
        rtlName: 'قائمة الجدول',
        icon: HomeWorkIcon,
        component: WFHForm,
        layout: '/admin'
    }
]

export default dashboardRoutes
