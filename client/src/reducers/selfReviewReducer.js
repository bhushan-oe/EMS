import {
  SET_ALL_USER_SELF_REVIEWS,
  SET_ALL_USER_SELF_REVIEWS_ERROR,
  SET_SELF_REVIEW_UPDATE_STATUS,
  SET_SELF_REVIEW_UPDATE_ERROR,
  CLEAR_REVIEW_STATUS,
  SET_ALL_SELF_REVIEWS,
  SET_ALL_SELF_REVIEWS_ERROR,
  SET_SELF_REVIEW_SUCCESS_MESSAGE,
  SET_SELF_REVIEW_ERROR,
  DELETE_SELF_REVIEW_SUCCESS,
  DELETE_SELF_REVIEW_ERROR,
  SET_SELF_REVIEWS_FOR_MANAGER,
  SET_SELF_REVIEWS_FOR_MANAGER_ERROR,
  SET_SELF_REVIEW_ALL_SUCCESS_MESSAGE,
  SET_SELF_REVIEW_ALL_ERROR
} from '../actions/actionTypes'

const initialState = {
  userSelfReviewDeatils: null,
  userSelfReviewDeatilsError: null,
  userSelfReviewUpdateStatus: null,
  userSelfReviewUpdateError: null,
  selfReviewDetails: null,
  selfReviewError: null,
  selfReviewCreateSuccess: null,
  selfReviewCreateError: null,
  deleteSelfReviewSuccess: null,
  deleteSelfReviewError: null,
  managerSelfReviews: null,
  managerSelfReviewsError: null
}
export default function selfReviewReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_USER_SELF_REVIEWS:
      return {
        ...state,
        userSelfReviewDeatils: action.payload.data
      }
    case SET_ALL_USER_SELF_REVIEWS_ERROR:
      return {
        ...state,
        userSelfReviewDeatilsError: action.payload.data
      }
    case SET_SELF_REVIEW_UPDATE_STATUS:
      return {
        ...state,
        userSelfReviewUpdateStatus: action.payload.data
      }
    case SET_SELF_REVIEW_UPDATE_ERROR:
      return {
        ...state,
        userSelfReviewUpdateError: action.payload.data
      }
    case CLEAR_REVIEW_STATUS:
      return {
        ...state,
        userSelfReviewUpdateError: null,
        userSelfReviewUpdateStatus: null
      }
    case SET_ALL_SELF_REVIEWS:
      return {
        ...state,
        selfReviewDetails: action.payload.data
      }
    case SET_ALL_SELF_REVIEWS_ERROR:
      return {
        ...state,
        selfReviewError: action.payload.data
      }
    case SET_SELF_REVIEW_SUCCESS_MESSAGE:
      return {
        ...state,
        selfReviewCreateSuccess: action.payload.messageStatus
      }
    case SET_SELF_REVIEW_ERROR:
      return {
        ...state,
        selfReviewCreateError: action.payload.data
      }
    case DELETE_SELF_REVIEW_SUCCESS:
      return {
        ...state,
        deleteSelfReviewSuccess: action.payload.data
      }
    case DELETE_SELF_REVIEW_ERROR:
      return {
        ...state,
        deleteSelfReviewError: action.payload.data
      }
    case SET_SELF_REVIEWS_FOR_MANAGER:
      return {
        ...state,
        managerSelfReviews: action.payload.data
      }
    case SET_SELF_REVIEWS_FOR_MANAGER_ERROR:
      return {
        ...state,
        managerSelfReviewsError: action.payload.data
      }
    default:
      return state
  }
}
