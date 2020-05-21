import React, { useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  loadAllSelfReviewsForUser,
  loadSelfReviewsForManager
} from '../../actions/selfReviewActions'

// react plugin for creating charts
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'

// @material-ui/icons

// core components
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
import Button from '../../components/CustomButtons/Button'
import { Dialog, DialogActions } from '@material-ui/core'
import Table from '../../components/Table/Table'
import CustomTabs from '../../components/CustomTabs/CustomTabs'
import SelfReviewDetails from '../../components/selfReviewDetails/SelfReviewDetails'
import styles from '../../assets/jss/material-dashboard-react/views/reviewHistoryStyle'
import GroupIcon from '@material-ui/icons/Group'
import Person from '@material-ui/icons/Person'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import { quarterInfo, years } from '../../constants'
import withAuth from '../../HOC/withAuth'
import { UserContext } from '../../context-provider/user-context'
import { formatDate } from '../../helpers/formatDates'
import {
  userSelfReviewDeatils,
  managerSelfReviewsSelector
} from '../../selectors/reviewSelectors'

const useStyles = makeStyles(styles)

const SelfReviewHistory = props => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const userSelfReviews = useSelector(userSelfReviewDeatils)
  const managerSelfReviews = useSelector(managerSelfReviewsSelector)
  const [selfReviewDetails, setSelfReviewDetails] = useState(null)
  const [selectedQuarter, setSelectedQuarter] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [projectDetails, setProjectDetails] = useState('')
  const { currentUser } = useContext(UserContext)
  const [showDetail, setShowDetail] = useState(false)
  const userReviewDetailsArr = []
  const [managerSelfReviewArray, setManagerSelfReview] = useState('')

  const SelfReviewListingHeader = [
    'Projects',
    'From date',
    'To date',
    'Due Fom Date',
    'Status'
  ]
  const employeeeSelfReviewListingHeader = [
    'Employee',
    'Projects',
    'From date',
    'To date',
    'Due Fom Date',
    'Status'
  ]
  useEffect(() => {
    dispatch(loadAllSelfReviewsForUser(currentUser._id, { status: 'Done' }))
  }, [currentUser._id, dispatch])

  useEffect(() => {
    if (selectedQuarter && selectedYear) {
      const body = {
        ...selectedQuarter,
        functional_manager: currentUser._id,
        selectedYear: selectedYear,
        status: ['pending-with-manager', 'Done']
      }
      dispatch(loadSelfReviewsForManager(body))
    }
  }, [selectedQuarter, selectedYear])

  useEffect(() => {
    if (currentUser.userRole === 'manager' && managerSelfReviews) {
      const employeeSelfReviewArr = []
      managerSelfReviews.map((review, key) => {
        const projectsArr = review.projects.map(item => item.title)
        employeeSelfReviewArr.push([
          `${review.employee.firstname} ${review.employee.lastname}`,
          projectsArr.join(',\n'),
          formatDate(review.from_date),
          formatDate(review.to_date),
          formatDate(review.due_from),
          review.status
        ])
      })
      setManagerSelfReview(
        employeeSelfReviewArr.length > 0 ? employeeSelfReviewArr : ''
      )
    }
  }, [managerSelfReviews])

  if (userSelfReviews) {
    userSelfReviews.map(review => {
      const projectsArr = review.projects.map(item => {
        if (item.projects) return item.projects.title
      })

      userReviewDetailsArr.push([
        projectsArr.join(',\n'),
        formatDate(review.from_date),
        formatDate(review.to_date),
        formatDate(review.due_from),
        review.status
      ])
    })
  }

  const detailHandler = key => {
    setSelfReviewDetails(userSelfReviews[key])
    setProjectDetails(userReviewDetailsArr[key])
    setShowDetail(true)
  }
  const showDetailHandler = key => {
    setSelfReviewDetails(managerSelfReviews[key])
    setProjectDetails(managerSelfReviewArray[key])
    setShowDetail(true)
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
                  {userReviewDetailsArr && userReviewDetailsArr.length > 0 ? (
                    <Table
                      tableHeaderColor="gray"
                      tableHead={SelfReviewListingHeader}
                      tableData={userReviewDetailsArr || null}
                      showLink={true}
                      buttonText="Details"
                      detailHandler={detailHandler}
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
                      onChange={e => {
                        setSelectedQuarter(e.target.value)
                      }}
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

                  {managerSelfReviewArray &&
                  managerSelfReviews &&
                  selectedQuarter &&
                  selectedYear ? (
                    <Table
                      tableHeaderColor="gray"
                      tableHead={employeeeSelfReviewListingHeader}
                      tableData={managerSelfReviewArray || null}
                      showLink={true}
                      buttonText="Details"
                      detailHandler={showDetailHandler}
                    />
                  ) : selectedQuarter && selectedYear ? (
                    <p className={classes.noteToUser}>
                      ** No Reviews Available
                    </p>
                  ) : (
                    <p className={classes.noteToUser}>
                      ** Please Select Quarter and Year
                    </p>
                  )}
                </div>
              )
            }
          ]}
        />
      </GridItem>
      <Dialog
        title="Self Review Details"
        maxWidth="lg"
        modal={true}
        open={showDetail}
      >
        <DialogActions>
          {selfReviewDetails && (
            <GridItem xs={12} sm={12} md={12}>
              <SelfReviewDetails
                selfReviewDeatails={selfReviewDetails}
                projectDetails={projectDetails}
                showButtons={false}
                closeSelfReiewDetails={() => setShowDetail(false)}
              />
              {currentUser.userRole === 'manager' &&
              selfReviewDetails.status === 'pending-with-manager' ? null : (
                <Button
                  color="primary"
                  size="sm"
                  onClick={() => setShowDetail(false)}
                >
                  Close
                </Button>
              )}
            </GridItem>
          )}
        </DialogActions>
      </Dialog>
    </GridContainer>
  )
}

export default withAuth(SelfReviewHistory)
