import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

interface Category {
  _id: string;
  name: string;
}

const { Option } = Select;

const CreateProduct = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<string>("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [, setShipping] = useState("");

  const navigate = useNavigate();

  const handleCreate = async (
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
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/product/create-product`,
        productData
      );
      console.log("Response data:", data);
      if (data?.success) {
        toast.success("Product created successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
      // Add success toast or redirect to success page
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong in creating the product");
    }
  };

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
    <Layout desc={""} keyw={""} auth={""} title={"Create Product"}>
      <h1 className="text-3xl font-bold mb-6">Create Product</h1>
      <AdminMenu />

      <div className="flex flex-col mb-6">
        <Select
          variant={"borderless"}
          placeholder="Select a category"
          size="large"
          showSearch
          onChange={(value) => {
            setCategory(value);
          }}
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

        {photo && (
          <img
            src={URL.createObjectURL(photo)}
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
          className="w-full mb-4"
        >
          <Option value="1">Yes</Option>
          <Option value="0">No</Option>
        </Select>
        <button
          className="border-gray-300 rounded-lg mb-4 bg-red-700"
          onClick={handleCreate}
        >
          CREATE PRODUCT
        </button>
      </div>
    </Layout>
  );
};

export default CreateProduct;
