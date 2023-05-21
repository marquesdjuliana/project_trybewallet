import { REQUEST_CURRENCIES, ADD_EXPENSE, EXCLUDE_EXPENSES,
  TO_EDIT_EXPENSE, UPDATE_EXPENSE } from '../actions';

// Esse reducer será responsável por tratar todas as informações relacionadas às despesas
const INITIAL_STATE = {
  currencies: [], // Array de strings que armazena as moedas
  expenses: [], // Array de objetos, cada objeto representa uma despesa e possui as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // Valor booleano que indica se uma despesa está sendo editada
  idToEdit: 0, // Valor numérico que armazena o ID da despesa que está sendo editada
  total: 0, // Total das despesas
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    // Atualiza o estado com as moedas recebidas
    return { ...state, currencies: action.payload };
  case ADD_EXPENSE:
    // Adiciona uma nova despesa ao estado e calcula o novo total das despesas
    return {
      ...state,
      expenses: [...state.expenses, { id: state.expenses.length, ...action.payload }], // O array expenses é atualizado adicionando um novo objeto de despesa. Esse novo objeto é criado usando o spread para desestruturar todas as propriedades do objeto action.payload (que contém os detalhes da nova despesa) e, em seguida, é adicionada uma nova propriedade id que é gerado atribuindo a posição atual do array expenses como identificador.
      total: [...state.expenses, action.payload].reduce( // O array total é atualizado usando o método reduce(). Ele percorre o array state.expenses (incluindo a nova despesa adicionada) e calcula o total das despesas. A função de redução (acc, curr) => acc + +curr.value * +curr.exchangeRates[curr.currency].ask é aplicada a cada elemento do array e realiza o cálculo do valor da despesa em relação à sua moeda de origem e taxa de câmbio. O resultado final é atribuído à propriedade total do estado.
        (acc, curr) => acc + +curr.value * +curr.exchangeRates[curr.currency].ask,
        0,
      ),
    };
  case EXCLUDE_EXPENSES:
    // Remove uma despesa do array de despesas no estado com base no 'id' fornecido, criando um novo estado com as despesas atualizadas
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => action.payload.id !== id),
    };
  case TO_EDIT_EXPENSE:
    // Atualiza o estado para indicar que uma despesa está sendo editada
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case UPDATE_EXPENSE:
    // Atualiza o estado após a edição de uma despesa
    return {
      ...state,
      editor: false,
      expenses: action.payload,
    };
  default:
    return state;
  }
}

export default walletReducer;
