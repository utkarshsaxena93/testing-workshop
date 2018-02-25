import React from "react";
import { shallow } from "enzyme";

import DatePicker from "../DatePicker";
import Month from "../Month";
import Day from "../Day";
import Weekday from "../Weekday";
import { weekdays, abbreviationForWeekday } from "../helpers";

describe("<DatePicker />", () => {
  const mockProps = {
    fullDate: new Date("2018-11-30T05:00:00.000Z"),
    onDayClick: () => {}
  };

  it("renders the month component", () => {
    const wrapper = shallow(<DatePicker {...mockProps} />);
    expect(wrapper.find(Month).exists()).toBe(true);
  });

  it("renders the month name", () => {
    const wrapper = shallow(<DatePicker {...mockProps} />);
    const monthNameContainer = wrapper.find("div");
    expect(monthNameContainer.at(1).text()).toBe("November");
  });

  describe("<Month />", () => {
    it("sets the date value", () => {
      const wrapper = shallow(<DatePicker {...mockProps} />);
      const month = wrapper.find(Month);
      expect(month.prop("date")).toBe(mockProps.fullDate.getDate());
    });

    it("sets the month value", () => {
      const wrapper = shallow(<DatePicker {...mockProps} />);
      const month = wrapper.find(Month);
      expect(month.prop("month")).toBe(mockProps.fullDate.getMonth());
    });

    it("sets the year value", () => {
      const wrapper = shallow(<DatePicker {...mockProps} />);
      const month = wrapper.find(Month);
      expect(month.prop("year")).toBe(mockProps.fullDate.getFullYear());
    });

    it("passes down the onDayClick value", () => {
      const wrapper = shallow(<DatePicker {...mockProps} />);
      const month = wrapper.find(Month);
      expect(month.prop("onDayClick")).toBe(mockProps.onDayClick);
    });
  });
});

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
      const wrapper = shallow(<Month {...mockProps} date={date} />);
      const selectedDayComponent = filterDayComponentsByDate(wrapper, date);

      expect(selectedDayComponent.prop("selected")).toBe(true);
    });

    it("assigns the onClick prop to the Day component", () => {
      const onDayClickSpy = () => {};
      const wrapper = shallow(
        <Month {...mockProps} onDayClick={onDayClickSpy} />
      );
      const nonEmptyStateDayComponents = getNonEmptyStateDayComponents(wrapper);

      const firstDayComponent = nonEmptyStateDayComponents.first();

      expect(firstDayComponent.prop("onClick")).toBe(onDayClickSpy);
    });

    it("calls the onDayClick callback when Day is clicked", () => {
      const onDayClickSpy = jest.fn();
      const wrapper = shallow(
        <Month {...mockProps} onDayClick={onDayClickSpy} />
      );
      const nonEmptyStateDayComponents = getNonEmptyStateDayComponents(wrapper);

      const firstDayComponent = nonEmptyStateDayComponents.first();

      firstDayComponent.simulate("click");
      expect(onDayClickSpy).toHaveBeenCalledTimes(1);
    });

    it("renders the empty state Day components", () => {
      const wrapper = shallow(<Month {...mockProps} />);
      const emptyStateDayComponents = wrapper
        .find(Day)
        .filterWhere(component => {
          const fullDate = component.prop("fullDate");
          if (fullDate == null || component == null) {
            return true;
          }
          return false;
        });

      expect(emptyStateDayComponents.length).toBe(5);
    });

    it("renders the non-empty state Day components", () => {
      const wrapper = shallow(<Month {...mockProps} />);
      const nonEmptyStateDayComponents = getNonEmptyStateDayComponents(wrapper);

      expect(nonEmptyStateDayComponents.length).toBe(30);
    });

    describe("hover state", () => {
      it("defaults to non-hovering state", () => {
        const wrapper = shallow(<Month {...mockProps} />);
        const componentsWithHovering = getHoveringDayComponents(wrapper);
        expect(componentsWithHovering.length).toBe(0);
      });

      it("sets hovering to true for date that matches `hoveredDate` state", () => {
        const hoveredDate = 20;
        const wrapper = shallow(<Month {...mockProps} />);
        const dayComponentToHover = filterDayComponentsByDate(
          wrapper,
          hoveredDate
        );

        dayComponentToHover.simulate("mouseEnter", hoveredDate);
        wrapper.update();

        const componentsWithHovering = getHoveringDayComponents(wrapper);
        expect(componentsWithHovering.prop("fullDate").getDate()).toBe(
          hoveredDate
        );
      });

      it("sets hovering to true on mouseEnter", () => {
        const hoveredDate = 20;
        const wrapper = shallow(<Month {...mockProps} />);
        const dayComponentToHover = filterDayComponentsByDate(
          wrapper,
          hoveredDate
        );

        dayComponentToHover.simulate("mouseEnter", hoveredDate);
        wrapper.update();

        const componentsWithHovering = getHoveringDayComponents(wrapper);
        expect(componentsWithHovering.prop("fullDate").getDate()).toBe(
          hoveredDate
        );
      });

      it("sets hovering to false on mouseLeave", () => {
        const hoveredDate = 10;
        const wrapper = shallow(<Month {...mockProps} />);
        const dayComponentToHover = filterDayComponentsByDate(
          wrapper,
          hoveredDate
        );

        dayComponentToHover.simulate("mouseEnter", hoveredDate);
        wrapper.update();

        dayComponentToHover.simulate("mouseLeave");
        wrapper.update();

        const updatedDayComponentToHover = filterDayComponentsByDate(
          wrapper,
          hoveredDate
        );
        expect(updatedDayComponentToHover.prop("hovering")).toBe(false);
      });
    });
  });

  describe("<Weekday />", () => {
    it("renders Weekday components", () => {
      const wrapper = shallow(<Month {...mockProps} />);
      const numberOfWeekdayComponents = wrapper.find(Weekday).length;

      expect(numberOfWeekdayComponents).toEqual(7);
    });

    it("renders Weekday components with titles", () => {
      const wrapper = shallow(<Month {...mockProps} />);

      const expectedTitles = weekdays.map(weekday => {
        return abbreviationForWeekday(weekday);
      });

      const weekdayComponents = wrapper.find(Weekday);
      const titlesFromComponents = weekdayComponents.map(component => {
        return component.prop("title");
      });

      expect(titlesFromComponents).toEqual(expectedTitles);
    });

    it("renders Weekday components with labels", () => {
      const wrapper = shallow(<Month {...mockProps} />);

      const expectedLabels = weekdays.map(weekday => {
        return weekday;
      });

      const weekdayComponents = wrapper.find(Weekday);
      const labelsFromComponents = weekdayComponents.map(component => {
        return component.prop("label");
      });

      expect(labelsFromComponents).toEqual(expectedLabels);
    });
  });
});

