import React, { useEffect, useState } from 'react'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import { compose } from 'redux'
import { withToastManager, useToasts } from 'react-toast-notifications'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { loadAllProjects } from '../../actions/projectAction'
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import withAuth from '../../HOC/withAuth'
import {
  createSelfReview,
  setSelfReviewSuccess,
  setSelfReviewError,
  updateSelfReview,
  setUpdateReviewStatus,
  setUpdateReviewError
} from '../../actions/selfReviewActions'
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
import Check from '@material-ui/icons/Check'
import { useSelector, useDispatch } from 'react-redux'
import {
  employeeDataSelector,
  managerDataSelector
} from '../../selectors/employeeSelectors'
import { projectSelector } from '../../selectors/projectSelectors'
import {
  selfReviewCreateSuccessSelector,
  selfReviewCreateErrorSelector,
  selfReviewUpdateSelector,
  selfReviewUpdateErrorSelector
} from '../../selectors/reviewSelectors'
const styles = {
  ...checkboxAdnRadioStyle,
  ...createPeerFormStyle
}

const useStyles = makeStyles(styles)

const SelfReviewForm = ({ selfReviewInfo, detailsSwitchHandler }) => {
  const classes = useStyles()
  const {
    cardTitleWhite,
    container,
    grid,
    hoverEffect,
    footerDisplay,
    marginTop,
    colorRed
  } = classes
  const { addToast } = useToasts()
  const { employee, from_date, to_date, due_from, due_to, review_form_link } =
    selfReviewInfo || {}
  const initialValues = selfReviewInfo => {
    return {
      employee: [],
      from_date: selfReviewInfo ? from_date : new Date(),
      to_date: selfReviewInfo ? to_date : new Date(),
      due_from: selfReviewInfo ? due_from : new Date(),
      due_to: selfReviewInfo ? due_to : new Date(),
      review_form_link: selfReviewInfo ? review_form_link : ''
    }
  }
  const [selectedStatus, setSelectedStatus] = useState(false)
  let employeeData = useSelector(employeeDataSelector)
  const selfReviewSuccessMessage = useSelector(selfReviewCreateSuccessSelector)
  const selfReviewErrorMessage = useSelector(selfReviewCreateErrorSelector)
  const selfReviewUpdateStatus = useSelector(selfReviewUpdateSelector)
  const selfReviewUpdateError = useSelector(selfReviewUpdateErrorSelector)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadAllEmployeeData())
  }, [dispatch])
  useEffect(() => {
    if (selfReviewSuccessMessage) {
      addToast(selfReviewSuccessMessage, {
        appearance: 'success',
        autoDismiss: true
      })
      dispatch(setSelfReviewSuccess(''))
      detailsSwitchHandler()
    }
  }, [selfReviewSuccessMessage, addToast, dispatch, detailsSwitchHandler])

  useEffect(() => {
    if (selfReviewErrorMessage) {
      addToast(selfReviewErrorMessage, {
        appearance: 'error',
        autoDismiss: true
      })
      dispatch(setSelfReviewError(''))
    }
  }, [selfReviewErrorMessage, addToast, dispatch, detailsSwitchHandler])

  useEffect(() => {
    if (selfReviewUpdateStatus) {
      addToast(selfReviewUpdateStatus, {
        appearance: 'success',
        autoDismiss: true
      })
      detailsSwitchHandler()
      dispatch(setUpdateReviewStatus(''))
    }
  }, [selfReviewUpdateStatus, addToast, dispatch, detailsSwitchHandler])

  useEffect(() => {
    if (selfReviewUpdateError) {
      addToast(selfReviewUpdateError, {
        appearance: 'error',
        autoDismiss: true
      })
      dispatch(setUpdateReviewError(''))
    }
  }, [selfReviewUpdateError, addToast, dispatch])
  const changeHandler = e => {
    setSelectedStatus(e.target.checked ? true : false)
  }

  const submitReview = values => {
    if (selfReviewInfo) {
      let { due_from, due_to, from_date, review_form_link, to_date } = values

      const data = {
        due_from,
        due_to,
        from_date,
        review_form_link,
        to_date
      }
      dispatch(updateSelfReview(selfReviewInfo._id, data))
    } else {
      let {
        due_from,
        due_to,
        employee,
        from_date,
        review_form_link,
        to_date
      } = values

      if (selectedStatus) {
        if (employeeData)
          employeeData = employeeData.filter(emp => emp.status != 'Inactive')
        employee = employeeData.map(emp => {
          return emp._id
        })
      }

      const data = {
        due_from,
        due_to,
        employee,
        from_date,
        review_form_link,
        to_date
      }
      dispatch(createSelfReview(data))
    }
  }
  return (
    <Grid>
      <Formik
        initialValues={initialValues(selfReviewInfo)}
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
                <h4 className={cardTitleWhite}>
                  {selfReviewInfo ? 'UPDATE SELF REVIEW' : 'CREATE SELF REVIEW'}
                </h4>
              </CardHeader>
              <CardBody>
                <Grid className={container} container></Grid>
                <Grid className={container} container>
                  <Grid xs={6} sm={6} md={3} className={grid} item>
                    <p>Review From Date *</p>
                  </Grid>
                  <Grid xs={6} sm={6} md={3}>
                    <DatePicker
                      name="from_date"
                      value={values.from_date}
                      onChange={date => setFieldValue('from_date', date)}
                    />
                  </Grid>
                  <Grid xs={6} sm={6} md={3} className={grid} item>
                    <p>Review To Date *</p>
                  </Grid>
                  <Grid xs={6} sm={6} md={3} item>
                    <DatePicker
                      name="to_date"
                      value={values.to_date}
                      onChange={date => setFieldValue('to_date', date)}
                    />
                  </Grid>
                </Grid>
                <Grid className={container} container>
                  <Grid xs={6} sm={6} md={3} className={grid} item>
                    <p>Due From Date *</p>
                  </Grid>
                  <Grid xs={6} sm={6} md={3} item>
                    <DatePicker
                      name="due_from"
                      value={values.due_from}
                      onChange={date => setFieldValue('due_from', date)}
                    />
                  </Grid>
                  <Grid xs={6} sm={6} md={3} className={grid} item>
                    <p>Due To Date *</p>
                  </Grid>
                  <Grid xs={6} sm={6} md={3} item>
                    <DatePicker
                      name="due_to"
                      value={values.due_to}
                      onChange={date => setFieldValue('due_to', date)}
                    />
                  </Grid>
                </Grid>
                <Grid className={container} container>
                  <Grid xs={6} sm={6} md={3} className={grid} item>
                    <p>Google Form Link *</p>
                  </Grid>
                  <Grid xs={6} sm={6} md={3} item>
                    <CustomInput
                      labelText="Link"
                      id="review_form_link"
                      formControlProps={{
                        fullWidth: true,
                        className: marginTop
                      }}
                      inputProps={{
                        value: values.review_form_link,
                        name: 'review_form_link',
                        onChange: handleChange
                      }}
                    ></CustomInput>
                    <ErrorMessage
                      className={colorRed}
                      name="review_form_link"
                      component="div"
                    />
                  </Grid>
                  {selfReviewInfo ? null : (
                    <>
                      {selectedStatus ? null : (
                        <>
                          <Grid xs={6} sm={6} md={3} className={grid} item>
                            <p>Employee </p>
                          </Grid>
                          <Grid xs={6} sm={6} md={3} item>
                            <SelectMenu
                              label="Select Employees"
                              name="employee"
                              onChange={handleChange}
                              disabledName="Select Employee"
                              value={values.employee}
                              multiple
                            >
                              {employeeData &&
                                employeeData.map((prop, key) => {
                                  return (
                                    prop.status !== 'Inactive' && (
                                      <MenuItem
                                        className={hoverEffect}
                                        value={prop._id}
                                        key={key}
                                      >
                                        {prop.firstname} {prop.lastname}
                                      </MenuItem>
                                    )
                                  )
                                })}
                            </SelectMenu>
                          </Grid>
                        </>
                      )}

                      <Grid xs={12} sm={12} md={12} item>
                        <Grid xs={6} sm={6} md={6} className={grid} item>
                          <div>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={changeHandler}
                                  checkedIcon={
                                    <Check className={classes.checkedIcon} />
                                  }
                                  icon={
                                    <Check className={classes.uncheckedIcon} />
                                  }
                                  classes={{
                                    checked: classes.checked,
                                    root: classes.root
                                  }}
                                />
                              }
                              label={' Create Review For All Employees'}
                            />
                          </div>
                        </Grid>
                      </Grid>
                    </>
                  )}
                </Grid>
              </CardBody>
              <CardFooter className={footerDisplay}>
                {selfReviewInfo ? (
                  <Button type="submit" color="primary" disabled={isSubmitting}>
                    UPDATE SELF REVIEW
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    color="primary"
                    disabled={isSubmitting}
                    disabled={
                      selectedStatus || values.employee.length > 0
                        ? null
                        : 'disabled'
                    }
                  >
                    CREATE SELF REVIEW
                  </Button>
                )}
                <Button
                  type="submit"
                  color="white"
                  onClick={detailsSwitchHandler}
                >
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
const selfReviewFormWithHOC = compose(
  withToastManager,
  withAuth
)(SelfReviewForm)
export default selfReviewFormWithHOC
