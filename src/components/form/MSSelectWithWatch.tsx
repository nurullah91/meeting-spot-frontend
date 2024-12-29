import { Form, Select } from "antd";
import React, { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type TMSSelectWithWatchProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled: boolean }[] | undefined;
  disabled: boolean;
  mode?: "multiple" | undefined;
  onValueChange: React.Dispatch<React.SetStateAction<string>>;
};

const MSSelectWithWatch = ({
  label,
  name,
  options,
  disabled,
  mode,
  onValueChange,
}: TMSSelectWithWatchProps) => {
  const { control } = useFormContext();
  const inputValue = useWatch({
    control,
    name,
  });

  useEffect(() => {
    onValueChange(inputValue);
  }, [inputValue, onValueChange]);

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            mode={mode}
            style={{ width: "100%" }}
            {...field}
            options={options}
            size="large"
            disabled={disabled}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default MSSelectWithWatch;
