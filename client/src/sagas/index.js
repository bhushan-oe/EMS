import { all, fork } from 'redux-saga/effects'
import watchLogoutSaga from './watchers/logout'
import {
  watchEmployeeInfoSaga,
  watchManagerSaga,
  watchDeleteEmployeeSaga
} from './watchers/employeeInfo'
import { watchLoginSaga, watchAuthenticateSaga } from './watchers/login'

import {
  watchPeerReviewSaga,
  watchCreatePeerReviewSaga,
  watchLoadUserPeerReviewSaga,
  watchUpdatePeerReviewSaga,
  watchDeletePeerReviewSaga,
  watchPeerReviewForManagerSaga
} from './watchers/peerReview'
import {
  watchLoadAllProjects,
  watchDeleteProjectSaga,
  watchAddProjectSaga,
  watchUpadateProjectSaga
} from './watchers/project'
import {
  watchAllocateProjectSaga,
  watchProjectAllocationDataSaga,
  watchDeallocateProjectSaga,
  watchDeleteProjectAllocationSaga,
  watchEmpProjectAllocationDataSaga
} from './watchers/projectAllocation'
import {
  watchUserSaga,
  watchUpadateUserSaga,
  watchChangePasswordSaga
} from './watchers/user'
import {
  watchUserSelfReviewSaga,
  watchUpdateUserSelfReviewSaga,
  watchSelfReviewSaga,
  watchCreateSelfReviewSaga,
  watchDeleteSelfReviewSaga,
  watchSelfReviewForManagerSaga
} from './watchers/selfReview'
import { watchApplyLeaveSaga } from './watchers/leaves'
export default function* root() {
  yield all([
    fork(watchLogoutSaga),
    fork(watchEmployeeInfoSaga),
    fork(watchManagerSaga),
    fork(watchLoginSaga),
    fork(watchPeerReviewSaga),
    fork(watchAuthenticateSaga),
    fork(watchLoadAllProjects),
    fork(watchCreatePeerReviewSaga),
    fork(watchLoadUserPeerReviewSaga),
    fork(watchUpdatePeerReviewSaga),
    fork(watchDeletePeerReviewSaga),
    fork(watchUserSaga),
    fork(watchDeleteEmployeeSaga),
    fork(watchUpadateUserSaga),
    fork(watchDeleteProjectSaga),
    fork(watchAddProjectSaga),
    fork(watchUpadateProjectSaga),
    fork(watchUserSelfReviewSaga),
    fork(watchUpdateUserSelfReviewSaga),
    fork(watchSelfReviewSaga),
    fork(watchCreateSelfReviewSaga),
    fork(watchDeleteSelfReviewSaga),
    fork(watchAllocateProjectSaga),
    fork(watchProjectAllocationDataSaga),
    fork(watchDeallocateProjectSaga),
    fork(watchDeleteProjectAllocationSaga),
    fork(watchPeerReviewForManagerSaga),
    fork(watchSelfReviewForManagerSaga),
    fork(watchApplyLeaveSaga),
    fork(watchChangePasswordSaga),
    fork(watchEmpProjectAllocationDataSaga)
  ])
}
