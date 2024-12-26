"use client";
import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TTextAreaProps = {
  name: string;
  label?: string;
  disabled?: boolean;
  defaultValue?: any;
  rows?: number;
};

const { TextArea } = Input;

const MATextArea = ({
  name,
  label,
  disabled,
  defaultValue,
  rows = 4, // Default rows for the TextArea
}: TTextAreaProps) => {
  return (
    <div style={{ marginBottom: "20px", width: "100%" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <TextArea
              {...field}
              id={name}
              size="large"
              disabled={disabled}
              className="font-semibold"
              defaultValue={defaultValue}
              rows={rows} // Sets the height of the TextArea
            />
            {error && <small className="text-red">{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default MATextArea;
