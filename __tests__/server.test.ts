import { Application, superoak } from "../deps.ts";
import router from "../routes.ts";
import { products } from "../data.ts";

Deno.test("Should return products with status code 200", async () => {
  const expectedResponse = {
    success: true,
    data: products,
  };

  const app = new Application();
  app.use(router.routes());
  app.use(router.allowedMethods());

  const request = await superoak(app);
  await request.get("/api/v1/products")
    .expect(200)
    .expect(expectedResponse);
});
