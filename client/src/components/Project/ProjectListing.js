import Table from '../Table/Table'
import { useSelector, useDispatch } from 'react-redux'
import Card from '../Card/Card'
import CardHeader from '../Card/CardHeader'
import CardBody from '../Card/CardBody'
import React, { useState, useEffect } from 'react'
// import GridItem from '../../components/Grid/GridItem'
import { makeStyles } from '@material-ui/core/styles'
import Button from '../CustomButtons/Button'
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
import GridItem from '../Grid/GridItem'
// import DialogActions from '@material-ui/core/DialogActions';
import { Dialog, DialogActions } from '@material-ui/core'
import { deleteProject, clearProjectMsg } from '../../actions/projectAction'
import { useToasts } from 'react-toast-notifications'
import Employee from './Project'
import {
  deleteProjectSuccessMsg,
  deleteProjectErrorMsg
} from '../../selectors/projectSelectors'
import { getMonthOfDate, getDayOfDate } from '../../helpers/formatDates'
const useStyles = makeStyles(styles)
const ProjectListing = props => {
  const { projectData, setPageView } = props
  const { addToast } = useToasts()
  const classes = useStyles()
  const dispatch = useDispatch()
  const [projectToUpdate, setProjectToUpdate] = useState()
  const [updateAction, setUpdateAction] = useState(null)
  const [showDelDialog, setShowDelDialog] = useState(false)
  const deleteProjectSuccess = useSelector(deleteProjectSuccessMsg)
  const deleteProjectError = useSelector(deleteProjectErrorMsg)

  const projectListingHeader = [
    'Title',
    'Technology',
    'Client',
    'Client Location',
    'Start Date',
    'End Date'
  ]

  useEffect(() => {
    if (deleteProjectSuccess) {
      addToast(deleteProjectSuccess, {
        appearance: 'success',
        autoDismiss: true
      })
      dispatch(clearProjectMsg())
    }
  }, [deleteProjectSuccess, addToast, dispatch])

  useEffect(() => {
    if (deleteProjectError) {
      addToast(deleteProjectError, {
        appearance: 'error',
        autoDismiss: true
      })
      dispatch(clearProjectMsg())
    }
  }, [deleteProjectError, addToast, dispatch])

  const projectDetails = []
  let filteredProject
  if (projectData) {
    filteredProject = projectData.filter(cls => cls.status !== 'Inactive')
    filteredProject.map((key, value) => {
      let {
        title,
        technology,
        client,
        client_location,
        startdate,
        enddate
      } = key

      const start = new Date(startdate)
      const end = new Date(enddate)
      const mnth = getMonthOfDate(start)
      const day = getDayOfDate(start)
      startdate = [day, mnth, start.getFullYear()].join('/')

      let formattedEnddate
      if (enddate) {
        const mnth = getMonthOfDate(end)
        const day = getDayOfDate(end)
        formattedEnddate = [day, mnth, end.getFullYear()].join('/')
      }
      enddate = enddate ? formattedEnddate : '-'

      const data = {
        title,
        technology,
        client,
        client_location,
        startdate,
        enddate
      }
      projectDetails.push(Object.values(data))
      return
    })
    // Get/Delete data from Active projects
    //  projectData = filteredProject;
  }

  const links = ['Update', 'Delete']

  const getprojectToUpdate = (projectData, title) => {
    return projectData.filter(item => {
      if (item.title === title) return item
    })
  }

  const updateUser = val => {
    setUpdateAction('update')
    const user = getprojectToUpdate(filteredProject, val[0])
    setProjectToUpdate(user)
  }

  const deleteUser = val => {
    const user = getprojectToUpdate(filteredProject, val[0])
    setUpdateAction('delete')
    setProjectToUpdate(user)
    setShowDelDialog(true)
  }

  const handleYesDelete = () => {
    dispatch(deleteProject(projectToUpdate[0]._id))
    setShowDelDialog(false)
  }

  const handleNoDelete = () => {
    setShowDelDialog(false)
  }

  return (
    <>
      {updateAction === 'update' ? (
        <Employee
          setUpdateAction={setUpdateAction}
          projectToUpdate={projectToUpdate}
          setPageView={setPageView}
        />
      ) : (
        <>
          <GridItem xs={12} sm={12} md={12}>
            <Card plain>
              <CardHeader plain color="primary">
                <h4 className={classes.cardTitleWhite}>Project List</h4>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="gray"
                  tableHead={
                    projectData && projectDetails.length > 0
                      ? projectListingHeader
                      : null
                  }
                  tableData={projectDetails || null}
                  addLinks={links}
                  updateUser={updateUser}
                  deleteUser={deleteUser}
                  showLink={false}
                />
              </CardBody>
            </Card>
          </GridItem>
          <Dialog title="Delete Project" modal={true} open={showDelDialog}>
            <DialogActions>
              <GridItem xs={12} sm={12} md={12}>
                <p> Are you sure you want to delete this Project ? </p>
                <Button onClick={handleYesDelete}> Yes</Button>{' '}
                <Button onClick={handleNoDelete}> No</Button>
              </GridItem>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  )
}

export default ProjectListing
