"use client";

import { SignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const SignUpPage = () => {
  const router = useRouter();
  const handleGoBack = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col justify-center place-items-center">
      <div className="flex pt-16">
        <SignUp />
      </div>
      <div className="flex pt-5">
        <Button type="button" onClick={handleGoBack}>
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default SignUpPage;
