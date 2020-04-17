export function userPeerReview(state) {
  return state.peerReviewReducer.userPeerReview
}
export function userSelfReviewDeatils(state) {
  return state.selfReviewReducer.userSelfReviewDeatils
}
export function peerReviewDataSelector(state) {
  return state.peerReviewReducer.peerReviewData
}
export function peerReviewDeleteSuccessSelector(state) {
  return state.peerReviewReducer.peerReviewDeleteSuccess
}
export function peerReviewDeleteErrorSelector(state) {
  return state.peerReviewReducer.peerReviewDeleteError
}
export function peerReviewUpdateStatusSelector(state) {
  return state.peerReviewReducer.peerReviewUpdateStatus
}
export function peerReviewMessageSelector(state) {
  return state.peerReviewReducer.peerReviewMessage
}
export function peerReviewUpdateErrorSelector(state) {
  return state.peerReviewReducer.peerReviewUpdateError
}
export function selfReviewDetailsSelector(state) {
  return state.selfReviewReducer.selfReviewDetails
}
export function selfReviewErrorSelector(state) {
  return state.selfReviewReducer.selfReviewError
}
export function selfReviewCreateSuccessSelector(state) {
  return state.selfReviewReducer.selfReviewCreateSuccess
}
export function selfReviewCreateErrorSelector(state) {
  return state.selfReviewReducer.selfReviewCreateError
}
export function selfReviewUpdateSelector(state) {
  return state.selfReviewReducer.userSelfReviewUpdateStatus
}
export function selfReviewUpdateErrorSelector(state) {
  return state.selfReviewReducer.userSelfReviewUpdateError
}
export function deleteSelfReviewSuccessSelector(state) {
  return state.selfReviewReducer.deleteSelfReviewSuccess
}
export function deleteSelfReviewErrorSelector(state) {
  return state.selfReviewReducer.deleteSelfReviewError
}
export function managerPeerReviewsSelector(state) {
  return state.peerReviewReducer.managerPeerReviews
}
