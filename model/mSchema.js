import mongoose from "mongoose";
const mSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  qun: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
});
const MyProduct = new mongoose.model("MYPRODUCT", mSchema);

export default MyProduct;
