import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const totalExpenses = () => {
      const sum = expenses.reduce((acc, cur) => acc
        + cur.exchangeRates[cur.currency].ask * +(cur.value), 0);
      return sum.toFixed(2);
    };
    return (
      <div className="header">
        <div>
          <h2 className="email" data-testid="email-field">{`Email: ${email}`}</h2>
        </div>
        <div className="wallet">
          <p>{'Despesa total: R$ '}</p>
          {/* <h2 className="wallet-text" data-testid="total-field">{total.toFixed(2)}</h2> */}
          <h2 className="wallet-text" data-testid="total-field">{totalExpenses()}</h2>

          <h2 className="currency" data-testid="header-currency-field">BRL</h2>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  // total: state.wallet.total,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  // total: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    currency: PropTypes.string,
  })).isRequired,
};

export default connect(mapStateToProps)(Header);
