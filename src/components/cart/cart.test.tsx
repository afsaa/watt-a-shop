import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Cart from './cart';
import { CartProps } from './cart.type';

// Mock the useNavigate hook from 'react-router-dom'
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Cart test cases', () => {
  const defaultProps: CartProps = {
    showCart: true,
    setShowCart: jest.fn(),
    cart: [],
    total: 0,
    handleCheckout: jest.fn(),
    currentOrderId: 1,
  };

  test('should render the cart when showCart is true', () => {
    render(<Cart {...defaultProps} />);

    expect(screen.getByText('Cart')).toBeInTheDocument();
  });

  test('Should render the cart with the passed product', () => {
    const props = { ...defaultProps, cart: [{ id: 1, title: 'Blue T-Shirt', description: '', price: 10, quantity: 1, category: 'Men clothes', image: '', rating: { count: 10, rate: 4 } }] };

    render(<Cart {...props} />);

    expect(screen.getByText('Blue T-Shirt')).toBeInTheDocument();
  });
});
