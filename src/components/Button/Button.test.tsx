import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './button';

describe('Button test cases', () => {
  test('should render button with text', () => {
    render(<Button>Hello</Button>);

    const buttonElement = screen.getByText('Hello');

    expect(buttonElement).toBeInTheDocument();
  });

  test('should apply custom CSS class', () => {
    const { container } = render(<Button className="custom-class">Click Me</Button>);

    const buttonElement = container.querySelector('.custom-class');

    expect(buttonElement).toBeInTheDocument();
  });

  test('should check that click event handler is called', async () => {
    const onClick = jest.fn();

    render(<Button onClick={onClick}>Click Me</Button>);

    const buttonElement = screen.getByText('Click Me');

    await userEvent.click(buttonElement);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('should apply additional button attributes', () => {
    render(<Button data-testid="test-button">Test</Button>);

    const buttonElement = screen.getByTestId('test-button');

    expect(buttonElement).toBeInTheDocument();
  });
});
