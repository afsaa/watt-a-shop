import { ProductCardProps } from './productCard.type';

const ProductCard = ({ handleShowProductDetail, handleAddProductToCart, ...props }: ProductCardProps): JSX.Element => {
  const { category, description, image, price, title, isProductInCart } = props;

  return (
    <div data-testid="productCard-container" className="w-60 h-auto rounded-lg text-black dark:text-white cursor-pointer" onClick={() => handleShowProductDetail(props)}>
      <figure className="relative w-full h-4/5 rounded-lg">
        <span className="absolute bottom-0 left-0 m-2 p-1 rounded-lg bg-slate-300 dark:bg-slate-600 dark:text-white opacity-80 capitalize">{category}</span>
        <img className="w-full h-full object-cover rounded-lg" src={image} alt={description} />
        <div
          data-testid="addToCartIcon-container"
          className={`absolute top-0 right-0 w-7 h-7 m-1 p-1 flex justify-center items-center rounded-full bg-slate-400 dark:bg-slate-800 dark:text-white text-black ${
            isProductInCart ? 'opacity-50' : ''
          }`}
          onClick={(e) => handleAddProductToCart(e, props)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
      </figure>
      <div className="w-full h-1/5 flex justify-between items-center">
        <p className="truncate">{title}</p>
        <p className="text-center text-xl font-semibold">${price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
