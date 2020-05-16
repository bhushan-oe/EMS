import React, { useRef, useEffect, useState, useContext } from 'react'
import GridContainer from '../Grid/GridContainer'
import GridItem from '../Grid/GridItem'
import Card from '../Card/Card'
import CardHeader from '../Card/CardHeader'
import CardBody from '../Card/CardBody'
import CardFooter from '../Card/CardFooter'
import Button from '../CustomButtons/Button'
import InputFields from '../FromComponents/InputFields'
import { makeStyles } from '@material-ui/core/styles'
import dashboardStyle from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
import { Formik, Form } from 'formik'
import { UserContext } from '../../context-provider/user-context'
import { useSelector, useDispatch } from 'react-redux'
import MenuItem from '@material-ui/core/MenuItem'
import SelectMenu from '../FromComponents/SelectMenu'
import { managerDataSelector } from '../../selectors/employeeSelectors'
import { leaveTypes } from '../../constants'
import { applyLeaves, clearMessages } from '../../actions/leavesAction'
import { useToasts } from 'react-toast-notifications'
import {
  leavesInitialValues,
  applyLeaveValidations,
  leaveDatePickerList,
  leavesInputList
} from './leaveFormValues'
import {
  applyLeaveStatus,
  applyLeaveError
} from '../../selectors/leavesSelectors'
import { loadManagers } from '../../actions/employeeAction'
import DatePickerFields from '../FromComponents/DatePickerField'

const useStyles = makeStyles(dashboardStyle)

const ApplyLeave = props => {
  const { setLeavesPageView } = props
  const { currentUser } = useContext(UserContext)
  const { addToast } = useToasts()
  const applyLeaveStatusMsg = useSelector(applyLeaveStatus)
  const applyLeaveErrorMsg = useSelector(applyLeaveError)
  const managerdata = useSelector(managerDataSelector)
  const classes = useStyles()
  const leaveForm = useRef(null)
  const dispatch = useDispatch()
  const [managers, setManagers] = useState(null)

  useEffect(() => {
    dispatch(loadManagers())
  }, [dispatch])

  useEffect(() => {
    if (managerdata) {
      setManagers(managerdata)
    }
  }, [managerdata])

  useEffect(() => {
    if (applyLeaveStatusMsg) {
      addToast(applyLeaveStatusMsg, {
        appearance: 'success',
        autoDismiss: true
      })
      leaveForm.current.reset()
      dispatch(clearMessages())
      setLeavesPageView('default')
    }
  }, [applyLeaveStatusMsg, addToast, dispatch])

  useEffect(() => {
    if (applyLeaveErrorMsg) {
      addToast(applyLeaveErrorMsg, { appearance: 'error', autoDismiss: true })
      dispatch(clearMessages())
    }
  }, [applyLeaveErrorMsg, addToast, dispatch])

  const submitFormValues = values => {
    const leaveData = { ...values, ...{ employee: currentUser._id } }
    dispatch(applyLeaves(leaveData))
  }

  return (
    <GridContainer>
      <Formik
        initialValues={leavesInitialValues}
        onSubmit={(values, { setSubmitting }) => {
          submitFormValues(values)
          setSubmitting(false)
        }}
        validationSchema={applyLeaveValidations}
      >
        {({ isSubmitting, values, setFieldValue, handleChange }) => (
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <Form ref={leaveForm}>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>
                    {'LEAVE APPLICATION'}
                  </h4>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <DatePickerFields
                      inputList={leaveDatePickerList}
                      values={values}
                      handleChange={setFieldValue}
                    />
                    <GridItem xs={12} sm={12} md={6}>
                      <SelectMenu
                        name="type"
                        onChange={handleChange}
                        disabledName="None"
                        label={'Type of Leave *'}
                        value={values.type}
                      >
                        {leaveTypes.map((item, key) => {
                          return (
                            <MenuItem key={`type${key}`} value={item}>
                              {item}
                            </MenuItem>
                          )
                        })}
                      </SelectMenu>
                    </GridItem>
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
                    <InputFields
                      inputList={leavesInputList}
                      values={values}
                      handleChange={handleChange}
                    />
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
                      APPLY LEAVE
                    </Button>
                    <Button
                      color="white"
                      disabled={isSubmitting}
                      onClick={() => setLeavesPageView('default')}
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
export default ApplyLeave
