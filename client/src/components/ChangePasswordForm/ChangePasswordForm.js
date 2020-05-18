import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withToastManager, useToasts } from 'react-toast-notifications'
import { makeStyles } from '@material-ui/core/styles'
import { currentUser } from '../../selectors/loginSelectors'
import checkboxAdnRadioStyle from '../../assets/jss/material-dashboard-react/checkboxAdnRadioStyle'
import GridItem from '../Grid/GridItem'
import GridContainer from '../Grid/GridContainer'
import Button from '../CustomButtons/Button'
import Card from '../Card/Card'
import CardHeader from '../Card/CardHeader'
import CardBody from '../Card/CardBody'
import { clearUserStatus, changePassword } from '../../actions/userActions'
import {
  updateUserStatusSuccess,
  updateUserErrorMsg
} from '../../selectors/employeeSelectors'

import CardFooter from '../Card/CardFooter'
import Input from '../FromComponents/Input'
import { yupRequired } from '../../helpers/yupValidations'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

const styles = {
  ...checkboxAdnRadioStyle,
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0'
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none'
  }
}

const useStyles = makeStyles(styles)

const ChangePasswordForm = ({ handleCloseChangePasswordModal }) => {
  const changePasswordForm = useRef(null)
  const classes = useStyles()
  const dispatch = useDispatch()
  const { addToast } = useToasts()
  const updateUserStatus = useSelector(updateUserStatusSuccess)
  const updateUserError = useSelector(updateUserErrorMsg)
  const userInfo = useSelector(currentUser)
  const initialValues = {
    newPassword: '',
    confirmPassword: ''
  }

  useEffect(() => {
    if (updateUserStatus) {
      addToast(updateUserStatus, {
        appearance: 'success',
        autoDismiss: true
      })
      handleCloseChangePasswordModal()
      dispatch(clearUserStatus())
    }
  }, [updateUserStatus, addToast, dispatch])

  useEffect(() => {
    if (updateUserError) {
      addToast(updateUserError, {
        appearance: 'error',
        autoDismiss: true
      })
      handleCloseChangePasswordModal()
      dispatch(clearUserStatus())
    }
  }, [updateUserError, addToast, dispatch])

  const userDataValidation = Yup.object().shape({
    newPassword: yupRequired('Password').min(
      8,
      'Password must be at least 8 characters long!'
    ),
    confirmPassword: yupRequired('Password')
      .min(8, 'Password must be at least 8 characters long!')
      .test('passwords-match', 'Passwords must match', function(value) {
        return this.parent.newPassword === value
      })
  })
  const submitFormValues = values => {
    const { _id: id } = userInfo
    const { newPassword } = values
    dispatch(changePassword(newPassword, id))
  }

  return (
    <div className="loginForm">
      <GridContainer>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            submitFormValues(values)
            setSubmitting(false)
          }}
          validationSchema={userDataValidation}
        >
          {({ isSubmitting, values, handleChange }) => (
            <GridItem xs={12}>
              <Card>
                <Form ref={changePasswordForm}>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>
                      Change Password Form
                    </h4>
                  </CardHeader>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <Input
                          name="newPassword"
                          value={values.newPassword}
                          onChange={handleChange}
                          labelText="New Password * "
                          type="password"
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <Input
                          name="confirmPassword"
                          value={values.confirmPassword}
                          onChange={handleChange}
                          labelText="Confirm Password * "
                          type="password"
                        />
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                  <CardFooter className="centerButton">
                    <Button
                      type="submit"
                      color="primary"
                      disabled={isSubmitting}
                    >
                      Change Password
                    </Button>
                  </CardFooter>
                </Form>
              </Card>
            </GridItem>
          )}
        </Formik>
      </GridContainer>
    </div>
  )
}

export default withToastManager(ChangePasswordForm)
