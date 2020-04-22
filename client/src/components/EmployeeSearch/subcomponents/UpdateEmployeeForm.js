import React from 'react'
import AddEmployeeForm from '../../AddEmployeeForm/AddEmployeeForm'

const UpdateEmployeeForm = ({ setUpdateAction, userToUpdate, setPageView }) => {
  return (
    <>
      <AddEmployeeForm
        setUpdateAction={setUpdateAction}
        userToUpdate={userToUpdate}
        setPageView={setPageView}
      />
    </>
  )
}
export default UpdateEmployeeForm
