/* eslint-disable react-hooks/exhaustive-deps */
import { ProductCard } from '@/components';
import * as React from 'react';
import { useEffect } from 'react';
import useSWR from 'swr';
import { useAppStore } from '../../store';
import { Product } from '../../store/store.types';
import { filterBy } from '../../utils';
import { fetcher, SWRResponse } from '../../utils/api';

const Home = (): JSX.Element => {
  const cart = useAppStore((state) => state.shoppingCartProducts);
  const addProductToCart = useAppStore((state) => state.addProductToCart);
  const increaseCartCount = useAppStore((state) => state.increaseShoppingCartCount);
  const setShowProductDetail = useAppStore((state) => state.setShowProductDetail);
  const setShowCart = useAppStore((state) => state.setShowCart);
  const setCurrentProduct = useAppStore((state) => state.setCurrenProduct);
  const products: Product[] | undefined = useAppStore((state) => state.products);
  const setProducts = useAppStore((state) => state.setProducts);
  const setFilteredProducts = useAppStore((state) => state.setFilteredProducts);
  const filteredProducts = useAppStore((state) => state.filteredProducts);
  const titleQuery = useAppStore((state) => state.titleQuery);
  const categoryQuery = useAppStore((state) => state.categoryQuery);
  const setTitleQuery = useAppStore((state) => state.setTitleQuery);
  const { data, error, isLoading }: SWRResponse = useSWR('https://fakestoreapi.com/products', fetcher);

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

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

  const handleShowProductDetail: (product: Product) => void = (product) => {
    setCurrentProduct(product);
    setShowCart(false);
    setShowProductDetail(true);
  };

  const handleAddProductToCart: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, product: Product) => void = (event, product) => {
    event.stopPropagation();
    const isProductInCart: boolean = cart.some((foundProduct) => foundProduct.id === product.id);

    if (isProductInCart) {
      return;
    }
    addProductToCart(product);
    increaseCartCount(1);
    setShowProductDetail(false);
    setShowCart(true);
  };

  const renderProducts = () => {
    if (isLoading) {
      return (
        <>
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-gray-300 dark:bg-gray-700 w-60 h-80 rounded-lg"></div>
          ))}
        </>
      );
    }
    if (error) {
      return <div className="col-span-full text-black dark:text-white">An error has occurred</div>;
    }
    if (filteredProducts.length > 0) {
      return filteredProducts.map((filteredProduct) => {
        const isProductInCart: boolean = cart.some((foundProduct) => foundProduct.id === filteredProduct.id);

        return (
          <ProductCard
            key={filteredProduct.id}
            {...filteredProduct}
            isProductInCart={isProductInCart}
            handleShowProductDetail={handleShowProductDetail}
            handleAddProductToCart={handleAddProductToCart}
          />
        );
      });
    }
    if (titleQuery !== '' && filteredProducts.length === 0) {
      return <div className="col-span-full text-black dark:text-white">We don't have results for this search</div>;
    }
    return products.map((product) => {
      const isProductInCart: boolean = cart.some((foundProduct) => foundProduct.id === product.id);

      return <ProductCard key={product.id} {...product} isProductInCart={isProductInCart} handleShowProductDetail={handleShowProductDetail} handleAddProductToCart={handleAddProductToCart} />;
    });
  };

  return (
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
  );
};

export default Home;
