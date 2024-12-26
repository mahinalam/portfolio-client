"use client";

import { useCreateSkillsMutation } from "@/app/redux/api/baseApi";
import MAForm from "@/components/form/MAForm";
import MAInput from "@/components/form/MAInput";
import MASelect from "@/components/form/MASelect";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const AddBlog = () => {
  const [createSkills] = useCreateSkillsMutation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const categories = [
    { id: 1, name: "Web Development" },
    { id: 1, name: "Portfolio" },
    { id: 1, name: "Frontend" },
  ];

  const categoriesOption = categories?.map((item: any) => ({
    value: item.name,
    label: item.name,
  }));
  const onSubmit = async (data: any) => {
    console.log("payload", data);
    if (Object.keys(data).length > 0) {
      try {
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
