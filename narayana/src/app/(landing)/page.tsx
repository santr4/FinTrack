"use client";

import Image from "next/image";
import Layout from "../components/Layout";
import { Nunito } from "next/font/google";
import { cn } from "@nextui-org/theme";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const nunito = Nunito({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/sign-in");
  };
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center pt-40">
        <Image src="/logo1.png" alt="logo2" width="500" height="500" />
        <div>
          <p className={cn("pt-8", nunito.className)}>
            Take control of your financial journey with our intuitive Personal
            Finance Tracker!
          </p>
          <div className="flex justify-center pt-3">
            <Button
              className="flex items-center gap-1"
              type="button"
              onClick={handleLoginClick}
            >
              Login
              <span className="relative -top-[1px]">&rarr;</span>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
