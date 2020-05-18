import React from 'react'
import PropTypes from 'prop-types'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import { formatDateDDMMYYYY } from '../../helpers/formatDates'
// core components
import Button from '../../components/CustomButtons/Button'
import styles from '../../assets/jss/material-dashboard-react/components/tableStyle'

const useStyles = makeStyles(styles)

export default function CustomTable(props) {
  const classes = useStyles()
  const {
    tableHead,
    tableData,
    tableHeaderColor,
    showLink,
    buttonText,
    detailHandler,
    addLinks,
    updateUser,
    deleteUser,
    allocateProject,
    deallocateProject
  } = props
  return (
    <div className={classes.tableResponsive}>
      {tableHead && tableData ? (
        <Table className={classes.table}>
          {tableHead !== undefined ? (
            <TableHead className={classes[tableHeaderColor + 'TableHeader']}>
              <TableRow className={classes.tableHeadRow}>
                {tableHead.map((prop, key) => {
                  return (
                    <TableCell
                      className={
                        classes.tableCell + ' ' + classes.tableHeadCell
                      }
                      key={key + 'cell'}
                    >
                      {prop}
                    </TableCell>
                  )
                })}
                {showLink || addLinks ? <TableCell /> : null}
              </TableRow>
            </TableHead>
          ) : null}
          <TableBody>
            {tableData.map((prop, k) => {
              return (
                <TableRow key={k} className={classes.tableBodyRow}>
                  {prop.map((prop, key) => {
                    // This is only for deallocation of project where need _id in data but need not to show in UI.
                    if (deallocateProject && key == 5) {
                      return
                    }
                    return (
                      <TableCell className={classes.tableCell} key={key}>
                        {prop}
                      </TableCell>
                    )
                  })}

                  {addLinks ? (
                    <TableCell
                      className={classes.tableCell}
                      key={k + 'updateDelete'}
                    >
                      {addLinks.map(item => {
                        if (item === 'Edit') {
                          return (
                            <Button
                              color="primary"
                              size="sm"
                              className={classes.links}
                              onClick={e => updateUser(prop, k)}
                            >
                              {item}
                            </Button>
                          )
                        } else if (item === 'Delete') {
                          return (
                            <Button
                              color="white"
                              size="sm"
                              className={classes.links}
                              onClick={e => deleteUser(prop, k)}
                            >
                              {item}
                            </Button>
                          )
                        } else if (item === 'Allocations' && allocateProject) {
                          return (
                            <Button
                              color="primary"
                              size="sm"
                              className={classes.links}
                              onClick={e => allocateProject(prop, k)}
                            >
                              {item}
                            </Button>
                          )
                        } else if (item === 'Deallocate' && deallocateProject) {
                          return (
                            <Button
                              color="primary"
                              size="sm"
                              className={classes.links}
                              disabled={
                                prop[3] <= formatDateDDMMYYYY(new Date())
                                  ? 'disabled'
                                  : null
                              }
                              onClick={e => deallocateProject(prop, k)}
                            >
                              {item}
                            </Button>
                          )
                        }
                      })}
                    </TableCell>
                  ) : null}

                  {showLink && detailHandler ? (
                    <TableCell className={classes.tableCell} key={k + 'cell'}>
                      <Button
                        color="primary"
                        size="sm"
                        onClick={() => {
                          detailHandler(k)
                        }}
                      >
                        {buttonText}
                      </Button>
                    </TableCell>
                  ) : (
                    <TableCell
                      className={classes.tableCell}
                      key={k + 'cell'}
                    ></TableCell>
                  )}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      ) : null}
    </div>
  )
}

CustomTable.defaultProps = {
  tableHeaderColor: 'gray'
}

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    'warning',
    'primary',
    'danger',
    'success',
    'info',
    'rose',
    'gray'
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string)
}
