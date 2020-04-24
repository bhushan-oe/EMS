import { takeLatest, call, put } from 'redux-saga/effects'
import { APPLY_LEAVE } from '../../actions/actionTypes'
import { applyLeaveApi } from '../../api/leavesApi'
import { applyLeaveSuccess, applyLeaveError } from '../../actions/leavesAction'
import { sessionExpiryHandler } from './sessionExpiryHandler'

function* workerApplyLeaveSaga({ data }) {
  try {
    const leavesData = yield call(applyLeaveApi, data)
    yield put(applyLeaveSuccess(leavesData))
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      if (e.response.data.message === 'Invalid Token') {
        yield sessionExpiryHandler()
      } else yield put(applyLeaveError(e.response.data.message))
    }
  }
}

export function* watchApplyLeaveSaga() {
  yield takeLatest(APPLY_LEAVE, workerApplyLeaveSaga)
}
