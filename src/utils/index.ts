import { Product } from '../store/store.types';

export function checkMode() {
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

export const toggleDarkMode = (isDarkModeOn: boolean) => {
  if (isDarkModeOn) {
    localStorage.theme = 'dark';
  } else {
    localStorage.theme = 'light';
  }
  checkMode();
};

const getFilteredProductsByTitle = (products: Product[], titleQuery: string) => {
  return products?.filter((product) => `${product.title}`.toLowerCase().includes(titleQuery.toLowerCase()));
};

const getFilteredProductsByCategory = (products: Product[], categoryQuery: string) => {
  return products?.filter((product) => `${product.category}`.toLowerCase().includes(categoryQuery.toLowerCase()));
};

export const filterBy = (filterType: 'title' | 'category' | 'category and title' | null, titleQuery: string, categoryQuery: string, products: Product[]) => {
  if (products && filterType === 'title') {
    return getFilteredProductsByTitle(products, titleQuery);
  }

  if (products && filterType === 'category') {
    return getFilteredProductsByCategory(products, categoryQuery);
  }

  if (products && filterType === 'category and title') {
    return getFilteredProductsByCategory(products, categoryQuery).filter((product) => product.title.toLowerCase().includes(titleQuery.toLowerCase()));
  }

  return products;
};
