import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/Cart";
import mainPoster from "../images/poster.png";
import reebok from "../images/reebok.jpg";
import nike from "../images/nike.jpg";
import adidas from "../images/adidas.jpg";
import converse from "../images/converse.jpg";
import asics from "../images/asics.jpg";
import newb from "../images/newb.png";

import shoe1 from "../images/shoe1.jpg";
import shoe2 from "../images/shoe2.jpg";
import shoe3 from "../images/shoe3.jpg";
import shoe4 from "../images/shoe4.jpg";
import Carousel from "../components/Carousel";
import { HoverEffect } from "../components/ui/card-hover-effect";
import About from "./About";

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
  const items = [
    { id: 1, imageUrl: mainPoster, text: "Slide 1" },
    { id: 2, imageUrl: mainPoster, text: "Slide 2" },
    { id: 3, imageUrl: mainPoster, text: "Slide 3" },
  ];

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [checked, setChecked] = useState<string[]>([]);
  const [radio, setRadio] = useState<string[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
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
    getCategories();
    getTotal();
  }, []);

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
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
      <div className="flex flex-col overflow-x-hidden">
        {/* main poster  */}
        <div className="flex flex-row">
          {/* <img src={mainPoster} className="m-auto" /> */}
          <Carousel />
        </div>

        {/* popular products */}
        <div className=" my-20 mx-16" style={{ height: "120vh" }}>
          <div className="flex justify-around h-1/4 items-center w-full ">
            <div>(Lookbooks)</div>
            <div className="md:text-8xl w-2/3 font-semibold text-wrap sm:text-4xl relative ">
              OUR BEST PRODUCTS WON THE 2024 FASHION AWARD
            </div>
          </div>
          <div className="h-screen flex items-end mt-10">
            <div className=" w-1/4   p-5 shadow-xl  ">
              <img src={shoe1} alt="" style={{ height: "70vh" }} />
            </div>
            <div className=" w-1/4   p-5 shadow-xl   ">
              <img src={shoe2} alt="" style={{ height: "85vh" }} />
            </div>
            <div className=" w-1/4   p-5 shadow-xl   ">
              <img src={shoe3} alt="" className="h-screen " />
            </div>
            <div className=" w-1/4   p-5 shadow-xl   ">
              <img src={shoe4} alt="" style={{ height: "60vh" }} />
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-52 mb-52">
          {/* filter for products */}
          {/* <div className="w-screen p-4 flex bg-orange-800 justify-evenly">
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
          </div> */}

          {/* preview of all products */}
          <div className="flex justify-around  h-1/4 items-center w-full my-10">
            <div>(Catalog)</div>
            <div className="md:text-8xl w-2/3 font-semibold text-wrap sm:text-4xl">
              OUR NEW PRODUCTS TO WELCOME THE SUMMER OF 2024
            </div>
          </div>
          <div className="flex p-4 w-screen flex-col  justify-center px-32 ">
            <h1 className="text-6xl font-bold mb-8">All Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white overflow-hidden shadow-xl  w-96"
                >
                  <img
                    className="w-full object-cover h-80"
                    src={`http://localhost:3030/api/v1/product/product-photo/${product._id}`}
                    alt={product.name}
                  />
                  <div className="p-4 flex flex-col h-48">
                    <h5 className="text-lg font-semibold text-gray-900">
                      {/* {product.name} */}
                      {product.name.slice(0, 30)}
                      {product.name.length > 30 && "..."}
                    </h5>
                    <p className="mt-2 text-sm text-gray-600">
                      {product.description.slice(0, 50)}
                      {product.description.length > 50 && "..."}
                    </p>
                    <p className="text-sm text-gray-600">${product.price}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <Link
                        to={`/product/${product.slug}`}
                        className="text-gray-700 hover:text-gray-900"
                      >
                        View
                      </Link>
                      <button
                        className="px-3 py-1 bg-gray-800 text-white rounded-lg hover:bg-black"
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
            <div className="flex justify-center my-8">
              {products && products.length < total && (
                <button
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
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
          {/* brands supported by  */}
          <div className="flex justify-around h-1/4 items-center w-full my-20">
            <div>(PARTNER)</div>
            <div className="md:text-9xl w-2/3 font-semibold text-wrap sm:text-4xl">
              WE ARE SUPPORTED BY
            </div>
          </div>
          <div className="w-screen mx-auto px-8 ">
            <HoverEffect items={projects} />
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default HomePage;
export const projects = [
  {
    title: "Nike",
    description:
      "A leading brand in athletic footwear, apparel, and accessories.",
    imageSource: nike,
  },
  {
    title: "Adidas",
    description:
      "A multinational corporation known for its sportswear and sneakers.",
    imageSource: adidas,
  },
  {
    title: "Converse",
    description:
      "An American shoe company known for its iconic Chuck Taylor All-Star sneakers.",
    imageSource: converse,
  },
  {
    title: "Reebok",
    description:
      "A global fitness and lifestyle brand known for its athletic footwear.",
    imageSource: reebok,
  },
  {
    title: "New Balance",
    description:
      "A brand specializing in athletic shoes and apparel for various sports.",
    imageSource: newb,
  },
  {
    title: "Asics",
    description:
      "A Japanese multinational corporation known for its athletic footwear and apparel.",
    imageSource: asics,
  },
];
