import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, wallet } = this.props;
    return (
      <div>
        <div>
          <h2 data-testid="email-field">{`Email: ${email}`}</h2>
        </div>
        <div>
          <h2 data-testid="total-field">{`Despesa total: R$ ${wallet}`}</h2>
          <h2 data-testid="header-currency-field">BRL</h2>
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
