"use client";

import { SignIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const router = useRouter();
  const handleGoBack = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col justify-center place-items-center">
      <div className="flex pt-16">
        <SignIn />
      </div>
      <div className="flex pt-5">
        <Button type="button" onClick={handleGoBack}>
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default SignInPage;
