import React, { useState, useEffect } from 'react'
import Card from '../Card/Card'
import CardHeader from '../Card/CardHeader'
import CardBody from '../Card/CardBody'
import { makeStyles } from '@material-ui/core/styles'
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
import { formatDate } from '../../helpers/formatDates'
import GridItem from '../Grid/GridItem'
import Button from '../CustomButtons/Button'
import {
  getProjectAllocationData,
  unassignProject,
  deleteProjectAllocations,
  clearProjectAllocationMsg
} from '../../actions/projectAction'
import { AlertModal } from '../../components/Modal/modal'
import { useToasts } from 'react-toast-notifications'
import {
  singleProjectAllocationData,
  singleProjectAllocationDataErr,
  deallocateProjectError,
  deallocateProjectSuccess,
  delProjectAllocationSuccess,
  delProjectAllocationError
} from '../../selectors/projectAllocationSelector'
import { useSelector, useDispatch } from 'react-redux'
import Table from '../Table/Table'

const useStyles = makeStyles(styles)

export const UpdateProjectAllocation = props => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { addToast } = useToasts()
  const { setPageView, setUpdateAction, projectToUpdate } = props
  const projectAllocationDetails = useSelector(singleProjectAllocationData)
  const projectAllocationDetailsErr = useSelector(
    singleProjectAllocationDataErr
  )
  const deallocateProjectStatus = useSelector(deallocateProjectSuccess)
  const deallocateProjectErr = useSelector(deallocateProjectError)
  const delProjectAllocationStatus = useSelector(delProjectAllocationSuccess)
  const delProjectAllocationErr = useSelector(delProjectAllocationError)

  const [projectAllocations, setProjectAllocations] = useState([])
  const [showDelDialog, setShowDelDialog] = useState(false)
  const [projectAllocationToUpdate, setProjectAllocationToUpdate] = useState(
    null
  )
  const projectId = projectToUpdate ? projectToUpdate[0]._id : null
  const links = ['Deallocate', 'Delete']

  useEffect(() => {
    if (projectId) {
      dispatch(getProjectAllocationData(projectId))
    }
  }, [projectId, dispatch])

  useEffect(() => {
    if (deallocateProjectStatus) {
      addToast(deallocateProjectStatus, {
        appearance: 'success',
        autoDismiss: true
      })
      dispatch(clearProjectAllocationMsg())
      if (projectId) {
        dispatch(getProjectAllocationData(projectId))
      }
      // data in sorted order
    }
  }, [deallocateProjectStatus, addToast, dispatch])

  useEffect(() => {
    if (delProjectAllocationStatus) {
      addToast(delProjectAllocationStatus, {
        appearance: 'success',
        autoDismiss: true
      })
      dispatch(clearProjectAllocationMsg())
      if (projectId) {
        dispatch(getProjectAllocationData(projectId))
      }
    }
  }, [delProjectAllocationStatus, addToast, dispatch])

  useEffect(() => {
    if (deallocateProjectErr) {
      addToast(deallocateProjectErr, {
        appearance: 'error',
        autoDismiss: true
      })
      dispatch(clearProjectAllocationMsg())
    }
  }, [deallocateProjectErr, addToast, dispatch])

  useEffect(() => {
    if (delProjectAllocationErr) {
      addToast(delProjectAllocationErr, {
        appearance: 'error',
        autoDismiss: true
      })
      dispatch(clearProjectAllocationMsg())
    }
  }, [delProjectAllocationErr, addToast, dispatch])

  useEffect(() => {
    if (projectAllocationDetailsErr) {
      addToast(projectAllocationDetailsErr, {
        appearance: 'error',
        autoDismiss: true
      })
      dispatch(clearProjectAllocationMsg())
    }
  }, [projectAllocationDetailsErr])

  useEffect(() => {
    if (projectAllocationDetails) {
      // to do sort data before display

      const data = projectAllocationDetails.map(prop => {
        let {
          employee: { firstname, lastname },
          startdate,
          enddate,
          functional_manager: {
            firstname: mgr_firstname,
            lastname: mgr_lastname
          },
          project: { title },
          _id
        } = prop

        startdate = formatDate(startdate)
        enddate = formatDate(enddate)
        const emp_name = `${firstname} ${lastname}`
        const mgr_name = `${mgr_firstname} ${mgr_lastname}`

        const projectAllocationData = {
          emp_name,
          title,
          startdate,
          enddate,
          mgr_name,
          _id
        }
        return Object.values(projectAllocationData)
      })
      setProjectAllocations([...data])
    }
  }, [projectAllocationDetails])

  const projectListingHeader = [
    'Employee',
    'Project',
    'Start Date',
    'End Date',
    'Manager'
  ]
  const deallocateProject = val => {
    dispatch(unassignProject(val[5], new Date()))
  }
  const deleteProjectAllocation = val => {
    setProjectAllocationToUpdate(val[5])
    setShowDelDialog(true)
  }
  const handleYesDelete = () => {
    dispatch(deleteProjectAllocations(projectAllocationToUpdate))
    setShowDelDialog(false)
  }

  const handleNoDelete = () => {
    setShowDelDialog(false)
  }
  return (
    <>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>Project Allocation</h4>
          </CardHeader>
          <CardBody>
            {projectAllocations && projectAllocations.length === 0 ? (
              <p className={classes.noteToUser}>
                Any user is not assiged to project yet.
              </p>
            ) : (
              <Table
                tableHeaderColor="gray"
                tableHead={projectListingHeader}
                tableData={projectAllocations || null}
                addLinks={links}
                deleteUser={deleteProjectAllocation}
                deallocateProject={deallocateProject}
                showLink={false}
              />
            )}
          </CardBody>
        </Card>
        <Button
          color="primary"
          onClick={() => {
            setPageView('projectListing')
            setUpdateAction()
          }}
        >
          Back
        </Button>
      </GridItem>
      <AlertModal
        title="Delete Project Allocation"
        showDelDialog={showDelDialog}
        handleYesDelete={handleYesDelete}
        handleNoDelete={handleNoDelete}
        userInfo="Are you sure you want to delete this project allocation ?"
      />
    </>
  )
}
