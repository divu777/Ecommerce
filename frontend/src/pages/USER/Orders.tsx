import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

interface Order {
  status: string;
  buyer: { name: string };
  createdAt: Date; // Corrected property name
  payment: { success: boolean };
  products: Array<{
    _id: string;
    name: string;
    description: string;
    price: number;
  }>;
}

const Options = () => {
  let i = 0;
  const [orders, setOrders] = useState<Order[]>([]);
  const [auth, setAuth] = useAuth();
  const getOrder = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3030/api/v1/auth/orders"
      );
      setOrders(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrder();
  }, [auth?.token]);
  return (
    <Layout desc={""} keyw={""} auth={""} title={""}>
      <div>
        <UserMenu />
        <h1>All Orders</h1>
        <h3>List</h3>
        <div>
          {orders?.map((o, _i) => {
            return (
              <div>
                <table>
                  <thead>
                    <tr>
                      <th scope="col">S.no</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Orders</th>
                      <th scope="col">Payment</th>
                      <th scope="col"> Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <th>{i + 1}</th>
                    <th>{o?.status}</th>
                    <th>{o?.buyer?.name}</th>
                    <th>{moment(o?.createdAt).fromNow()}</th>

                    <th>{o?.payment.success ? "Sucess" : "Failed"}</th>
                    <th>{o?.products?.length}</th>
                  </tbody>
                </table>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {o?.products?.map((product, i) => (
                    <div
                      key={product._id}
                      className="bg-white rounded-lg overflow-hidden shadow-md flex mb-4"
                    >
                      <img
                        className="w-1/3 h-auto object-cover"
                        src={`http://localhost:3030/api/v1/product/product-photo/${product._id}`}
                        alt={product.name}
                      />
                      <div className="p-4 w-2/3">
                        <h4 className="text-xl font-semibold mb-2">
                          {product.name}
                        </h4>
                        <p className="text-gray-600 mb-2">
                          {product.description.substring(0, 30)}
                        </p>
                        <h4 className="text-lg font-semibold">
                          Price: ${product.price}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};
export default Options;
