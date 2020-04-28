import {
  SET_ALLOCATE_PROJECT_SUCCESS,
  SET_ALLOCATE_PROJECT_ERROR,
  CLEAR_PROJECT_ALLOCATION_MESSAGE,
  SET_PROJECT_ALLOCATION_DATA,
  PROJECT_ALLOCATION_DATA_ERROR,
  DEALLOCATE_PROJECT_SUCCESS,
  DEALLOCATE_PROJECT_ERROR,
  DELETE_PROJECT_ALLOCATION_SUCCESS,
  DELETE_PROJECT_ALLOCATION_ERROR
} from '../actions/actionTypes'

const initialState = {
  projectAllocationStatus: null,
  projectAllocationError: null,
  singleProjectAllocationData: null,
  singleProjectAllocationDataError: null,
  deallocateProjectStatus: null,
  deallocateProjectError: null,
  deleteProjectAllocationError: null,
  deleteProjectAllocationSuccess: null
}
// to do remove unwanted code

export default function projectAllocationReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PROJECT_ALLOCATION_DATA:
      return {
        ...state,
        singleProjectAllocationData: action.data
      }
    case PROJECT_ALLOCATION_DATA_ERROR:
      return {
        ...state,
        singleProjectAllocationDataError: action.data
      }
    case SET_ALLOCATE_PROJECT_SUCCESS:
      return {
        ...state,
        projectAllocationStatus: action.data
      }
    case SET_ALLOCATE_PROJECT_ERROR:
      return {
        ...state,
        projectAllocationError: action.data
      }
    case DEALLOCATE_PROJECT_SUCCESS:
      return {
        ...state,
        deallocateProjectStatus: action.data
      }
    case DEALLOCATE_PROJECT_ERROR:
      return {
        ...state,
        deallocateProjectError: action.data
      }
    case CLEAR_PROJECT_ALLOCATION_MESSAGE:
      return {
        ...state,
        projectAllocationError: null,
        projectAllocationStatus: null,
        deallocateProjectStatus: null,
        deallocateProjectError: null,
        deleteProjectAllocationSuccess: null,
        deleteProjectAllocationError: null
      }

    case DELETE_PROJECT_ALLOCATION_SUCCESS:
      return {
        ...state,
        deleteProjectAllocationSuccess: action.payload.data
      }
    case DELETE_PROJECT_ALLOCATION_ERROR:
      return {
        ...state,
        deleteProjectAllocationError: action.payload.data
      }

    default:
      return state
  }
}
