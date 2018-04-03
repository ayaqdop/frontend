import { range } from "../static/components/Helpers";

test("range 3..7", () => {
  expect(range(3, 7)).toEqual([3, 4, 5, 6, 7]);
});