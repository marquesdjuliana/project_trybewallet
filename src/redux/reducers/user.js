// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN_SUBMIT } from '../actions';

const INITIAL_STATE = {
  email: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN_SUBMIT:
    return { ...state, email: action.payload };
  default:
    return state;
  }
}

export default userReducer;
