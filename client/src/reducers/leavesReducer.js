import {
  APPLY_LEAVE_SUCCESS,
  APPLY_LEAVE_ERROR,
  CLEAR_LEAVE_MSGS
} from '../actions/actionTypes'

const initialState = {
  applyLeaveStatus: null,
  applyLeaveError: null
}

const leavesReducer = (state = initialState, action) => {
  switch (action.type) {
    case APPLY_LEAVE_SUCCESS:
      return {
        ...state,
        applyLeaveStatus: action.payload.message
      }
    case APPLY_LEAVE_ERROR:
      return {
        ...state,
        applyLeaveError: action.payload.data
      }
    case CLEAR_LEAVE_MSGS:
      return {
        ...state,
        applyLeaveStatus: null,
        applyLeaveError: null
      }
    default:
      return state
  }
}
export default leavesReducer
