import React, { useEffect } from 'react'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import { compose } from 'redux'
import { withToastManager, useToasts } from 'react-toast-notifications'
import { loadAllProjects } from '../../actions/projectAction'
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import withAuth from '../../HOC/withAuth'
import {
  createPeerReview,
  updatePeerReview,
  setPeerReviewSuccess,
  setUpdateReviewStatus,
  setUpdateReviewError
} from '../../actions/peerReviewAction'
import { loadAllEmployeeData, loadManagers } from '../../actions/employeeAction'
// core components
import checkboxAdnRadioStyle from '../../assets/jss/material-dashboard-react/checkboxAdnRadioStyle'
import createPeerFormStyle from '../../assets/jss/material-dashboard-react/components/createPeerFormStyle'
import Grid from '@material-ui/core/Grid'
import CustomInput from '../CustomInput/CustomInput'
import Button from '../CustomButtons/Button'
import DatePicker from '../FromComponents/DatePicker'
import SelectMenu from '../FromComponents/SelectMenu'
import Card from '../Card/Card'
import CardHeader from '../Card/CardHeader'
import MenuItem from '@material-ui/core/MenuItem'
import CardBody from '../Card/CardBody'
import CardFooter from '../Card/CardFooter'
import validationSchema from './validationSchema'
import { useSelector, useDispatch } from 'react-redux'
import {
  employeeDataSelector,
  managerDataSelector
} from '../../selectors/employeeSelectors'
import { projectSelector } from '../../selectors/projectSelectors'
import {
  peerReviewUpdateStatusSelector,
  peerReviewMessageSelector,
  peerReviewUpdateErrorSelector
} from '../../selectors/reviewSelectors'
const styles = {
  ...checkboxAdnRadioStyle,
  ...createPeerFormStyle
}

const useStyles = makeStyles(styles)

