import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/form/CategoryFrom";
import { Modal } from "antd";

interface Category {
  _id: string;
  name: string;
}

const CreateCategory: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<Category | null>(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/category/create-category`,
        { name }
      );
      if (data.success) {
        toast.success(`${name} is created`);
        getCategories();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in creating the category");
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/category/update-category/${
          selected?._id
        }`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${name} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getCategories();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in updating the category");
    }
  };

  const handleDelete = async (pId: string) => {
    try {
      const { data } = await axios.delete(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`${name} is deleted`);
        setSelected(null);
        getCategories();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in deleting the category");
    }
  };

  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
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
    <Layout desc={""} keyw={""} auth={""} title={""}>
      <div className="flex flex-col items-center">
        <h1 className="text-center mt-8 mb-4 text-2xl font-bold">
          Manage Categories
        </h1>
        <div className="p-3">
          <CategoryForm
            handleSubmit={handleSubmit}
            value={name}
            setValue={setName}
          />
        </div>
        <div className="w-full max-w-3xl">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-200 py-2 px-4 bg-gray-100 text-gray-700 font-bold uppercase text-sm">
                  Name
                </th>
                <th className="border border-gray-200 py-2 px-4 bg-gray-100 text-gray-700 font-bold uppercase text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id} className="border-t border-gray-200">
                  <td className="border border-gray-200 py-2 px-4">
                    {category.name}
                  </td>
                  <td className="border border-gray-200 py-2 px-4">
                    <button
                      onClick={() => {
                        setVisible(true);
                        setUpdatedName(category.name);
                        setSelected(category);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="border border-gray-200 py-2 px-4">
                    <button
                      onClick={() => {
                        handleDelete(category._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
          <CategoryForm
            handleSubmit={handleUpdate}
            value={updatedName}
            setValue={setUpdatedName}
          />
        </Modal>
      </div>
      <AdminMenu />
    </Layout>
  );
};

export default CreateCategory;
