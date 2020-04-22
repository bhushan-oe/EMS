import React, { useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridContainer from '../Grid/GridContainer'
import GridItem from '../Grid/GridItem'
import Card from '../Card/Card'
import CardHeader from '../Card/CardHeader'
import CardBody from '../Card/CardBody'
import CardFooter from '../Card/CardFooter'
import Button from '../CustomButtons/Button'
import Input from '../FromComponents/Input'
import 'date-fns'
import { creatNewProjectValidations } from './projectFormData'
import DatePicker from '../../components/FromComponents/DatePicker'
import { useToasts } from 'react-toast-notifications'
import { Formik, Form } from 'formik'
import { projectStyles } from './styles'
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

const styles = projectStyles
const useStyles = makeStyles(styles)
const Project = props => {
  const { setPageView, projectToUpdate } = props
  const classes = useStyles()
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
                  <h4 className={classes.cardTitleWhite}>
                    {projectToUpdate ? 'UPDATE PROJECT' : 'ADD PROJECT'}
                  </h4>
                </CardHeader>

                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <Input
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        labelText="Project Title * "
                      />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6}>
                      <Input
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        labelText="Description * "
                      />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6}>
                      <Input
                        name="client"
                        value={values.client}
                        onChange={handleChange}
                        labelText="Client *"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <Input
                        name="client_location"
                        value={values.client_location}
                        onChange={handleChange}
                        labelText="Client Location * "
                      />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6}>
                      <Input
                        name="technology"
                        value={values.technology}
                        onChange={handleChange}
                        labelText="Technology * "
                      />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6}>
                      <Input
                        name="type"
                        value={values.type}
                        onChange={handleChange}
                        labelText="Project Type * "
                      />
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
                        onChange={date => setFieldValue('enddate', date)}
                      />
                    </GridItem>
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
                          ADD PROJECT
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
