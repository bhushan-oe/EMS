import React from 'react'
import GridItem from '../../Grid/GridItem'
import { makeStyles } from '@material-ui/core/styles'
import styles from '../../../assets/jss/material-dashboard-react/views/dashboardStyle'
import Card from '../../Card/Card'
import CardHeader from '../../Card/CardHeader'
import CardBody from '../../Card/CardBody'
import EmployeeListTable from './EmployeeListTable'

const useStyles = makeStyles(styles)

const EmployeeSearchResults = ({
  employeeData,
  employeeDetails,
  searchText,
  deleteUser,
  updateUser
}) => {
  const classes = useStyles()
  const { cardTitleWhite, noteToUser } = classes
  const employeeListingHeader = [
    'Employee Id',
    'Name',
    'Designation',
    'Contact No.',
    'Email Address',
    'Reporting Manager'
  ]
  const links = ['Edit', 'Delete']

  return (
    <>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={cardTitleWhite}>Employee List</h4>
          </CardHeader>
          <CardBody>
            {employeeData && employeeDetails.length > 0 && searchText ? (
              <EmployeeListTable
                tableHeaderColor="gray"
                tableHead={employeeListingHeader}
                tableData={employeeDetails || null}
                addLinks={links}
                updateUser={updateUser}
                deleteUser={deleteUser}
              />
            ) : (
              <p className={noteToUser}>Please search for employee result</p>
            )}
          </CardBody>
        </Card>
      </GridItem>
    </>
  )
}
export default EmployeeSearchResults
