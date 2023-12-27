import { OrderCard } from '@/components';
import { useAppStore } from '../../store';
import { Order } from '../../store/store.types';

const MyOrders = (): JSX.Element => {
  const orders = useAppStore((state) => state.orders);
  const setCurrentOrder = useAppStore((state) => state.setCurrenOrder);

  const handleSetCurrentOrder = (currentOrder: Order) => {
    setCurrentOrder(currentOrder);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="mb-10 text-3xl dark:text-white">My Orders</h1>
      <div className="mb-10 flex flex-col gap-4">
        {orders.map((order) => (
          <OrderCard key={order.id} {...order} handleSetCurrentOrder={handleSetCurrentOrder} />
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
