import * as Yup from 'yup'
import {
  yupRequired,
  yupRequiredNumber,
  yupRequiredDate
} from '../../helpers/yupValidations'
import {
  gender,
  work_location,
  shift_timing,
  designation,
  employment_status,
  userRole,
  countryData
} from '../../constants'

export const formikInitialValues = userToUpdate => {
  const {
    firstname,
    lastname,
    middlename,
    address1,
    address2,
    city,
    zip,
    state,
    country,
    gender,
    dateofbirth = new Date(),
    dateofjoining = new Date(),
    status = 'Active',
    experience_at_joining,
    work_location,
    timezone,
    shift_timing,
    designation,
    employment_status,
    userRole,
    reporting_manager,
    skills,
    certifications,
    achievements,
    contact_no
  } = userToUpdate ? userToUpdate[0] : {}
  return {
    firstname,
    lastname,
    middlename,
    address1,
    address2,
    city,
    zip,
    state,
    country,
    gender,
    dateofbirth,
    dateofjoining,
    status,
    experience_at_joining,
    work_location,
    timezone,
    shift_timing,
    designation,
    employment_status,
    userRole,
    reporting_manager,
    skills,
    certifications,
    achievements,
    contact_no
  }
}

export const formikInitialValuesAddUser = {
  employee_id: '',
  email: '',
  userName: '',
  password: ''
}

export const formikAddNewUserValidations = Yup.object().shape({
  employee_id: yupRequiredNumber('Employee Id').typeError(
    'Employee Id must be a number'
  ),
  email: yupRequired('Email Id').email('Invalid email'),
  userName: yupRequired('UserName').min(
    8,
    'UserName must be at least 8 characters long!'
  ),
  password: yupRequired('Password').min(
    8,
    'Password must be at least 8 characters long!'
  )
})
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/ // for Mobile Numbers

export const formikUpdateValidations = Yup.object().shape({
  firstname: yupRequired('Firstname')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!'),
  lastname: yupRequired('Lastname')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!'),
  contact_no: Yup.string()
    .required('Contact number is required.')
    .length(10, 'Please enter a valid contact number.')
    .matches(phoneRegExp, 'Please enter a valid contact number.'),
  address1: yupRequired('Address1').min(2, 'Too Short!'),
  city: yupRequired('City'),
  zip: yupRequired('Zip').min(6, 'Enter minimum 6 length Zip Code'),
  state: yupRequired('State'),
  country: yupRequired('Country'),
  gender: yupRequired('Gender'),
  dateofbirth: yupRequiredDate('Date Of Birth')
    .typeError('Invalid date')
    .test('', 'Enter valid date', function(value) {
      const date = new Date()
      return value < date
    })
    .test('', 'Age must be greater than 18', function(value) {
      const date = new Date()
      const result = Math.floor(
        (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
          Date.UTC(value.getFullYear(), value.getMonth(), value.getDate())) /
          (1000 * 60 * 60 * 24)
      )
      return Math.floor(result / 30 / 12) > 17
    }),
  dateofjoining: yupRequiredDate('Date Of Joining')
    .typeError('Invalid Date')
    .test('', 'Enter valid date', function(value) {
      const date = new Date()
      return value.getFullYear() - date.getFullYear() < 2
    }),
  status: yupRequired('Status is required'),
  experience_at_joining: yupRequiredNumber('Experience At Joining').typeError(
    'Experience must be in numbers'
  ),
  work_location: yupRequired('Work Location'),
  timezone: yupRequired('Timezone'),
  shift_timing: yupRequired('Shift Timing'),
  designation: yupRequired('Designation'),
  employment_status: yupRequired('Employment Status'),
  userRole: yupRequired('User Role'),
  reporting_manager: Yup.string().when('designation', {
    is: designation =>
      designation !== 'Partner' && designation !== 'Chief Executive Officer',
    then: yupRequired('Reporting Manager')
  }),
  skills: yupRequired('Skill')
})

export const onlyAddEmployeeInputList = [
  { md: 6, name: 'employee_id', labelText: 'Employee Id * ' },
  { md: 6, name: 'email', labelText: 'Email Address *' },
  { md: 6, name: 'userName', labelText: 'UserName *' },
  { md: 6, name: 'password', labelText: 'Password * ' }
]
export const commonInputList1 = [
  { md: 4, name: 'firstname', labelText: 'Firstname * ' },
  { md: 4, name: 'middlename', labelText: 'Middlename' },
  { md: 4, name: 'lastname', labelText: 'Lastname *' },
  { md: 6, name: 'address1', labelText: 'Address 1 *' },
  { md: 6, name: 'address2', labelText: 'Address 2' }
]
export const commonInputList2 = [
  { md: 4, name: 'city', labelText: 'City *' },
  { md: 4, name: 'zip', labelText: 'Zip *' },
  { md: 4, name: 'contact_no', labelText: 'Conatct Number *' },
  {
    md: 4,
    name: 'experience_at_joining',
    labelText: 'Experience At Joining *'
  }
]
export const commonInputList3 = [
  { md: 6, name: 'skills', labelText: 'Skills *' },
  { md: 6, name: 'certifications', labelText: 'Certifications' },
  { md: 12, name: 'achievements', labelText: 'Achievements' }
]

export const selectMenuList = [
  { md: 6, name: 'gender', labelText: 'Gender *', menuItems: gender },
  {
    md: 6,
    name: 'work_location',
    labelText: 'Work Location *',
    menuItems: work_location
  },
  {
    md: 6,
    name: 'timezone',
    labelText: 'Timezone *',
    menuItems: work_location
  },
  {
    md: 6,
    name: 'shift_timing',
    labelText: 'Shift Timing *',
    menuItems: shift_timing
  },
  {
    md: 6,
    name: 'designation',
    labelText: 'Designation *',
    menuItems: designation
  },
  {
    md: 6,
    name: 'employment_status',
    labelText: 'Employment Status *',
    menuItems: employment_status
  },
  { md: 6, name: 'userRole', labelText: 'User Role *', menuItems: userRole }
]
