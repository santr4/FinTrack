"use client";

import Layout from "@/app/components/Layout";
import Sidebar from "@/app/components/Sidebar";
import FinanceCard from "../_components/FineCard";
import Image from "next/image";

const DocumentsPage = () => {
  return (
    <Layout>
      <div className="flex">
        <div>
          <Sidebar />
        </div>
        <div className="flex flex-row">
          <div className="flex-3 pl-9 pt-28">
            <FinanceCard />
          </div>
          <div className="flex pl-72 pb-96">
            <Image
              src="/logo2.png"
              alt="finance_card"
              height="500"
              width="500"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DocumentsPage;
