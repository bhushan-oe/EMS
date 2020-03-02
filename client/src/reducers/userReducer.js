import {
    SET_NEW_USER_SUCCESS,SET_NEW_USER_ERROR
  } from '../actions/actionTypes.js'
  
  const initialState = {
    addNewUserStatus: null,
    error: null,    
  }
  
  const userReducer = (state = initialState, action) => {      
    switch (action.type) {
      case SET_NEW_USER_SUCCESS:
        return {
          ...state,
          addNewUserStatus : action.data          
        }
  
      case SET_NEW_USER_ERROR:        
        return {
          ...state,
          error : action.data
        
        }
      default:
        return state
    }
  }
  
  export default userReducer
  