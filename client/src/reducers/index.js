import { combineReducers } from 'redux'
import EmployeeInfo from './employeeInfo'
import loginReducer from './loginReducer'
import peerReviewReducer from './peerReviewReducer'
import projectReducer from './projectReducer'
import userReducer from './userReducer'
import selfReviewReducer from './selfReviewReducer'
import projectAllocationReducer from './projectAllocationReducer'
import leavesReducer from './leavesReducer'
export default combineReducers({
  EmployeeInfo,
  loginReducer,
  peerReviewReducer,
  projectReducer,
  userReducer,
  selfReviewReducer,
  projectAllocationReducer,
  leavesReducer
})
