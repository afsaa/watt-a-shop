import Button from '../Button/button';
import { PaginationProps } from './pagination.type';

const Pagination = ({ itemsPerPage, totalItems, currentPage, onPageChange }: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="mb-12">
      {[...Array(totalPages)].map((_, index) => (
        <Button
          className="mx-2 p-3 w-auto border border-black dark:border-white rounded-lg dark:text-white bg-slate-400 dark:bg-slate-800 text-black disabled:opacity-50"
          key={index}
          onClick={() => onPageChange(index + 1)}
          disabled={currentPage === index + 1}
        >
          {index + 1}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;
