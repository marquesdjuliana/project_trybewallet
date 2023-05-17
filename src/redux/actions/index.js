// Coloque aqui suas actions
const ADD_EMAIL = 'ADD_EMAIL';

const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';

const ADD_EXPENSE = 'ADD_EXPENSE';

const EXCLUDE_EXPENSES = 'EXCLUDE_EXPENSES';

const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: email,
});

const requestCurrencies = (curencies) => ({
  type: REQUEST_CURRENCIES,
  payload: curencies,
});

const fetchCurrencies = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const currencies = Object.keys(data).filter((currency) => currency !== 'USDT');
  dispatch(requestCurrencies(currencies));
};

const addExpense = (expense, exchangeRates) => ({
  type: ADD_EXPENSE,
  payload: { ...expense, exchangeRates },
});

const excludeExchange = (expenses) => ({
  type: EXCLUDE_EXPENSES,
  payload: expenses,
});

const fetchToAddExpense = (expense) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  dispatch(addExpense(expense, data));
};
export {
  ADD_EMAIL,
  REQUEST_CURRENCIES,
  ADD_EXPENSE,
  EXCLUDE_EXPENSES,
  addEmail,
  excludeExchange,
  requestCurrencies,
  fetchCurrencies,
  fetchToAddExpense,
};
