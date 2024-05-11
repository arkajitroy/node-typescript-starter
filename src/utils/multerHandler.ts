import multer from 'multer';
import path from 'path';

// Define disk storage for multer
export const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    // 3746674586-836534453.png
    cb(null, uniqueName);
  },
});

// Configure multer middleware
export const handleMultipartData = multer({
  storage,
  limits: { fileSize: 1000000 * 5 }, // 5mb
}).single('image');

export default handleMultipartData;
