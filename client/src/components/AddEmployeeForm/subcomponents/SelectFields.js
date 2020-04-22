import React from 'react'
import GridItem from '../../Grid/GridItem'
import MenuItem from '@material-ui/core/MenuItem'
import SelectMenu from '../../FromComponents/SelectMenu'
import { employeeStyles } from '../Styles'
import { makeStyles } from '@material-ui/core/styles'

const styles = employeeStyles
const useStyles = makeStyles(styles)

const SelectFields = ({ selectList = [], values, handleChange }) => {
  const classes = useStyles()
  const { textCapitalize } = classes

  return (
    <>
      {selectList.length > 0 &&
        selectList.map(selectData => {
          const { name, labelText, md, menuItems } = selectData
          const value = values[name]

          return (
            <GridItem key={`select${name}`} xs={12} sm={12} md={md}>
              <SelectMenu
                name={name}
                className={textCapitalize}
                onChange={handleChange}
                disabledName="None"
                label={labelText}
                value={value}
              >
                {menuItems.map(item => {
                  return name === 'work_location' || name === 'timezone' ? (
                    <MenuItem
                      className={textCapitalize}
                      key={`menu${item}`}
                      value={item.id}
                    >
                      {item.location}
                    </MenuItem>
                  ) : (
                    <MenuItem
                      className={textCapitalize}
                      key={`menu${item}`}
                      value={item}
                    >
                      {item}
                    </MenuItem>
                  )
                })}
              </SelectMenu>
            </GridItem>
          )
        })}
    </>
  )
}

export default SelectFields
