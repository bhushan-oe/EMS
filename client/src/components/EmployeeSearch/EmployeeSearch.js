import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { AlertModal } from '../Modal/modal'
import {
  deleteEmployee,
  clearDeleteEmployeeMsg
} from '../../actions/employeeAction'
import { useToasts } from 'react-toast-notifications'
import {
  deleteEmployeeSuccessMsg,
  deleteEmployeeErrors
} from '../../selectors/employeeSelectors'
import UpdateEmployeeForm from './subcomponents/UpdateEmployeeForm'
import EmployeeSearchFeild from './subcomponents/EmployeeSearchFeild'
import EmployeeSearchResults from './subcomponents/EmployeeSearchResults'

const EmployeeSearch = props => {
  const { employeeData, setPageView } = props
  const { addToast } = useToasts()
  const [searchText, setsearchText] = useState('')
  const [employeeDetails, setEmployeeDetails] = useState([])
  const dispatch = useDispatch()
  const [userToUpdate, setUserToUpdate] = useState(null)
  const [updateAction, setUpdateAction] = useState(null)
  const [showDelDialog, setShowDelDialog] = useState(false)
  const deleteEmployeeSuccess = useSelector(deleteEmployeeSuccessMsg)
  const deleteEmployeeError = useSelector(deleteEmployeeErrors)

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
    let employeeDetails = []
    if (employeeData && searchText) {
      // To do - update api to get only active users
      filteredEmployee = employeeData.filter(cls =>
        cls.userName.toLowerCase().includes(searchText.toLowerCase().trim())
      )
      employeeDetails = filteredEmployee.map(employee => {
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
        return {
          employee_id,
          name,
          designation,
          contact_no,
          email,
          managerName,
          status
        }
      })
    }
    setEmployeeDetails(employeeDetails)
  }

  const getUserToUpdate = (employeeData, employee_id) => {
    return employeeData.filter(item => {
      if (item.employee_id === employee_id) return item

      return false
    })
  }

  const updateUser = val => {
    setUpdateAction('update')
    // To do - update api to get only active users
    const user = getUserToUpdate(employeeData, val)
    setUserToUpdate(user)
  }

  const deleteUser = val => {
    // To do - update api to get only active users
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
        <UpdateEmployeeForm
          setUpdateAction={setUpdateAction}
          userToUpdate={userToUpdate}
          setPageView={setPageView}
        />
      ) : (
        <>
          <EmployeeSearchFeild
            changeHandler={changeHandler}
            searchHandler={searchHandler}
          />
          <EmployeeSearchResults
            employeeData={employeeData}
            employeeDetails={employeeDetails}
            updateUser={updateUser}
            deleteUser={deleteUser}
            searchText={searchText}
          />
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

export default EmployeeSearch
