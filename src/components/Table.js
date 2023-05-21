import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { excludeExpense, toEditExpense } from '../redux/actions';

class Table extends Component {
  // função para buscar por id index editado do expenses;
  editExpense = (id) => {
    const { expenses } = this.props;
    const idToEdit = expenses.findIndex((exp) => exp.id === id);
    const { dispatch } = this.props;
    dispatch(toEditExpense(idToEdit));
  };

  render() {
    const { expenses, dispatch } = this.props;
    console.log(expenses);
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{(+expense.value).toFixed(2)}</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>{(+expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
                <td>
                  {((+expense.value) * (+expense.exchangeRates[expense.currency]
                    .ask)).toFixed(2) }
                </td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="edit-btn"
                    onClick={ () => this.editExpense(expense.id) }
                  >
                    Editar
                  </button>
                  <button
                    data-testid="delete-btn"
                    onClick={ () => { dispatch(excludeExpense(expense)); } }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.wallet,
});

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
  })).isRequired,
};

export default connect(mapStateToProps)(Table);
