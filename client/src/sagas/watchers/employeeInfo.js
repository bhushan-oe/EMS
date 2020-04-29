import { put, takeLatest, call } from 'redux-saga/effects'

import {
  LOAD_ALL_EMPLOYEE_SAGA,
  LOAD_ALL_MANAGER_SAGA,
  DELETE_EMPLOYEE
} from '../../actions/actionTypes'
import {
  setAllEmployeeData,
  deleteEmployeeSuccess,
  deleteEmployeeError,
  setManagers,
  setManagerError
} from '../../actions/employeeAction'
import {
  loadAllEmployeeData,
  loadManagers,
  deleteEmployeeApi
} from '../../api/employeeApi'
import { sessionExpiryHandler } from './sessionExpiryHandler'

function* workerEmployeeInfoSaga() {
  try {
    const employees = yield call(loadAllEmployeeData)
    yield put(setAllEmployeeData(employees))
  } catch (e) {
    if (e.response.data.message === 'Invalid Token') {
      yield sessionExpiryHandler()
    }
  }
}

export function* watchEmployeeInfoSaga() {
  yield takeLatest(LOAD_ALL_EMPLOYEE_SAGA, workerEmployeeInfoSaga)
}

// load Manager Saga
function* workerManagerSaga() {
  try {
    const managers = yield call(loadManagers)
    yield put(setManagers(managers.data.data))
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      if (e.response.data.message === 'Invalid Token') {
        yield sessionExpiryHandler()
      } else yield put(setManagerError(e.response.data.message))
    } else setManagerError(e)
  }
}

export function* watchManagerSaga() {
  yield takeLatest(LOAD_ALL_MANAGER_SAGA, workerManagerSaga)
}

// Delete employee and fetch data again
function* workerDeleteEmployeeSaga({ payload }) {
  const { id } = payload
  try {
    const employee = yield call(deleteEmployeeApi, id)
    yield put(deleteEmployeeSuccess(employee.data.message))
    const employees = yield call(loadAllEmployeeData)
    yield put(setAllEmployeeData(employees))
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      if (e.response.data.message === 'Invalid Token') {
        yield sessionExpiryHandler()
      } else yield put(deleteEmployeeError(e.response.data.message))
    } else {
      yield put(deleteEmployeeError(e))
    }
  }
}

export function* watchDeleteEmployeeSaga() {
  yield takeLatest(DELETE_EMPLOYEE, workerDeleteEmployeeSaga)
}
