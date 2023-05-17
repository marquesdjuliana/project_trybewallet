import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import mockData from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import WalletForm from '../components/WalletForm';

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
  // test('Checks if after clicking the button, the information was entered in the store', async () => {
  //   jest.spyOn(global, 'fetch');
  //   const initialState = {
  //     user: {
  //       email: '',
  //     },
  //     wallet: {
  //       currencies: [],
  //       expenses: [],
  //       editor: false,
  //       idToEdit: 0,
  //       total: 0,
  //     },
  //   };

  //   const initialEntries = ['/carteira'];
  //   const { store } = renderWithRouterAndRedux(
  //     <WalletForm />,
  //     { initialEntries, initialState },
  //   );
  //   const button = screen.getByRole('button', { name: /adicionar despesa/i });
  //   act(() => userEvent.click(button));
  //   expect(global.fetch).toHaveBeenCalled();
  //   expect(store.getState().wallet.expenses).toHaveLength(0);
  // });
});
