import * as Yup from 'yup'
import { yupRequired, yupRequiredDate } from '../../helpers/yupValidations'
import { formatDateDDMMYYYY } from '../../helpers/formatDates'

export const leaveDatePickerList = [
  { md: 6, name: 'leave_date_from', label: 'Start Date *' },
  { md: 6, name: 'leave_date_to', label: 'End Date *' }
]

export const applyLeaveValidations = Yup.object().shape({
  functional_manager: yupRequired('Manager'),
  type: yupRequired('Leave Type'),
  leave_date_from: yupRequiredDate('Start Date')
    .typeError('Enter valid date')
    .test('', 'Enter valid date', function(value) {
      const date = new Date()
      return value < date
    }),
  leave_date_to: yupRequiredDate('End Date')
    .typeError('Enter Valid Date')
    .test('', 'Must be greater than or equal to Start Date', function(value) {
      return value >= this.parent.leave_date_from
    })
    .test('', 'End date cannot be past today', function(value) {
      return formatDateDDMMYYYY(value) === formatDateDDMMYYYY(new Date())
    })
})
export const leavesInitialValues = {
  functional_manager: undefined,
  leave_date_from: new Date(),
  leave_date_to: new Date(),
  summary: undefined,
  type: undefined
}

export const leavesInputList = [
  { md: 12, name: 'summary', labelText: 'Summary' }
]
