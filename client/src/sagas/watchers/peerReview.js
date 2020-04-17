import { takeLatest, call, put } from 'redux-saga/effects'
import {
  LOAD_ALL_PEER_SAGA,
  CREATE_PEER_SAGA,
  LOAD_ALL_USER_PEER_SAGA,
  UPDATE_PEER_REVIEW,
  DELETE_PEER_REVIEW,
  LOAD_PEER_REVIEWS_FOR_MANAGER
} from '../../actions/actionTypes'
import {
  loadAllPeerReviews,
  createPeerReview,
  loadAllUserPeerReviews,
  updatePeerReview,
  deletePeerReview,
  loadAllPeerReviewsForManager
} from '../../api/peerReviewApi'
import {
  setAllPeerReviews,
  setAllPeerReviewsError,
  setPeerReviewSuccess,
  setAllPeerForUser,
  setAllPeerForUserError,
  setUpdateReviewStatus,
  setUpdateReviewError,
  peerReviewDeleteSuccess,
  peerReviewDeleteFailue,
  setPeerReviewsForManager,
  setPeerReviewsForManagerError
} from '../../actions/peerReviewAction'
import { sessionExpiryHandler } from './sessionExpiryHandler'

// Load All Peer Reviews
function* workerLoadAllPeerReviewSaga(data) {
  const { status } = data.payload
  try {
    const peerReviews = yield call(loadAllPeerReviews, status)
    yield put(setAllPeerReviews(peerReviews))
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      if (e.response.data.message === 'Invalid Token') {
        yield sessionExpiryHandler()
      } else yield put(setAllPeerReviewsError(e.response.data.message))
    } else yield put(setAllPeerReviewsError(e))
  }
}

export function* watchPeerReviewSaga() {
  yield takeLatest(LOAD_ALL_PEER_SAGA, workerLoadAllPeerReviewSaga)
}

// Create Peer Review
function* workerCreatePeerReviewSaga({ payload }) {
  const { body } = payload
  try {
    const message = yield call(createPeerReview, body)
    yield put(setPeerReviewSuccess(message))
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      if (e.response.data.message === 'Invalid Token') {
        yield sessionExpiryHandler()
      } else yield put(setPeerReviewSuccess(e.response.data.message))
    } else yield put(setPeerReviewSuccess(e))
  }
  const reviews = yield call(loadAllPeerReviews, { status: ["Active", "Done"] })
  yield put(setAllPeerReviews(reviews))
}

export function* watchCreatePeerReviewSaga() {
  yield takeLatest(CREATE_PEER_SAGA, workerCreatePeerReviewSaga)
}

// Load Peer Reviews for User

function* workerLoadUserPeerReviewSaga({ payload }) {
  const { data, status } = payload
  try {
    const peerReviews = yield call(loadAllUserPeerReviews, data, status)
    yield put(setAllPeerForUser(peerReviews.data.data))
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      if (e.response.data.message === 'Invalid Token') {
        yield sessionExpiryHandler()
      } else yield put(setAllPeerForUserError(e.response.data.message))
    } else yield put(setAllPeerForUserError(e))
  }
}

export function* watchLoadUserPeerReviewSaga() {
  yield takeLatest(LOAD_ALL_USER_PEER_SAGA, workerLoadUserPeerReviewSaga)
}

// Update Peer Review

function* workerUpdatePeerReviewSaga(data) {
  try {
    const status = yield call(
      updatePeerReview,
      data.payload.id,
      data.payload.body
    )
    yield put(setUpdateReviewStatus(status))
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      if (e.response.data.message === 'Invalid Token') {
        yield sessionExpiryHandler()
      } else yield put(setUpdateReviewError(e.response.data.message))
    } else yield put(setUpdateReviewError(e))
  }

  const reviews = yield call(loadAllPeerReviews, { status: ["Active", "Done"] })
  yield put(setAllPeerReviews(reviews))
}

export function* watchUpdatePeerReviewSaga() {
  yield takeLatest(UPDATE_PEER_REVIEW, workerUpdatePeerReviewSaga)
}

// Delete Peer Review
function* workerDaletePeerReviewSaga(data) {
  try {
    const status = yield call(deletePeerReview, data.payload.id)
    yield put(peerReviewDeleteSuccess(status))
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      if (e.response.data.message === 'Invalid Token') {
        yield sessionExpiryHandler()
      } else yield put(peerReviewDeleteFailue(e.response.data.message))
    } else yield put(peerReviewDeleteFailue(e))
  }
  const reviews = yield call(loadAllPeerReviews, { status: ["Active", "Done"] })
  yield put(setAllPeerReviews(reviews))
}

export function* watchDeletePeerReviewSaga() {
  yield takeLatest(DELETE_PEER_REVIEW, workerDaletePeerReviewSaga)
}
// Load Peer Review for Manager

function* workerPeerReviewForManagerSaga(data) {
  const { body } = data.payload
  try {
    const peerReviews = yield call(loadAllPeerReviewsForManager, body)
    yield put(setPeerReviewsForManager(peerReviews.data.data))
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      if (e.response.data.message === 'Invalid Token') {
        yield sessionExpiryHandler()
      } else yield put(setPeerReviewsForManagerError(e.response.data.message))
    } else yield put(setPeerReviewsForManagerError(e))
  }
}

export function* watchPeerReviewForManagerSaga() {
  yield takeLatest(
    LOAD_PEER_REVIEWS_FOR_MANAGER,
    workerPeerReviewForManagerSaga
  )
}
