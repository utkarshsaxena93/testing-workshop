import React from "react";
import { mount } from "enzyme";

import Month from "../Month";
import Day from "../Day";
import Weekday from "../Weekday";
import {weekdays, abbreviationForWeekday} from "../helpers";

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
  
    it('renders the empty state Day components', () => {
      const wrapper = mount(<Month {...mockProps} />);
      const emptyStateDayComponents = wrapper.find(Day).filterWhere(component => {
        const fullDate = component.prop("fullDate");
        if (fullDate == null || component == null) {
          return true;
        }
        return false;
      });
  
      expect(emptyStateDayComponents.length).toEqual(5);
    });
  
    it('renders the non-empty state Day components', () => {
      const wrapper = mount(<Month {...mockProps} />);
      const nonEmptyStateDayComponents = wrapper.find(Day).filterWhere(component => {
        const fullDate = component.prop("fullDate");
        if (fullDate == null) {
          return false;
        }
        return fullDate.getDate();
      });
  
      expect(nonEmptyStateDayComponents.length).toEqual(30);
    });
  });

  describe("<Weekday />", () => {
    it('renders Weekday components', () => {
      const wrapper = mount(<Month {...mockProps} />);
      const numberOfWeekdayComponents = wrapper.find(Weekday).length;

      expect(numberOfWeekdayComponents).toEqual(7);
    });

    it('renders Weekday components with titles', () => {
      const wrapper = mount(<Month {...mockProps} />);
      
      const expectedTitles = weekdays.map((weekday) => {
        return abbreviationForWeekday(weekday);
      });

      const weekdayComponents = wrapper.find(Weekday);
      const titlesFromComponents = weekdayComponents.map((component) => {
        return component.prop('title');
      });

      expect(titlesFromComponents).toEqual(expectedTitles);
    });

    it('renders Weekday components with labels', () => {
      const wrapper = mount(<Month {...mockProps} />);
      
      const expectedLabels = weekdays.map((weekday) => {
        return weekday;
      });

      const weekdayComponents = wrapper.find(Weekday);
      const labelsFromComponents = weekdayComponents.map((component) => {
        return component.prop('label');
      });

      expect(labelsFromComponents).toEqual(expectedLabels);
    });
  });
});
