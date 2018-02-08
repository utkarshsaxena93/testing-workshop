export default function dateMock(currentDate) {
  return class DateMock {
    constructor() {
      this.currentDate = currentDate;
    }

    getFullYear() {
      return this.currentDate.getFullYear();
    }
  };
}
