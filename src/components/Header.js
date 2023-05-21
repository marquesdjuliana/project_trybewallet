import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const totalExpenses = () => { // Função que calcula o valor total das despesas
      const sum = expenses.reduce((acc, curr) => acc
        + curr.exchangeRates[curr.currency].ask * +(curr.value), 0); // A cada iteração, o valor da despesa é multiplicado pela taxa de câmbio correspondente à moeda da despesa, obtida através de cur.exchangeRates[cur.currency].ask. O resultado acumulado é atualizado na variável sum. No final, o valor total é formatado com duas casas decimais usando o método toFixed.
      return sum.toFixed(2);
    };
    return (
      <div className="header">
        <div>
          <h2 className="email" data-testid="email-field">{`Email: ${email}`}</h2>
        </div>
        <div className="wallet">
          <p>{'Despesa total: R$ '}</p>
          <h2 className="wallet-text" data-testid="total-field">{totalExpenses()}</h2>

          <h2 className="currency" data-testid="header-currency-field">BRL</h2>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  ...state.wallet,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    currency: PropTypes.string,
  })).isRequired,
};

export default connect(mapStateToProps)(Header);
