import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Header from '../components/Header';

describe('Header component test', () => {
  test('Renders total field with correct value', () => {
    const expenses = [
      {
        id: 1,
        value: '10',
        description: 'Expense 1',
        currency: 'USD',
        method: 'Cash',
        tag: 'Food',
        exchangeRates: {
          USD: {
            name: 'Dollar',
            ask: '4.7531',
          },
        },
      },
    ];

    const mockStore = {
      getState: () => ({
        user: {
          email,
        },
        wallet: {
          expenses,
        },
      }),
      dispatch: jest.fn(),
      subscribe: jest.fn(),
    };

    render(
      <Provider store={ mockStore }>
        <Header />
      </Provider>,
    );

    const totalField = screen.getByTestId('total-field');
    expect(totalField).toHaveTextContent('47.53');
  });
});
