import { OrderProductItem } from '@/components';
import { useAppStore } from '@/store';
import { Link } from 'react-router-dom';

const CurrentOrder = () => {
  const currentOrder = useAppStore((state) => state.currentOrder);

  return (
    <div className="w-96 flex flex-col justify-center items-center dark:text-white">
      <div className="w-full mb-10 relative">
        <Link to="/my-orders" className="flex justify-center items-center absolute left-0 top-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </Link>
        <h1 className="text-3xl ml-32">Current Order</h1>
      </div>
      <div className="mb-10">
        <div className="flex flex-col justify-between items-center gap-4">
          {currentOrder.products.map((product) => (
            <OrderProductItem key={product.id} {...product} />
          ))}
        </div>
        <div className="mt-4">
          <p className="mb-2 flex justify-between items-center">
            <span>Number of products:</span>
            <span>{currentOrder.totalProducts}</span>
          </p>
          <p className="flex justify-between items-center">
            <span>Total:</span>
            <span className="font-semibold">${currentOrder.totalPrice.toFixed(2)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrentOrder;
