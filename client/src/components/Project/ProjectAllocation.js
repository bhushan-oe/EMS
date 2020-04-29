import React, { useEffect, useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridContainer from '../Grid/GridContainer'
import GridItem from '../Grid/GridItem'
import Card from '../Card/Card'
import CardHeader from '../Card/CardHeader'
import CardBody from '../Card/CardBody'
import CardFooter from '../Card/CardFooter'
import Button from '../CustomButtons/Button'
import { loadAllEmployeeData, loadManagers } from '../../actions/employeeAction'
import {
  loadAllProjects,
  allocateProject,
  clearProjectAllocationMsg
} from '../../actions/projectAction'
import { projectSelector } from '../../selectors/projectSelectors'
import 'date-fns'
import {
  managerDataSelector,
  employeeDataSelector
} from '../../selectors/employeeSelectors'

import MenuItem from '@material-ui/core/MenuItem'
import SelectMenu from '../FromComponents/SelectMenu'
import { useToasts } from 'react-toast-notifications'
import { Formik, Form } from 'formik'

import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
import { useSelector, useDispatch } from 'react-redux'
import { projectDatePickerList } from './projectFormData'
import {
  projectAllocationStatus,
  projectAllocationError
} from '../../selectors/projectAllocationSelector'
import DatePickerFields from '../FromComponents/DatePickerField'
import {
  projectAllocationValidations,
  projectAllocationInitialValues
} from './projectFormData'

const projectStyles = styles
const useStyles = makeStyles(projectStyles)
const Project = props => {
  const { setPageView } = props
  const projects = useSelector(projectSelector)
  const employeeData = useSelector(employeeDataSelector)
  const [managers, setManagers] = useState(null)
  const [activeEmployees, setEmployeeData] = useState(null)
  const classes = useStyles()
  const { addToast } = useToasts()
  const dispatch = useDispatch()
  const projectAllocationSuccess = useSelector(projectAllocationStatus)
  const projectAllocationErr = useSelector(projectAllocationError)
  const managerdata = useSelector(managerDataSelector)
  const projectForm = useRef(null)

  useEffect(() => {
    dispatch(loadAllEmployeeData())
    dispatch(loadAllProjects())
    dispatch(loadManagers())
  }, [dispatch])

  useEffect(() => {
    if (managerdata) {
      const emp = managerdata
      const managers = emp.filter(item => {
        if (item.userRole === 'manager' && item.status === 'Active') return item
      })
      setManagers(managers)
    }
  }, [managerdata])

  useEffect(() => {
    if (employeeData) {
      const activeEmployees = employeeData.filter(item => {
        if (item.status === 'Active') return item
      })
      setEmployeeData(activeEmployees)
    }
  }, [employeeData])

  useEffect(() => {
    if (projectAllocationSuccess) {
      addToast(projectAllocationSuccess, {
        appearance: 'success',
        autoDismiss: true
      })
      projectForm.current.reset()
      dispatch(clearProjectAllocationMsg())
      setPageView('projectListing')
    }
  }, [projectAllocationSuccess, addToast, dispatch, setPageView])
  useEffect(() => {
    if (projectAllocationErr) {
      addToast(projectAllocationErr, { appearance: 'error', autoDismiss: true })
      dispatch(clearProjectAllocationMsg())
    }
  }, [projectAllocationErr, addToast, dispatch])

  const submitFormValues = values => {
    dispatch(allocateProject(values))
  }

  const initialValues = projectAllocationInitialValues
  const projectDataValidation = projectAllocationValidations

  return (
    <GridContainer>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          submitFormValues(values)
          setSubmitting(false)
        }}
        validationSchema={projectDataValidation}
      >
        {({ isSubmitting, values, setFieldValue, handleChange }) => (
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <Form ref={projectForm}>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>
                    {'ALLOCATE PROJECT'}
                  </h4>
                </CardHeader>

                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <SelectMenu
                        name="employee"
                        onChange={handleChange}
                        disabledName="None"
                        label={'Employee *'}
                        value={values.employee}
                      >
                        {activeEmployees
                          ? activeEmployees.map(item => {
                            return (
                              <MenuItem value={item._id}>
                                {`${item.firstname} ${item.lastname}`}
                              </MenuItem>
                            )
                          })
                          : null}
                      </SelectMenu>
                    </GridItem>
                    <GridItem xs={6} sm={6} md={6}>
                      <SelectMenu
                        name="project"
                        onChange={handleChange}
                        disabledName="Select Project"
                        label={'Project *'}
                        value={values.project}
                      >
                        {projects &&
                          projects.map((item, key) => {
                            return (
                              <MenuItem value={item._id}>{item.title}</MenuItem>
                            )
                          })}
                      </SelectMenu>
                    </GridItem>
                    <DatePickerFields
                      inputList={projectDatePickerList}
                      values={values}
                      handleChange={setFieldValue}
                    />
                    <GridItem xs={12} sm={12} md={6}>
                      <SelectMenu
                        name="functional_manager"
                        onChange={handleChange}
                        disabledName="None"
                        label={'Reporting Manager *'}
                        value={values.functional_manager}
                      >
                        {managers &&
                          managers.map(item => {
                            return (
                              <MenuItem value={item._id}>
                                {`${item.firstname} ${item.lastname}`}
                              </MenuItem>
                            )
                          })}
                      </SelectMenu>
                    </GridItem>
                  </GridContainer>
                </CardBody>

                <CardFooter>
                  <GridItem xs={12} sm={12} md={6}>
                    <Button
                      id="add"
                      type="submit"
                      color="primary"
                      disabled={isSubmitting}
                    >
                      ALLOCATE PROJECT
                    </Button>
                    <Button
                      color="white"
                      disabled={isSubmitting}
                      onClick={() => setPageView('projectListing')}
                    >
                      cancel
                    </Button>
                  </GridItem>
                </CardFooter>
              </Form>
            </Card>
          </GridItem>
        )}
      </Formik>
    </GridContainer>
  )
}
export default Project
