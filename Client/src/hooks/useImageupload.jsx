import { useState } from "react";
import { toast } from "react-toastify";

const useImageUpload = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (e, setImageFile) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 10 * 1024 * 1024; // 10 MB

    if (file) {
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please upload a valid image file (PNG or JPEG).");
        setImage(null);
        setImageFile(null);
        return;
      }

      if (file.size > maxSize) {
        toast.error("File size must be less than 10MB.");
        setImage(null);
        setImageFile(null);
        return;
      }

      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  return { image, handleImageUpload };
};

export default useImageUpload;
