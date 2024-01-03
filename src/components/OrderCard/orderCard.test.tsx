import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import OrderCard from './orderCard';
import { OrderCardProps } from './orderCard.type';

// Mock the useNavigate hook from 'react-router-dom'
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('OrderCard test cases', () => {
  const defaultProps: OrderCardProps = {
    id: '1',
    date: new Date(),
    products: [
      {
        id: 1,
        title: 'Test Product',
        description: 'Test Product',
        category: 'Test Product',
        price: 9.99,
        image: 'https://picsum.photos/200',
        rating: {
          count: 1,
          rate: 1,
        },
      },
    ],
    totalProducts: 1,
    totalPrice: 9.99,
    handleSetCurrentOrder: jest.fn(),
  };

  const renderComponent = (props: OrderCardProps) => {
    return render(
      <Router>
        <OrderCard {...props} />
      </Router>
    );
  };

  test('should render without crashing', () => {
    renderComponent(defaultProps);

    expect(screen.getByTestId('orderCard-container')).toBeInTheDocument();
  });

  test('should call handleSetCurrentOrder when clicked', async () => {
    renderComponent(defaultProps);

    await userEvent.click(screen.getByTestId('orderCard-container'));

    expect(defaultProps.handleSetCurrentOrder).toHaveBeenCalled();
  });
});
