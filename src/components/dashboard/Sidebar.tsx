"use client"; // Ensures the component is client-side rendered

import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import Link from "next/link"; // Import Link from Next.js
import Sider from "antd/es/layout/Sider";
import { logout } from "@/src/app/redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/app/redux/store";

// Helper function to create menu items
type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    children,
    label,
  } as MenuItem;
}

// Sidebar menu items with Next.js Link
const items: MenuItem[] = [
  getItem(<Link href="/dashboard/profile">My Profile</Link>, "profile"),
  getItem("Project Management", "project-management", [
    getItem(
      <Link href="/dashboard/add-project">Add Project</Link>,
      "add-project"
    ),
    getItem(
      <Link href="/dashboard/all-projects">All Projects</Link>,
      "all-projects"
    ),
  ]),
  getItem("Blog Management", "blog-management", [
    getItem(<Link href="/dashboard/add-blog">Create Blog</Link>, "add-blog"),
    getItem(<Link href="/dashboard/all-blogs">All Blogs</Link>, "all-blogs"),
  ]),
  getItem("Skill Management", "skill-management", [
    getItem(<Link href="/dashboard/add-skills">Add Skills</Link>, "add-skills"),
    getItem(<Link href="/dashboard/my-skills">My Skills</Link>, "my-skills"),
    // getItem(<Link href="/help">Help</Link>, "help"),
  ]),
];

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user?.email);
  console.log("user from sidebar");
  const handleLogout = () => {
    // implement logot
    dispatch(logout());
  };

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
    >
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button onClick={handleLogout} className="ml-10">
          Logout
        </Button>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={items}
      />
    </Sider>
  );
};

export default Sidebar;
