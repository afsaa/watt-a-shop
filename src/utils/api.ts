export const fetchProducts = async () => {
  const response = await fetch('https://fakestoreapi.com/products?limit=20');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};
