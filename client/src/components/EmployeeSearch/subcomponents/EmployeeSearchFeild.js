import React from 'react'
import Search from '@material-ui/icons/Search'
import CustomInput from '../../CustomInput/CustomInput'
import Button from '../../CustomButtons/Button'
import GridItem from '../../Grid/GridItem'

const EmployeeSearchFeild = ({ changeHandler, searchHandler }) => {
  return (
    <>
      <GridItem xs={12} sm={12} md={12}>
        <CustomInput
          formControlProps={{}}
          inputProps={{
            onChange: changeHandler,
            placeholder: 'Search Employee',
            inputProps: {
              'aria-label': 'Search'
            }
          }}
        />
        <Button
          color="white"
          aria-label="edit"
          justIcon
          round
          onClick={searchHandler}
        >
          <Search />
        </Button>
      </GridItem>
    </>
  )
}
export default EmployeeSearchFeild
