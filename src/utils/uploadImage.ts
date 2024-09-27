import axios from "axios";
import { toast } from "sonner";

// Create the uploadImages function
const uploadImage = async (formData: FormData) => {
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_IMAGE_UPLOAD_CLOUDE_NAME
      }/image/upload`,
      formData
    );
    return response.data;
  } catch (error) {
    toast.error("Upload failed");
  }
};

export default uploadImage;
