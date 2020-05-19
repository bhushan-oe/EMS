import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withToastManager, useToasts } from 'react-toast-notifications'
import { makeStyles } from '@material-ui/core/styles'
import { loginToSite, clearErrors } from '../../actions/loginAction'
import GridItem from '../Grid/GridItem'
import GridContainer from '../Grid/GridContainer'
import Button from '../CustomButtons/Button'
import Card from '../Card/Card'
import CardHeader from '../Card/CardHeader'
import CardBody from '../Card/CardBody'
import CardFooter from '../Card/CardFooter'
import './Login.css'
import { Redirect } from 'react-router-dom'
import Input from '../FromComponents/Input'
import interceptors from '../../helpers/interceptors'
import { yupRequired } from '../../helpers/yupValidations'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { loginError, currentUser } from '../../selectors/loginSelectors'
const styles = {
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

const Login = props => {
  const userForm = useRef(null)
  const { addToast } = useToasts()
  const [redirect, setRedirect] = useState(false)
  const dispatch = useDispatch()
  const userInfo = useSelector(currentUser)
  const error = useSelector(loginError)

  useEffect(() => {
    if (userInfo) {
      interceptors()
      userForm.current.reset()
      setRedirect(true)
    }
  }, [userInfo])

  useEffect(() => {
    if (error) {
      addToast(error, { appearance: 'error', autoDismiss: true })
      dispatch(clearErrors())
    }
  }, [error, addToast, dispatch])

  const classes = useStyles()
  const initialValues = {
    username: '',
    password: ''
  }

  const userDataValidation = Yup.object().shape({
    username: yupRequired('UserName/ Email').min(
      8,
      'UserName/ Email must be at least 8 characters long!'
    ),
    password: yupRequired('Password').min(
      8,
      'Password must be at least 8 characters long!'
    )
  })
  const submitFormValues = values => {
    dispatch(loginToSite(values))
  }

  return (
    <div className="loginForm">
      {redirect ? <Redirect from="/login" to="/admin/dashboard" /> : false}
      <GridContainer>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            submitFormValues(values)
            setSubmitting(false)
          }}
          validationSchema={userDataValidation}
        >
          {({ isSubmitting, values, setFieldValue, handleChange }) => (
            <GridItem xs={11} sm={8} md={5}>
              <Card>
                <Form ref={userForm}>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Login Form</h4>
                  </CardHeader>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <Input
                          name="username"
                          value={values.username}
                          onChange={handleChange}
                          labelText="Username/ Email * "
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <Input
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          labelText="Password * "
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
                      Login
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

export default withToastManager(Login)
