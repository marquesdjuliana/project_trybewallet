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

const fetchCurrencies = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const currencies = Object.keys(data).filter((currency) => currency !== 'USDT');
  dispatch(requestCurrencies(currencies));
};

export {
  ADD_EMAIL,
  REQUEST_CURRENCIES,
  addEmail,
  requestCurrencies,
  fetchCurrencies,
};
