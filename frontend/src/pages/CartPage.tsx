import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/auth";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import toast from "react-hot-toast";

interface Product {
  _id: string;
  name: string;
  description: string;
  photo: string;
  slug: string;
  price: number;
}

const CartPage: React.FC = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState<string | null>(null);
  const [instance, setInstance] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const totalPrice = (): string => {
    try {
      let total = 0;
      cart?.forEach((product: Product) => {
        total += product.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (err) {
      console.log(err);
      return "Error calculating total";
    }
  };

  const removeCartItem = (pid: string) => {
    try {
      const myCart = [...cart];
      const index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (err) {
      console.log(err);
    }
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/product/braintree/token`
      );
      setClientToken(data.clientToken);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      if (!instance) throw new Error("Instance not found");
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      console.log(data);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout desc={""} keyw={""} auth={""} title={"Cart"}>
      <div className="container mx-auto py-8 flex">
        <div className="w-3/5 pr-8 flex flex-col">
          <h1 className="text-3xl font-bold mb-4">
            {`Hello ${auth?.token && auth?.user?.name}`}
          </h1>
          <div className="flex flex-col">
            {cart?.map((product: Product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg overflow-hidden shadow-md flex mb-4"
              >
                <img
                  className="w-1/3 h-auto object-cover"
                  src={`${
                    import.meta.env.VITE_BACKEND_URL
                  }/api/v1/product/product-photo/${product._id}`}
                  alt={product.name}
                />
                <div className="p-4 w-2/3">
                  <h4 className="text-xl font-semibold mb-2">{product.name}</h4>
                  <p className="text-gray-600 mb-2">
                    {product.description.substring(0, 50)}
                  </p>
                  <h4 className="text-lg font-semibold">
                    Price: ${product.price}
                  </h4>
                  <button
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-800"
                    onClick={() => removeCartItem(product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-2/5">
          <div className="bg-white rounded-lg overflow-hidden shadow-md p-4">
            <h2>Cart Summary</h2>
            <h4>Total : {totalPrice()}</h4>
            {auth?.user?.address ? (
              <div className="mt-4">
                <h4>Current User</h4>
                <h5>{auth?.user?.address}</h5>
                <button
                  className="mt-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
              </div>
            ) : (
              <div className="mt-4">
                {auth?.token ? (
                  <button
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
                    onClick={() => navigate("/login", { state: "/cart" })}
                  >
                    Login to Checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2 flex flex-col gap-4">
              {!clientToken || !auth?.token || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="bg-gray-800 text-white  hover:bg-black font-bold py-2 px-4 rounded"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ..." : "Make Payment"}
                  </button>
                </>
              )}
              <Link
                to="/"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-center"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
