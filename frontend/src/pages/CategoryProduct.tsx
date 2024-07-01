import { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import mainPoster from "../images/poster,Shop.jpg";

import { useCart } from "../context/Cart";
import { toast } from "react-hot-toast";
interface Product {
  _id: string;
  name: string;
  description: string;
  photo: string;
  slug: string;
  price: number;
}

const CategoryProduct = () => {
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<any>(null); // Initialize as null or specify a type
  const params = useParams();

  useEffect(() => {
    const getProductsByCat = async () => {
      try {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/v1/product/product-category/${params.slug}`
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
        <div className="flex flex-row">
          <h1
            className="font-semibold uppercase text-white"
            style={{
              fontSize: category?.name == "Women" ? "300px" : "400px",
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            {category?.name}
          </h1>

          <img src={mainPoster} className="m-auto " />
        </div>
        <div className="flex flex-col bg-">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 h-auto relative  bg-white p-20 m-20 rounded-sm shadow-2xl pt-28"
            style={{ bottom: "200px" }}
          >
            <h1
              className="uppercase text-5xl text-black font-semibold absolute "
              style={{
                top: "8%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              }}
            >
              {" "}
              Sneaker Collection
            </h1>
            {products?.map((product) => (
              <div
                key={product._id}
                className="bg-white overflow-hidden  rounded-lg shadow-xl "
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
                    {/* {product.name} */}
                    {product.name.slice(0, 40)}
                    {product.name.length > 50 && "..."}
                  </h5>
                  <p className="mt-2 text-sm text-gray-600">
                    {product.description.slice(0, 50)}
                    {product.description.length > 50 && "..."}
                  </p>
                  <p className="mt-2 text-sm text-gray-600">${product.price}</p>
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
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
