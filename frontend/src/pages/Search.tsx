import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/Search";
import { Link } from "react-router-dom";

const Search = () => {
  const [values] = useSearch();

  return (
    <Layout desc={""} keyw={""} auth={""} title={"Search Result"}>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4">Search Result</h1>
        <h6 className="mb-4">
          {values?.results.length < 1
            ? "No products Found"
            : `Found ${values?.results.length}`}
        </h6>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {values?.results.map((product: any) => (
            <div
              key={product._id}
              className="bg-white overflow-hidden shadow-sm rounded-lg"
            >
              <img
                className="w-full h-48 object-cover"
                src={`${
                  import.meta.env.VITE_BACKEND_URL
                }/api/v1/product/product-photo/${product._id}`}
                alt={product.name}
              />
              <div className="p-4">
                <h5 className="text-lg font-semibold text-gray-900">
                  {product.name}
                </h5>
                <p className="mt-2 text-sm text-gray-600">
                  {product.description}
                </p>
                <p className="mt-2 text-sm text-gray-600">${product.price}</p>
                <div className="mt-4 flex justify-between items-center">
                  <Link
                    to={`/product/${product.slug}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View
                  </Link>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-800">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
