import DatePicker from './DatePicker'
import React from 'react'
import GridItem from '../Grid/GridItem'

const DatePickerFields = ({ inputList = [], values, handleChange, form}) => {
  return (
    <>
      {inputList.length > 0 &&
        inputList.map(inputData => {
          const { name, label, md } = inputData
          const value = values[name]
          const handleChanges  = handleChange
          console.log(handleChanges.name,form,  name , value)
          
          return (
            // <GridItem key={`input${name}`} xs={12} sm={12} md={md}>
            //   <Input
            //     name={name}
            //     value={value}
            //     onChange={handleChange}
            //     labelText={labelText}
            //     type={type}
            //   />
            // </GridItem>
           <GridItem key={`input${name}`} xs={12} sm={12} md={md}>
                      <DatePicker
                       name={name}
                       value={value}
                        label={label}
                        // onChange={date => { handleChanges({name}, date) }}
                     />
                    </GridItem>
          )
        })}
    </>
  )
}

export default DatePickerFields
