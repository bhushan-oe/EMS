import React, { useEffect } from 'react'
import withAuth from '../../HOC/withAuth'
import { getEmpProjectAllocationsData } from '../../actions/projectAction'
import { useSelector, useDispatch } from 'react-redux'
import { currentUser } from '../../selectors/loginSelectors'
import { emplProjectAllocations } from '../../selectors/projectAllocationSelector'
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
import Table from '../../components/Table/Table'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'
import dashboardStyle from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
import { makeStyles } from '@material-ui/core/styles'
import { formatDate } from '../../helpers/formatDates'

const useStyles = makeStyles(dashboardStyle)

const ProjectHistory = props => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { _id: employee } = useSelector(currentUser)
  const projectDetails = useSelector(emplProjectAllocations)
  useEffect(() => {
    if (employee) dispatch(getEmpProjectAllocationsData(employee))
  }, [dispatch])

  const SelfReviewListingHeader = [
    'Project',
    'Functional Manager',
    'Start Date',
    'End Date',
    'Status'
  ]
  let projectDetailsArray = []
  if (projectDetails) {
    projectDetailsArray = projectDetails.map(item => {
      let {
        project: { title },
        functional_manager: {
          firstname: mgr_firstname,
          lastname: mgr_lastname
        },
        startdate,
        enddate,
        status
      } = item

      startdate = formatDate(startdate)
      enddate = formatDate(enddate)
      const mgr_name = `${mgr_firstname} ${mgr_lastname}`
      const tableData = {
        title,
        mgr_name,
        startdate,
        enddate,
        status
      }
      return Object.values(tableData)
    })
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Project Details</h4>
          </CardHeader>
          {projectDetails && projectDetails.length > 0 ? (
            <CardBody>
              <Table
                tableHeaderColor="gray"
                tableHead={SelfReviewListingHeader}
                tableData={projectDetailsArray || null}
                showLink={true}
                buttonText="Details"
              />
            </CardBody>
          ) : projectDetails == null ? null : (
            <p className={classes.noteToUser}>No Projects are assigned yet.</p>
          )}
        </Card>
      </GridItem>
    </GridContainer>
  )
}

export default withAuth(ProjectHistory)
