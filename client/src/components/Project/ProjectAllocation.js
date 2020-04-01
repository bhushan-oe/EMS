import React, { useEffect, useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridContainer from '../Grid/GridContainer'
import GridItem from '../Grid/GridItem'
import Card from '../Card/Card'
import CardHeader from '../Card/CardHeader'
import CardBody from '../Card/CardBody'
import CardFooter from '../Card/CardFooter'
import Button from '../CustomButtons/Button'
import { loadAllEmployeeData } from '../../actions/employeeAction'
import { loadAllProjects } from '../../actions/projectAction'
// import Grid from '@material-ui/core/Grid'
import { projectSelector } from '../../selectors/projectSelectors'
import 'date-fns'
import { managerDataSelector } from '../../selectors/employeeSelectors'
import { loadManagers } from '../../actions/employeeAction'
import MenuItem from '@material-ui/core/MenuItem'
import SelectMenu from '../FromComponents/SelectMenu'

import DatePicker from '../../components/FromComponents/DatePicker'
import { useToasts } from 'react-toast-notifications'
import { Formik, Form } from 'formik'
import { projectStyles } from './styles'
import { useSelector, useDispatch } from 'react-redux'
import {
  allocateProject,
  updateProjectAllocation,
  clearProjectAllocationMsg
} from '../../actions/projectAction'
import * as Yup from 'yup'
import {
  projectAllocationStatus,
  projectAllocationError
} from '../../selectors/projectAllocationSelector'
import { yupRequired, yupRequiredDate } from '../../helpers/yupValidations'

import { employeeDataSelector } from '../../selectors/employeeSelectors'
const styles = projectStyles
const useStyles = makeStyles(styles)
const Project = props => {
  const { setPageView, projectToUpdate } = props

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
        if (item.status === 'Active') {
          return item
        }
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
    dispatch(
      projectToUpdate
        ? updateProjectAllocation(values, projectToUpdate[0]._id)
        : allocateProject(values)
    )
  }

  let initialValues
  const {
    project,
    employee,
    startdate = new Date(),
    enddate = new Date(),
    status = 'Active',
    functional_manager
  } = projectToUpdate ? projectToUpdate[0] : {}

  initialValues = {
    project,
    employee,
    startdate,
    enddate,
    status,
    functional_manager
  }
  const handleProjectListView = () => {
    props.setUpdateAction()
  }

  const projectDataValidation = Yup.object().shape({
    project: yupRequired('Project'),
    employee: yupRequired('Employee'),
    functional_manager: yupRequired('Manager'),
    startdate: yupRequiredDate('Start Date').typeError('Invalid Date'),
    enddate: yupRequiredDate('End Date')
      .typeError('Invalid Date')
      .test('', 'Must be greater than Start Date', function(value) {
        const startdate = this.parent.startdate
        return value > startdate
      })
  })

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
                    {projectToUpdate
                      ? 'UPDATE PROJECT ALLOCATION'
                      : 'ALLOCATE PROJECT'}
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
                                  {item.firstname + ' ' + item.lastname}
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
                        {projects
                          ? projects.map((item, key) => {
                              return (
                                <MenuItem
                                  // className={classes.hoverEffect}
                                  value={item._id}
                                  // key={key}
                                >
                                  {item.title}
                                </MenuItem>
                              )
                            })
                          : null}
                      </SelectMenu>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <DatePicker
                        name="startdate"
                        value={values.startdate}
                        label="Start Date *"
                        onChange={date => setFieldValue('startdate', date)}
                      />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6}>
                      <DatePicker
                        name="enddate"
                        value={values.enddate}
                        label="End Date *"
                        onChange={date => {
                          setFieldValue('enddate', date)
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <SelectMenu
                        name="functional_manager"
                        onChange={handleChange}
                        disabledName="None"
                        label={'Reporting Manager *'}
                        value={values.functional_manager}
                      >
                        {managers
                          ? managers.map(item => {
                              return (
                                <MenuItem value={item._id}>
                                  {item.firstname + ' ' + item.lastname}
                                </MenuItem>
                              )
                            })
                          : null}
                      </SelectMenu>
                    </GridItem>
                  </GridContainer>
                </CardBody>

                <CardFooter>
                  {projectToUpdate ? (
                    <>
                      <GridItem xs={12} sm={12} md={6}>
                        {/* To do remove update code */}
                        <Button
                          id="update"
                          type="submit"
                          color="primary"
                          disabled={isSubmitting}
                        >
                          UPDATE PROJECT ALLOCATION
                        </Button>
                        <Button
                          color="primary"
                          disabled={isSubmitting}
                          onClick={handleProjectListView}
                        >
                          cancel
                        </Button>
                      </GridItem>
                    </>
                  ) : (
                    <>
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
                          color="primary"
                          disabled={isSubmitting}
                          onClick={() => setPageView('projectListing')}
                        >
                          cancel
                        </Button>
                      </GridItem>
                    </>
                  )}
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
