import Layout from "@/app/components/Layout";
import Sidebar from "@/app/components/Sidebar";

const FinanceGoalsPage = () => {
  return (
    <Layout>
      <div className="flex">
        <div>
          <Sidebar />
        </div>
        <div>Finance Goals</div>
      </div>
    </Layout>
  );
};

export default FinanceGoalsPage;
