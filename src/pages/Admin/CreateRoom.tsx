import { Button, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateRoomMutation } from "../../redux/features/admin/roomManagement.api";
import MSForm from "../../components/form/MSForm";
import MSInput from "../../components/form/MSInput";
import MSFileInput from "../../components/form/MSFileInput";
import uploadImage from "../../utils/uploadImage";
import { primaryButton } from "../../config/themeConfig";
import { roomSchema } from "../../Schemas/roomSchema";

const CreateRoom = () => {
  const navigate = useNavigate();
  const [createRoom] = useCreateRoomMutation();
  const [loading, setLoading] = useState(false);

  // Submit handler
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    setLoading(true);
    console.log(values);
    try {
      const { img, detailImages, ...restValues } = values;

      // Upload main image
      const mainImageFormData = new FormData();
      mainImageFormData.append("file", img);
      mainImageFormData.append("upload_preset", "meetingspot");

      const mainImageResponse = await uploadImage(mainImageFormData);
      const mainImageUrl = mainImageResponse.secure_url;

      // Upload detail images
      const detailImagesUrls = await Promise.all(
        detailImages.map(async (imageFile: File) => {
          const formData = new FormData();
          formData.append("file", imageFile);
          formData.append("upload_preset", "meetingspot");

          const response = await uploadImage(formData);
          return response.secure_url;
        })
      );

      // Prepare final data to send to the backend
      const roomData = {
        ...restValues,
        img: mainImageUrl,
        detailImages: detailImagesUrls,
        amenities: restValues.amenities, // Transformed amenities
      };
      console.log(roomData);

      // Send the data to the API
      await createRoom(roomData);
      message.success("Room created successfully!");
      navigate("/dashboard/room-management");
    } catch (error) {
      message.error("Failed to create room.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create Room</h2>
      <MSForm
        onSubmit={onSubmit}
        resolver={zodResolver(roomSchema.createRoomSchema)}
      >
        <MSInput label="Room Name" name="name" type="text" />

        <MSInput label="Room No." name="roomNo" type="number" />

        <MSInput label="Floor No." name="floorNo" type="number" />

        <MSInput label="Capacity" name="capacity" type="number" />

        <MSInput label="Price Per Slot" name="pricePerSlot" type="number" />

        <MSInput
          label="Amenities"
          name="amenities"
          type="text"
          placeholder=" Separate every amenity with comma ( , )"
        />

        {/* Single image upload */}
        <MSFileInput label="Main Image" name="img" accept="image/*" />

        {/* Multiple image upload */}
        <MSFileInput
          label="Detail Images"
          name="detailImages"
          accept="image/*"
          multiple
        />

        <div style={{ marginTop: "16px" }}>
          <Button
            type="primary"
            style={primaryButton}
            htmlType="submit"
            disabled={loading}
          >
            {loading ? <Spin /> : "Create Room"}
          </Button>
        </div>
      </MSForm>
    </div>
  );
};

export default CreateRoom;
