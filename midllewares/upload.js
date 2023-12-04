import multer from "multer";
import path from "path";

const dest = path.resolve("temp");

const storage = multer.diskStorage({
  dest,
  filename: (req, file, cb) => {},
});
