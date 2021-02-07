import { assertEquals } from "../deps.ts";
import { add } from "../utils/add.ts";

Deno.test("it should add two numbers", () => {
  assertEquals(add(1, 2), 3);
});
