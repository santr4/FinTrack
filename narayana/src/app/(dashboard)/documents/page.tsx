"use client";

import Layout from "@/app/components/Layout";
import Sidebar from "@/app/components/Sidebar";

const DocumentsPage = () => {
  return (
    <Layout>
      <div className="flex">
        <div>
          <Sidebar />
        </div>
        <div>hello Documents</div>
      </div>
    </Layout>
  );
};

export default DocumentsPage;
