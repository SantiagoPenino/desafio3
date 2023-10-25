import express from "express";
import { ProductManager } from './ProductManager.js';

const server = express();
const PORT = 8080;

const productManager = new ProductManager("products.json");

server.use(express.json());

server.get("/products", async (req, res) => {
  const limit = req.query.limit;
  try {
    const products = await productManager.getProducts(limit);
    res.json(products);
  } catch (error) {
    console.log(error);
  }
});

server.get("/products/:id", async (req, res) => {
  const productId = parseInt(req.params.id);
  try {
    const product = await productManager.getProductById(productId);
    res.json(product);
  } catch (error) {
    console.log(error);
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);  
})