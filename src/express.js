import express from "express";
import ProductManager from "./ProductManager.js";

const server = express();
const PORT = 8080;

const productManager = new ProductManager();

server.use(express.json());

server.get("/products", async (req, res) => {
  const { limit } = req.query;
  try {
    const products = await productManager.getProducts();
    if (!limit) {
      res.status(200).json(products);
    }
    res.status(200).json(products.slice(0, parseInt(limit)));
  } catch (error) {
    console.log(error);
  }
});

server.get("/products/:id", async (req, res) => {
  const productId = parseInt(req.params.id);
  try {
    const product = await productManager.getProductById(productId);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
