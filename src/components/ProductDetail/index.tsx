import { useAppStore } from '../../store';

const ProductDetail = () => {
  const showProductDetail = useAppStore((state) => state.showProductDetail);
  const setShowProductDetail = useAppStore((state) => state.setShowProductDetail);
  const { image, title, price, description } = useAppStore((state) => state.currentProduct);

  return (
    <aside
      className={`w-80 h-[calc(100vh-75px)] mt-[70px] p-4  border border-black dark:border-white rounded-lg ${showProductDetail ? 'flex' : 'hidden'}  flex-col fixed top-1 right-4 overflow-y-scroll`}
    >
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl text-center text-black dark:text-white">ProductDetail</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 relative top-0 right-0 cursor-pointer text-black dark:text-white"
          onClick={() => setShowProductDetail(false)}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <figure className="mb-4">
        <img className="w-full h-full rounded-lg" src={image} alt={title} />
      </figure>
      <p className="flex flex-col gap-2">
        <span className="font-semibold text-lg text-center text-black dark:text-white">${price}</span>
        <span className="text-black dark:text-white">{title}</span>
        <span className="font-light text-black dark:text-white">{description}</span>
      </p>
    </aside>
  );
};

export default ProductDetail;
