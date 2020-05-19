import axios from 'axios'
import {
  SELF_REVIEWS_URL,
  FETCH_SELF_REVIEW_FOR_MANAGER,
  CREATE_SELF_REVIEW,
  CREATE_SELF_REVIEW_ALL
} from '../configurations/endPoints'

export function loadAllSelfReviews(status) {
  return axios.get(SELF_REVIEWS_URL, { params: status })
}
export function loadAllUserSelfReviews(id, status) {
  return axios.get(`${SELF_REVIEWS_URL}${id}`, { params: status })
}
export function loadAllSelfReviewsForManager(body) {
  return axios.get(FETCH_SELF_REVIEW_FOR_MANAGER, { params: body })
}
export function createSelfReview(body) {
  return axios.post(CREATE_SELF_REVIEW, body)
}
export function updateSelfReview(id, body) {
  return axios.put(`${SELF_REVIEWS_URL}${id}`, body)
}
export function deleteSelfReview(id) {
  return axios.delete(`${SELF_REVIEWS_URL}${id}`)
}

export function createSelfReviewAll(body) {
  return axios.post(CREATE_SELF_REVIEW_ALL, body)
}
