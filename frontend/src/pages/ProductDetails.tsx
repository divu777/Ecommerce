import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  description: string;
  photo: string;
  slug: string;
  price: number;
}

const ProductDetails = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const params = useParams();

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3030/api/v1/product/single-product/${params.slug}`
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

  const handleAddToCart = () => {
    console.log("Product added to cart:", product);
    // Implement add to cart functionality here
  };

  const getSimilarProducts = async (productId: string, categoryId: string) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3030/api/v1/product/related-product/${productId}/${categoryId}`
      );
      setRelatedProducts(data?.products);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout desc={""} keyw={""} auth={""} title={"Product Details"}>
      <div className="container mx-auto py-8">
        {product && (
          <div className="flex flex-wrap items-center">
            {/* Product Image */}
            <div className="w-full md:w-1/2">
              <img
                className="w-full h-auto rounded-lg shadow-md"
                src={`http://localhost:3030/api/v1/product/product-photo/${product._id}`}
                alt={product.name}
              />
            </div>
            {/* Product Details */}
            <div className="w-full md:w-1/2 px-4">
              <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-gray-800 font-semibold mb-2">
                Price: ${product.price}
              </p>
              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md mb-4"
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
                className="bg-white overflow-hidden shadow-sm rounded-lg"
              >
                <img
                  className="w-full h-48 object-cover"
                  src={`http://localhost:3030/api/v1/product/product-photo/${relatedProduct._id}`}
                  alt={relatedProduct.name}
                />
                <div className="p-4">
                  <h5 className="text-lg font-semibold text-gray-900">
                    {relatedProduct.name}
                  </h5>
                  <p className="mt-2 text-sm text-gray-600">
                    {relatedProduct.description}
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    Price: ${relatedProduct.price}
                  </p>
                  {/* Add to Cart Button for Similar Products */}
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md mt-4">
                    Add to Cart
                  </button>
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
