import mongoose from "mongoose";
const pSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  qun: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
  },
});
const Product = new mongoose.model("PRODUCT", pSchema);

export default Product;
