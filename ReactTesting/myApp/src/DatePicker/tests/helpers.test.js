import {abbreviationForWeekday, getMonthName, getWeeksForMonth}  from '../helpers';

describe('DatePicker helpers', () => {
  describe('abbreviationForWeekday', () => {
    it('gets the abbreviation', () => {
      const abbreviation = abbreviationForWeekday('Sunday');
      expect(abbreviation).toBe('Su');
    });
  });

  describe('getMonthName', () => {
    it('gets the month name', () => {
      const monthName = getMonthName(4);
      expect(monthName).toBe('May');
    });
  });

  describe('getWeeksForMonth', () => {
    it('gets the weeks', () => {
      const weeks = getWeeksForMonth(1, 2018);
      expect(weeks).toMatchSnapshot();
    });

    it('gets the weeks for leap year', () => {
      const weeks = getWeeksForMonth(1, 2016);
      expect(weeks).toMatchSnapshot();
    });
  });
});
