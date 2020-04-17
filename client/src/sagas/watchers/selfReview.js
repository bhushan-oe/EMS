import { takeLatest, call, put } from 'redux-saga/effects'
import {
  LOAD_ALL_USER_SELF_REVIEWS,
  UPDATE_SELF_REVIEW,
  LOAD_ALL_SELF_REVIEWS,
  CREATE_SELF_REVIEW,
  DELETE_SELF_REVIEW
} from '../../actions/actionTypes'
import {
  loadAllUserSelfReviews,
  updateSelfReview,
  loadAllSelfReviews,
  createSelfReview,
  deleteSelfReview
} from '../../api/selfReviewApi'
import {
  setAllSelfReviewsForUser,
  setAllSelfReviewsForUserError,
  setUpdateReviewError,
  setUpdateReviewStatus,
  setAllSelfReviews,
  setAllSelfReviewsError,
  setSelfReviewError,
  setSelfReviewSuccess,
  selfReviewDeleteSuccess,
  selfReviewDeleteFailue
} from '../../actions/selfReviewActions'
import { sessionExpiryHandler } from './sessionExpiryHandler'

function* workerLoadAllUserSelfReviewSaga({ payload }) {
  const { id, status } = payload
  try {
    const selfReviews = yield call(loadAllUserSelfReviews, id, status)
    yield put(setAllSelfReviewsForUser(selfReviews.data.data))
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      if (e.response.data.message === 'Invalid Token') {
        yield sessionExpiryHandler()
      } else yield put(setAllSelfReviewsForUserError(e.response.data.message))
    } else {
      yield put(setAllSelfReviewsForUserError(e))
    }
  }
}

export function* watchUserSelfReviewSaga() {
  yield takeLatest(LOAD_ALL_USER_SELF_REVIEWS, workerLoadAllUserSelfReviewSaga)
}
// Load all self reviews
function* workerLoadAllSelfReviewSaga({ payload }) {
  const { status } = payload
  try {
    const selfReviews = yield call(loadAllSelfReviews, status)
    yield put(setAllSelfReviews(selfReviews.data.data))
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      yield put(setAllSelfReviewsError(e.response.data.message))
    } else {
      yield put(setAllSelfReviewsError(e))
    }
  }
}

export function* watchSelfReviewSaga() {
  yield takeLatest(LOAD_ALL_SELF_REVIEWS, workerLoadAllSelfReviewSaga)
}

function* workerUpdateUserSelfReviewSaga({ payload }) {
  const { id, body } = payload
  try {
    const selfReviews = yield call(updateSelfReview, id, body)
    if (selfReviews.data.status === 'error') {
      yield put(setUpdateReviewError(selfReviews.data.message))
    }
    if (selfReviews.data.status === 'success') {
      yield put(setUpdateReviewStatus(selfReviews.data.message))
    }
    const reviews = yield call(loadAllSelfReviews, { status: ["Active", "Done"] })
    yield put(setAllSelfReviews(reviews.data.data))
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      // To do add code for all api calls .. invalid token case falls here
      yield put(setUpdateReviewError(e.response.data.message))
      if (e.response.data.message === 'Invalid Token') {
        yield sessionExpiryHandler()
      } else yield put(setAllSelfReviewsForUserError(e.response.data.message))
    } else {
      yield put(setUpdateReviewError(e))
    }
  }
}

export function* watchUpdateUserSelfReviewSaga() {
  yield takeLatest(UPDATE_SELF_REVIEW, workerUpdateUserSelfReviewSaga)
}

function* workerCreateSelfReviewSaga({ payload }) {
  const { body } = payload
  try {
    const selfReviews = yield call(createSelfReview, body)
    if (selfReviews.data.status === 'error') {
      yield put(setSelfReviewError(selfReviews.data.message))
    }
    if (selfReviews.data.status === 'success') {
      yield put(setSelfReviewSuccess(selfReviews.data.message))
    }
    const reviews = yield call(loadAllSelfReviews, { status: ["Active", "Done"] })
    yield put(setAllSelfReviews(reviews.data.data))
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      yield put(setSelfReviewError(e.response.data.message))
    } else {
      yield put(setSelfReviewError(e))
    }
  }
}

export function* watchCreateSelfReviewSaga() {
  yield takeLatest(CREATE_SELF_REVIEW, workerCreateSelfReviewSaga)
}

function* workerDeleteSelfReviewSaga({ payload }) {
  const { id } = payload
  try {
    const selfReviews = yield call(deleteSelfReview, id)
    if (selfReviews.data.status === 'error') {
      yield put(selfReviewDeleteFailue(selfReviews.data.message))
    }
    if (selfReviews.data.status === 'success') {
      yield put(selfReviewDeleteSuccess(selfReviews.data.message))
    }
    const reviews = yield call(loadAllSelfReviews, { status: ["Active", "Done"] })
    yield put(setAllSelfReviews(reviews.data.data))
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      // To do add code for all api calls .. invalid token case falls here
      yield put(selfReviewDeleteFailue(e.response.data.message))
    } else {
      yield put(selfReviewDeleteFailue(e))
    }
  }
}

export function* watchDeleteSelfReviewSaga() {
  yield takeLatest(DELETE_SELF_REVIEW, workerDeleteSelfReviewSaga)
}
