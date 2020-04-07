import React, { useEffect, useState, useContext } from 'react'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import Check from '@material-ui/icons/Check'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
// core components
import Grid from '@material-ui/core/Grid'
import Button from '../CustomButtons/Button'
import Card from '../Card/Card'
import CardHeader from '../Card/CardHeader'
import { selfReviewStyles } from './SelfReviewStyles'
import Table from '../Table/Table'
import CardBody from '../Card/CardBody'
import { formatDate } from '../../helpers/formatDates'
import CardFooter from '../Card/CardFooter'
import { UserContext } from '../../context-provider/user-context'
import {
  updateSelfReview,
  clearReviewStatus,
  loadAllSelfReviewsForUser
} from '../../actions/selfReviewActions'

import { useDispatch, useSelector } from 'react-redux'
import { useToasts, withToastManager } from 'react-toast-notifications'
import {
  userSelfReviewUpdateErrorMsg,
  userSelfReviewUpdateStatusMsg
} from './selectors'
const styles = selfReviewStyles
const useStyles = makeStyles(styles)
const SelfReviewDetails = props => {
  const classes = useStyles()
  const { selfReviewDeatails, projectDetails, ClickHandler, showButtons } = props
  const { addToast } = useToasts()
  const dispatch = useDispatch()
  const selfReviewDetailHeader = ['Self Review Details', '']
  let tableData = []
  tableData.push(
    [
      'Employee',
      `${selfReviewDeatails.employee.firstname} ${selfReviewDeatails.employee.lastname}`
    ],
    ['Projects', projectDetails[0]],
    ['From Date', formatDate(selfReviewDeatails.from_date)],
    ['To Date', formatDate(selfReviewDeatails.to_date)],
    ['Due From', formatDate(selfReviewDeatails.due_from)],
    [
      'Due To',
      selfReviewDeatails.due_to ? formatDate(selfReviewDeatails.due_to) : null
    ],
    ['Feedback', selfReviewDeatails.feedback],
    ['Status', selfReviewDeatails.status],
    ['Review Form Link', selfReviewDeatails.review_form_link]
  )

  const [selectedStatus, setSelectedStatus] = useState('Active')
  const userSelfReviewUpdateError = useSelector(userSelfReviewUpdateErrorMsg)
  const userSelfReviewUpdateStatus = useSelector(userSelfReviewUpdateStatusMsg)
  const { currentUser } = useContext(UserContext)

  useEffect(() => {
    if (userSelfReviewUpdateStatus) {
      addToast(userSelfReviewUpdateStatus, {
        appearance: 'success',
        autoDismiss: true
      })
      dispatch(loadAllSelfReviewsForUser(currentUser.employee_id))
      dispatch(clearReviewStatus())
      ClickHandler()
    }
  }, [userSelfReviewUpdateStatus, addToast, ClickHandler, currentUser.employee_id, dispatch])

  useEffect(() => {
    if (userSelfReviewUpdateError) {
      addToast(userSelfReviewUpdateError, {
        appearance: 'error',
        autoDismiss: true
      })
      dispatch(clearReviewStatus())
    }
  }, [userSelfReviewUpdateError, addToast, dispatch])

  const changeHandler = e => {
    if (e.target.checked === true) setSelectedStatus('Done')
  }

  const updateHandler = () => {
    dispatch(
      updateSelfReview(selfReviewDeatails._id, { status: selectedStatus })
    )
  }
  return (
    <Grid>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>REVIEW DETAILS</h4>
        </CardHeader>
        <CardBody>
          <Grid container>
            <Grid xs={12} sm={12} md={12} item>
              <Table
                tableHeaderColor="gray"
                tableHead={selfReviewDetailHeader}
                tableData={tableData || null}
                showLink={false}
              />
            </Grid>
            {showButtons ? <Grid xs={12} sm={12} md={12} item>
              <iframe
                src={selfReviewDeatails.review_form_link}
                width="100%"
                height="800"
                title="selfReviewDetailsFrame"
              >
                Loading...
              </iframe>
            </Grid> : null}
            {showButtons ? <Grid xs={6} sm={6} md={6} item>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={changeHandler}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked,
                        root: classes.root
                      }}
                    />
                  }
                  label={' I have submitted Form'}
                />
              </div>
            </Grid> : null}
          </Grid>
        </CardBody>
        {showButtons ? <CardFooter className={classes.footer}>
          <Button
            type="submit"
            color="primary"
            onClick={updateHandler}
            disabled={selectedStatus === 'Active' ? 'disabled' : null}
          >
            UPDATE REVIEW
          </Button>
          <Button type="submit" color="white" onClick={ClickHandler}>
            Close
          </Button>
        </CardFooter> : null}
      </Card>
    </Grid>
  )
}
export default withToastManager(SelfReviewDetails)
