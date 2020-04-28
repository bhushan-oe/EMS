import {
  APPLY_LEAVE,
  APPLY_LEAVE_SUCCESS,
  APPLY_LEAVE_ERROR,
  CLEAR_LEAVE_MSGS
} from './actionTypes'
export const applyLeaves = data => {
  return {
    type: APPLY_LEAVE,
    data
  }
}

export function applyLeaveSuccess(data) {
  return {
    type: APPLY_LEAVE_SUCCESS,
    payload: data.data
  }
}
export function applyLeaveError(data) {
  return {
    type: APPLY_LEAVE_ERROR,
    payload: { data }
  }
}
export function clearMessages() {
  return {
    type: CLEAR_LEAVE_MSGS
  }
}
