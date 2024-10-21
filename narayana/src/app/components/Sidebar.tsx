"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    console.log("button clicked");
  };

  const router = useRouter();
  const handleGoToSetGoals = () => {
    router.push("/financegoals");
  };

  const handleGoToDashboard = () => {
    router.push("/documents");
  };

  const { signOut } = useAuth();
  const router1 = useRouter();
  const handleSignOut = async () => {
    await signOut(); // Clerk sign-out function
    router1.push("/sign-in"); // Redirect to sign-in page after sign out
  };

  return (
    <div
      className={`flex ${
        isOpen ? "w-96" : "w-60"
      } transition-all duration-300 bg-white h-screen border-r-2 border-gray-300`} // Moved border to the right
    >
      <div className="flex flex-col items-center">
        <Button
          onClick={toggleSidebar}
          className="text-white mr-24 ml-5 mt-4 z-10 w-20 rounded-lg"
          variant={"default"}
        >
          {isOpen ? "Collapse" : "Expand"}
        </Button>
        <div className={`flex flex-col items-center mt-4`}>
          {isOpen && (
            <>
              <Button
                type="button"
                onClick={handleGoToSetGoals}
                className="m-2 w-20 rounded-lg"
              >
                SetGoals
              </Button>
              <Button
                type="button"
                onClick={handleGoToDashboard}
                className="m-2 w-20 rounded-lg"
              >
                D-Board
              </Button>
              <Button
                type="button"
                onClick={handleSignOut}
                className="m-2 w-20 rounded-lg"
              >
                SignOut
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
