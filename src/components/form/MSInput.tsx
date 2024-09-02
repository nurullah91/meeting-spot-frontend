import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  defaultValue?: string;
  readOnly?: boolean;
  disabled?: boolean;
};

const MSInput = ({
  label,
  name,
  type,
  defaultValue,
  disabled,
  readOnly,
}: TInputProps) => {
  return (
    <>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              type={type}
              id={name}
              size="large"
              defaultValue={defaultValue}
              readOnly={readOnly}
              disabled={disabled}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </>
  );
};

export default MSInput;
