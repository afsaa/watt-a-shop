/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useEffect } from 'react';
import Layout from '../../components/Layout';
import ProductCard from '../../components/ProductCard';
import { useAppStore } from '../../store';
import { Product } from '../../store/store.types';
import { filterBy } from '../../utils';

const Home = (): JSX.Element => {
  const products: Product[] | undefined = useAppStore((state) => state.products);
  const setProducts = useAppStore((state) => state.setProducts);
  const setFilteredProducts = useAppStore((state) => state.setFilteredProducts);
  const filteredProducts = useAppStore((state) => state.filteredProducts);
  const titleQuery = useAppStore((state) => state.titleQuery);
  const categoryQuery = useAppStore((state) => state.categoryQuery);
  const setTitleQuery = useAppStore((state) => state.setTitleQuery);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=20')
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
      });
  }, []);

  useEffect(() => {
    if (titleQuery !== '' && categoryQuery === '') setFilteredProducts(filterBy('title', titleQuery, categoryQuery, products));
    if (titleQuery === '' && categoryQuery !== '') setFilteredProducts(filterBy('category', titleQuery, categoryQuery, products));
    if (titleQuery !== '' && categoryQuery !== '') setFilteredProducts(filterBy('category and title', titleQuery, categoryQuery, products));
    if (titleQuery === '' && categoryQuery === '') setFilteredProducts(filterBy(null, titleQuery, categoryQuery, products));
  }, [products, titleQuery, categoryQuery]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTitleQuery(event.target.value);
  };

  const renderProducts = () => {
    if (filteredProducts.length > 0) {
      return filteredProducts.map((product) => <ProductCard key={product.id} {...product} />);
    }
    if (titleQuery !== '' && filteredProducts.length === 0) {
      return <div className="col-span-full text-black dark:text-white">We don't have results for this search</div>;
    }
    return products.map((product) => <ProductCard key={product.id} {...product} />);
  };

  return (
    <Layout>
      <div className="w-full flex flex-col justify-center items-center">
        <h1 className="text-3xl dark:text-white mb-10">Home</h1>
        <input
          type="text"
          placeholder="Search a product"
          value={titleQuery}
          className="w-auto md:w-80 h-8 p-2 mb-6 border border-black dark:border-white rounded-lg focus:outline-none bg-transparent text-black dark:text-white"
          onChange={handleSearchChange}
        />
        <div className="mb-10 grid grid-cols-1 md:grid-cols-4 gap-4">{renderProducts()}</div>
      </div>
    </Layout>
  );
};

export default Home;
