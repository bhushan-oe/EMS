import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { withToastManager, useToasts } from 'react-toast-notifications'
import { compose } from 'redux'
// @material-ui/core
import InputLabel from '@material-ui/core/InputLabel'

// core components
import GridItem from '../../components/Grid/GridItem'
import Grid from '@material-ui/core/Grid'
import { Dialog, DialogActions } from '@material-ui/core'
import GridContainer from '../../components/Grid/GridContainer'
import Table from '../../components/Table/Table'
import Card from '../../components/Card/Card'
import Button from '../../components/CustomButtons/Button'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'
import PeerReviewForm from '../../components/PeerReviewForm/PeerReviewForm'
import PeerReviewDetails from '../../components/PeerReviewDetails/PeerReviewDetails'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { formatDate } from '../../helpers/formatDates'
import withAuth from '../../HOC/withAuth'
import { AlertModal } from '../../components/Modal/modal'
import { loadAllEmployeeData } from '../../actions/employeeAction'
import { employeeDataSelector } from '../../selectors/employeeSelectors'
import {
  peerReviewDataSelector,
  peerReviewDeleteSuccessSelector,
  peerReviewDeleteErrorSelector
} from '../../selectors/reviewSelectors'
import {
  loadAllPeerReviews,
  deletePeerReview,
  peerReviewDeleteSuccess,
  peerReviewDeleteFailue
} from '../../actions/peerReviewAction'
import dashboardStyle from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
import styles from './styles'

const style = {
  ...dashboardStyle,
  ...styles
}

const useStyles = makeStyles(style)

