import express from "express";
import { model } from "mongoose";
import Connection from "../db.js";
import MyProduct from "../model/mSchema.js";
import { uuid } from "uuidv4";
import path from "path";
import multer from "multer";
const router = express.Router();
Connection();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuid() + "-" + Date.now() + path.extname(file.originalname));
  },
});
const fileFilter = (req, file, cb) => {
  const allowrdFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowrdFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
let upload = multer({ storage, fileFilter });
router.post("/add", upload.single("img"), (req, res) => {
  const name = req.body.name;
  const qun = req.body.qun;
  const img = req.file.filename;
  const newProductData = {
    name,
    qun,
    img,
  };
  const newData = new MyProduct(newProductData);
  newData
    .save()
    .then(() => res.status(200).json("Product Added"))
    .catch((error) => res.status(400).json("errorsss" + error));
});
export default router;
