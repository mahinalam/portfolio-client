"use client";

import MAForm from "@/src/components/form/MAForm";
import MASelect from "@/src/components/form/MASelect";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCreateSkillsMutation } from "../../redux/api/baseApi";

const AddSkills = () => {
  const [createSkills] = useCreateSkillsMutation();
  const [isClient, setIsClient] = useState(false);

  // const { data: skillsData, isLoading: skillsLoading } =
  //   useGetAllSkillsQuery(null);

  // UseEffect to set isClient to true after the first render
  useEffect(() => {
    setIsClient(true);
  }, []);

  const skills = [
    { id: 1, name: "prisma", image: "https://skillicons.dev/icons?i=prisma" },
    { id: 2, name: "redux", image: "https://skillicons.dev/icons?i=redux" },
    { id: 3, name: "express", image: "https://skillicons.dev/icons?i=express" },
    { id: 4, name: "nextjs", image: "https://skillicons.dev/icons?i=nextjs" },
    { id: 5, name: "mongo", image: "https://skillicons.dev/icons?i=mongo" },
    { id: 5, name: "react", image: "https://skillicons.dev/icons?i=react" },
    {
      id: 5,
      name: "typescript",
      image: "https://skillicons.dev/icons?i=typescript",
    },
    {
      id: 6,
      name: "postgres",
      image: "https://skillicons.dev/icons?i=postgres",
    },
    {
      id: 7,
      name: "tailwind",
      image: "https://skillicons.dev/icons?i=tailwind",
    },
  ];

  const skillOptions = skills?.map((item: any) => ({
    value: item.name,
    label: item.name,
  }));
  const onSubmit = async (data: any) => {
    const payload = data.skills.map((skill: string) => ({
      name: skill,
      image: `https://skillicons.dev/icons?i=${skill.toLowerCase()}`,
    }));

    const skillPayload = { skills: payload };
    if (skillPayload.skills.length > 0) {
      try {
        const res = await createSkills(skillPayload).unwrap();
        if (res?.success) {
          toast.success("Added Skills Successfull.");
        }
      } catch (err: any) {
        toast.error(err.messge);
      }
    }
    console.log(skillPayload);
    console.log("payload", payload);

    try {
      if (Object.keys(data).length > 0) {
      }
    } catch (err: any) {
      toast.error(err.mesage);
    }
  };

  return (
    <div className="w-full md:w-1/2 mx-auto">
      <div className="font-bold text-3xl md:mb-10 mb-6">Create Project</div>
      <MAForm onSubmit={onSubmit}>
        <MASelect
          label="Select Skills"
          name="skills"
          options={skillOptions}
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

export default AddSkills;
