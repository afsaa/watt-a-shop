import { OrderCard } from '@/components';
import { useAppStore } from '../../store';

const MyOrders = (): JSX.Element => {
  const orders = useAppStore((state) => state.orders);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="mb-10 text-3xl dark:text-white">My Orders</h1>
      <div className="mb-10 flex flex-col gap-4">
        {orders.map((order) => (
          <OrderCard key={order.id} {...order} />
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
