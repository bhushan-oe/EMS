import Table from '../Table/Table'
import { useSelector, useDispatch } from 'react-redux'
import Card from '../Card/Card'
import CardHeader from '../Card/CardHeader'
import CardBody from '../Card/CardBody'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
import GridItem from '../Grid/GridItem'
import { deleteProject, clearProjectMsg } from '../../actions/projectAction'
import { AlertModal } from '../../components/Modal/modal'
import { useToasts } from 'react-toast-notifications'
import Project from './Project'
import { UpdateProjectAllocation } from './updateProjectAllocation'
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

  let projectDetails = []
  let filteredProject
  if (projectData) {
    filteredProject = projectData.filter(cls => cls.status !== 'Inactive')
    const tempProjectData = filteredProject.map((key, value) => {
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
      return Object.values(data)
    })
    projectDetails = [...tempProjectData]
    // to do  - Get/Delete data from Active projects api
  }

  const links = ['Edit', 'Delete', 'Allocations']

  const getprojectToUpdate = (projectData, title) => {
    return projectData.filter(item => {
      if (item.title === title) return item
    })
  }

  // To do update all user to project..naming convention
  const updateProject = val => {
    setUpdateAction('update')
    const project = getprojectToUpdate(filteredProject, val[0])
    setProjectToUpdate(project)
  }

  const deleteProjectConfirm = val => {
    const project = getprojectToUpdate(filteredProject, val[0])
    setUpdateAction('delete')
    setProjectToUpdate(project)
    setShowDelDialog(true)
  }

  const allocateProject = val => {
    setUpdateAction('allocateProject')
    const project = getprojectToUpdate(filteredProject, val[0])
    setProjectToUpdate(project)
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
        <Project
          setUpdateAction={setUpdateAction}
          projectToUpdate={projectToUpdate}
          setPageView={setPageView}
        />
      ) : updateAction === 'allocateProject' ? (
        <UpdateProjectAllocation
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
                 {projectDetails.length === 0 ? (
              <p className={classes.noteToUser}>
                Project Information is not available yet
              </p>
            ) : (
                <Table
                  tableHeaderColor="gray"
                  tableHead={projectListingHeader}
                  tableData={projectDetails || null}
                  addLinks={links}
                  updateUser={updateProject}
                  deleteUser={deleteProjectConfirm}
                  allocateProject={allocateProject}
                  showLink={false}
                />
                )}
              </CardBody>
            </Card>
          </GridItem>
          <AlertModal
            title="Delete Project"
            showDelDialog={showDelDialog}
            handleYesDelete={handleYesDelete}
            handleNoDelete={handleNoDelete}
            userInfo="Are you sure you want to delete this project ?"
          />
        </>
      )}
    </>
  )
}

export default ProjectListing
