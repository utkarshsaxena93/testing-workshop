import React from "react";
import { shallow } from "enzyme";

import DateMock from "./DateMock";
import App from "../App";
import DatePicker from "../DatePicker";

describe("<App />", () => {
  const originalDate = window.Date;

  afterEach(() => {
    window.Date = originalDate;
  });

  it("renders a DatePicker", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(DatePicker).exists()).toBe(true);
  });

  it("sets the value for fullDate on DatePicker", () => {
    const currentDate = "2018-02-25T20:34:21.261Z";
    window.Date = DateMock(new Date(currentDate));
    const wrapper = shallow(<App />);
    const fullDateProp = wrapper.find(DatePicker).prop("fullDate");
    expect(fullDateProp).toBe(new Date(currentDate));
  });

  it("sets the new value for fullDate when onDayClick is called", () => {
    const wrapper = shallow(<App />);
    const datePicker = wrapper.find(DatePicker);
    datePicker.simulate("dayClick", 19);
    wrapper.update();
    expect(
      wrapper
        .find(DatePicker)
        .prop("fullDate")
        .toString()
    ).toEqual("Mon Feb 19 2018 00:00:00 GMT-0500 (EST)");
  });
});
