import { useState, useEffect } from "react";
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

      if (image) {
        URL.revokeObjectURL(image);
      }

      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setImageFile(file);
    }
  };

  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  return { image, handleImageUpload };
};

export default useImageUpload;
