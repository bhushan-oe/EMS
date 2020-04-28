import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import Button from '../../../components/CustomButtons/Button'
import styles from '../../../assets/jss/material-dashboard-react/components/tableStyle'

const useStyles = makeStyles(styles)

export const EmployeeListTable = props => {
  const classes = useStyles()
  const {
    tableHead,
    tableData,
    tableHeaderColor,
    updateUser,
    deleteUser
  } = props

  return (
    <div className={classes.tableResponsive}>
      {tableHead !== undefined && tableData ? (
        <Table className={classes.table}>
          <TableHead className={classes[`${tableHeaderColor}TableHeader`]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((heading, key) => (
                <TableCell
                  className={`${classes.tableCell} ${classes.tableHeadCell}`}
                  key={`${key}cell`}
                >
                  {heading}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((emplpoyee, k) => {
              return (
                <TableRow key={k} className={classes.tableBodyRow}>
                  <TableCell className={classes.tableCell}>
                    {emplpoyee.employee_id}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {emplpoyee.name}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {emplpoyee.designation}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {emplpoyee.contact_no}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {emplpoyee.email}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {emplpoyee.managerName}
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    key={`${k}updateDelete`}
                  >
                    <Button
                      color="primary"
                      size="sm"
                      className={classes.links}
                      onClick={e => updateUser(emplpoyee.employee_id)}
                      disabled={emplpoyee.status === 'Inactive'}
                    >
                      Edit
                    </Button>
                    <Button
                      color="white"
                      size="sm"
                      className={classes.links}
                      onClick={e => deleteUser(emplpoyee.employee_id)}
                      disabled={emplpoyee.status === 'Inactive'}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      ) : null}
    </div>
  )
}

EmployeeListTable.propTypes = {
  tableHeaderColor: String,
  tableData: Array,
  updateUser: Function,
  deleteUser: Function,
  tableHead: Array
}

export default EmployeeListTable
