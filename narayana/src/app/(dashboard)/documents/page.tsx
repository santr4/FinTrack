"use client";

import Layout from "@/app/components/Layout";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const DocumentsPage = () => {
  const { signOut } = useAuth();
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut(); // Clerk sign-out function
    router.push("/sign-in"); // Redirect to sign-in page after sign out
  };
  return (
    <Layout>
      <div>
        <div>hello Documents</div>
        <div>
          <Button type="button" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default DocumentsPage;
