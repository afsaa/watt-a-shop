import { OrderCard } from '@/components';
import { useAppStore } from '@/store';
import { Order, User } from '@/store/store.types';

const MyOrders = (): JSX.Element => {
  const storedUser: User = JSON.parse(localStorage.getItem('user') || '{}');
  const setCurrentOrder = useAppStore((state) => state.setCurrenOrder);

  const handleSetCurrentOrder = (currentOrder: Order) => {
    setCurrentOrder(currentOrder);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="mb-10 text-3xl dark:text-white">My Orders</h1>
      {storedUser.orders.length === 0 && <p className="text-lg dark:text-white">No orders yet</p>}
      <div className="mb-10 flex flex-col gap-4">
        {storedUser.orders.length > 0 && storedUser.orders.map((order) => <OrderCard key={order.id} {...order} handleSetCurrentOrder={handleSetCurrentOrder} />)}
      </div>
    </div>
  );
};

export default MyOrders;
