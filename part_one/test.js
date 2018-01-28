const { expect, test } = require("../utilities/testRunner.js");
const { add } = require("./index.js");

test("adds two numbers", () => {
  const result = add(1, 2);
  const expectation = 3;

  expect(result).toBe(expectation);
});

test("adds two numbers incorrectly", () => {
  const result = add(1, 2);
  const expectation = 4;

  expect(result).not().toBe(expectation);
});
