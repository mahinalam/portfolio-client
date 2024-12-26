"use client";
import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
  defaultValue?: any;
};

const MAInput = ({
  type,
  name,
  label,
  disabled,
  defaultValue,
}: TInputProps) => {
  return (
    <div style={{ marginBottom: "20px", width: "100%" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              type={type}
              id={name}
              size="large"
              disabled={disabled}
              className="font-semibold"
              defaultValue={defaultValue}
            />
            {error && <small className="text-red">{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default MAInput;
