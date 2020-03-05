import Table from '../../components/Table/Table.js'
import { useSelector, useDispatch } from 'react-redux'
import Card from '../../components/Card/Card.js'
import CardHeader from '../../components/Card/CardHeader.js'
import CardBody from '../../components/Card/CardBody.js'
import React, {useState} from 'react';
// import GridItem from '../../components/Grid/GridItem.js'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import Search from '@material-ui/icons/Search'
import CustomInput from '../../components/CustomInput/CustomInput.js'
import Button from '../../components/CustomButtons/Button.js'
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
import GridItem from '../../components/Grid/GridItem.js'
// import DialogActions from '@material-ui/core/DialogActions';
import { Dialog, DialogActions , DialogTitle} from "@material-ui/core";
import {deleteEmployee} from '../../actions/employeeAction'

const useStyles = makeStyles(styles)
 const EmployeeListing = (props )=>{
     const {employeeData,}  =props;
     const classes = useStyles()
     const [searchText, setsearchText] = useState('')
     const dispatch = useDispatch()
     const [userToUpdate, setUserToUpdate] = useState();
     const [showDelDialog, setShowDelDialog] = useState(false);
        const employeeListingHeader = [
        'Id',
        'Employee Id',
        "UserName",
        'Name',
        "Designation",
        'Functional Manager',
        'Reporting Manager'
      ]

      const changeHandler = e => {
        setsearchText(e.target.value)        
    }

     let employeeDetails = []
     if (employeeData) {
         let filteredEmployee = employeeData.data.data.filter(
             cls =>
                 cls.userName
                     .toLowerCase()
                     .includes(searchText.toLowerCase().trim()) &&
                 cls.status !== 'Inactive'
         )
         filteredEmployee.map((key, value) => {         
           const {_id, userName, employee_id, firstname, lastname, functional_manager, reporting_manager, designation} =key
           const name =firstname+ " "+ lastname;
           const data ={_id, employee_id, userName,name , designation, functional_manager, reporting_manager}        
             employeeDetails.push(Object.values(data))
             return 1
         })      
     }

     const links= ["Update", "Delete"];

     const getUserToUpdate=(employeeData, id)=>{
        return employeeData.filter(item=>{            
            if(item._id == id)
             return item;
     })
    }

     const updateUser= (val)=>{
        const user = getUserToUpdate(employeeData.data.data, val[0]);
        setUserToUpdate(user);
     }

     const deleteUser= (val)=>{
        const user = getUserToUpdate(employeeData.data.data, val[0]);
        setUserToUpdate(user);
        setShowDelDialog(true);
    }
    const handleYesDelete =()=>{          
        dispatch(deleteEmployee(userToUpdate[0]._id));
    }

    const handleNoDelete = ()=>{
        setShowDelDialog(false);
    }
    
    return(
            <>
            <GridItem xs={12} sm={12} md={12}>
            <Dialog
                title="Delete Employee"    
                modal={true}
                open={showDelDialog}>
                <DialogActions>
                
                <GridItem xs={12} sm={12} md={12}>
                <p> Are you sure you need to delete an Employee ? </p>
                <Button onClick={handleYesDelete}> Yes</Button> <Button onClick= {handleNoDelete}> No</Button>
                </GridItem>

                </DialogActions> 
            </Dialog>

      
                <CustomInput
                    formControlProps={{
                        className: classes.margin + ' ' + classes.search
                    }}
                    inputProps={{
                        onChange: changeHandler,
                        placeholder: 'Search Employee',
                        inputProps: {
                            'aria-label': 'Search'
                        }
                    }}
                />
                <Button color="white" aria-label="edit" justIcon round>
                    <Search />
                </Button>
            </GridItem>

        <GridItem xs={12} sm={12} md={12}>
        <Card plain>
            <CardHeader plain color="primary">                
                <h4 className={classes.cardTitleWhite}>
                    Employee List
                </h4>
            </CardHeader>
            <CardBody>
                <Table
                    tableHeaderColor="gray"
                    tableHead={
                        employeeData && employeeDetails.length >0 && searchText                         
                            ?employeeListingHeader
                            : null
                    }
                    tableData={employeeDetails ? employeeDetails : null}
                    addLinks = {links}
                    updateUser ={updateUser}
                    deleteUser = {deleteUser}
                    showLink={false}
                />
            </CardBody>
        </Card>
    </GridItem>
    </>
    )
}

export default EmployeeListing;