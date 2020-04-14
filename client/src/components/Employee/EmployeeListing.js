import EmployeeListTable from './EmployeeListTable'
import { useSelector, useDispatch } from 'react-redux'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Search from '@material-ui/icons/Search'
import CustomInput from '../../components/CustomInput/CustomInput'
import Button from '../../components/CustomButtons/Button'
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
import GridItem from '../../components/Grid/GridItem'
import { AlertModal } from '../Modal/modal'
import {
  deleteEmployee,
  clearDeleteEmployeeMsg
} from '../../actions/employeeAction'
import { useToasts } from 'react-toast-notifications'
import Employee from './Employee'
import {
  deleteEmployeeSuccessMsg,
  deleteEmployeeErrors
} from '../../selectors/employeeSelectors'
const useStyles = makeStyles(styles)
const EmployeeListing = props => {
  const { employeeData, setPageView } = props
  const { addToast } = useToasts()
  const classes = useStyles()
  const [searchText, setsearchText] = useState('')
  const [employeeDetails, setEmployeeDetails] = useState([])
  const dispatch = useDispatch()
  const [userToUpdate, setUserToUpdate] = useState(null)
  const [updateAction, setUpdateAction] = useState(null)
  const [showDelDialog, setShowDelDialog] = useState(false)
  const deleteEmployeeSuccess = useSelector(deleteEmployeeSuccessMsg)
  const deleteEmployeeError = useSelector(deleteEmployeeErrors)

  const employeeListingHeader = [
    'Employee Id',
    'Name',
    'Designation',
    'Contact No.',
    'Email Address',
    'Reporting Manager'
  ]

  const changeHandler = e => {
    setsearchText(e.target.value)
    if (!searchText) setEmployeeDetails([])
  }

  // Clear Search text on Update Cancel/Success
  useEffect(() => {
    if (!updateAction) {
      setsearchText('')
    }
  }, [updateAction])

  useEffect(() => {
    if (deleteEmployeeSuccess) {
      addToast(deleteEmployeeSuccess, {
        appearance: 'success',
        autoDismiss: true
      })
      dispatch(clearDeleteEmployeeMsg())
    }
  }, [deleteEmployeeSuccess, addToast, dispatch])

  useEffect(() => {
    if (deleteEmployeeError) {
      addToast(deleteEmployeeError, {
        appearance: 'error',
        autoDismiss: true
      })
      dispatch(clearDeleteEmployeeMsg())
    }
  }, [deleteEmployeeError, addToast, dispatch])

  let filteredEmployee
  const searchHandler = () => {
    const employeeDetails = []
    if (employeeData && searchText) {
      // To do - update api to get only active users
      filteredEmployee = employeeData.filter(employee =>
        employee.userName
          .toLowerCase()
          .includes(searchText.toLowerCase().trim())
      )
      filteredEmployee.map(employee => {
        const {
          employee_id,
          firstname,
          lastname,
          contact_no,
          email,
          reporting_manager,
          designation,
          status
        } = employee
        const manager = filteredEmployee.filter(item => {
          if (
            item.userRole === 'manager' &&
            item.employee_id === reporting_manager
          ) {
            return item
          }
        })
        const managerName = manager[0]
          ? `${manager[0].firstname} ${manager[0].lastname}`
          : 'NA'

        const name = `${firstname} ${lastname}`
        const data = {
          employee_id,
          name,
          designation,
          contact_no,
          email,
          managerName,
          status
        }
        employeeDetails.push(data)
      })
    }
    setEmployeeDetails(employeeDetails)
  }

  const links = ['Edit', 'Delete']

  const getUserToUpdate = (employeeData, employee_id) => {
    return employeeData.filter(item => {
      if (item.employee_id === employee_id) return item

      return false
    })
  }

  const updateUser = val => {
    setUpdateAction('update')
    const user = getUserToUpdate(employeeData, val)
    setUserToUpdate(user)
  }

  const deleteUser = val => {
    const user = getUserToUpdate(employeeData, val)
    setUpdateAction('delete')
    setUserToUpdate(user)
    setShowDelDialog(true)
  }

  const handleYesDelete = () => {
    dispatch(deleteEmployee(userToUpdate[0]._id))
    setShowDelDialog(false)
  }

  const handleNoDelete = () => {
    setShowDelDialog(false)
  }

  return (
    <>
      {updateAction === 'update' ? (
        <Employee
          setUpdateAction={setUpdateAction}
          userToUpdate={userToUpdate}
          setPageView={setPageView}
        />
      ) : (
        <>
          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
              formControlProps={{}}
              inputProps={{
                onChange: changeHandler,
                placeholder: 'Search Employee',
                inputProps: {
                  'aria-label': 'Search'
                }
              }}
            />
            <Button
              color="white"
              aria-label="edit"
              justIcon
              round
              onClick={searchHandler}
            >
              <Search />
            </Button>
          </GridItem>

          <GridItem xs={12} sm={12} md={12}>
            <Card plain>
              <CardHeader plain color="primary">
                <h4 className={classes.cardTitleWhite}>Employee List</h4>
              </CardHeader>
              <CardBody>
                {employeeData && employeeDetails.length > 0 && searchText ? (
                  <EmployeeListTable
                    tableHeaderColor="gray"
                    tableHead={
                      employeeData && employeeDetails.length > 0 && searchText
                        ? employeeListingHeader
                        : null
                    }
                    tableData={employeeDetails || null}
                    addLinks={links}
                    updateUser={updateUser}
                    deleteUser={deleteUser}
                  />
                ) : (
                  <p>**Please search for employee result</p>
                )}
              </CardBody>
            </Card>
          </GridItem>
          <AlertModal
            title="Delete Employee"
            showDelDialog={showDelDialog}
            handleYesDelete={handleYesDelete}
            handleNoDelete={handleNoDelete}
            userInfo="Are you sure you want to delete this Employee ?"
          />
        </>
      )}
    </>
  )
}

export default EmployeeListing
