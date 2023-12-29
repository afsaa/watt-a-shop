import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCard from './productCard';

describe('ProductCard test cases', () => {
  const mockProductCardProps = {
    id: 1,
    category: 'test-category',
    description: 'Test Description',
    image: 'test-image-url',
    price: 10,
    title: 'Test Item',
    isProductInCart: false,
    rating: {
      rate: 4,
      count: 100,
    },
    handleShowProductDetail: jest.fn(),
    handleAddProductToCart: jest.fn(),
  };

  test('should render the product card correctly', () => {
    render(<ProductCard {...mockProductCardProps} />);

    const imageElement = screen.getByAltText('Test Description');
    const titleElement = screen.getByText('Test Item');
    const priceElement = screen.getByText('$10');
    const categoryElement = screen.getByText('test-category');

    expect(imageElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
    expect(categoryElement).toBeInTheDocument();
  });

  test('should call handleShowProductDetail when product card is clicked', async () => {
    render(<ProductCard {...mockProductCardProps} />);

    const productCard = screen.getByTestId('productCard-container');
    await userEvent.click(productCard);

    expect(mockProductCardProps.handleShowProductDetail).toHaveBeenCalled();
  });

  test('should call handleAddProductToCart when add to cart icon is clicked', async () => {
    render(<ProductCard {...mockProductCardProps} />);

    const addToCartIconContainer = screen.getByTestId('addToCartIcon-container');
    await userEvent.click(addToCartIconContainer);

    expect(mockProductCardProps.handleAddProductToCart).toHaveBeenCalled();
  });
});
