import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

interface Category {
  _id: string;
  name: string;
  slug: string;
}
const Cateogry = () => {
  const categories: Category[] = useCategory();
  return (
    <Layout desc={""} keyw={""} auth={""} title={"All categories"}>
      <div>
        <h1>All Category</h1>
        {categories.map((category) => (
          <div key={category._id}>
            <button>
              <Link to={`/category/${category.slug}`}>{category.name}</Link>
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Cateogry;
