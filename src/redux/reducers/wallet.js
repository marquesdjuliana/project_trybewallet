import { REQUEST_CURRENCIES, ADD_EXPENSE } from '../actions';
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  total: 0, // total despesas
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return { ...state, currencies: action.payload };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, { id: state.expenses.length, ...action.payload }],
      total: [...state.expenses, action.payload].reduce(
        (acc, curr) => acc + +curr.value * +curr.exchangeRates[curr.currency].ask,
        0,
      ),
    };
  default:
    return state;
  }
}

export default walletReducer;