describe("<Day />", () => {
  // We do not want to test absence and presence of classNames
  // that only influence the visuals of a components. That is for
  // a visual regressions test. Hence we won't be testing if the correct
  // className is assigned to the button and div rendered.

  const mockProps = {
    fullDate: new Date("2018-11-30T05:00:00.000Z"),
    onClick: () => {},
    selected: false,
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    hovering: () => {}
  };

  it("renders a div if fullDate is null", () => {
    const wrapper = shallow(<Day />);
    expect(wrapper.find("div").exists()).toBe(true);
  });

  it("renders a button with the date if fullDate is not null", () => {
    const wrapper = shallow(<Day {...mockProps} />);
    const button = wrapper.find("button");
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe(mockProps.fullDate.getDate().toString());
  });

  it("calls onClick callback with the date when click is triggered", () => {
    const onClickSpy = jest.fn();
    const wrapper = shallow(<Day {...mockProps} onClick={onClickSpy} />);
    wrapper.simulate("click");
    expect(onClickSpy).toHaveBeenCalledTimes(1);
    expect(onClickSpy.mock.calls[0][0]).toBe(mockProps.fullDate.getDate());
  });

  it("calls onMouseEnter callback with the date when mouseEnter is triggered", () => {
    const onMouseEnterSpy = jest.fn();
    const wrapper = shallow(
      <Day {...mockProps} onMouseEnter={onMouseEnterSpy} />
    );
    wrapper.simulate("mouseEnter");
    expect(onMouseEnterSpy).toHaveBeenCalledTimes(1);
    expect(onMouseEnterSpy.mock.calls[0][0]).toBe(mockProps.fullDate.getDate());
  });

  it("calls onMouseLeave callback with the date when mouseLeave is triggered", () => {
    const onMouseLeaveSpy = jest.fn();
    const wrapper = shallow(
      <Day {...mockProps} onMouseLeave={onMouseLeaveSpy} />
    );
    wrapper.simulate("mouseLeave");
    expect(onMouseLeaveSpy).toHaveBeenCalledTimes(1);
    expect(onMouseLeaveSpy.mock.calls[0][0]).toBe(mockProps.fullDate.getDate());
  });
});

describe("<WeekDay />", () => {
  const mockProps = {
    label: "Tuesday",
    title: "Tue"
  };

  it("renders the div with aria-label", () => {
    const wrapper = shallow(<Weekday {...mockProps} />);
    expect(wrapper.find("div").prop("aria-label")).toBe(mockProps.label);
  });

  it("renders the div with title", () => {
    const wrapper = shallow(<Weekday {...mockProps} />);
    expect(wrapper.find("div").text()).toBe(mockProps.title);
  });
});

function filterDayComponentsByDate(wrapper, date) {
  return wrapper.find(Day).filterWhere(component => {
    const fullDate = component.prop("fullDate");
    if (fullDate == null) {
      return false;
    }
    return fullDate.getDate() === date;
  });
}

function getNonEmptyStateDayComponents(wrapper) {
  return wrapper.find(Day).filterWhere(component => {
    const fullDate = component.prop("fullDate");
    if (fullDate == null) {
      return false;
    }
    return fullDate.getDate();
  });
}

function getHoveringDayComponents(wrapper) {
  return wrapper.find(Day).filterWhere(component => {
    const hovering = component.prop("hovering");
    return hovering;
  });
}
