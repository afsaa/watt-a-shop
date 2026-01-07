// FILEPATH: /Users/afsaa/Documents/watt-a-shop/src/components/ProductDetail/productDetail.test.tsx

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Provide a mocked store state before importing the component so selectors resolve correctly
const mockSetShowProductDetail = jest.fn();
const mockState: any = {
  showProductDetail: true,
  setShowProductDetail: mockSetShowProductDetail,
  currentProduct: {
    title: 'Test Product',
    description: 'Test Description',
    price: 100,
    image: 'test-image-url',
  },
};

jest.mock('../../store', () => ({
  useAppStore: (selector: any) => selector(mockState),
}));

import ProductDetail from './productDetail';

describe('ProductDetail test cases', () => {
  test('should render the product detail correctly', () => {
    render(<ProductDetail />);

    const imageElement = screen.getByAltText('Test Product');
    const titleElement = screen.getByText('Test Product');
    const priceElement = screen.getByText('$100');

    expect(imageElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
  });

  test('should call handleShowProductDetail when close icon is clicked', async () => {
    render(<ProductDetail />);

    const closeButton = screen.getByTestId('closeIcon');

    await userEvent.click(closeButton);

    expect(mockSetShowProductDetail).toHaveBeenCalledWith(false);
  });
});
