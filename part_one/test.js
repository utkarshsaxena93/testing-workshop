const { expect, test } = require("./testRunner.js");
const { add } = require("./index.js");

expect(add(1, 2)).toBe(13);

test("adds two numbers", () => {
  const result = add(1, 2);
  const expect = 4;

  return expect(result).toBe(expect);
});
