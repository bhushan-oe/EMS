import React, { useContext } from 'react'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
// core components
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'

import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import { formatDate } from '../../helpers/formatDates'
import CardBody from '../../components/Card/CardBody'
import Table from '../../components/Table/Table'
import withAuth from '../../HOC/withAuth'
import { UserContext } from '../../context-provider/user-context'
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
const useStyles = makeStyles(styles)

const UserProfile = () => {
  const classes = useStyles()
  const { currentUser } = useContext(UserContext)
  const {
    employee_id,
    email,
    userName,
    firstname,
    lastname,
    middlename,
    address1,
    city,
    zip,
    state,
    country,
    gender,
    dateofbirth,
    dateofjoining,
    status,
    experience_at_joining,
    work_location,
    timezone,
    shift_timing,
    designation,
    employment_status,
    userRole,
    reporting_manager,
    contact_no,
    skills,
    certifications,
    achievements
  } = currentUser
  let employeeDataArray = []
  const headerArray = []
  if (currentUser) {
    employeeDataArray = [
      [<span className={classes.boldText}>Employee Id</span>, employee_id],
      [<span className={classes.boldText}>Email</span>, email],
      [<span className={classes.boldText}>User Name</span>, userName],
      [
        <span className={classes.boldText}>Name</span>,
        `${firstname} ${middlename} ${lastname}`
      ],
      [
        <span className={classes.boldText}>Address</span>,
        `${address1},${city},${state},${country},${zip}`
      ],
      [<span className={classes.boldText}>Gender</span>, gender],
      [<span className={classes.boldText}>Status</span>, status],
      [
        <span className={classes.boldText}>Date of birth</span>,
        formatDate(dateofbirth)
      ],
      [
        <span className={classes.boldText}>Date of Joining</span>,
        formatDate(dateofjoining)
      ],
      [
        <span className={classes.boldText}>Experience at joining</span>,
        experience_at_joining
      ],
      [<span className={classes.boldText}>Work Location</span>, work_location],
      [<span className={classes.boldText}>Timezone</span>, timezone],
      [<span className={classes.boldText}>Shift Timing</span>, shift_timing],
      [<span className={classes.boldText}>Designation</span>, designation],
      [
        <span className={classes.boldText}>Employment Status</span>,
        employment_status
      ],
      [<span className={classes.boldText}>User Role</span>, userRole],
      [
        <span className={classes.boldText}>Reporting Manager</span>,
        reporting_manager
      ],
      [<span className={classes.boldText}>contact Number</span>, contact_no],
      [<span className={classes.boldText}>Skills</span>, skills],
      [
        <span className={classes.boldText}>Certifications</span>,
        certifications
      ],
      [<span className={classes.boldText}>Achievements</span>, achievements]
    ]
  }
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>User Profile</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                {employeeDataArray && (
                  <Table
                    tableHeaderColor="gray"
                    tableHead={headerArray}
                    tableData={employeeDataArray}
                  />
                )}
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  )
}

export default withAuth(UserProfile)
