// Coloque aqui suas actions
const ADD_EMAIL = 'ADD_EMAIL';

const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';

const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: email,
});
const requestCurrencies = (curencies) => ({
  type: REQUEST_CURRENCIES,
  payload: curencies,
});
export {
  ADD_EMAIL,
  REQUEST_CURRENCIES,
  addEmail,
  requestCurrencies,
};
