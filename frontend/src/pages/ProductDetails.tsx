import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/Cart";

interface Product {
  _id: string;
  name: string;
  description: string;
  photo: string;
  slug: string;
  price: number;
}

const ProductDetails = () => {
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const params = useParams();

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/product/single-product/${
          params.slug
        }`
      );
      setProduct(data?.product);
      getSimilarProducts(data?.product._id, data?.product.category._id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getSimilarProducts = async (productId: string, categoryId: string) => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/product/related-product/${productId}/${categoryId}`
      );
      setRelatedProducts(data?.products);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout desc={""} keyw={""} auth={""} title={"Product Details"}>
      <div className="container mx-auto py-8 ">
        {product && (
          <div className="flex flex-wrap items-center  w-full ">
            {/* Product Image */}
            <div className="w-full md:w-1/2">
              <img
                className="w-full h-auto rounded-lg shadow-2xl"
                src={`${
                  import.meta.env.VITE_BACKEND_URL
                }/api/v1/product/product-photo/${product._id}`}
                alt={product.name}
              />
            </div>
            {/* Product Details */}
            <div className="w-full md:w-1/2 px-4  h-auto">
              <h2 className="text-3xl font-bold relative bottom-5">
                {product.name}
              </h2>
              <p className="text-gray-800 font-semibold  text-2xl ">
                Price: ${product.price}
              </p>
              <p className="text-gray-600 relative bottom-5">
                MRP inclusive of all taxes
              </p>
              <p className="text-2xl font-semibold uppercase text-gray-800 ">
                Product details :{" "}
              </p>

              <p className="text-gray-600 mb-10">{product.description}</p>

              {/* Add to Cart Button */}

              <button
                className=" bg-gray-800 text-white  hover:bg-black font-semibold py-2 px-4 rounded-lg shadow-md mb-4 w-full relative"
                onClick={() => {
                  setCart([...cart, product]);
                  localStorage.setItem(
                    "cart",
                    JSON.stringify([...cart, product])
                  );
                  toast.success("Added to cart successfully");
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        )}
        {/* Similar Products Section */}

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Similar Products</h2>
          {relatedProducts.length < 1 && <p>No Similar Products</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct._id}
                className="bg-white overflow-hidden shadow-xl rounded-lg"
              >
                <img
                  className="w-full h-48 object-cover"
                  src={`${
                    import.meta.env.VITE_BACKEND_URL
                  }/api/v1/product/product-photo/${relatedProduct._id}`}
                  alt={relatedProduct.name}
                />
                <div className="p-4">
                  <h5 className="text-lg font-semibold text-gray-900 ">
                    {/* {product.name} */}
                    {relatedProduct.name.slice(0, 40)}
                    {relatedProduct.name.length > 50 && "..."}
                  </h5>
                  <p className="mt-2 text-sm text-gray-600">
                    {relatedProduct.description.slice(0, 50)}
                    {relatedProduct.description.length > 50 && "..."}
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    Price: ${relatedProduct.price}
                  </p>
                  {/* Add to Cart Button for Similar Products */}
                  <div className="mt-4 flex justify-between items-center">
                    <Link
                      to={`/product/${relatedProduct.slug}`}
                      className="text-gray-700 hover:text-gray-900"
                    >
                      View
                    </Link>
                    <button
                      className="px-3 py-1 bg-gray-800 text-white rounded-lg hover:bg-black
                    "
                      onClick={() => {
                        setCart([...cart, product]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, product])
                        );
                        toast.success("Added to cart successfully");
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
