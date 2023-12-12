import { Layout, OrderCard } from '@components';
import { useAppStore } from '../../store';

const MyOrders = (): JSX.Element => {
  const orders = useAppStore((state) => state.orders);

  return (
    <Layout>
      <div className="w-full flex flex-col justify-center items-center">
        <h1 className="mb-10 text-3xl dark:text-white">My Orders</h1>
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <OrderCard key={order.id} {...order} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default MyOrders;
