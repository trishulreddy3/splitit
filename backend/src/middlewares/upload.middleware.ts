import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "splitit",
      allowed_formats: ["jpg", "png", "jpeg", "pdf"],
    };
  },
});

export const upload = multer({ storage });
