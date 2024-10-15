"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white p-4 border-b border-gray-300">
      <div className="mx-auto flex justify-between items-center">
        <div className="flex flex-row">
          <Image src="/budgeting.png" alt="logo" width={50} height={50} />
          <div className="text-black text-[20px] font-bold pl-3 pt-3">
            FinTrack
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
