const styles = {
  formControl: {
    margin: 11,
    minWidth: 200
  },
  selectEmpty: {
    marginTop: 10
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center'
  },
  showPointer: {
    cursor: 'pointer'
  },
  hoverEffect: {
    '&:focus': {
      backgroundColor: '#004de6',
      color: 'white'
    },
    '&:hover': {
      backgroundColor: '#004de6',
      color: 'white',
      opacity: '0.5'
    }
  },
  displayCenter: {
    display: 'flex',
    justifyContent: 'center'
  }
}

export default styles
