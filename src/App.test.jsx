import React from 'react';
import { render, screen, act } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  global.fetch = jest.fn(async () => ({
    json: async () => [
      {
        id: 1,
        userId: 2,
        title: `Work out`,
        completed: false,
      },
    ],
  }));
});

// test('renders title', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/Daily TODOS Reducer/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('renders title', async () => {
  await act(async () => render(<App />));

  const linkElement = screen.getByText(/123/i);
  // const linkElement = screen.getBy/
  expect(linkElement).toBeInTheDocument();
});
