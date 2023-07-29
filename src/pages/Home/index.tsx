import { useEffect } from 'react';
import Layout from '../../components/Layout';
import ProductCard from '../../components/ProductCard';
import { useAppStore } from '../../store';

const Home = (): JSX.Element => {
  const setProducts = useAppStore((state) => state.setProducts);
  const products = useAppStore((state) => state.products);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=20')
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);

  return (
    <Layout>
      <div className="w-full flex flex-col justify-center items-center">
        <h1 className="text-3xl dark:text-white mb-10">Home</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {products.map((product) => {
            return <ProductCard key={product.id} {...product} />;
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
