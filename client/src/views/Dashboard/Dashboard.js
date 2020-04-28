import React, { useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadAllPeerForUser } from '../../actions/peerReviewAction'
import { loadAllSelfReviewsForUser } from '../../actions/selfReviewActions'

// react plugin for creating charts
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
// @material-ui/icons

// core components
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
import Table from '../../components/Table/Table'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'
import PeerReviewDetails from '../../components/PeerReviewDetails/PeerReviewDetails'
import SelfReviewDetails from '../../components/selfReviewDetails/SelfReviewDetails'
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
import withAuth from '../../HOC/withAuth'
import { UserContext } from '../../context-provider/user-context'
import { formatDate } from '../../helpers/formatDates'
import {
  userPeerReview,
  userSelfReviewDeatils
} from '../../selectors/reviewSelectors'

const useStyles = makeStyles(styles)
const Dashboard = props => {
  const classes = useStyles()
  const [showDetail, setShowDetail] = useState(false)
  const [showSelfReviewDetail, setShowSelfreviewDetail] = useState(false)
  const [peerDetails, setPeerDetails] = useState('')
  const [selfReviewDetails, setSelfReviewDetails] = useState(null)
  const [projectDetails, setProjectDetails] = useState('')
  const { currentUser } = useContext(UserContext)
  const dispatch = useDispatch()
  const peerReviewListingHeader = [
    'Employee Under Review',
    'Project',
    'Due Date',
    'Status'
  ]

  const SelfReviewListingHeader = [
    'Projects',
    'From date',
    'To date',
    'Due Fom Date',
    'Status'
  ]

  const peerReviews = useSelector(userPeerReview)
  const userSelfReviews = useSelector(userSelfReviewDeatils)
  useEffect(() => {
    dispatch(loadAllPeerForUser(currentUser._id, { status: 'Active' }))
    dispatch(loadAllSelfReviewsForUser(currentUser._id, { status: 'Active' }))
  }, [currentUser._id, dispatch])

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
  const userReviewDetailsArr = []
  if (
    userSelfReviews &&
    userSelfReviews.length > 0 &&
    userReviewDetailsArr.length === 0
  ) {
    userSelfReviews.map(review => {
      const projectsArr = review.projects.map(item => item.title)
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
    setPeerDetails(peerReviews[key])
    setShowDetail(true)
  }
  const handleSelfReviewDetails = key => {
    setSelfReviewDetails(userSelfReviews[key])
    setProjectDetails(userReviewDetailsArr[key])
    setShowSelfreviewDetail(true)
  }
  const detailsSwitchHandler = () => {
    setShowDetail(false)
  }
  const closeSelfReiewDetails = () => {
    setShowSelfreviewDetail(false)
  }
  return (
    <div>
      {showDetail ? (
        <PeerReviewDetails
          reviewData={peerDetails}
          closeHandler={detailsSwitchHandler}
          showButtons={true}
        ></PeerReviewDetails>
      ) : showSelfReviewDetail ? (
        <SelfReviewDetails
          selfReviewDeatails={selfReviewDetails}
          projectDetails={projectDetails}
          closeSelfReiewDetails={closeSelfReiewDetails}
          showButtons={true}
        />
      ) : (
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <InputLabel className={classes.cardTitle}>
              Welcome {currentUser ? currentUser.userName : null}
            </InputLabel>
          </GridItem>
          {peerReviews && peerReviewsArray.length > 0 ? (
            <GridItem xs={12} sm={12} md={12}>
              <Card plain>
                <CardHeader plain color="primary">
                  <h4 className={classes.cardTitleWhite}>PEER REVIEWS</h4>
                </CardHeader>
                <CardBody>
                  <Table
                    tableHeaderColor="gray"
                    tableHead={peerReviewListingHeader}
                    tableData={peerReviewsArray || null}
                    showLink={true}
                    buttonText="Details"
                    detailHandler={detailHandler}
                  />
                </CardBody>
              </Card>
            </GridItem>
          ) : null}

          {userSelfReviews && userReviewDetailsArr.length > 0 ? (
            <GridItem xs={12} sm={12} md={12}>
              <Card plain>
                <CardHeader plain color="primary">
                  <h4 className={classes.cardTitleWhite}>SELF REVIEW</h4>
                </CardHeader>
                <CardBody>
                  <Table
                    tableHeaderColor="gray"
                    tableHead={SelfReviewListingHeader}
                    tableData={userReviewDetailsArr || null}
                    showLink={true}
                    buttonText="Details"
                    detailHandler={handleSelfReviewDetails}
                  />
                </CardBody>
              </Card>
            </GridItem>
          ) : null}
        </GridContainer>
      )}
    </div>
  )
}
export default withAuth(Dashboard)
