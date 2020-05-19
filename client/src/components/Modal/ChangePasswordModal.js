import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import { Close } from '@material-ui/icons'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import ChangePasswordForm from '../ChangePasswordForm/ChangePasswordForm'

const ChangePasswordModal = ({
  isOpenChangePasswordModal,
  handleCloseChangePasswordModal
}) => {
  return (
    <div>
      <Dialog
        open={isOpenChangePasswordModal}
        onClose={handleCloseChangePasswordModal}
      >
        <DialogActions>
          <Button onClick={handleCloseChangePasswordModal} color="primary">
            <Close />
          </Button>
        </DialogActions>
        <DialogContent>
          <ChangePasswordForm
            handleCloseChangePasswordModal={handleCloseChangePasswordModal}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ChangePasswordModal
