import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';

import Login from '../pages/Login';
import App from '../App';

describe('Login', () => {
  test('should render Login page', () => {
    renderWithRouterAndRedux(<Login />);

    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  test('should dispatch addEmail action and redirect to /carteira on valid form submission', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password');
    userEvent.click(button);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');
    expect(screen.getByText(/despesa total:/i)).toBeInTheDocument();
  });
});
