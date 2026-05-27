import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio branding and hero', () => {
  render(<App />);
  expect(screen.getByText('Karthik')).toBeInTheDocument();
  expect(screen.getByText('Karthik R Kumar')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /about me/i })).toBeInTheDocument();
});
