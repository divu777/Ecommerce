import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/Cart";

interface Product {
  _id: string;
  name: string;
  description: string;
  photo: string;
  slug: string;
  price: number;
}

interface Category {
  _id: string;
  name: string;
}

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [checked, setChecked] = useState<string[]>([]);
  const [radio, setRadio] = useState<string[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:3030/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3030/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:3030/api/v1/product/get-product`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error("Error in getting products");
    }
  };
  useEffect(() => {
    getAllProducts();
    getTotal();
  }, []);

  useEffect(() => {
    if (!checked.length || !radio.length) getCategories();
  }, [checked.length, radio.length]);
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3030/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting categories");
    }
  };

  const handleFilter = (value: boolean, id: string) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3030/api/v1/product/product-filter",
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (err) {
      console.log(err);
      toast.error("error in filtering");
    }
  };

  return (
    <Layout desc={""} keyw={""} auth={""} title={"All Products"}>
      <div className="container mx-auto flex">
        <div className="w-1/4 p-4">
          <div>
            <h3 className="mb-4">Filter by Category</h3>
            {categories?.map((category) => (
              <Checkbox
                key={category._id}
                onChange={(e) => handleFilter(e.target.checked, category._id)}
              >
                {category.name}
              </Checkbox>
            ))}
          </div>
          <div className="mt-4">
            <h3 className="mb-4">Filter by Price</h3>
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="mt-8">
            <button onClick={() => window.location.reload()}>
              Reset Filters
            </button>
          </div>
        </div>
        <div className="w-3/4 p-4">
          <h1 className="text-3xl font-bold mb-8">All Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
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
                    <button
                      className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-800"
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
          <div>
            {products && products.length < total && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default HomePage;