const PeerReview = props => {
  const classes = useStyles()
  const { addToast } = useToasts()
  const [selectedEmployee, setselectedEmployee] = useState('')
  const [isRedirectForm, setIsRedirectForm] = useState(false)
  const [peerReviewInfo, setPeerReviewInfo] = useState(false)
  const [deleteId, setDeleteId] = useState('')
  const peerReviewListingHeader = [
    'Employee Under Review',
    'Employee Reviewing',
    'Project',
    'Due Date',
    'Status'
  ]
  const dispatch = useDispatch()
  const [showDelDialog, setShowDelDialog] = useState(false)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [reviewDetails, setReviewDetails] = useState('')
  const links = ['Edit', 'Delete']
  const employeeData = useSelector(employeeDataSelector)
  const peerReviewData = useSelector(peerReviewDataSelector)
  const peerReviewDeleteSuccessMessage = useSelector(
    peerReviewDeleteSuccessSelector
  )
  const peerReviewDeleteError = useSelector(peerReviewDeleteErrorSelector)
  useEffect(() => {
    dispatch(loadAllEmployeeData())
    dispatch(loadAllPeerReviews({ status: ["Active", "Done"] }))
  }, [dispatch])
  useEffect(() => {
    if (peerReviewDeleteSuccessMessage) {
      if (peerReviewDeleteSuccessMessage.status === 200) {
        addToast('Peer Review successfully deleted', {
          appearance: 'success',
          autoDismiss: true
        })
      } else {
        addToast('Error while deleting Peer Review', {
          appearance: 'error',
          autoDismiss: true
        })
      }
      dispatch(peerReviewDeleteSuccess(''))
    }
  }, [peerReviewDeleteSuccessMessage, addToast, dispatch])
  useEffect(() => {
    if (peerReviewDeleteError) {
      addToast('Error while deleting Peer Review', {
        appearance: 'error',
        autoDismiss: true
      })
      dispatch(peerReviewDeleteFailue(''))
    }
  }, [peerReviewDeleteError, addToast, dispatch])

  const viewDetailHandler = details => {
    setReviewDetails(details)
    setShowDetailsDialog(true)
  }
  const employeeReviewArr = []
  let filteredEmployee
  if (peerReviewData) {
    const peerReviewDetails = peerReviewData.data.data
    filteredEmployee = peerReviewDetails.filter(
      review =>
        `${review.employee_under_review.firstname} ${review.employee_under_review.lastname}`
          .toLowerCase()
          .includes(selectedEmployee.toLowerCase().trim())
    )
    filteredEmployee.map((review, key) => {
      employeeReviewArr.push([
        <span
          className={classes.showPointer}
          onClick={() => viewDetailHandler(review)}
        >
          {review.employee_under_review.firstname}{' '}
          {review.employee_under_review.lastname}
        </span>,
        `${review.employee_reviewing.firstname} ${review.employee_reviewing.lastname}`,
        review.project.title,
        formatDate(review.to_date),
        review.status
      ])
      return 1
    })
  }

  const changeHandler = e => {
    setselectedEmployee(e.target.value)
  }
  const createPeerHandler = () => {
    setPeerReviewInfo('')
    setIsRedirectForm(true)
  }
  const detailsSwitchHandler = () => {
    setIsRedirectForm(false)
  }
  const updateUser = (val, k) => {
    setPeerReviewInfo(filteredEmployee[k])
    setIsRedirectForm(true)
  }

  const deleteUser = (val, k) => {
    setDeleteId(filteredEmployee[k]._id)
    setShowDelDialog(true)
  }
  const handleYesDelete = () => {
    dispatch(deletePeerReview(deleteId))
    setShowDelDialog(false)
  }
  return (
    <div>
      {isRedirectForm ? (
        <PeerReviewForm
          peerReviewInfo={peerReviewInfo}
          detailsSwitchHandler={detailsSwitchHandler}
        ></PeerReviewForm>
      ) : (
          <GridContainer>
            <Grid xs={1} sm={1} md={1} className={classes.grid} item>
              <InputLabel>Search By:</InputLabel>
            </Grid>
            <GridItem xs={5} sm={5} md={5}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="SelectEmployee"> Select Employee</InputLabel>
                <Select
                  value={selectedEmployee}
                  onChange={changeHandler}
                  inputProps={{
                    name: 'SelectEmployee',
                    id: 'SelectEmployee'
                  }}
                >
                  <MenuItem className={classes.hoverEffect} value="">
                    <em>None</em>
                  </MenuItem>
                  {employeeData
                    ? employeeData.map((prop, key) => {
                      return prop.status !== 'Inactive' ? (
                        <MenuItem
                          className={classes.hoverEffect}
                          value={prop.firstname + ' ' + prop.lastname}
                          key={key}
                        >
                          {prop.firstname} {prop.lastname}
                        </MenuItem>
                      ) : null
                    })
                    : null}
                </Select>
              </FormControl>
            </GridItem>
            <GridItem style={{ textAlign: 'end' }} xs={6} sm={6} md={6}>
              <Button color="primary" onClick={createPeerHandler}>
                Create Peer Review
            </Button>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <Card plain>
                <CardHeader plain color="primary">
                  <h4 className={classes.cardTitleWhite}>PEER REVIEW</h4>
                </CardHeader>
                <CardBody>
                  <Table
                    tableHeaderColor="gray"
                    tableHead={peerReviewListingHeader}
                    tableData={employeeReviewArr || null}
                    addLinks={links}
                    updateUser={updateUser}
                    deleteUser={deleteUser}
                    showLink={false}
                  />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        )}
      <AlertModal
        title="Delete Peer"
        showDelDialog={showDelDialog}
        handleYesDelete={handleYesDelete}
        handleNoDelete={() => setShowDelDialog(false)}
        userInfo="Are you sure you want to delete this peer Information ?"
      />
      <Dialog
        title="Peer Review Details"
        maxWidth="lg"
        modal={true}
        open={showDetailsDialog}
      >
        <DialogActions>
          <GridItem xs={12} sm={12} md={12}>
            <PeerReviewDetails
              reviewData={reviewDetails}
              showButtons={false}
            ></PeerReviewDetails>

            <Button
              color="primary"
              size="sm"
              onClick={() => setShowDetailsDialog(false)}
            >
              {' '}
              Close
            </Button>
          </GridItem>
        </DialogActions>
      </Dialog>
    </div>
  )
}
const peerReviewWithHOC = compose(withToastManager, withAuth)(PeerReview)
export default peerReviewWithHOC
