export default function dateMock(currentDate) {
  return class DateMock extends Date {
    constructor() {
      return currentDate;
    }
  };
}
