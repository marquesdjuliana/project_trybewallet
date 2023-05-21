// Esse reducer será responsável por tratar as informações da pessoa usuária
import { ADD_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '', // String vazia que armazena o email da pessoa usuária
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EMAIL: // Atualiza o estado com o email fornecido
    return { ...state, email: action.payload }; // a propriedade email do estado é atualizada com o valor fornecido pela ação (action.payload), usando o operador spread (...) para criar um novo objeto mantendo o restante do estado inalterado.
  default:
    return state;
  }
}

export default userReducer;
