import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import Button from './button';

// Test Case 1: Renders the button with provided text
test('renders button with text', () => {
  const { getByText } = render(<Button>Hello</Button>);
  const buttonElement = getByText('Hello');
  expect(buttonElement).toBeInTheDocument();
});

// Test Case 2: Applies a custom CSS class to the button
test('applies custom CSS class', () => {
  const { container } = render(<Button className="custom-class">Click Me</Button>);
  const buttonElement = container.querySelector('.custom-class');
  expect(buttonElement).toBeInTheDocument();
});

// Test Case 3: Click event handler is called when button is clicked
test('click event handler is called', () => {
  const onClick = jest.fn();
  const { getByText } = render(<Button onClick={onClick}>Click Me</Button>);
  const buttonElement = getByText('Click Me');
  fireEvent.click(buttonElement);
  expect(onClick).toHaveBeenCalledTimes(1);
});

// Test Case 4: Additional button attributes are applied
test('applies additional button attributes', () => {
  const { getByTestId } = render(<Button data-testid="test-button">Test</Button>);
  const buttonElement = getByTestId('test-button');
  expect(buttonElement).toBeInTheDocument();
});
