import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadAllEmployeeData } from '../../actions/employeeAction'
import Button from '../../components/CustomButtons/Button'
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
import EmployeeSearch from '../../components/EmployeeSearch/EmployeeSearch'
import AddEmployeeForm from '../../components/AddEmployeeForm/AddEmployeeForm'
import withAuth from '../../HOC/withAuth'
import { employeeDataSelector } from '../../selectors/employeeSelectors'

const Employees = () => {
  const dispatch = useDispatch()
  const [pageView, setPageView] = useState(true)
  const employeeData = useSelector(employeeDataSelector)
  const buttonInnerText = pageView ? ' ADD EMPLOYEE' : 'SEARCH EMPLOYEE'

  useEffect(() => {
    dispatch(loadAllEmployeeData())
  }, [dispatch])

  const togglePageView = () => {
    setPageView(!pageView)
  }

  return (
    <GridContainer>
      <GridItem style={{ textAlign: 'end' }} xs={12}>
        <Button type="submit" color="primary" onClick={togglePageView}>
          {buttonInnerText}
        </Button>
      </GridItem>
      {pageView ? (
        <EmployeeSearch employeeData={employeeData} setPageView={setPageView} />
      ) : (
        <AddEmployeeForm setPageView={setPageView} />
      )}
    </GridContainer>
  )
}
export default withAuth(Employees)
