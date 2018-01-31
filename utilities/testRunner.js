function expect(result, expectation) {
  if (result === expectation) {
    console.info(`Test passed!! 😎`);
  } else {
    console.info(`Test failed 😭 🤬. Expectation did not match the result `, {
      result,
      expectation
    });
  }
  console.log('\n');
}

function it(testName, testToRun) {
  console.log(`Running test ${testName}\n`);
  testToRun();
}

module.exports = {
  it,
  expect
};
