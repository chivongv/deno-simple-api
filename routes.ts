import { Router, v4 } from "./deps.ts";
import { products } from "./data.ts";
import { Product } from "./types.ts";

const router = new Router();
let db = [...products];

// Get all products
router.get("/api/v1/products", ({ response }) => {
  response.status = 200;
  response.body = {
    success: true,
    data: db,
  };
});

// Get single product
router.get("/api/v1/products/:id", ({ params, response }) => {
  const { id } = params;
  const product = db.find((p) => p.id === id);

  if (product) {
    response.status = 200;
    response.body = {
      success: true,
      data: product,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      error: "No product found.",
    };
  }
});

// Add product
router.post("/api/v1/products", async ({ request, response }) => {
  const result = request.body();

  if (!request.hasBody || result.type !== "json") {
    response.status = 400;
    response.body = {
      success: false,
      error: "Invalid request",
    };
  }

  const data = await result.value;
  const product: Product = {
    ...data,
    id: v4.generate(),
  };

  db.push(product);

  response.status = 201;
  response.body = {
    success: true,
    data: product,
  };
});

// Update product
router.put("/api/v1/products/:id", async ({ params, request, response }) => {
  const { id } = params;
  const result = request.body();
  const productIndex = db.findIndex((p) => p.id === id);
  const product = db[productIndex];

  if (!request.hasBody || result.type !== "json") {
    response.status = 400;
    response.body = {
      success: false,
      error: "Invalid request",
    };
  }

  if (product) {
    const newData = await result.value;
    const updatedProduct = {
      ...product,
      ...newData,
    };
    db[productIndex] = updatedProduct;
    response.status = 200;
    response.body = {
      success: true,
      data: updatedProduct,
    };
  }
});

// Delete product
router.delete("/api/v1/products/:id", ({ params, response }) => {
  const { id } = params;
  db = db.filter((p) => p.id !== id);
  response.body = {
    success: true,
    data: db,
  };
});

export default router;
