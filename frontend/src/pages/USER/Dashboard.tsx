import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";

const Dashboard = () => {
  return (
    <Layout desc={""} keyw={""} auth={""} title={""}>
      <div>Dashboard</div>
      <UserMenu />
    </Layout>
  );
};

export default Dashboard;
