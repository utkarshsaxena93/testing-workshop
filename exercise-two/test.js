/*
  Tests for `getYearForRange`
*/
it("gets the year when start date is provided", () => {
  const year = 1969;

  const result = getYearForRange({
    start: new Date(`July 20, ${year} 00:20:18`)
  });

  expect(result, year);
});

it("gets the year when end date is provided", () => {
  const year = 1969;

  const result = getYearForRange({
    end: new Date(`July 20, ${year} 00:20:18`)
  });

  expect(result, year);
});

it("gets the start year when both start and end date is provided", () => {
  const start = 1949;
  const end = 1969;

  const result = getYearForRange({
    start: new Date(`July 20, ${start} 00:20:18`),
    end: new Date(`July 20, ${end} 00:20:18`)
  });

  expect(result, start);
});

// Good example to explain mocks
const originalDate = window.Date;
it("gets the current year when start and end date are not provided", () => {
  const currentYear = 2016;
  window.Date = dateMock(new Date(`July 20, ${currentYear} 00:20:18`));
  const result = getYearForRange();

  expect(result, currentYear);
});
window.Date = originalDate;

/*
  Tests for `isSameDay`
*/
it("returns true when dates are same", () => {
  const day1 = new Date(`July 20, 2012 00:20:18`);
  const day2 = new Date(`July 20, 2012 00:20:18`);
  expect(isSameDay(day1, day2), true);
});

it("returns false when only date is different", () => {
  const day1 = new Date(`July 21, 2012 00:20:18`);
  const day2 = new Date(`July 20, 2012 00:20:18`);
  expect(isSameDay(day1, day2), false);
});

it("returns false when only month is different", () => {
  const day1 = new Date(`August 20, 2012 00:20:18`);
  const day2 = new Date(`July 20, 2012 00:20:18`);
  expect(isSameDay(day1, day2), false);
});

it("returns false when only year is different", () => {
  const day1 = new Date(`July 21, 2022 00:20:18`);
  const day2 = new Date(`July 20, 2012 00:20:18`);
  expect(isSameDay(day1, day2), false);
});

it("returns false when date and month is different", () => {
  const day1 = new Date(`August 21, 2012 00:20:18`);
  const day2 = new Date(`July 20, 2012 00:20:18`);
  expect(isSameDay(day1, day2), false);
});

it("returns false when date and year is different", () => {
  const day1 = new Date(`July 21, 2011 00:20:18`);
  const day2 = new Date(`July 20, 2012 00:20:18`);
  expect(isSameDay(day1, day2), false);
});

it("returns false when month and year is different", () => {
  const day1 = new Date(`October 20, 2011 00:20:18`);
  const day2 = new Date(`July 20, 2012 00:20:18`);
  expect(isSameDay(day1, day2), false);
});

/*
  Tests for `triggerIfDifferentDay`
*/

it("call the callback when dates are different", () => {
  let spyWasCalled = false;
  const spy = () => {
    spyWasCalled = true;
  };
  const day1 = new Date(`October 20, 2011 00:20:18`);
  const day2 = new Date(`July 20, 2012 00:20:18`);
  triggerIfDifferentDay(day1, day2, spy);

  expect(spyWasCalled, true);
});

it("does not call the callback when dates are same", () => {
  let spyWasCalled = false;
  const spy = () => {
    spyWasCalled = true;
  };
  const day1 = new Date(`July 20, 2012 00:20:18`);
  const day2 = new Date(`July 20, 2012 00:20:18`);
  triggerIfDifferentDay(day1, day2, spy);

  expect(spyWasCalled, false);
});
