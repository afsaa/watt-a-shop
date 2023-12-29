// FILEPATH: /Users/afsaa/Documents/watt-a-shop/src/components/ProductDetail/productDetail.test.tsx

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductDetail from './productDetail';

describe('ProductDetail test cases', () => {
  const mockProductDetailProps = {
    id: 1,
    category: 'test-category',
    rating: {
      rate: 4,
      count: 100,
    },
    showProductDetail: true,
    handleShowProductDetail: jest.fn(),
    image: 'test-image-url',
    title: 'Test Product',
    description: 'Test Description',
    price: 100,
  };

  test('should render the product detail correctly', () => {
    render(<ProductDetail {...mockProductDetailProps} />);

    const imageElement = screen.getByAltText('Test Product');
    const titleElement = screen.getByText('Test Product');
    const priceElement = screen.getByText('$100');

    expect(imageElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
  });

  test('should call handleShowProductDetail when close icon is clicked', async () => {
    render(<ProductDetail {...mockProductDetailProps} />);

    const closeButton = screen.getByTestId('closeIcon');

    await userEvent.click(closeButton);

    expect(mockProductDetailProps.handleShowProductDetail).toHaveBeenCalled();
  });
});
