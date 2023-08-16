import * as React from 'react';
import { useEffect } from 'react';
import Layout from '../../components/Layout';
import ProductCard from '../../components/ProductCard';
import { useSearchItems } from '../../hooks';
import { useAppStore } from '../../store';

const Home = (): JSX.Element => {
  const setProducts = useAppStore((state) => state.setProducts);
  const products = useAppStore((state) => state.products);
  const { query, setQuery, filteredItems } = useSearchItems(products);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=20')
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setQuery(event.target.value);
  };

  return (
    <Layout>
      <div className="w-full flex flex-col justify-center items-center">
        <h1 className="text-3xl dark:text-white mb-10">Home</h1>
        <input
          type="text"
          placeholder="Search a product"
          value={query}
          className="w-80 h-8 p-2 mb-6 border border-black dark:border-white rounded-lg focus:outline-none bg-transparent text-black dark:text-white"
          onChange={handleSearchChange}
        />
        <div className="mb-10 grid grid-cols-1 md:grid-cols-4 gap-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((product) => {
              return <ProductCard key={product.id} {...product} />;
            })
          ) : (
            <div className="col-span-full text-black dark:text-white">We don't have results for this search</div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
