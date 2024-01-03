import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CartItem from './cartItem';
import userEvent from '@testing-library/user-event';

describe('CartItem test cases', () => {
  const mockCartItem = {
    id: 1,
    image: 'test-image-url',
    title: 'Test Item',
    description: 'Test Description',
    price: 10,
    category: 'test-category',
    rating: {
      count: 10,
      rate: 5,
    },
    handleRemoveFromCart: jest.fn(),
  };

  test('should render the cart item correctly', () => {
    render(<CartItem {...mockCartItem} />);

    const imageElement = screen.getByAltText('Test Item');
    const titleElement = screen.getByText('Test Item');
    const priceElement = screen.getByText('$10');

    expect(imageElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
  });

  test('should call handleRemoveFromCart when remove button is clicked', async () => {
    render(<CartItem {...mockCartItem} />);

    const removeButton = screen.getByTestId('remove-icon');

    await userEvent.click(removeButton);

    expect(mockCartItem.handleRemoveFromCart).toHaveBeenCalled();
  });
});
