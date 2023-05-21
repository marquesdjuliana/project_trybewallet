import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';

import mockData from './helpers/mockData';
import Wallet from '../pages/Wallet';
import WalletForm from '../components/WalletForm';
import walletReducer from '../redux/reducers/wallet';

describe('Wallet screen test', () => {
  test('Checks for text entries on the Wallet screen', () => {
    renderWithRouterAndRedux(<Wallet />);
    expect(screen.getAllByLabelText(/valor:/i)).toHaveLength(1);
    expect(screen.getAllByLabelText(/descrição:/i)).toHaveLength(1);
  });
  test('Checks if there is a button with the text "Add expense" on the Wallet screen', () => {
    renderWithRouterAndRedux(<Wallet />);
    expect(screen.getByRole('button', { name: /adicionar despesa/i })).toBeInTheDocument();
  });

  test('Checks if clicking the button clears the input fields', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const button = screen.getByRole('button', { name: /adicionar despesa/i });
    act(() => userEvent.click(button));

    const inputDescription = await screen.findByLabelText(/descrição:/i);
    const inputExpense = await screen.findByLabelText(/valor:/i);

    expect(inputExpense).toHaveValue('');
    expect(inputDescription).toHaveValue('');
  });
  test('Checks that it has the total expense, amount, and BRL currency elements', () => {
    renderWithRouterAndRedux(<Wallet />);

    screen.getByText(/despesa total: r\$/i);
    screen.getByRole('heading', { name: /brl/i });
    screen.getByRole('heading', { name: /0\.00/i });
  });
  test('Checks whether the API fetch for creating the expenses object is performed', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    await act(async () => {
      renderWithRouterAndRedux(<WalletForm />);
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
  test('Handles REQUEST_CURRENCIES action', () => {
    const initialState = {
      currencies: [],
      expenses: [],
      editor: false,
      idToEdit: 0,
      total: 0,
    };

    const action = {
      type: 'REQUEST_CURRENCIES',
      payload: ['USD', 'EUR', 'BRL'],
    };

    const newState = walletReducer(initialState, action);

    expect(newState.currencies).toEqual(['USD', 'EUR', 'BRL']);
  });
  test('Handles ADD_EXPENSE action', () => {
    const initialState = {
      currencies: [],
      expenses: [],
      editor: false,
      idToEdit: 0,
      total: 0,
    };

    const action = {
      type: 'ADD_EXPENSE',
      payload: {
        id: 1,
        value: 10,
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        description: 'Almoço',
        exchangeRates: {
          USD: { ask: 5 },
          EUR: { ask: 6 },
          BRL: { ask: 7 },
        },
      },
    };

    const newState = walletReducer(initialState, action);

    expect(newState.expenses).toHaveLength(1);
    expect(newState.expenses[0]).toEqual(action.payload);
    expect(newState.total).toEqual(50);
  });
  test('Handles EXCLUDE_EXPENSES action', () => {
    const initialState = {
      currencies: [],
      expenses: [
        { id: 1, value: 10, currency: 'USD', method: 'Dinheiro', tag: 'Alimentação', description: 'Almoço' },
        { id: 2, value: 20, currency: 'EUR', method: 'Cartão de crédito', tag: 'Lazer', description: 'Cinema' },
        { id: 3, value: 30, currency: 'BRL', method: 'Cartão de débito', tag: 'Transporte', description: 'Uber' },
      ],
      editor: false,
      idToEdit: 0,
      total: 60,
    };

    const action = {
      type: 'EXCLUDE_EXPENSES',
      payload: { id: 2 },
    };

    const newState = walletReducer(initialState, action);

    expect(newState.expenses).toHaveLength(2);
    expect(newState.expenses.some((expense) => expense.id === 2)).toBe(false);
    expect(newState.total).toEqual(60);
  });
});
