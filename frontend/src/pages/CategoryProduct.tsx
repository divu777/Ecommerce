import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
interface Product {
  _id: string;
  name: string;
  description: string;
  photo: string;
  slug: string;
  price: number;
}

const CategoryProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<any>(null); // Initialize as null or specify a type
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getProductsByCat = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3030/api/v1/product/product-category/${params.slug}`
        );
        setProducts(data?.products);
        setCategory(data?.category);
      } catch (err) {
        console.log(err);
      }
    };

    getProductsByCat();
  }, [params.slug]);

  return (
    <Layout desc={""} keyw={""} auth={""} title={""}>
      <div>
        <h1>{category?.name}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <div
              key={product._id}
              className="bg-white overflow-hidden shadow-sm rounded-lg"
            >
              <img
                className="w-full h-48 object-cover"
                src={`http://localhost:3030/api/v1/product/product-photo/${product._id}`}
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

export default CategoryProduct;
