import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

interface Category {
  _id: string;
  name: string;
}

const { Option } = Select;

const UpdateProduct = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<string>("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");

  const navigate = useNavigate();
  const params = useParams();
  const handleUpdate = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log("Form submitted");
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);

      if (photo) {
        productData.append("photo", photo);
      }
      productData.append("category", category);
      const { data } = await axios.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/product/update-product/${id}`,
        productData
      );

      if (data?.success) {
        toast.success("Product Updated successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
      // Add success toast or redirect to success page
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong in updating the product");
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.prompt(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;
      const { data } = await axios.delete(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/product/delete-product/${id}`
      );
      console.log(data);
      toast.success("Product deleteed sucessfully ");
      navigate("/dashboard/admin/products");
    } catch (err) {
      console.log(err);
      toast.error("error in deleting product");
    }
  };

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/product/single-product/${
          params.slug
        }`
      );
      setName(data.product.name);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setId(data.product._id);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (err) {
      console.log(err);
      toast.error("error in fetching the product");
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Layout desc={""} keyw={""} auth={""} title={"Update Product"}>
      <h1 className="text-3xl font-bold mb-6">Update Product</h1>
      <AdminMenu />

      <div className="flex flex-col mb-6">
        <Select
          variant={"borderless"}
          placeholder="Select a category"
          size="large"
          showSearch
          onChange={(value) => {
            setCategory(value); // Set category directly to the ID
          }}
          value={category} // Use category directly, not category.name
          className="mb-4"
        >
          {categories.map((c) => (
            <Option key={c._id} value={c._id}>
              {c.name}
            </Option>
          ))}
        </Select>

        <label className="cursor-pointer bg-white text-black border border-gray-300 px-4 py-2 rounded-lg mb-4">
          {photo ? photo.name : "Upload File"}
          <input
            type="file"
            id="upload"
            name="photo"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0]; // Access files array safely
              if (file) {
                setPhoto(file);
              }
            }}
            className="hidden"
          />
        </label>

        {photo ? (
          <img
            src={URL.createObjectURL(photo)}
            alt="product photo"
            className="h-48 w-auto object-contain rounded-lg border border-gray-300 mb-4"
          />
        ) : (
          <img
            src={`${
              import.meta.env.VITE_BACKEND_URL
            }/api/v1/product/product-photo/${id}`}
            alt="product photo"
            className="h-48 w-auto object-contain rounded-lg border border-gray-300 mb-4"
          />
        )}

        <input
          type="text"
          value={name}
          placeholder="Write a name"
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg mb-4"
        />

        <textarea
          value={description}
          placeholder="Write a Description"
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg mb-4"
        />

        <input
          type="number"
          value={price}
          placeholder="Write a Price"
          onChange={(e) => setPrice(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg mb-4"
        />

        <input
          type="number"
          value={quantity}
          placeholder="Write a Quantity"
          onChange={(e) => setQuantity(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg mb-4"
        />

        <Select
          placeholder="Select shipping"
          size="large"
          showSearch
          onChange={(value) => {
            setShipping(value);
          }}
          value={shipping ? "yes" : "No"}
          className="w-full mb-4"
        >
          <Option value="1">Yes</Option>
          <Option value="0">No</Option>
        </Select>
        <button
          className="border-gray-300 rounded-lg mb-4 bg-red-700"
          onClick={handleUpdate}
        >
          Update PRODUCT
        </button>
        <button
          className="border-gray-300 rounded-lg mb-4 bg-blue-700"
          onClick={handleDelete}
        >
          Delete PRODUCT
        </button>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
