"use client";
import { Form } from "antd";
import { ReactNode, useEffect } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormConfig = {
  defaultValues?: Record<string, any> | null;
  resolver?: any;
};

type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
  onReset?: (resetFunction: () => void) => void; // <-- Added reset method
} & TFormConfig;

const MAForm = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
  onReset,
}: TFormProps) => {
  const formConfig: TFormConfig = {};

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm(formConfig as Record<string, unknown>);

  const submit: SubmitHandler<FieldValues> = (data: any) => {
    onSubmit(data);
    methods.reset();
  };

  useEffect(() => {
    if (onReset) {
      onReset(methods.reset); // <-- Provide reset method to parent component
    }
  }, [onReset, methods.reset]);

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(submit)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default MAForm;
