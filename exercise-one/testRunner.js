function assert(result, expectation) {
  if (result === expectation) {
    console.log("Test passed!!");
  } else {
    console.error(`Test failed. Expectation did not match the result `, {
      result,
      expectation
    });
  }
}

function it(testName, testToRun) {
  console.log(`Running test ${testName}\n`);
  testToRun();
}
