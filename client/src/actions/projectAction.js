import {
  FETCH_ALL_PROJECTS_SAGA,
  SET_ALL_PROJECTS,
  DELETE_PROJECT,
  CLEAR_PROJECT_STATUS_MESSAGE,
  DELETE_PROJECT_ERROR,
  DELETE_PROJECT_SUCCESS,
  ADD_NEW_PROJECT,
  UPDATE_PROJECT,
  SET_NEW_PROJECT_SUCCESS,
  SET_NEW_PROJECT_ERROR,
  SET_UPDATE_PROJECT_SUCCESS,
  SET_UPDATE_PROJECT_ERROR,
  SET_ALL_PROJECTS_ERROR,
  ALLOCATE_PROJECT,
  SET_ALLOCATE_PROJECT_SUCCESS,
  SET_ALLOCATE_PROJECT_ERROR,
  CLEAR_PROJECT_ALLOCATION_MESSAGE,
  GET_PROJECT_ALLOCATION_DATA,
  SET_PROJECT_ALLOCATION_DATA,
  PROJECT_ALLOCATION_DATA_ERROR,
  DEALLOCATE_PROJECT,
  DEALLOCATE_PROJECT_ERROR,
  DEALLOCATE_PROJECT_SUCCESS,
  DELETE_PROJECT_ALLOCATION,
  DELETE_PROJECT_ALLOCATION_SUCCESS,
  DELETE_PROJECT_ALLOCATION_ERROR,
  GET_EMP_PROJECT_ALLOCATION_DATA,
  SET_EMP_PROJECT_ALLOCATION_DATA,
  EMP_PROJECT_ALLOCATION_DATA_ERROR
} from './actionTypes'

export function loadAllProjects() {
  return {
    type: FETCH_ALL_PROJECTS_SAGA,
    payload: {}
  }
}
export function setAllProjectsData(data) {
  return {
    type: SET_ALL_PROJECTS,
    payload: { data }
  }
}

export function setAllProjectsDataError(data) {
  return {
    type: SET_ALL_PROJECTS_ERROR,
    payload: { data }
  }
}

export function addNewProject(userInfo) {
  return {
    type: ADD_NEW_PROJECT,
    userInfo
  }
}

export function updateProject(userInfo, id) {
  return {
    type: UPDATE_PROJECT,
    payload: { userInfo, id }
  }
}

export function setNewProjectSuccess(data) {
  return {
    type: SET_NEW_PROJECT_SUCCESS,
    data
  }
}

export function setNewProjectError(data) {
  return {
    type: SET_NEW_PROJECT_ERROR,
    data
  }
}

export function setUpdateProjectSuccess(data) {
  return {
    type: SET_UPDATE_PROJECT_SUCCESS,
    data
  }
}
export function setUpdateProjectError(data) {
  return {
    type: SET_UPDATE_PROJECT_ERROR,
    data
  }
}

export function deleteProject(id) {
  return {
    type: DELETE_PROJECT,
    payload: { id }
  }
}

export function deleteProjectSuccess(data) {
  return {
    type: DELETE_PROJECT_SUCCESS,
    payload: { data }
  }
}

export function deleteProjectError(data) {
  return {
    type: DELETE_PROJECT_ERROR,
    payload: { data }
  }
}

export function clearProjectMsg() {
  return {
    type: CLEAR_PROJECT_STATUS_MESSAGE
  }
}

export function clearProjectAllocationMsg() {
  return {
    type: CLEAR_PROJECT_ALLOCATION_MESSAGE
  }
}

export function setAllocateProjectSuccess(data) {
  return {
    type: SET_ALLOCATE_PROJECT_SUCCESS,
    data
  }
}
export function setAllocateProjectError(data) {
  return {
    type: SET_ALLOCATE_PROJECT_ERROR,
    data
  }
}

export function allocateProject(userInfo) {
  return {
    type: ALLOCATE_PROJECT,
    userInfo
  }
}

export function getProjectAllocationData(id) {
  return {
    type: GET_PROJECT_ALLOCATION_DATA,
    payload: { id }
  }
}
export function setProjectAllocationData(data) {
  return {
    type: SET_PROJECT_ALLOCATION_DATA,
    data
  }
}
export function setProjectAllocationDataErr(data) {
  return {
    type: PROJECT_ALLOCATION_DATA_ERROR,
    data
  }
}
export function unassignProject(id, enddate) {
  return {
    type: DEALLOCATE_PROJECT,
    payload: { id, enddate }
  }
}

export function setDeallocateProjectErr(data) {
  return {
    type: DEALLOCATE_PROJECT_ERROR,
    data
  }
}
export function setDeallocateProjectSuccess(data) {
  return {
    type: DEALLOCATE_PROJECT_SUCCESS,
    data
  }
}

export function deleteProjectAllocations(id) {
  return {
    type: DELETE_PROJECT_ALLOCATION,
    payload: { id }
  }
}

export function deleteProjectAllocationSuccess(data) {
  return {
    type: DELETE_PROJECT_ALLOCATION_SUCCESS,
    payload: { data }
  }
}

export function deleteProjectAllocationError(data) {
  return {
    type: DELETE_PROJECT_ALLOCATION_ERROR,
    payload: { data }
  }
}

export function getEmpProjectAllocationsData(id) {
  return {
    type: GET_EMP_PROJECT_ALLOCATION_DATA,
    payload: { id }
  }
}
export function setEmpProjectAllocationsData(data) {
  return {
    type: SET_EMP_PROJECT_ALLOCATION_DATA,
    data
  }
}
export function setEmpProjectAllocationDataErr(data) {
  return {
    type: EMP_PROJECT_ALLOCATION_DATA_ERROR,
    data
  }
}
