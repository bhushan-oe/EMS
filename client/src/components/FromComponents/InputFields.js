import React from 'react'
import GridItem from '../Grid/GridItem'
import Input from './Input'

const InputFields = ({ inputList = [], values, handleChange }) => {
  return (
    <>
      {inputList.length > 0 &&
        inputList.map(inputData => {
          const { name, labelText, md } = inputData
          const value = values[name]
          const type = name === 'password' ? 'password' : 'text'

          return (
            <GridItem key={`input${name}`} xs={12} sm={12} md={md}>
              <Input
                name={name}
                value={value}
                onChange={handleChange}
                labelText={labelText}
                type={type}
              />
            </GridItem>
          )
        })}
    </>
  )
}

export default InputFields
