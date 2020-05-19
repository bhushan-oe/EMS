import React, { useState } from 'react'
import ApplyLeave from '../../components/Leaves/applyLeave'
import withAuth from '../../HOC/withAuth'
import GridContainer from '../../components/Grid/GridContainer'
import Button from '../../components/CustomButtons/Button'
const Leaves = () => {
  const [leavesPageView, setLeavesPageView] = useState('default')
  const setPageView = () => {
    setLeavesPageView('applyLeaves')
  }
  return (
    <GridContainer>
      {leavesPageView === 'applyLeaves' ? (
        <ApplyLeave setLeavesPageView={setLeavesPageView} />
      ) : (
        <Button type="submit" color="primary" onClick={setPageView}>
          Apply Leaves
        </Button>
      )}
    </GridContainer>
  )
}
export default withAuth(Leaves)
