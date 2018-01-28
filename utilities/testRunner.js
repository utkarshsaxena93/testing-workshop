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

function it(testName, testToRun) {
  try {
    testToRun();
    console.info(`it ${testName} passed!! 😎`);
  } catch (err) {
    const { expectation, result } = err;
    console.info(
      `it ${testName} failed 😭 🤬. Expectation did not match the result `,
      { expectation, result }
    );
  }
}

module.exports = {
  it,
  expect
};
