import React from "react";
import { mount } from "enzyme";

import Month from "../Month";
import Day from "../Day";

describe("<Month />", () => {
  const mockProps = {
    date: 22,
    month: 10,
    year: 2018,
    onDayClick: () => {}
  };

  describe("<Day />", () => {
    it("sets the selected prop on the Day component to true for the given date", () => {
      const date = 15;
      const wrapper = mount(<Month {...mockProps} date={date} />);
      const selectedDayComponent = wrapper.find(Day).filterWhere(component => {
        const fullDate = component.prop("fullDate");
        if (fullDate == null) {
          return false;
        }
        return fullDate.getDate() === date;
      });
  
      expect(selectedDayComponent.prop("selected")).toEqual(true);
    });
  
    it('assigns the onClick prop to the Day component', () => {
      const onDayClickSpy = () => {};
      const wrapper = mount(<Month {...mockProps} onDayClick={onDayClickSpy} />);
      const nonEmptyStateDayComponents = wrapper.find(Day).filterWhere(component => {
        const fullDate = component.prop("fullDate");
        if (fullDate == null) {
          return false;
        }
        return fullDate.getDate();
      });
  
      const firstDayComponent = nonEmptyStateDayComponents.first();
  
      expect(firstDayComponent.prop('onClick')).toEqual(onDayClickSpy);
    });
  
    it('calls the onDayClick callback when Day is clicked', () => {
      const onDayClickSpy = jest.fn();
      const wrapper = mount(<Month {...mockProps} onDayClick={onDayClickSpy} />);
      const nonEmptyStateDayComponents = wrapper.find(Day).filterWhere(component => {
        const fullDate = component.prop("fullDate");
        if (fullDate == null) {
          return false;
        }
        return fullDate.getDate();
      });
  
      const firstDayComponent = nonEmptyStateDayComponents.first();
  
      firstDayComponent.simulate('click');
      expect(onDayClickSpy).toHaveBeenCalledTimes(1);
    });
  });
});
