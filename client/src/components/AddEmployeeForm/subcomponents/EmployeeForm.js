import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridContainer from '../../Grid/GridContainer'
import GridItem from '../../Grid/GridItem'
import Card from '../../Card/Card'
import CardHeader from '../../Card/CardHeader'
import CardBody from '../../Card/CardBody'
import CardFooter from '../../Card/CardFooter'
import Button from '../../CustomButtons/Button'
import { employeeStyles } from '../Styles'
import MenuItem from '@material-ui/core/MenuItem'
import { Form } from 'formik'
import SelectMenu from '../../FromComponents/SelectMenu'
import SelectFields from './SelectFields'
import { countryData } from '../../../constants'
import InputFields from '../../FromComponents/InputFields'
import {
  onlyAddEmployeeInputList,
  commonInputList1,
  commonInputList2,
  commonInputList3,
  selectMenuList,
  employeeDatePickerList
} from '../EmployeeFormValues'
import DatePickerFields from '../../FromComponents/DatePickerField'
const styles = employeeStyles
const useStyles = makeStyles(styles)

const EmployeeForm = ({
  userForm,
  userToUpdate,
  formHandlerData,
  handleSeachView,
  managers,
  getStates
}) => {
  const classes = useStyles()
  const { cardTitleWhite } = classes
  const { isSubmitting, values, setFieldValue, handleChange } = formHandlerData
  const {
    state,
    country,
    dateofbirth,
    dateofjoining,
    designation,
    reporting_manager
  } = values

  return (
    <>
      <GridItem xs={12} sm={12} md={12}>
        <Card id="add_new_employee">
          <Form ref={userForm}>
            <CardHeader color="primary">
              <h4 className={cardTitleWhite}>
                {userToUpdate ? 'UPDATE EMPLOYEE' : 'ADD EMPLOYEE '}
              </h4>
            </CardHeader>

            <CardBody>
              <GridContainer>
                {userToUpdate ? null : (
                  <>
                    <InputFields
                      inputList={onlyAddEmployeeInputList}
                      values={values}
                      handleChange={handleChange}
                    />
                  </>
                )}
                <InputFields
                  inputList={commonInputList1}
                  values={values}
                  handleChange={handleChange}
                />

                <GridItem xs={12} sm={12} md={4}>
                  <SelectMenu
                    name="country"
                    onChange={handleChange}
                    disabledName="None"
                    label="Country *"
                    onBlur={e => {
                      setFieldValue('state', '')
                    }}
                    value={country}
                  >
                    {countryData.map((item, key) => {
                      return (
                        <MenuItem key={`country${key}`} value={item.country}>
                          {item.name}
                        </MenuItem>
                      )
                    })}
                  </SelectMenu>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <SelectMenu
                    name="state"
                    onChange={handleChange}
                    disabledName="None"
                    label="State *"
                    value={state}
                  >
                    {countryData.map(item => {
                      if (country && item.country === country) {
                        return getStates(country).map((item, key) => {
                          if (item) {
                            return (
                              <MenuItem key={`state${key}`} value={item.code}>
                                {item.name}
                              </MenuItem>
                            )
                          }
                        })
                      }
                    })}
                  </SelectMenu>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}></GridItem>
                <InputFields
                  inputList={commonInputList2}
                  values={values}
                  handleChange={handleChange}
                />
                <DatePickerFields
                  inputList={employeeDatePickerList}
                  values={values}
                  handleChange={setFieldValue}
                />
                <SelectFields
                  selectList={selectMenuList}
                  handleChange={handleChange}
                  values={values}
                />
                <GridItem xs={12} sm={12} md={6}>
                  <SelectMenu
                    name="reporting_manager"
                    onChange={handleChange}
                    disabledName="None"
                    label={
                      designation === 'Partner' ||
                      designation === 'Chief Executive Officer'
                        ? 'Reporting Manager'
                        : 'Reporting Manager *'
                    }
                    value={reporting_manager}
                  >
                    {managers &&
                      managers.map((item, key) => {
                        const { employee_id, firstname, lastname } = item
                        return (
                          <MenuItem key={`manager${key}`} value={employee_id}>
                            {`${firstname} ${lastname}`}
                          </MenuItem>
                        )
                      })}
                  </SelectMenu>
                </GridItem>
                <InputFields
                  inputList={commonInputList3}
                  values={values}
                  handleChange={handleChange}
                />
              </GridContainer>
            </CardBody>
            <CardFooter>
              {userToUpdate ? (
                <>
                  <GridItem xs={12} sm={12} md={6}>
                    <Button
                      id="update"
                      type="submit"
                      color="primary"
                      disabled={isSubmitting}
                    >
                      UPDATE EMPLOYEE
                    </Button>
                    <Button
                      color="white"
                      disabled={isSubmitting}
                      onClick={handleSeachView}
                    >
                      cancel
                    </Button>
                  </GridItem>
                </>
              ) : (
                <Button
                  id="add"
                  type="submit"
                  color="primary"
                  disabled={isSubmitting}
                >
                  ADD EMPLOYEE
                </Button>
              )}
            </CardFooter>
          </Form>
        </Card>
      </GridItem>
    </>
  )
}
export default EmployeeForm
