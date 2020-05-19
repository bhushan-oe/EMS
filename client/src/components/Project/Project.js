import React, { useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridContainer from '../Grid/GridContainer'
import GridItem from '../Grid/GridItem'
import Card from '../Card/Card'
import CardHeader from '../Card/CardHeader'
import CardBody from '../Card/CardBody'
import CardFooter from '../Card/CardFooter'
import Button from '../CustomButtons/Button'
import 'date-fns'
import {
  creatNewProjectValidations,
  projectInputList,
  projectDatePickerList
} from './projectFormData'
import DatePickerFields from '../FromComponents/DatePickerField'
import InputFields from '../FromComponents/InputFields'
import { useToasts } from 'react-toast-notifications'
import { Formik, Form } from 'formik'
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
import { useSelector, useDispatch } from 'react-redux'
import {
  addNewProject,
  clearProjectMsg,
  updateProject
} from '../../actions/projectAction'
import {
  addProjectError,
  addNewProjectStatusMsg,
  updateProjectStatusMsg,
  updateProjectErrorMsg
} from '../../selectors/projectSelectors'

const useStyles = makeStyles(styles)
const Project = props => {
  const { setPageView, projectToUpdate } = props
  const classes = useStyles()
  const { cardTitleWhite } = classes
  const { addToast } = useToasts()
  const dispatch = useDispatch()

  const error = useSelector(addProjectError)
  const addNewProjectStatus = useSelector(addNewProjectStatusMsg)
  const updateProjectStatus = useSelector(updateProjectStatusMsg)
  const updateProjectError = useSelector(updateProjectErrorMsg)

  const projectForm = useRef(null)

  useEffect(() => {
    if (addNewProjectStatus) {
      addToast(addNewProjectStatus, {
        appearance: 'success',
        autoDismiss: true
      })
      projectForm.current.reset()
      dispatch(clearProjectMsg())
      setPageView('projectListing')
    }
  }, [addNewProjectStatus, addToast, dispatch, setPageView])

  useEffect(() => {
    if (updateProjectStatus) {
      addToast(updateProjectStatus, {
        appearance: 'success',
        autoDismiss: true
      })
      projectForm.current.reset()
      dispatch(clearProjectMsg())
      if (props) props.setUpdateAction()
    }
  }, [updateProjectStatus, addToast, dispatch, props])

  useEffect(() => {
    if (error) {
      addToast(error, { appearance: 'error', autoDismiss: true })
      dispatch(clearProjectMsg())
    }
  }, [error, addToast, dispatch])

  useEffect(() => {
    if (updateProjectError) {
      addToast(updateProjectError, { appearance: 'error', autoDismiss: true })
      dispatch(clearProjectMsg())
    }
  }, [updateProjectError, addToast, dispatch])

  const submitFormValues = values => {
    dispatch(
      projectToUpdate
        ? updateProject(values, projectToUpdate[0]._id)
        : addNewProject(values)
    )
  }

  let initialValues
  const {
    title,
    description,
    client,
    client_location,
    startdate = new Date(),
    enddate = new Date(),
    status = 'Active',
    technology,
    type
  } = projectToUpdate ? projectToUpdate[0] : {}

  initialValues = {
    title,
    description,
    client,
    client_location,
    startdate,
    enddate,
    status,
    technology,
    type
  }

  const handleProjectListView = () => {
    props.setUpdateAction()
  }

  const projectDataValidation = creatNewProjectValidations

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
                  <h4 className={cardTitleWhite}>
                    {projectToUpdate ? 'UPDATE PROJECT' : 'ADD PROJECT'}
                  </h4>
                </CardHeader>

                <CardBody>
                  <GridContainer>
                    <InputFields
                      inputList={projectInputList}
                      values={values}
                      handleChange={handleChange}
                    />
                    <DatePickerFields
                      inputList={projectDatePickerList}
                      values={values}
                      handleChange={setFieldValue}
                    />
                  </GridContainer>
                </CardBody>

                <CardFooter>
                  {projectToUpdate ? (
                    <>
                      <GridItem xs={12} sm={12} md={6}>
                        <Button
                          id="update"
                          type="submit"
                          color="primary"
                          disabled={isSubmitting}
                        >
                          UPDATE PROJECT
                        </Button>
                        <Button
                          color="white"
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
                          ADD PROJECT
                        </Button>
                        <Button
                          color="white"
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
