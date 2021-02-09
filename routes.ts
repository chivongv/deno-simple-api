import { Router } from "./deps.ts";
import { products } from "./models/data.ts";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updatedProduct,
} from "./controllers/productController.ts";

const router = new Router();
let db = [...products];

// Get all products
router.get("/api/v1/products", getProducts);

// Get single product
router.get("/api/v1/products/:id", getProduct);

// Add product
router.post("/api/v1/products", addProduct);

// Update product
router.put("/api/v1/products/:id", updatedProduct);

// Delete product
router.delete("/api/v1/products/:id", deleteProduct);

export default router;
