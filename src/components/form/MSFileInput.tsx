import { Form, Input } from "antd";
import { Controller } from "react-hook-form";
import { useState } from "react";

type TFileInputProps = {
  name: string;
  label?: string;
  accept?: string;
  multiple?: boolean;
};

const MSFileInput = ({
  label,
  name,
  accept = "image/*",
  multiple = false,
}: TFileInputProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string | string[] | null>(null);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    onChange: (value: File | File[]) => void
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = multiple
      ? Array.from(e.dataTransfer.files || [])
      : e.dataTransfer.files?.[0];
    if (files) {
      onChange(files);
      setFileName(
        multiple
          ? (files as File[]).map((file: File) => file.name)
          : (files as File).name
      );
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: File | File[]) => void
  ) => {
    const files = multiple
      ? Array.from(e.target.files || [])
      : e.target.files?.[0];

    if (files) {
      onChange(files);
      setFileName(
        multiple
          ? (files as File[]).map((file: File) => file.name)
          : (files as File).name
      );
    }
  };

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <div
            style={{
              border: dragActive ? "2px dashed #1890ff" : "2px dashed #d9d9d9",
              borderRadius: "4px",
              padding: "16px",
              textAlign: "center",
              cursor: "pointer",
              height: "150px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: dragActive ? "#e6f7ff" : "transparent",
            }}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={(e) => handleDrop(e, field.onChange)}
          >
            <Input
              type="file"
              accept={accept}
              multiple={multiple}
              style={{ display: "none" }}
              onChange={(e) => handleFileChange(e, field.onChange)}
              ref={field.ref}
            />
            <label
              htmlFor={name}
              style={{ display: "block", width: "100%", height: "100%" }}
            >
              {fileName ? (
                multiple ? (
                  <ul>
                    {(fileName as string[]).map((name, index) => (
                      <li key={index}>{name}</li>
                    ))}
                  </ul>
                ) : (
                  fileName
                )
              ) : (
                <span style={{ color: "#8c8c8c" }}>
                  Drag & drop your file to upload
                </span>
              )}
            </label>
          </div>
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default MSFileInput;
