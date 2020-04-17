import axios from 'axios'
import {
  SELF_REVIEWS_URL,
  CREATE_SELF_REVIEW
} from '../configurations/endPoints'

export function loadAllSelfReviews(status) {
  return axios.get(SELF_REVIEWS_URL, { params: status })
}
export function loadAllUserSelfReviews(id, status) {
  return axios.get(`${SELF_REVIEWS_URL}${id}`, { params: status })
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
