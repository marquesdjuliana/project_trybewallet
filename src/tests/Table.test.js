import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import Table from '../components/Table';
import { excludeExpense, toEditExpense } from '../redux/actions';
import mockData from './helpers/mockData';

describe('Table component test', () => {
  const expenses = [
    {
      id: 1,
      value: '10',
      description: 'Expense 1',
      currency: 'USD',
      method: 'Cash',
      tag: 'Food',
      exchangeRates: {
        [mockData.USD.code]: {
          name: mockData.USD.name,
          ask: mockData.USD.ask,
        },
      },
    },
  ];

  const mockStore = {
    getState: () => ({
      wallet: {
        expenses,
      },
    }),
    dispatch: jest.fn(),
    subscribe: jest.fn(),
  };

  test('Dispatches excludeExpense action when delete button is clicked', () => {
    render(
      <Provider store={ mockStore }>
        <Table />
      </Provider>,
    );

    const deleteButton = screen.getByTestId('delete-btn');
    fireEvent.click(deleteButton);

    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
    expect(mockStore.dispatch).toHaveBeenCalledWith(excludeExpense(expenses[0]));
  });

  test('Dispatches toEditExpense action when edit button is clicked', () => {
    render(
      <Provider store={ mockStore }>
        <Table />
      </Provider>,
    );

    const editButton = screen.getByTestId('edit-btn');
    fireEvent.click(editButton);

    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
    expect(mockStore.dispatch).toHaveBeenCalledWith(toEditExpense(0));
  });
});
