import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrencies, fetchToAddExpense,
  upDateExpense } from '../redux/actions';
import './WalletForm.css';

class WalletForm extends Component {
  state = {
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Crie um manipulador de eventos para o botão "Adicionar despesa" que irá despacha fetchToAddExpense:
  handleAddExpense = (e) => {
    e.preventDefault();

    const { dispatch, editor, expenses, idToEdit } = this.props;
    if (editor) {
      expenses[idToEdit] = { ...expenses[idToEdit], ...this.state };
      dispatch(upDateExpense(expenses));
    } else {
      dispatch(fetchToAddExpense(this.state));
    }
    this.setState({ value: '', description: '' });
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, currency, method, tag, description } = this.state;

    return (
      <div className="formExpenses">
        <form onSubmit={ this.handleAddExpense }>
          <label>
            Valor:
            <input
              type="text"
              data-testid="value-input"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label>
            Descrição:
            <input
              type="text"
              data-testid="description-input"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label>
            Moeda:
            <select
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {currencies.map((coin, index) => (
                <option key={ index } value={ coin }>
                  {coin}
                </option>
              ))}
            </select>
          </label>
          <label>
            Método de pagamento:
            <select
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label>
            Categoria:
            <select
              data-testid="tag-input"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button>{ editor ? 'Editar despesas' : 'Adicionar despesa' }</button>
        </form>
      </div>
    );
  }
}
WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  expenses: PropTypes.shape({
    find: PropTypes.func,
  }).isRequired,
  idToEdit: PropTypes.number.isRequired,
};
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  idToEdit: state.wallet.idToEdit,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
});

export default connect(mapStateToProps)(WalletForm);
