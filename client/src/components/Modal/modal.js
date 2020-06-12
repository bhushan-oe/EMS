import { Dialog, DialogActions } from '@material-ui/core'
import React from 'react'
import Button from '../CustomButtons/Button'
// import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
import GridItem from '../Grid/GridItem'

export const AlertModal = props => {
  const {
    title,
    showDelDialog,
    handleYesDelete,
    handleNoDelete,
    userInfo
  } = props

  return (
    <Dialog title={title} modal={true} open={showDelDialog}>
      <DialogActions>
        <GridItem xs={12} sm={12} md={12}>
          <p> {userInfo} </p>
          <div style={{ textAlign: 'center' }}>
            {handleYesDelete ? (
              <Button color="primary" size="sm" round onClick={handleYesDelete}>
                Yes
              </Button>
            ) : null}
            {handleNoDelete ? (
              <Button color="white" size="sm" round onClick={handleNoDelete}>
                No
              </Button>
            ) : null}
          </div>
        </GridItem>
      </DialogActions>
    </Dialog>
  )
}
