import React, { Component } from "react";

import Weekday from "./Weekday";
import Day from "./Day";
import { weekdays, abbreviationForWeekday, getWeeksForMonth } from "./helpers";

class Month extends Component {
  constructor(props) {
    super(props);

    this.renderWeek = this.renderWeek.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);

    this.state = {
      hoveredDate: null
    };
  }

  render() {
    const { month, year } = this.props;
    const weeks = getWeeksForMonth(month, year);
    const weeksMarkup = weeks.map((week, index) => {
      return (
        <div role="row" className="Week" key={index}>
          {week.map(this.renderWeek)}
        </div>
      );
    });

    const weekDaysMarkup = weekdays.map(weekday => {
      return (
        <Weekday
          key={weekday}
          title={abbreviationForWeekday(weekday)}
          current={true}
          label={weekday}
        />
      );
    });

    return (
      <div className="MonthContainer">
        <div className="WeekdayContainer">{weekDaysMarkup}</div>
        {weeksMarkup}
      </div>
    );
  }

  renderWeek(fullDate, dayIndex) {
    const { onDayClick } = this.props;
    const {hoveredDate} = this.state;

    if (fullDate == null) {
      return <Day key={dayIndex} />;
    }

    const date = fullDate.getDate();
    return (
      <Day
        key={dayIndex}
        fullDate={fullDate}
        onClick={onDayClick}
        selected={date === this.props.date}
        hovering={date === hoveredDate}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      />
    );
  }

  handleMouseEnter(date) {
    this.setState({
      hoveredDate: date,
    });
  }

  handleMouseLeave() {
    this.setState({
      hoveredDate: null,
    });
  }
}

export default Month;
