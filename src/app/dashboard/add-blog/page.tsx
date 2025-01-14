"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCreateBlogsMutation } from "../../redux/api/baseApi";
import MAForm from "@/src/components/form/MAForm";
import MAInput from "@/src/components/form/MAInput";
import MASelect from "@/src/components/form/MASelect";
import { Button } from "antd";
import MATextArea from "@/src/components/form/MATextArea";

const AddBlog = () => {
  const [createBlog] = useCreateBlogsMutation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const categories = [
    { id: 1, name: "Web Development" },
    { id: 2, name: "Portfolio" },
    { id: 3, name: "Frontend" },
  ];

  const categoriesOption = categories?.map((item: any) => ({
    value: item.name,
    label: item.name,
  }));
  const onSubmit = async (data: any) => {
    console.log("payload", data);
    if (Object.keys(data).length > 0) {
      try {
        const res: any = await createBlog(data).unwrap();
        if (res.success) {
          toast.success("Blog created successfull.");
        }
      } catch (err: any) {
        toast.error(err.messge);
      }
    }

    try {
      if (Object.keys(data).length > 0) {
      }
    } catch (err: any) {
      toast.error(err.mesage);
    }
  };

  return (
    <div className="w-full md:w-1/2 mx-auto">
      <div className="font-bold text-3xl md:mb-10 mb-6">Create Blog</div>
      <MAForm onSubmit={onSubmit}>
        <MAInput type="text" name="title" label="Title" />
        <MASelect
          label="Select Categories"
          name="categories"
          options={categoriesOption}
          mode="multiple"
        />
        <MAInput type="text" name="image" label="ImageUrl" />
        <MATextArea name="content" label="Content" />
        <Button
          htmlType="submit"
          size="large"
          type="primary"
          className="w-full mx-auto"
        >
          Submit
        </Button>
      </MAForm>
    </div>
  );
};

export default AddBlog;
