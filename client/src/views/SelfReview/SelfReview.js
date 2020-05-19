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
import SelfReviewForm from '../../components/SelfReviewForm/SelfReviewForm'
import SelfReviewFoAll from '../../components/SelfReviewForm/SelfReviewForAll'
import SelfReviewDetails from '../../components/selfReviewDetails/SelfReviewDetails'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { formatDate } from '../../helpers/formatDates'
import withAuth from '../../HOC/withAuth'
import { AlertModal } from '../../components/Modal/modal'
import { loadAllEmployeeData } from '../../actions/employeeAction'
import { employeeDataSelector } from '../../selectors/employeeSelectors'
import {
  deleteSelfReviewSuccessSelector,
  deleteSelfReviewErrorSelector,
  selfReviewDetailsSelector
} from '../../selectors/reviewSelectors'
import {
  loadAllSelfReviews,
  deleteSelfReview,
  selfReviewDeleteSuccess,
  selfReviewDeleteFailue
} from '../../actions/selfReviewActions'
import dashboardStyle from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
import styles from './styles'

const style = {
  ...dashboardStyle,
  ...styles
}

const useStyles = makeStyles(style)

const SelfReview = props => {
  const classes = useStyles()
  const { addToast } = useToasts()
  const [selectedEmployee, setselectedEmployee] = useState('')
  const [isRedirectForm, setIsRedirectForm] = useState(false)
  const [showSelfReviewForAll, setSelfReviewForAll] = useState(false)
  const [selfReviewInfo, setSelfReviewInfo] = useState(false)
  const [deleteId, setDeleteId] = useState('')
  const peerReviewListingHeader = [
    'Employee Name',
    'Project Names',
    'From Date',
    'To Date',
    'Due Date',
    'Status'
  ]
  const dispatch = useDispatch()
  const [showDelDialog, setShowDelDialog] = useState(false)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [reviewDetails, setReviewDetails] = useState('')
  const [projectDetails, setProjectDetails] = useState('')
  const links = ['Edit', 'Delete']
  const employeeData = useSelector(employeeDataSelector)
  const selfReviewData = useSelector(selfReviewDetailsSelector)
  const selfReviewDeleteSuccessMessage = useSelector(
    deleteSelfReviewSuccessSelector
  )
  const selfReviewDeleteError = useSelector(deleteSelfReviewErrorSelector)
  useEffect(() => {
    dispatch(loadAllEmployeeData())
    dispatch(loadAllSelfReviews({ status: ['Active', 'Done'] }))
  }, [dispatch])

  useEffect(() => {
    if (selfReviewDeleteSuccessMessage) {
      addToast('Self Review successfully deleted', {
        appearance: 'success',
        autoDismiss: true
      })
    }
    dispatch(selfReviewDeleteSuccess(''))
  }, [selfReviewDeleteSuccessMessage, addToast, dispatch])

  useEffect(() => {
    if (selfReviewDeleteError) {
      addToast('Error while deleting Self Review', {
        appearance: 'error',
        autoDismiss: true
      })
      dispatch(selfReviewDeleteFailue(''))
    }
  }, [selfReviewDeleteError, addToast, dispatch])

  const viewDetailHandler = (details, projectsArr) => {
    setReviewDetails(details)
    setProjectDetails([projectsArr.join(', ')])
    setShowDetailsDialog(true)
  }
  const selfReviewArray = []
  let filteredEmployee
  if (selfReviewData) {
    filteredEmployee = selfReviewData.filter(cls =>
      `${cls.employee.firstname} ${cls.employee.lastname}`
        .toLowerCase()
        .includes(selectedEmployee.toLowerCase().trim())
    )
    filteredEmployee.map((review, key) => {
      const projectsArr = review.projects.map(item => item.title)
      selfReviewArray.push([
        <span
          className={classes.showPointer}
          onClick={() => viewDetailHandler(review, projectsArr)}
        >
          {review.employee.firstname} {review.employee.lastname}
        </span>,
        projectsArr.join(', '),
        formatDate(review.from_date),
        formatDate(review.to_date),
        formatDate(review.due_to),
        review.status
      ])
      return 1
    })
  }

  const changeHandler = e => {
    setselectedEmployee(e.target.value)
  }
  const createPeerHandler = () => {
    setSelfReviewInfo('')
    setIsRedirectForm(true)
  }
  const detailsSwitchHandler = () => {
    if (isRedirectForm) setIsRedirectForm(false)
    if (showSelfReviewForAll) setSelfReviewForAll(false)
  }
  const updateUser = (val, k) => {
    setSelfReviewInfo(filteredEmployee[k])
    setIsRedirectForm(true)
  }

  const deleteUser = (val, k) => {
    setDeleteId(filteredEmployee[k]._id)
    setShowDelDialog(true)
  }
  const handleYesDelete = () => {
    dispatch(deleteSelfReview(deleteId))
    setShowDelDialog(false)
  }
  return (
    <div>
      {isRedirectForm ? (
        <SelfReviewForm
          selfReviewInfo={selfReviewInfo}
          detailsSwitchHandler={detailsSwitchHandler}
        ></SelfReviewForm>
      ) : showSelfReviewForAll ? (
        <SelfReviewFoAll
          detailsSwitchHandler={detailsSwitchHandler}
        ></SelfReviewFoAll>
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
                      const { firstname, lastname } = prop
                      return prop.status !== 'Inactive' ? (
                        <MenuItem
                          className={classes.hoverEffect}
                          value={firstname + ' ' + lastname}
                          key={key}
                        >
                          {firstname} {lastname}
                        </MenuItem>
                      ) : null
                    })
                  : null}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem style={{ textAlign: 'end' }} xs={6} sm={6} md={6}>
            <Button
              color="primary"
              onClick={() => {
                setSelfReviewForAll(true)
              }}
            >
              Create Self Review For All
            </Button>
            <Button color="primary" onClick={createPeerHandler}>
              Create Self Review
            </Button>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Card plain>
              <CardHeader plain color="primary">
                <h4 className={classes.cardTitleWhite}>SELF REVIEW</h4>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="gray"
                  tableHead={peerReviewListingHeader}
                  tableData={selfReviewArray || null}
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
        userInfo="Are you sure you want to delete this Review ?"
      />
      <Dialog
        title="Peer Review Details"
        maxWidth="lg"
        modal={true}
        open={showDetailsDialog}
      >
        <DialogActions>
          <GridItem xs={12} sm={12} md={12}>
            <SelfReviewDetails
              selfReviewDeatails={reviewDetails}
              projectDetails={projectDetails}
              showButtons={false}
            />

            <Button
              color="primary"
              size="sm"
              onClick={() => setShowDetailsDialog(false)}
            >
              Close
            </Button>
          </GridItem>
        </DialogActions>
      </Dialog>
    </div>
  )
}
const SelfReviewWithHOC = compose(withToastManager, withAuth)(SelfReview)
export default SelfReviewWithHOC
