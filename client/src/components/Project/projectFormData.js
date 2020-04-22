import * as Yup from 'yup'
import { yupRequired, yupRequiredDate } from '../../helpers/yupValidations'

export const projectAllocationValidations = Yup.object().shape({
  employee: yupRequired('Employee'),
  project: yupRequired('Project'),
  functional_manager: yupRequired('Manager'),
  startdate: yupRequiredDate('Start Date').typeError(''),
  enddate: yupRequiredDate('End Date')
    .typeError('Invalid Date')
    .test('', 'Must be greater than Start Date', function(value) {
      const startdate = this.parent.startdate
      return value > startdate
    })
})

export const creatNewProjectValidations = Yup.object().shape({
  title: yupRequired('Project Title')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!'),
  description: yupRequired('Description')
    .min(2, 'Too Short!')
    .max(150, 'Too Long!'),
  client: yupRequired('Client')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!'),
  client_location: yupRequired('Client Location'),
  type: yupRequired('Project Type')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!'),
  technology: yupRequired('Technology')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!'),
  startdate: yupRequiredDate('Start Date').typeError(''),
  enddate: yupRequiredDate('End Date')
    .typeError('')
    .test('', 'Must be greater than Start Date', function(value) {
      const startdate = this.parent.startdate
      return value > startdate
    })
})
export const projectAllocationInitialValues = {
  project: undefined,
  employee: undefined,
  startdate: new Date(),
  enddate: new Date(),
  status: 'Active',
  functional_manager: undefined
}

export const projectInputList = [
  { md: 6, name: 'title', labelText: 'Project Title *' },
  { md: 6, name: 'description', labelText: 'Description *' },
  { md: 6, name: 'client', labelText: 'Client *' },
  { md: 6, name: 'client_location', labelText: 'Client Location *' },
  { md: 6, name: 'technology', labelText: 'Technology *' },
  { md: 6, name: 'type', labelText: 'Project Type *' }
]

export const projectDatePickerList = [
  { md: 6, name: 'startdate', label: 'Start Date *' },
  { md: 6, name: 'enddate', label: 'End Date *' }
]
