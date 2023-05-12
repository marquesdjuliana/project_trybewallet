import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends Component {
  render() {
    const { email, wallet } = this.props;
    return (
      <div className="header">
        <div>
          <h2 className="email" data-testid="email-field">{`Email: ${email}`}</h2>
        </div>
        <div className="wallet">
          <h2 className="wallet-text" data-testid="total-field">
            {`Despesa total: R$ ${wallet}`}
          </h2>
          <h2 className="currency" data-testid="header-currency-field">BRL</h2>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  wallet: state.wallet.total,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  wallet: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
