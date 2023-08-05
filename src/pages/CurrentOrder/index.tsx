import Layout from '../../components/Layout';
import { useAppStore } from '../../store';

const CurrentOrder = () => {
  const currentOrder = useAppStore((state) => state.currentOrder);

  return (
    <Layout>
      <div className="w-96 flex flex-col justify-center items-center dark:text-white">
        <h1 className="mb-6 text-3xl">Current Order</h1>
        <div>
          <div className="flex flex-col justify-between items-center gap-4">
            {currentOrder.products.map((product) => (
              <div key={product.id} className="flex justify-between items-center gap-4">
                <figure className="w-40 h-auto">
                  <img className="w-full h-full" src={product.image} alt={product.description} />
                </figure>
                <p className="text-sm">{product.title}</p>
                <span className="font-semibold text-lg">${product.price}</span>
              </div>
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
    </Layout>
  );
};

export default CurrentOrder;
