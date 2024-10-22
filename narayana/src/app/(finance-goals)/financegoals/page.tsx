import Layout from "@/app/components/Layout";
import Sidebar from "@/app/components/Sidebar";
import TodoApp from "../_components/TodoApp";
import Image from "next/image";

const FinanceGoalsPage = () => {
  return (
    <Layout>
      <div className="flex flex-auto min-w-full">
        <div>
          <Sidebar />
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col ml-16 pb-72 justify-center items-center">
            <div className="flex pb-6 font-bold">Finance Goals</div>
            <div>
              Our Financial Goals allows you to set, track, and achieve your
              financial aspirations effortlessly.
            </div>
            <div className="flex">
              <TodoApp />
            </div>
          </div>
          <div className="pt-36">
            <Image
              src="/finance.png"
              alt="financegoals"
              width="950"
              height="100"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FinanceGoalsPage;
