const { expect, it } = require("../utilities/testRunner.js");
const { dateMock } = require("../utilities/mocks/DateMock.js");
const { getYearForRange } = require("./dates.js");

/*
  Tests for `getYearForRange`
*/
it("gets the year when start date is provided", () => {
  const year = 1969;

  const result = getYearForRange({
    start: new Date(`July 20, ${year} 00:20:18`),
  });

  expect(result).toBe(year);
});

it("gets the year when end date is provided", () => {
  const year = 1969;

  const result = getYearForRange({
    end: new Date(`July 20, ${year} 00:20:18`),
  });

  expect(result).toBe(year);
});

it("gets the start year when both start and end date is provided", () => {
  const start = 1949;
  const end = 1969;

  const result = getYearForRange({
    start: new Date(`July 20, ${start} 00:20:18`),
    end: new Date(`July 20, ${end} 00:20:18`),
  });

  expect(result).toBe(start);
});

// Good example to explain mocks
const originalDate = global.Date; // think window.Date when in a browser environment
it("gets the current year when start and end date are not provided", () => {
  const currentYear = 2016;
  global.Date = dateMock(new Date(`July 20, ${currentYear} 00:20:18`));
  const result = getYearForRange();

  expect(result).toBe(currentYear);
});
global.Date = originalDate;

/*
  Tests for `getYearForRange`
*/
