import { Application } from "./deps.ts";
import router from "./routes.ts";

const app = new Application();
const port = Number(Deno.env.get("port")) || 5000;

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port });
console.log(`Server is running on http://localhost:${port}`);

export default app;
