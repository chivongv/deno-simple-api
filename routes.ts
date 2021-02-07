import { Router } from "./deps.ts";

const router = new Router();

router.get("/", ({ request, response }) => {
  console.log(request);
  response.body = "Hello world";
});

export default router;
