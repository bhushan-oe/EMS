import React, { useEffect } from 'react'
import withAuth from '../../HOC/withAuth'
import { getEmpProjectAllocationsData } from '../../actions/projectAction'
import { useSelector, useDispatch } from 'react-redux'
import { currentUser } from '../../selectors/loginSelectors'
import {emplProjectAllocations} from '../../selectors/projectAllocationSelector'
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
import Table from '../../components/Table/Table'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'
import styles from '../../assets/jss/material-dashboard-react/components/'
const ProjectHistory = props => {
  const dispatch = useDispatch()
  const { _id: employee } = useSelector(currentUser)
  const projectDetails = useSelector(emplProjectAllocations)
  useEffect(() => {
    if (employee) dispatch(getEmpProjectAllocationsData(employee))
  }, [dispatch])

const SelfReviewListingHeader = [
    'Projects',
    'From date',
    'To date',
    'Due Fom Date',
    'Status'
  ]

  return (
     <GridContainer>
       {emplProjectAllocations && emplProjectAllocations.length > 0 ?
       (
        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
            <CardHeader plain color="primary">
              <h4 className={classes.cardTitleWhite}>SELF REVIEW</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="gray"
                tableHead={SelfReviewListingHeader}
                tableData={projectDetails || null}
                showLink={true}
                buttonText="Details"
                // detailHandler={detailHandler}
              />
            </CardBody>
          </Card>
        </GridItem>
      ) 
       : "No Projects are assigned yet."}
     </GridContainer>
  )
}

export default withAuth(ProjectHistory)
