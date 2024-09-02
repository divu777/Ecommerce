const ProductSkeleton = () => (
  <div className="bg-white overflow-hidden shadow-xl w-96 animate-pulse">
    <div className="w-full h-80 bg-gray-300"></div>
    <div className="p-4 flex flex-col h-48">
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
      <div className="mt-auto flex justify-between items-center">
        <div className="h-8 bg-gray-300 rounded w-16"></div>
        <div className="h-8 bg-gray-300 rounded w-24"></div>
      </div>
    </div>
  </div>
);

const ProductGridSkeleton = ({ count = 6 }) => {
  return (
    <div className="flex p-4 w-screen flex-col justify-center px-32">
      <div className="h-12 bg-gray-300 rounded w-1/3 mb-8"></div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {[...Array(count)].map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
      <div className="flex justify-center my-8">
        <div className="h-10 bg-gray-300 rounded w-32"></div>
      </div>
    </div>
  );
};

export default ProductGridSkeleton;
