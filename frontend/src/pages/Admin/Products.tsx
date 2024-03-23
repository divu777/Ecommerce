import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  description: string;
  photo: string;
  slug: string;
  // Add any other properties of the Product type
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3030/api/v1/product/get-product"
      );
      setProducts(data.products); // Update state with data.products
    } catch (err) {
      console.log(err);
      toast.error("Error in fetching products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout desc={""} keyw={""} auth={""} title={" Product"}>
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            All Products List
          </h1>
        </div>
      </div>
      <AdminMenu />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <Link
              key={p._id}
              to={`/dashboard/admin/product/${p.slug}`}
              className="bg-white overflow-hidden shadow-sm rounded-lg"
            >
              <img
                className="w-full h-48 object-cover"
                src={`http://localhost:3030/api/v1/product/product-photo/${p._id}`}
                alt={p.name}
              />
              <div className="p-4">
                <h5 className="text-lg font-semibold text-gray-900">
                  {p.name}
                </h5>
                <p className="mt-2 text-sm text-gray-600">{p.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
