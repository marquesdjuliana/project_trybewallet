// Coloque aqui suas actions
const LOGIN_SUBMIT = 'LOGIN_SUBMIT';

const INF_CURRENCIES = 'INF_CURRENCIES';

const loginSubmit = (email) => ({
  type: LOGIN_SUBMIT,
  payload: email,
});
const infCurrencies = (curencies) => ({
  type: INF_CURRENCIES,
  payload: curencies,
});
export {
  LOGIN_SUBMIT,
  INF_CURRENCIES,
  loginSubmit,
  infCurrencies,
};
