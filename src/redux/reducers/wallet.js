import { REQUEST_CURRENCIES, ADD_EXPENSE, EXCLUDE_EXPENSES } from '../actions';
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
    return { ...state, currencies: action.payload }; // Atualiza o estado com as moedas recebidas
  case ADD_EXPENSE:
    // Adiciona uma nova despesa ao estado e calcula o novo total das desespesas
    return {
      ...state,
      expenses: [...state.expenses, { id: state.expenses.length, ...action.payload }], // Cria um novo objeto que representa a nova despesa a ser adicionada; contém um 'id' que recebe o valor da posição do array de expenses;
      total: [...state.expenses, action.payload].reduce(
        (acc, curr) => acc + +curr.value * +curr.exchangeRates[curr.currency].ask,
        0,
      ),
    };
  case EXCLUDE_EXPENSES:
    // Remove uma despesa do array de despesas no estado com base no 'id' fornecido, cirando um novo estado com as despesas atualizada.
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => action.payload.id !== id),
    };
  default:
    return state;
  }
}

export default walletReducer;
