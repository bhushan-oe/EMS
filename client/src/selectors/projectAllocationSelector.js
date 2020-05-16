export function projectAllocationStatus(state) {
  return state.projectAllocationReducer.projectAllocationStatus
}
export function projectAllocationError(state) {
  return state.projectAllocationReducer.projectAllocationError
}

export function singleProjectAllocationData(state) {
  return state.projectAllocationReducer.singleProjectAllocationData
}

export function singleProjectAllocationDataErr(state) {
  return state.projectAllocationReducer.singleProjectAllocationDataError
}

export function deallocateProjectSuccess(state) {
  return state.projectAllocationReducer.deallocateProjectStatus
}

export function deallocateProjectError(state) {
  return state.projectAllocationReducer.deallocateProjectError
}

export function delProjectAllocationSuccess(state) {
  return state.projectAllocationReducer.deleteProjectAllocationSuccess
}

export function delProjectAllocationError(state) {
  return state.projectAllocationReducer.deleteProjectAllocationError
}

export function emplProjectAllocations(state) {
  return state.projectAllocationReducer.empProjectAllocationData
}
