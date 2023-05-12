import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginSubmit } from '../redux/actions'; // importe a action loginSubmit que vai salvar o email no estado global do Redux

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    // verifique se o email e a senha são válidos
    const lengthSix = 6;
    if (/\S+@\S+\.\S+/.test(email) && password.length >= lengthSix) {
      const { history, dispatch } = this.props;
      // envie o email para o estado global do Redux
      dispatch(loginSubmit(email));

      // redirecione o usuário para a rota /carteira
      history.push('/carteira');
    }
  };

  render() {
    const { email, password } = this.state;
    const lengthSix = 6;
    const isButtonDisabled = !(/\S+@\S+\.\S+/.test(email) && password.length >= lengthSix);

    return (
      <form onSubmit={ this.handleSubmit }>
        <div>
          <label htmlFor="email-input">E-mail:</label>
          <input
            type="email"
            id="email-input"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            data-testid="email-input"
            required
          />
        </div>
        <div>
          <label htmlFor="password-input">Senha:</label>
          <input
            type="password"
            id="password-input"
            name="password"
            value={ password }
            onChange={ this.handleChange }
            data-testid="password-input"
          />
        </div>
        <button disabled={ isButtonDisabled }>Entrar</button>
      </form>
    );
  }
}
Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default connect()(Login);
