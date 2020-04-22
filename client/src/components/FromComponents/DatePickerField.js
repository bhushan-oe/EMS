import DatePicker from './DatePicker'
import React from 'react'
import GridItem from '../Grid/GridItem'

const DatePickerFields = ({ inputList = [], values, handleChange }) => {
  return (
    <>
      {inputList.length > 0 &&
        inputList.map(inputData => {
          const { name, label, md } = inputData
          const value = values[name]
          return (
            <GridItem key={`input${name}`} xs={12} sm={12} md={md}>
              <DatePicker
                name={name}
                value={value}
                label={label}
                onChange={date => {
                  handleChange(name, date)
                }}
              />
            </GridItem>
          )
        })}
    </>
  )
}

export default DatePickerFields
