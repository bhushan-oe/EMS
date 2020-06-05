import React, { useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  loadAllPeerForUser,
  loadPeerReviewsForManager
} from '../../actions/peerReviewAction'
import GroupIcon from '@material-ui/icons/Group'
import Person from '@material-ui/icons/Person'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import { quarterInfo, years } from '../../constants'
// react plugin for creating charts

// @material-ui/icons

// core components
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
import Button from '../../components/CustomButtons/Button'
import { Dialog, DialogActions } from '@material-ui/core'
import Table from '../../components/Table/Table'
import CustomTabs from '../../components/CustomTabs/CustomTabs'
import PeerReviewDetails from '../../components/PeerReviewDetails/PeerReviewDetails'
import withAuth from '../../HOC/withAuth'
import { UserContext } from '../../context-provider/user-context'
import { formatDate } from '../../helpers/formatDates'
import {
  userPeerReview,
  managerPeerReviewsSelector
} from '../../selectors/reviewSelectors'
import styles from '../../assets/jss/material-dashboard-react/views/reviewHistoryStyle'

const useStyles = makeStyles(styles)
const PeerReviewHistory = props => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const peerReviews = useSelector(userPeerReview)
  const managerPeerReviews = useSelector(managerPeerReviewsSelector)
  const [peerDetails, setPeerDetails] = useState('')
  const { currentUser } = useContext(UserContext)
  const [showDetail, setShowDetail] = useState(false)
  const [selectedQuarter, setSelectedQuarter] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [managerPeerReviewArray, setManagerPeerReviewArray] = useState('')
  const peerReviewListingHeader = [
    'Employee Under Review',
    'Project',
    'Due Date',
    'Status'
  ]
  const employeeReviewListingHeader = [
    'Employee Under Review',
    'Employee Reviewing',
    'Project',
    'Due Date',
    'Status'
  ]
  useEffect(() => {
    dispatch(loadAllPeerForUser(currentUser._id, { status: 'Done' }))
  }, [currentUser._id, dispatch])

  useEffect(() => {
    if (selectedQuarter && selectedYear) {
      const body = {
        ...selectedQuarter,
        functional_manager: currentUser._id,
        selectedYear: selectedYear
      }
      dispatch(loadPeerReviewsForManager(body))
    }
  }, [selectedQuarter, selectedYear])
  useEffect(() => {
    if (currentUser.userRole === 'manager' && managerPeerReviews) {
      const employeePeerReviewArr = []
      managerPeerReviews.map((review, key) => {
        employeePeerReviewArr.push([
          `${review.employee_under_review.firstname} ${review.employee_under_review.lastname}`,
          `${review.employee_reviewing.firstname} ${review.employee_reviewing.lastname}`,
          review.project.title,
          formatDate(review.to_date),
          review.status
        ])
        return 1
      })
      setManagerPeerReviewArray(
        employeePeerReviewArr.length > 0 ? employeePeerReviewArr : ''
      )
    }
  }, [managerPeerReviews])
  const peerReviewsArray = []
  if (peerReviews) {
    peerReviews.map(review => {
      peerReviewsArray.push([
        `${review.employee_under_review.firstname} ${review.employee_under_review.lastname}`,
        review.project.title,
        formatDate(review.to_date),
        review.status
      ])
      return 1
    })
  }

  const onClickHandler = key => {
    setPeerDetails(peerReviews[key])
    setShowDetail(true)
  }
  const onClickEmployeeDetailsHandler = key => {
    setPeerDetails(managerPeerReviews[key])
    setShowDetail(true)
  }
  const changeHandler = e => {
    setSelectedQuarter(e.target.value)
  }
  return (
    <GridContainer>
      <GridItem>
        <CustomTabs
          title=""
          headerColor="primary"
          tabs={[
            {
              tabName: 'My Reviews',
              tabIcon: Person,
              tabContent: (
                <div className={classes.widthSetting}>
                  {peerReviewsArray && peerReviewsArray.length > 0 ? (
                    <Table
                      tableHeaderColor="gray"
                      tableHead={peerReviewListingHeader}
                      tableData={peerReviewsArray || null}
                      showLink={true}
                      buttonText="Details"
                      detailHandler={onClickHandler}
                    />
                  ) : (
                    <p className={classes.noteToUser}>
                      Review data not avaialable.
                    </p>
                  )}
                </div>
              )
            },
            currentUser.userRole === 'manager' && {
              tabName: 'Employee Reviews',
              tabIcon: GroupIcon,
              tabContent: (
                <div className={classes.widthSetting}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="SelectQuarter">
                      {' '}
                      Select Quarter
                    </InputLabel>
                    <Select
                      value={selectedQuarter}
                      onChange={changeHandler}
                      inputProps={{
                        name: 'SelectQuarter',
                        id: 'SelectQuarter'
                      }}
                    >
                      <MenuItem className={classes.hoverEffect} value="">
                        <em>None</em>
                      </MenuItem>
                      {quarterInfo.map((prop, key) => {
                        const { name } = prop
                        return (
                          <MenuItem
                            className={classes.hoverEffect}
                            value={prop}
                            key={key}
                          >
                            {name}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="SelectYear"> Select Year</InputLabel>
                    <Select
                      value={selectedYear}
                      onChange={e => {
                        setSelectedYear(e.target.value)
                      }}
                      inputProps={{
                        name: 'SelectYear',
                        id: 'SelectYear'
                      }}
                    >
                      <MenuItem className={classes.hoverEffect} value="">
                        <em>None</em>
                      </MenuItem>
                      {years().map((prop, key) => {
                        return (
                          <MenuItem
                            className={classes.hoverEffect}
                            value={prop}
                            key={key}
                          >
                            {prop}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>

                  {managerPeerReviewArray &&
                  managerPeerReviews &&
                  selectedQuarter &&
                  selectedYear ? (
                    <Table
                      tableHeaderColor="gray"
                      tableHead={employeeReviewListingHeader}
                      tableData={managerPeerReviewArray}
                      showLink={true}
                      buttonText="Details"
                      detailHandler={onClickEmployeeDetailsHandler}
                    />
                  ) : selectedQuarter && selectedYear ? (
                    <p className={classes.noteToUser}>No Reviews Available</p>
                  ) : (
                    <p className={classes.noteToUser}>
                      Please Select Quarter and Year
                    </p>
                  )}
                </div>
              )
            }
          ]}
        />
      </GridItem>
      <Dialog
        title="Peer Review Details"
        maxWidth="lg"
        modal={true}
        open={showDetail}
      >
        <DialogActions>
          <GridItem xs={12} sm={12} md={12}>
            <PeerReviewDetails
              reviewData={peerDetails}
              showButtons={false}
            ></PeerReviewDetails>
            <Button
              color="primary"
              size="sm"
              onClick={() => setShowDetail(false)}
            >
              Close
            </Button>
          </GridItem>
        </DialogActions>
      </Dialog>
    </GridContainer>
  )
}

export default withAuth(PeerReviewHistory)
