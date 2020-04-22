import checkboxAdnRadioStyle from '../../assets/jss/material-dashboard-react/checkboxAdnRadioStyle'

export const employeeStyles = {
  ...checkboxAdnRadioStyle,
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0'
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none'
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: 11,
    minWidth: 120,
    wrap: 'nowrap',
    fullWidth: 'true',
    display: 'flex'
  },
  selectEmpty: {
    marginTop: 10
  },
  error: {
    color: 'red'
  },
  dateStyle: {
    paddingLeft: 11,
    paddingRight: 11
  }
}
