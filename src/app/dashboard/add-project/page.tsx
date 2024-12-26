"use client";

import {
  useCreateProjectMutation,
  useGetAllProjectsQuery,
} from "@/app/redux/api/baseApi";
import MAForm from "@/components/form/MAForm";
import MAInput from "@/components/form/MAInput";
import MATextArea from "@/components/form/MATextArea";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const AddProject = () => {
  const [createProject] = useCreateProjectMutation();
  const [isClient, setIsClient] = useState(false);

  // UseEffect to set isClient to true after the first render
  useEffect(() => {
    setIsClient(true);
  }, []);

  const onSubmit = async (data: any) => {
    try {
      if (Object.keys(data).length > 0) {
        const res = await createProject(data).unwrap();
        if (res?.success) {
          toast.success("Project Created Successfull.");
        }
      }
    } catch (err: any) {
      toast.error(err.mesage);
    }
  };

  return (
    <div className="w-full md:w-1/2 mx-auto">
      <div className="font-bold text-3xl md:mb-10 mb-6">Create Project</div>
      <MAForm onSubmit={onSubmit}>
        <MAInput type="text" name="title" label="Title" />
        <MAInput type="text" name="image" label="Image URL" />
        <MAInput type="text" name="gitUrl" label="Git URL" />
        <MAInput type="text" name="previewUrl" label="Preview URL" />
        <MATextArea name="description" label="Description" />
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

export default AddProject;