const PeerReviewForm = ({ peerReviewInfo, detailsSwitchHandler }) => {
  const classes = useStyles()
  const { addToast } = useToasts()
  const {
    employee_under_review,
    employee_reviewing,
    project,
    functional_manager,
    from_date,
    to_date,
    due_from,
    due_to,
    review_form_link
  } = peerReviewInfo || {}
  const initialValues = peerReviewInfo => {
    return {
      employee_under_review: peerReviewInfo ? employee_under_review._id : '',
      employee_reviewing: peerReviewInfo ? employee_reviewing._id : [],
      project: peerReviewInfo ? project._id : '',
      functional_manager: peerReviewInfo ? functional_manager._id : '',
      from_date: peerReviewInfo ? from_date : new Date(),
      to_date: peerReviewInfo ? to_date : new Date(),
      due_from: peerReviewInfo ? due_from : new Date(),
      due_to: peerReviewInfo ? due_to : new Date(),
      review_form_link: peerReviewInfo ? review_form_link : ''
    }
  }
  const employeeData = useSelector(employeeDataSelector)
  const managers = useSelector(managerDataSelector)
  const projects = useSelector(projectSelector)
  const peerReviewStatusMessage = useSelector(peerReviewMessageSelector)
  const peerReviewUpdateStatus = useSelector(peerReviewUpdateStatusSelector)
  const peerReviewUpdateError = useSelector(peerReviewUpdateErrorSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadAllProjects())
    dispatch(loadAllEmployeeData())
    dispatch(loadManagers())
  }, [dispatch])
  useEffect(() => {
    if (peerReviewStatusMessage) {
      if (peerReviewStatusMessage.status === 200) {
        addToast('Peer Review successfully added', {
          appearance: 'success',
          autoDismiss: true
        })
        detailsSwitchHandler()
      } else {
        addToast('Error while saving form', {
          appearance: 'error',
          autoDismiss: true
        })
      }
      dispatch(setPeerReviewSuccess(''))
    }
  }, [peerReviewStatusMessage, addToast, dispatch, detailsSwitchHandler])
  useEffect(() => {
    if (peerReviewUpdateStatus) {
      if (peerReviewUpdateStatus.status === 200) {
        addToast('Peer Review successfully updated', {
          appearance: 'success',
          autoDismiss: true
        })
        detailsSwitchHandler()
      } else {
        addToast('Error while saving form', {
          appearance: 'error',
          autoDismiss: true
        })
      }
      dispatch(setUpdateReviewStatus(''))
    }
  }, [peerReviewUpdateStatus, addToast, dispatch, detailsSwitchHandler])

  useEffect(() => {
    if (peerReviewUpdateError) {
      addToast('Error while saving form', {
        appearance: 'error',
        autoDismiss: true
      })
      dispatch(setUpdateReviewError())
    }
  }, [peerReviewUpdateError, addToast, dispatch])
  const submitReview = values => {
    if (peerReviewInfo) {
      dispatch(updatePeerReview(peerReviewInfo._id, values))
    } else {
      dispatch(createPeerReview(values))
    }
  }
  return (
    <Grid>
      <Formik
        initialValues={initialValues(peerReviewInfo)}
        onSubmit={(values, { setSubmitting }) => {
          submitReview(values)
          setSubmitting(false)
        }}
        validationSchema={Yup.object(validationSchema)}
      >
        {({ isSubmitting, values, setFieldValue, handleChange }) => (
          <Card>
            <Form>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>CREATE PEER FORM</h4>
              </CardHeader>
              <CardBody>
                <Grid className={classes.container} container>
                  <Grid xs={6} sm={6} md={3} className={classes.grid} item>
                    Employee Under Review *
                  </Grid>
                  <Grid xs={6} sm={6} md={3} item>
                    <SelectMenu
                      name="employee_under_review"
                      onChange={handleChange}
                      disabledName="Select Employee"
                      value={values.employee_under_review}
                    >
                      {employeeData
                        ? employeeData.map((prop, key) => {
                          return prop.status !== 'Inactive' ? (
                            <MenuItem
                              className={classes.hoverEffect}
                              value={prop._id}
                              key={key}
                            >
                              {prop.firstname} {prop.lastname}
                            </MenuItem>
                          ) : null
                        })
                        : null}
                    </SelectMenu>
                  </Grid>
                  <Grid xs={6} sm={6} md={3} className={classes.grid} item>
                    Employee Reviewing *
                  </Grid>
                  <Grid xs={6} sm={6} md={3} item>
                    <SelectMenu
                      name="employee_reviewing"
                      onChange={handleChange}
                      disabledName="Select Employee"
                      value={values.employee_reviewing}
                      multiple={!peerReviewInfo}
                    >
                      {employeeData
                        ? employeeData.map((prop, key) => {
                          return prop.status !== 'Inactive' ? (
                            <MenuItem
                              className={classes.hoverEffect}
                              value={prop._id}
                              key={key}
                            >
                              {prop.firstname} {prop.lastname}
                            </MenuItem>
                          ) : null
                        })
                        : null}
                    </SelectMenu>
                  </Grid>
                </Grid>
                <Grid className={classes.container} container>
                  <Grid xs={6} sm={6} md={3} className={classes.grid} item>
                    Project *
                  </Grid>
                  <Grid xs={6} sm={6} md={3} item>
                    <SelectMenu
                      name="project"
                      onChange={handleChange}
                      disabledName="Select Project"
                      value={values.project}
                    >
                      {projects
                        ? projects.map((prop, key) => {
                          return (
                            <MenuItem
                              className={classes.hoverEffect}
                              value={prop._id}
                              key={key}
                            >
                              {prop.title}
                            </MenuItem>
                          )
                        })
                        : null}
                    </SelectMenu>
                  </Grid>
                  <Grid xs={6} sm={6} md={3} className={classes.grid} item>
                    Functional Manager *
                  </Grid>
                  <Grid xs={6} sm={6} md={3} item>
                    <SelectMenu
                      name="functional_manager"
                      onChange={handleChange}
                      disabledName="Select Manager"
                      value={values.functional_manager}
                    >
                      {managers
                        ? managers.map(item => {
                          return (
                            <MenuItem
                              value={item._id}
                              className={classes.hoverEffect}
                            >
                              {item.firstname} {item.lastname}
                            </MenuItem>
                          )
                        })
                        : null}
                    </SelectMenu>
                  </Grid>
                </Grid>
                <Grid className={classes.container} container>
                  <Grid xs={6} sm={6} md={3} className={classes.grid} item>
                    Review From Date *
                  </Grid>
                  <Grid xs={6} sm={6} md={3}>
                    <DatePicker
                      name="from_date"
                      value={values.from_date}
                      onChange={date => setFieldValue('from_date', date)}
                    />
                  </Grid>
                  <Grid xs={6} sm={6} md={3} className={classes.grid} item>
                    Review To Date *
                  </Grid>
                  <Grid xs={6} sm={6} md={3} item>
                    <DatePicker
                      name="to_date"
                      value={values.to_date}
                      onChange={date => setFieldValue('to_date', date)}
                    />
                  </Grid>
                </Grid>
                <Grid className={classes.container} container>
                  <Grid xs={6} sm={6} md={3} className={classes.grid} item>
                    Due From Date *
                  </Grid>
                  <Grid xs={6} sm={6} md={3} item>
                    <DatePicker
                      name="due_from"
                      value={values.due_from}
                      onChange={date => setFieldValue('due_from', date)}
                    />
                  </Grid>
                  <Grid xs={6} sm={6} md={3} className={classes.grid} item>
                    Due To Date *
                  </Grid>
                  <Grid xs={6} sm={6} md={3} item>
                    <DatePicker
                      name="due_to"
                      value={values.due_to}
                      onChange={date => setFieldValue('due_to', date)}
                    />
                  </Grid>
                </Grid>
                <Grid className={classes.container} container>
                  <Grid xs={6} sm={6} md={3} className={classes.grid} item>
                    Google Form Link *
                  </Grid>
                  <Grid xs={6} sm={6} md={3} item>
                    <CustomInput
                      labelText="Link"
                      id="review_form_link"
                      formControlProps={{
                        fullWidth: true,
                        className: classes.marginTop
                      }}
                      inputProps={{
                        value: values.review_form_link,
                        name: 'review_form_link',
                        onChange: handleChange
                      }}
                    ></CustomInput>
                    <ErrorMessage
                      className={classes.colorRed}
                      name="review_form_link"
                      component="div"
                    />
                  </Grid>
                </Grid>
              </CardBody>
              <CardFooter className={classes.footerDisplay}>
                {peerReviewInfo ? (
                  <Button type="submit" color="primary" disabled={isSubmitting}>
                    UPDATE PEER REVIEW
                  </Button>
                ) : (
                    <Button type="submit" color="primary" disabled={isSubmitting}>
                      CREATE PEER REVIEW
                    </Button>
                  )}
                <Button type="submit" color="white" onClick={detailsSwitchHandler}>
                  Close
                </Button>
              </CardFooter>
            </Form>
          </Card>
        )}
      </Formik>
    </Grid>
  )
}
const peerReviewFormWithHOC = compose(
  withToastManager,
  withAuth
)(PeerReviewForm)
export default peerReviewFormWithHOC
