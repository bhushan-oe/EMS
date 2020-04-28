import {
  LOAD_ALL_SELF_REVIEWS,
  SET_ALL_SELF_REVIEWS,
  CREATE_SELF_REVIEW,
  SET_SELF_REVIEW_SUCCESS_MESSAGE,
  LOAD_ALL_USER_SELF_REVIEWS,
  SET_ALL_USER_SELF_REVIEWS,
  UPDATE_SELF_REVIEW,
  SET_SELF_REVIEW_UPDATE_STATUS,
  SET_SELF_REVIEW_UPDATE_ERROR,
  SET_ALL_SELF_REVIEWS_ERROR,
  SET_ALL_USER_SELF_REVIEWS_ERROR,
  SET_SELF_REVIEW_ERROR,
  DELETE_SELF_REVIEW,
  DELETE_SELF_REVIEW_SUCCESS,
  DELETE_SELF_REVIEW_ERROR,
  CLEAR_REVIEW_STATUS,
  LOAD_SELF_REVIEWS_FOR_MANAGER,
  SET_SELF_REVIEWS_FOR_MANAGER,
  SET_SELF_REVIEWS_FOR_MANAGER_ERROR
} from './actionTypes'

export function loadAllSelfReviews(status) {
  return {
    type: LOAD_ALL_SELF_REVIEWS,
    payload: { status }
  }
}
export function setAllSelfReviews(data) {
  return {
    type: SET_ALL_SELF_REVIEWS,
    payload: { data }
  }
}

export function setAllSelfReviewsError(data) {
  return {
    type: SET_ALL_SELF_REVIEWS_ERROR,
    payload: { data }
  }
}

export function createSelfReview(body) {
  return {
    type: CREATE_SELF_REVIEW,
    payload: { body }
  }
}
export function setSelfReviewSuccess(messageStatus) {
  return {
    type: SET_SELF_REVIEW_SUCCESS_MESSAGE,
    payload: { messageStatus }
  }
}

export function setSelfReviewError(data) {
  return {
    type: SET_SELF_REVIEW_ERROR,
    payload: { data }
  }
}

export function loadAllSelfReviewsForUser(id, status) {
  return {
    type: LOAD_ALL_USER_SELF_REVIEWS,
    payload: { id, status }
  }
}
export function setAllSelfReviewsForUser(data) {
  return {
    type: SET_ALL_USER_SELF_REVIEWS,
    payload: { data }
  }
}

export function setAllSelfReviewsForUserError(data) {
  return {
    type: SET_ALL_USER_SELF_REVIEWS_ERROR,
    payload: { data }
  }
}

export function updateSelfReview(id, body) {
  return {
    type: UPDATE_SELF_REVIEW,
    payload: { id, body }
  }
}
export function setUpdateReviewStatus(data) {
  return {
    type: SET_SELF_REVIEW_UPDATE_STATUS,
    payload: { data }
  }
}

export function setUpdateReviewError(data) {
  return {
    type: SET_SELF_REVIEW_UPDATE_ERROR,
    payload: { data }
  }
}
export function deleteSelfReview(id) {
  return {
    type: DELETE_SELF_REVIEW,
    payload: { id }
  }
}
export function selfReviewDeleteSuccess(data) {
  return {
    type: DELETE_SELF_REVIEW_SUCCESS,
    payload: { data }
  }
}
export function selfReviewDeleteFailue(data) {
  return {
    type: DELETE_SELF_REVIEW_ERROR,
    payload: { data }
  }
}

export function clearReviewStatus() {
  return {
    type: CLEAR_REVIEW_STATUS
  }
}
export function loadSelfReviewsForManager(body) {
  return {
    type: LOAD_SELF_REVIEWS_FOR_MANAGER,
    payload: { body }
  }
}
export function setSelfReviewsForManager(data) {
  return {
    type: SET_SELF_REVIEWS_FOR_MANAGER,
    payload: { data }
  }
}
export function setSelfReviewsForManagerError(data) {
  return {
    type: SET_SELF_REVIEWS_FOR_MANAGER_ERROR,
    payload: { data }
  }
}
