/* eslint-disable react-hooks/exhaustive-deps */
import { Pagination, ProductCard } from '@/components';
import { useQuery } from '@tanstack/react-query';
import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppStore } from '../../store';
import { Product } from '../../store/store.types';
import { filterBy } from '../../utils';
import { fetchProducts } from '../../utils/api';

const Home = (): JSX.Element => {
  const { isLoading, error, data: products } = useQuery<Product[] | [], Error>({ queryKey: ['products'], queryFn: fetchProducts });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 8;
  const totalItems = useMemo(() => products?.length, [products]) || 0;

  const cart = useAppStore((state) => state.shoppingCartProducts);
  const addProductToCart = useAppStore((state) => state.addProductToCart);
  const increaseCartCount = useAppStore((state) => state.increaseShoppingCartCount);
  const setCurrentProduct = useAppStore((state) => state.setCurrenProduct);
  const productsToShow = useAppStore((state) => state.productsToShow);
  const setProductsToShow = useAppStore((state) => state.setProductsToShow);
  const setFilteredProducts = useAppStore((state) => state.setFilteredProducts);
  const filteredProducts = useAppStore((state) => state.filteredProducts);
  const titleQuery = useAppStore((state) => state.titleQuery);
  const categoryQuery = useAppStore((state) => state.categoryQuery);
  const setTitleQuery = useAppStore((state) => state.setTitleQuery);
  const setShowCart = useAppStore((state) => state.setShowCart);
  const setShowProductDetail: (show: boolean) => void = useAppStore((state) => state.setShowProductDetail);

  useEffect(() => {
    if (titleQuery !== '' && categoryQuery === '') setFilteredProducts(filterBy('title', titleQuery, categoryQuery, productsToShow));
    if (titleQuery === '' && categoryQuery !== '') setFilteredProducts(filterBy('category', titleQuery, categoryQuery, productsToShow));
    if (titleQuery !== '' && categoryQuery !== '') setFilteredProducts(filterBy('category and title', titleQuery, categoryQuery, productsToShow));
    if (titleQuery === '' && categoryQuery === '') setFilteredProducts(filterBy(null, titleQuery, categoryQuery, productsToShow));
  }, []);

  useEffect(() => {
    if (products) setProductsToShow(products, currentPage, itemsPerPage);
  }, []);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTitleQuery(event.target.value);
  }, []);

  const handleShowProductDetail: (product: Product) => void = useCallback((product) => {
    setCurrentProduct(product);
    setShowCart(false);
    setShowProductDetail(true);
  }, []);

  const handleAddProductToCart: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, product: Product) => void = useCallback((event, product) => {
    event.stopPropagation();
    const isProductInCart: boolean = cart.some((foundProduct) => foundProduct.id === product.id);

    if (isProductInCart) {
      return;
    }
    addProductToCart(product);
    increaseCartCount(1);
    setShowProductDetail(false);
    setShowCart(true);
  }, []);

  const renderProducts = () => {
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
      return <span className="col-span-full text-black dark:text-white">We don't have results for this search</span>;
    }
    return productsToShow.map((product) => {
      const isProductInCart: boolean = cart.some((foundProduct) => foundProduct.id === product.id);

      return <ProductCard key={product.id} {...product} isProductInCart={isProductInCart} handleShowProductDetail={handleShowProductDetail} handleAddProductToCart={handleAddProductToCart} />;
    });
  };

  if (isLoading) return <span className="col-span-full text-black dark:text-white">Loading...</span>;

  if (error) return <span className="col-span-full text-black dark:text-white">An error has occurred: {error.message}</span>;

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
      <Pagination itemsPerPage={itemsPerPage} totalItems={totalItems} currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  );
};

const MemoizedHome = React.memo(Home);
export default MemoizedHome;
