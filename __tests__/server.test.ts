import { superoak } from "../deps.ts";
import app from "../server.ts";
import { products } from "../data.ts";

Deno.test("Should return products with status code 200", async () => {
  const expectedResponse = {
    success: true,
    data: products,
  };
  const request = await superoak(app);
  await request.get("/api/v1/products")
    .expect(200)
    .expect(expectedResponse);
});
