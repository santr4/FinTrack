import Image from "next/image";
import Layout from "../components/Layout";
import { Nunito } from "next/font/google";
import { cn } from "@nextui-org/theme";
import { Button } from "@/components/ui/button";

const nunito = Nunito({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
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
            <Button />
          </div>
        </div>
      </div>
    </Layout>
  );
}
