import React, { Component } from "react";

import Month from "./Month";
import { getMonthName } from "./helpers";
import "./DatePicker.css";

class DatePicker extends Component {
  render() {
    const { fullDate, onDayClick } = this.props;

    const dateNumber = fullDate.getDate();
    const monthNumber = fullDate.getMonth();
    const yearNumber = fullDate.getFullYear();
    const monthName = getMonthName(monthNumber);

    return (
      <div className="DatePickerContainer">
        <div className="DatePickerContainer__Title">{monthName}</div>
        <Month
          date={dateNumber}
          month={monthNumber}
          year={yearNumber}
          onDayClick={onDayClick}
        />
      </div>
    );
  }
}

export default DatePicker;
