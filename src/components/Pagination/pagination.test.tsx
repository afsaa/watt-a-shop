import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from './pagination';

describe('Pagination test cases', () => {
  test('renders correctly', () => {
    render(<Pagination itemsPerPage={10} totalItems={50} currentPage={1} onPageChange={() => {}} />);

    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
  });

  test('calls onPageChange with correct page number when a page button is clicked', async () => {
    const onPageChange = jest.fn();
    render(<Pagination itemsPerPage={10} totalItems={50} currentPage={1} onPageChange={onPageChange} />);

    await userEvent.click(screen.getByText('2'));

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  test('disables the button of the current page', () => {
    render(<Pagination itemsPerPage={10} totalItems={50} currentPage={1} onPageChange={() => {}} />);

    expect(screen.getByText('1')).toBeDisabled();
  });
});
