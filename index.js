import express from "express";
import Connection from "./db.js";
import Routes from "./router/route.js";
import Product from "./model/pSchema.js";
import MyProduct from "./model/mSchema.js";
const app = express();
import cors from "cors";
const port = 8000;
Connection();
app.use(express.json());
app.use(cors());
app.use("/", express.static("images"));
// list data =============
app.post("/add", Routes);

// ==================================================================
export const getDatas = async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getStocks = async (req, res) => {
  try {
    const product = await MyProduct.find({});
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
//get single data =================================================================================
export const getStock = async (req, res) => {
  try {
    const product = await MyProduct.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getData = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// =========================================================================
export const qunt = async (req, res) => {
  try {
    const product = await Product.find({ qun: 0 });
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
//update data  =============================================================================

export const editData = async (req, res) => {
  // console.log(req.body.name);
  // const product = new Product({
  //   name: req.body.name,
  //   qun: req.body.qun,
  // });
  try {
    const result = await MyProduct.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          qun: req.body.qun,
        },
      }
    );
    // console.log(result);
    res.status(201).json(result);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
  // consolcccccce.log(_id);
};
// ======================================================
app.get("/", getDatas);
app.get("/stock", getStocks);
app.get("/qun", qunt);
app.get("/:id", getStock);
app.get("/add/:id", getData);
app.post("/:id", editData);
//routes ===================================================================================

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
