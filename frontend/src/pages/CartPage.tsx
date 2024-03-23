import React from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  description: string;
  photo: string;
  slug: string;
  price: number;
}

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((product: Product) => {
        total += product.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (err) {
      console.log(err);
    }
  };
  const removeCartItem = (pid: string) => {
    // Explicitly define pid as type string
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(cart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Layout desc={""} keyw={""} auth={""} title={"Cart"}>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">
          {`Hello ${auth?.token && auth?.user?.name}`}
        </h1>
        <h4 className="mb-6">
          {cart?.length > 0
            ? `You have ${cart.length} item${
                cart.length > 1 ? "s" : ""
              } in your cart. ${auth?.token ? "" : "Please login to checkout."}`
            : "Your cart is empty."}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cart?.map(
            (
              product: Product // Explicitly define product as type Product
            ) => (
              <div
                key={product._id}
                className="bg-white rounded-lg overflow-hidden shadow-md"
              >
                <img
                  className="w-full h-48 object-cover"
                  src={`http://localhost:3030/api/v1/product/product-photo/${product._id}`}
                  alt={product.name}
                />
                <div className="p-4">
                  <h4 className="text-xl font-semibold mb-2">{product.name}</h4>
                  <p className="text-gray-600 mb-2">
                    {product.description.substring(0, 30)}
                  </p>
                  <h4 className="text-lg font-semibold">
                    Price: ${product.price}
                  </h4>
                  <button
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-800"
                    onClick={() => removeCartItem(product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )
          )}
        </div>
        {cart.length > 0 && (
          <div className="mt-8">
            <h2>Cart Summary</h2>
            <h4>Total : {totalPrice()}</h4>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
