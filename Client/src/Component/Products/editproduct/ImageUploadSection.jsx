import React from "react";
import useImageUpload from "../../../hooks/useImageupload";

const ImageUploadSection = ({ initialImage, onImageUpload }) => {
  const { image, handleImageUpload } = useImageUpload(initialImage || "");

  return (
    <div className="col-span-2 sm:col-span-2">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Upload Image
      </label>
      <div className="border border-dashed border-gray-300 rounded-md p-4 flex flex-col gap-2 md:flex-row items-center sm:items-center">
        {image ? (
          <img
            src={image}
            alt="Uploaded"
            className="w-28 h-36 object-cover mb-2 sm:mb-0 sm:mr-4"
          />
        ) : (
          initialImage && (
            <div className="mt-4">
              <img
                src={initialImage}
                alt="Existing"
                className="w-28 h-36 object-cover mb-2 sm:mb-0 sm:mr-4"
              />
            </div>
          )
        )}
        <div className="text-center flex-1">
          <label
            htmlFor="file-input"
            className="cursor-pointer flex flex-col items-center"
          >
            <div className="w-40 h-40 sm:w-48 sm:h-48 border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center hover:border-purple-500 transition-colors">
              <p className="text-gray-500 text-sm">Upload an image</p>
              <p className="text-gray-400 text-xs mt-1">Maximum size: 10MB</p>
            </div>
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, onImageUpload)}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageUploadSection;
