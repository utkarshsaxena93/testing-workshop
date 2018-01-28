class Expect {
  constructor(result) {
    this.result = result;
    this.invertExpectation = false;
  }

  toBe(expectation) {
    const didExpectationMatchResult = expectation === this.result;

    if (didExpectationMatchResult) {
      if (this.invertExpectation) {
        throw {
          expectation,
          result: this.result
        };
      }
      return;
    }

    if (!this.invertExpectation) {
      throw {
        expectation,
        result: this.result
      };
    }
  }

  not() {
    this.invertExpectation = true;
    return this;
  }
}

function expect(result) {
  return new Expect(result);
}

function test(testName, testToRun) {
  try {
    testToRun();
    console.info(`${testName} passed!! 😎`);
  } catch (err) {
    const { expectation, result } = err;
    console.info(
      `${testName} failed 😭 🤬. Expectation did not match the result `,
      { expectation, result }
    );
  }
}

module.exports = {
  test,
  expect
};
