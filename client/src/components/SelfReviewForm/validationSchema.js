import { yupRequired, yupRequiredDate } from '../../helpers/yupValidations'
export const selfReviewAllValidation = {
  review_form_link: yupRequired('Form link'),
  from_date: yupRequiredDate('Review from date'),
  to_date: yupRequiredDate('Review to date').test(
    '',
    'Must be greater than from date',
    function(value) {
      const from_date = this.parent.from_date
      return value > from_date
    }
  ),
  due_from: yupRequiredDate('Due from'),
  due_to: yupRequiredDate('Due to').test(
    '',
    'Must be greater than due from date',
    function(value) {
      const due_from = this.parent.due_from
      return value > due_from
    }
  )
}
const validationSchema = {
  employee: yupRequired('Employee'),
  projects: yupRequired('Project'),
  functional_manager: yupRequired('Functional manager'),
  ...selfReviewAllValidation
}

export default validationSchema

export  const initValSelfReviewAll = {
    from_date: new Date(),
    to_date: new Date(),
    due_from: new Date(),
    due_to: new Date(),
    review_form_link: '',
    feedback: ''
  }

