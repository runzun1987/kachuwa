import { COGNITO_SIGNIN_CHECK } from '../constants/action-types';

const initialState = {
    isLoggedIn: false,
    
  };
  
  const cognitoIsLoggedIn = (state = initialState, action) => {
 
    switch (action.type) {
        
      case COGNITO_SIGNIN_CHECK:
       
        return {
          ...state,
          isLoggedIn: action.payload.isLoggedIn,
          username: action.payload.username,
          email: action.payload.email,
          mobile: action.payload.mobile,
          loaded:true
        };
      default:
        return state;
    }
  };

  
  export default cognitoIsLoggedIn;