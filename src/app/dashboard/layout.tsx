"use client";
import Sidebar from "@/src/components/dashboard/Sidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const LayoutComponent = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const currentUser = useSelector((state: RootState) => state.auth.user?.email);
  console.log({ currentUser });
  if (!currentUser) {
    return router.push("/");
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default LayoutComponent;
