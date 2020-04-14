import { takeLatest, call, put } from 'redux-saga/effects'
import {
  ALLOCATE_PROJECT,
  GET_PROJECT_ALLOCATION_DATA,
  DEALLOCATE_PROJECT,
  DELETE_PROJECT_ALLOCATION
} from '../../actions/actionTypes'
import {
  setAllocateProjectSuccess,
  setAllocateProjectError,
  setProjectAllocationData,
  setProjectAllocationDataErr,
  setDeallocateProjectErr,
  setDeallocateProjectSuccess,
  deleteProjectAllocationError,
  deleteProjectAllocationSuccess
} from '../../actions/projectAction'
import {
  allocateProjectApi,
  projectAllocationDataApi,
  deallocateProjectApi,
  deleteProjectAllocationApi
} from '../../api/projectsApi'

function* workerAllocateProjectSaga(projectInfo) {
  try {
    const allocateProjectResponse = yield call(allocateProjectApi, projectInfo)

    yield put(setAllocateProjectSuccess(allocateProjectResponse.data.message))
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      // To do add code for all api calls .. invalid token case falls here
      yield put(setAllocateProjectError(e.response.data.message))
    } else {
      yield put(setAllocateProjectError(e))
    }
  }
}
export function* watchAllocateProjectSaga() {
  yield takeLatest(ALLOCATE_PROJECT, workerAllocateProjectSaga)
}

function* workerProjectAllocationDataSaga({ payload }) {
  const { id } = payload
  try {
    const projectAllocationData = yield call(projectAllocationDataApi, id)
    yield put(setProjectAllocationData(projectAllocationData.data.data))
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      // To do add code for all api calls .. invalid token case falls here
      yield put(setProjectAllocationDataErr(e.response.data.message))
    } else {
      yield put(setProjectAllocationDataErr(e))
    }
  }
}
export function* watchProjectAllocationDataSaga() {
  yield takeLatest(GET_PROJECT_ALLOCATION_DATA, workerProjectAllocationDataSaga)
}

function* workerDeallocateProjectSaga({ payload }) {
  try {
    const projectAllocationData = yield call(deallocateProjectApi, payload)
    yield put(setDeallocateProjectSuccess(projectAllocationData.data.message))
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      // To do add code for all api calls .. invalid token case falls here
      yield put(setDeallocateProjectErr(e.response.data.message))
    } else {
      yield put(setDeallocateProjectErr(e))
    }
  }
}
export function* watchDeallocateProjectSaga() {
  yield takeLatest(DEALLOCATE_PROJECT, workerDeallocateProjectSaga)
}

function* workerDeleteProjectAllocationSaga({ payload }) {
  const { id } = payload
  try {
    const projectAllocationData = yield call(deleteProjectAllocationApi, id)
    yield put(
      deleteProjectAllocationSuccess(projectAllocationData.data.message)
    )
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      // To do add code for all api calls .. invalid token case falls here
      yield put(deleteProjectAllocationError(e.response.data.message))
    } else {
      yield put(deleteProjectAllocationError(e))
    }
  }
}
export function* watchDeleteProjectAllocationSaga() {
  yield takeLatest(DELETE_PROJECT_ALLOCATION, workerDeleteProjectAllocationSaga)
}
