"use client";
import MAForm from "@/components/form/MAForm";
import MAInput from "@/components/form/MAInput";
import { Button, Divider } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useLoginMutation } from "../redux/api/baseApi";
import { useRouter } from "next/navigation";

const Login = () => {
  const [login] = useLoginMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Logging in");
    console.log(data);
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      console.log("userInfo", userInfo);
      const res = await login(userInfo).unwrap();
      if (res.success) {
        toast.success("Login Successfull.", { id: toastId });
      }
      router.push("/dashboard/profile");
      //   console.log("from login", res);
      //   navigate("/");
    } catch (err: any) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <MAForm onSubmit={onSubmit}>
      <div className="md:w-[30%] sm:w-[60%] w-[80%] mx-auto mt-[50px]">
        <h1 className="md:text-xl font-bold">Sign in</h1>
        <MAInput
          name="email"
          type="email"
          disabled={false}
          label="Email address"
        />
        <MAInput
          name="password"
          type="password"
          disabled={false}
          label="Password"
        />
        <Button
          htmlType="submit"
          className="bg-blue-500 text-white hover:!bg-blue-600 hover:!text-white"
          size="large"
          block
        >
          Login
        </Button>
      </div>
    </MAForm>
  );
};

export default Login;
