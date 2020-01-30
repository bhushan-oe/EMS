import React from "react";
import PropTypes from "prop-types";
import { Link, Route ,Switch } from 'react-router-dom';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import Button from "../../components/CustomButtons/Button.js";
import UserProfile from "../../views/UserProfile/UserProfile.js"
import styles from "../../assets/jss/material-dashboard-react/components/tableStyle.js";


const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor,showLink } = props;
  return (
 
    <Switch>
    <div className={classes.tableResponsive}>
      {(tableHead && tableData)?<Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key+"cell"}
                  >
                    {prop}
                  </TableCell>
                );
                
              })}
              {showLink ?<TableCell /> : null }
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow}>
                {prop.map((prop, key) => {
                  return (
                    <TableCell className={classes.tableCell} key={key}>
                      {prop}
                    </TableCell>
                  );
                })}
                {showLink ? <TableCell className={classes.tableCell} key={key+"cell"}>
                  <Button color="success" size="sm">
                    <Link style={{textDecoration:"none" , color:"#FFFFFF"}} to="/admin/user"> SearchProduct </Link>
                  </Button>
                  <Route path="/admin/user" component={UserProfile} />
                </TableCell> : null }
              </TableRow>
            );
          })}
        </TableBody>
      </Table>:null}
    </div>
      
    </Switch>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  //tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};
