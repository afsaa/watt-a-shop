import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cart from './cart';

// Polyfill crypto.randomUUID for the jsdom test environment
if (!(global as any).crypto) {
  (global as any).crypto = { randomUUID: () => 'test-uuid' };
} else if (!(global as any).crypto.randomUUID) {
  (global as any).crypto.randomUUID = () => 'test-uuid';
}

// Shared mocks referenced by module-level jest.mock calls
let mockNavigate = jest.fn();
let mockState: any = {};

// Mock the useNavigate hook from 'react-router-dom' to use the shared `mockNavigate`
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock the `useAppStore` hook so selectors receive the mocked state object.
jest.mock('../../store', () => ({
  useAppStore: (selector: any) => selector(mockState),
}));

describe('Cart component', () => {
  const mockSetShowCart = jest.fn();
  const mockAddOrder = jest.fn();
  const mockSetCurrentOrder = jest.fn();
  const mockSetShoppingCartProducts = jest.fn();
  const mockSetShoppingCartCount = jest.fn();
  const mockRemoveProductFromCart = jest.fn();
  const mockDecreaseShoppingCartCount = jest.fn();
  const mockSetTitleQuery = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockState = {
      showCart: true,
      setShowCart: mockSetShowCart,
      shoppingCartProducts: [{ id: 1, title: 'Blue T-Shirt', price: 20 }],
      shoppingCartCount: 1,
      currentOrder: { id: '1' },
      addOrder: mockAddOrder,
      setCurrenOrder: mockSetCurrentOrder,
      setShoppingCartProducts: mockSetShoppingCartProducts,
      setShoppingCartCount: mockSetShoppingCartCount,
      removeProductFromCart: mockRemoveProductFromCart,
      decreaseShoppingCartCount: mockDecreaseShoppingCartCount,
      setTitleQuery: mockSetTitleQuery,
      isUserLoggedIn: true,
    };
  });

  test('should render the cart when showCart is true', () => {
    render(<Cart />);

    expect(screen.getByText('Cart')).toBeInTheDocument();
  });

  test('should render the cart with the passed product', () => {
    render(<Cart />);

    expect(screen.getByText('Blue T-Shirt')).toBeInTheDocument();
  });

  test('should close the cart when clicking the close icon button', async () => {
    render(<Cart />);

    const closeIconButton = screen.getByTestId('close-icon');

    await userEvent.click(closeIconButton);

    expect(mockSetShowCart).toHaveBeenCalledWith(false);
  });

  test('should call handleCheckout when clicking the checkout button', async () => {
    render(<Cart />);

    // Ensure localStorage has a user object with an orders array so spreading works
    localStorage.setItem('user', JSON.stringify({ orders: [] }));

    const checkoutButton = screen.getByText('Go to Checkout');

    await userEvent.click(checkoutButton);

    expect(mockAddOrder).toHaveBeenCalled();
    expect(mockSetCurrentOrder).toHaveBeenCalled();
    expect(mockSetShowCart).toHaveBeenCalledWith(false);
    expect(mockSetShoppingCartProducts).toHaveBeenCalledWith([]);
    expect(mockSetShoppingCartCount).toHaveBeenCalledWith(0);
    expect(mockSetTitleQuery).toHaveBeenCalledWith('');
  });

  test('should navigate to sign-in if user is not logged in', async () => {
    mockState.isUserLoggedIn = false;
    render(<Cart />);

    const checkoutButton = screen.getByText('Go to Checkout');

    await userEvent.click(checkoutButton);

    expect(mockNavigate).toHaveBeenCalledWith('/sign-in');
  });

  test('should remove product from cart when handleRemoveProductFromCart is called', async () => {
    render(<Cart />);

    const removeButton = screen.getByTestId('remove-icon');

    await userEvent.click(removeButton);

    expect(mockRemoveProductFromCart).toHaveBeenCalledWith(1);
    expect(mockDecreaseShoppingCartCount).toHaveBeenCalledWith(1);
  });
});
