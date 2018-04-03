const helpers = require("../static/components/Helpers");

test("range 3..7", () => {
  expect(helpers.range(3, 7)).toBe([3, 4, 5, 6, 7]);
});