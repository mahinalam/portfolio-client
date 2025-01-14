"use client";

import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import MAForm from "@/src/components/form/MAForm";
import MAInput from "@/src/components/form/MAInput";
import MATextArea from "@/src/components/form/MATextArea";
import {
  useCreateProjectMutation,
  useLoginMutation,
} from "./redux/api/baseApi";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/features/authSlice";
import { RootState } from "./redux/store";

const HomePage = () => {
  const [login] = useLoginMutation();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  console.log({ user });

  // UseEffect to set isClient to true after the first render
  useEffect(() => {
    setIsClient(true);
  }, []);

  const onSubmit = async (data: any) => {
    console.log("data", data);
    try {
      const res = await login(data).unwrap();
      // decode user
      const decodedUser = jwtDecode(res.data.accessToken);
      if ((decodedUser as any).email) {
        dispatch(setUser({ user: decodedUser }));
        toast.success("Logged in.");
        router.push("/dashboard/profile");
      }
    } catch (err: any) {
      toast.error(err.mesage);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <div className="w-full md:w-1/2 mx-auto">
        <div className="font-bold text-3xl  text-center">Welcome Back!</div>
        <MAForm onSubmit={onSubmit}>
          <MAInput type="email" name="email" label="Email" />
          <MAInput type="password" name="password" label="Password" />
          <Button
            htmlType="submit"
            size="large"
            type="primary"
            className="w-full mx-auto"
          >
            Login
          </Button>
        </MAForm>
      </div>
    </div>
  );
};

export default HomePage;
