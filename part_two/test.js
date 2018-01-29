const { expect, it } = require("../utilities/testRunner.js");
const { dateMock } = require("../utilities/mocks/DateMock.js");
const {
  getYearForRange,
  isSameDay,
  triggerIfDifferentDay
} = require("./dates.js");

/*
  Tests for `getYearForRange`
*/
it("gets the year when start date is provided", () => {
  const year = 1969;

  const result = getYearForRange({
    start: new Date(`July 20, ${year} 00:20:18`)
  });

  expect(result).toBe(year);
});

it("gets the year when end date is provided", () => {
  const year = 1969;

  const result = getYearForRange({
    end: new Date(`July 20, ${year} 00:20:18`)
  });

  expect(result).toBe(year);
});

it("gets the start year when both start and end date is provided", () => {
  const start = 1949;
  const end = 1969;

  const result = getYearForRange({
    start: new Date(`July 20, ${start} 00:20:18`),
    end: new Date(`July 20, ${end} 00:20:18`)
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
  Tests for `isSameDay`
  - Go over testing all cases.
  - Go over testing functions being used within isSameDay and 
    if we should test those or not /  how to correctly test those?
  - Go over mocking globals for predectable tests and what happens if we don't
  - Think about separating each test into a separate branch and file for course purposes
*/
it("returns true when dates are same", () => {
  const day1 = new Date(`July 20, 2012 00:20:18`);
  const day2 = new Date(`July 20, 2012 00:20:18`);
  expect(isSameDay(day1, day2)).toBe(true);
});

it("returns false when only date is different", () => {
  const day1 = new Date(`July 21, 2012 00:20:18`);
  const day2 = new Date(`July 20, 2012 00:20:18`);
  expect(isSameDay(day1, day2)).toBe(false);
});

it("returns false when only month is different", () => {
  const day1 = new Date(`August 20, 2012 00:20:18`);
  const day2 = new Date(`July 20, 2012 00:20:18`);
  expect(isSameDay(day1, day2)).toBe(false);
});

it("returns false when only year is different", () => {
  const day1 = new Date(`July 21, 2022 00:20:18`);
  const day2 = new Date(`July 20, 2012 00:20:18`);
  expect(isSameDay(day1, day2)).toBe(false);
});

it("returns false when date and month is different", () => {
  const day1 = new Date(`August 21, 2012 00:20:18`);
  const day2 = new Date(`July 20, 2012 00:20:18`);
  expect(isSameDay(day1, day2)).toBe(false);
});

it("returns false when date and year is different", () => {
  const day1 = new Date(`July 21, 2011 00:20:18`);
  const day2 = new Date(`July 20, 2012 00:20:18`);
  expect(isSameDay(day1, day2)).toBe(false);
});

it("returns false when month and year is different", () => {
  const day1 = new Date(`October 20, 2011 00:20:18`);
  const day2 = new Date(`July 20, 2012 00:20:18`);
  expect(isSameDay(day1, day2)).toBe(false);
});

/*
  Tests for `triggerIfDifferentDay`
  - Go over if we need to test `isSameDay` being used by this function
  - Go over how to use spies to test if the callback was triggered
*/

it("call the callback when dates are different", () => {
  let spyWasCalled = false;
  const spy = () => {
    spyWasCalled = true;
  };
  const day1 = new Date(`October 20, 2011 00:20:18`);
  const day2 = new Date(`July 20, 2012 00:20:18`);
  triggerIfDifferentDay(day1, day2, spy);
  
  expect(spyWasCalled).toBe(true);
});

it("does not call the callback when dates are same", () => {
  let spyWasCalled = false;
  const spy = () => {
    spyWasCalled = true;
  };
  const day1 = new Date(`July 20, 2012 00:20:18`);
  const day2 = new Date(`July 20, 2012 00:20:18`);
  triggerIfDifferentDay(day1, day2, spy);

  expect(spyWasCalled).toBe(false);
});
