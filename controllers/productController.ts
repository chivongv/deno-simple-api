import { RouterContext, uuidv4 } from "../deps.ts";
import { products } from "../models/data.ts";
import { Product } from "../types/productType.ts";

let db = [...products];

export const getProducts = (ctx: RouterContext) => {
  ctx.response.status = 200;
  ctx.response.body = {
    success: true,
    data: db,
  };
};

export const getProduct = (
  ctx: RouterContext,
) => {
  const product = db.find((p) => p.id === ctx.params.id);

  if (product) {
    ctx.response.status = 200;
    ctx.response.body = {
      success: true,
      data: product,
    };
  } else {
    ctx.response.status = 404;
    ctx.response.body = {
      success: false,
      error: "No product found.",
    };
  }
};

export const addProduct = async (ctx: RouterContext) => {
  const { request, response } = ctx;
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
    id: uuidv4.generate(),
  };

  db.push(product);

  response.status = 201;
  response.body = {
    success: true,
    data: product,
  };
};

export const updatedProduct = async (
  ctx: RouterContext,
) => {
  const result = ctx.request.body();

  const productIndex = db.findIndex((p) => p.id === ctx.params.id);
  const product = db[productIndex];

  if (!ctx.request.hasBody || result.type !== "json") {
    ctx.response.status = 400;
    ctx.response.body = {
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
    ctx.response.status = 200;
    ctx.response.body = {
      success: true,
      data: updatedProduct,
    };
  }
};

export const deleteProduct = (
  ctx: RouterContext,
) => {
  db = db.filter((p) => p.id !== ctx.params.id);
  ctx.response.body = {
    success: true,
    data: db,
  };
};
