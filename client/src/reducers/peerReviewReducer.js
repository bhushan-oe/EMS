import {
  SET_ALL_PEER,
  SET_PEER_ERROR,
  SET_PEER_SUCCESS_MESSAGE,
  SET_ALL_USER_PEER,
  SET_ALL_USER_PEER_ERROR,
  SET_PEER_REVIEW_UPDATE_STATUS,
  SET_PEER_REVIEW_UPDATE_ERROR,
  DELETE_PEER_REVIEW_SUCCESS,
  DELETE_PEER_REVIEW_ERROR,
  SET_PEER_REVIEWS_FOR_MANAGER,
  SET_PEER_REVIEWS_FOR_MANAGER_ERROR
} from '../actions/actionTypes'

const initialState = {
  peerReviewData: null,
  peerReviewError: null,
  peerReviewUpdateError: null,
  peerReviewMessage: null,
  peerReviewUpdateStatus: null,
  userPeerReview: null,
  userPeerReviewError: null,
  peerReviewDeleteSuccess: null,
  peerReviewDeleteError: null,
  managerPeerReviews: null,
  managerPeerReviewsError: null
}
export default function peerReviewReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_PEER:
      return {
        ...state,
        peerReviewData: action.payload.data
      }
    case SET_PEER_ERROR:
      return {
        ...state,
        peerReviewError: action.payload.data
      }
    case SET_PEER_SUCCESS_MESSAGE:
      return {
        ...state,
        peerReviewMessage: action.payload.messageStatus
      }
    case SET_ALL_USER_PEER:
      return {
        ...state,
        userPeerReview: action.payload.data
      }
    case SET_ALL_USER_PEER_ERROR:
      return {
        ...state,
        userPeerReviewError: action.payload.data
      }
    case SET_PEER_REVIEW_UPDATE_STATUS:
      return {
        ...state,
        peerReviewUpdateStatus: action.payload.data
      }
    case SET_PEER_REVIEW_UPDATE_ERROR:
      return {
        ...state,
        peerReviewUpdateError: action.payload.data
      }
    case DELETE_PEER_REVIEW_SUCCESS:
      return {
        ...state,
        peerReviewDeleteSuccess: action.payload.data
      }
    case DELETE_PEER_REVIEW_ERROR:
      return {
        ...state,
        peerReviewDeleteError: action.payload.data
      }
    case SET_PEER_REVIEWS_FOR_MANAGER:
      return {
        ...state,
        managerPeerReviews: action.payload.data
      }
    case SET_PEER_REVIEWS_FOR_MANAGER_ERROR:
      return {
        ...state,
        managerPeerReviewsError: action.payload.data
      }
    default:
      return state
  }
}
