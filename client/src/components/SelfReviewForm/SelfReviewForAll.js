import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { compose } from 'redux'
import { withToastManager, useToasts } from 'react-toast-notifications'
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import withAuth from '../../HOC/withAuth'
import {
  createSelfReviewForAll,
  setSelfReviewAllSuccess,
  setSelfReviewAllError
} from '../../actions/selfReviewActions'
import checkboxAdnRadioStyle from '../../assets/jss/material-dashboard-react/checkboxAdnRadioStyle'
import createPeerFormStyle from '../../assets/jss/material-dashboard-react/components/createPeerFormStyle'
import Grid from '@material-ui/core/Grid'
import CustomInput from '../CustomInput/CustomInput'
import Button from '../CustomButtons/Button'
import DatePicker from '../FromComponents/DatePicker'
import Card from '../Card/Card'
import CardHeader from '../Card/CardHeader'
import CardBody from '../Card/CardBody'
import CardFooter from '../Card/CardFooter'
import {selfReviewAllValidation, initValSelfReviewAll} from './validationSchema'
import { useSelector, useDispatch } from 'react-redux'
import {
  selfReviewCreateAllSuccessSelector,
  selfReviewCreateAllErrorSelector
} from '../../selectors/reviewSelectors'
const styles = {
  ...checkboxAdnRadioStyle,
  ...createPeerFormStyle
}
const useStyles = makeStyles(styles)

const SelfReviewForAll = ({ detailsSwitchHandler }) => {
  const classes = useStyles()
  const {
    cardTitleWhite,
    container,
    grid,
    footerDisplay,
    marginTop,
    colorRed
  } = classes
  const { addToast } = useToasts()

  const initialValues = initValSelfReviewAll

  const selfReviewSuccessMessage = useSelector(selfReviewCreateAllSuccessSelector)
  const selfReviewErrorMessage = useSelector(selfReviewCreateAllErrorSelector)
  const dispatch = useDispatch() 
  useEffect(() => {
    if (selfReviewSuccessMessage) {
      addToast(selfReviewSuccessMessage, {
        appearance: 'success',
        autoDismiss: true
      })
      dispatch(setSelfReviewAllSuccess(''))
      detailsSwitchHandler()
    }
  }, [selfReviewSuccessMessage, addToast, dispatch, detailsSwitchHandler])

  useEffect(() => {
    if (selfReviewErrorMessage) {
      addToast(selfReviewErrorMessage, {
        appearance: 'error',
        autoDismiss: true
      })
      dispatch(setSelfReviewAllError(''))
    }
  }, [selfReviewErrorMessage, addToast, dispatch, detailsSwitchHandler])

  const submitReview = values => {
    dispatch(createSelfReviewForAll(values))
  }
  return (
    <Grid>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          submitReview(values)
          setSubmitting(false)
        }}
        validationSchema={Yup.object(selfReviewAllValidation)}
      >
        {({ isSubmitting, values, setFieldValue, handleChange }) => (
          <Card>
            <Form>
              <CardHeader color="primary">
                <h4 className={cardTitleWhite}>CREATE SELF REVIEW FOR ALL</h4>
              </CardHeader>
              <CardBody>
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
                  <Grid xs={6} sm={6} md={3} className={grid} item>
                    <p>Feedback</p>
                  </Grid>
                  <Grid xs={6} sm={6} md={3} item>
                    <CustomInput
                      labelText="Feedback"
                      id="feedback"
                      formControlProps={{
                        fullWidth: true,
                        className: marginTop
                      }}
                      inputProps={{
                        value: values.review_form_link,
                        name: 'feedback',
                        onChange: handleChange
                      }}
                    ></CustomInput>
                    <ErrorMessage
                      className={colorRed}
                      name="feedback"
                      component="div"
                    />
                  </Grid>
                </Grid>
              </CardBody>
              <CardFooter className={footerDisplay}>
                <Button type="submit" color="primary" disabled={isSubmitting}>
                  CREATE SELF REVIEWS
                </Button>
              
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
)(SelfReviewForAll)
export default selfReviewFormWithHOC
