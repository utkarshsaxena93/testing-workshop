function expect(result) {
  return {
    toBe: expectation => {
      if (expectation === result) {
        return {
          success: true,
          expectation,
          result
        };
      }
      return {
        success: false,
        expectation,
        result
      };
    }
  };
}

function test(testName, testToRun) {
  const { success, expectation, result } = testToRun();

  if (success) {
    return console.info(`${testName} passed!! 😎`);
  }
  console.info(
    `${testName} failed 😭 🤬. Expectation did not match the result `,
    { expectation, result }
  );
}

module.exports = {
  test,
  expect
};
