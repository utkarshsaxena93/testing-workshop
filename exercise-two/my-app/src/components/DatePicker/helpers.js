export function getYearForRange(range) {
  if (range && range.start) {
    return range.start.getFullYear();
  }

  if (range && range.end) {
    return range.end.getFullYear();
  }

  return new Date().getFullYear();
}

export function triggerIfDifferentDay(day1, day2, callback) {
  if (!isSameDay(day1, day2)) {
    callback();
  }
}

export function isSameDay(day1, day2) {
  return (
    isDateSame(day1, day2) && isMonthSame(day1, day2) && isYearSame(day1, day2)
  );
}

/*
Private start
*/
function isDateSame(day1, day2) {
  return day1.getDate() === day2.getDate();
}

function isMonthSame(day1, day2) {
  return day1.getMonth() === day2.getMonth();
}

function isYearSame(day1, day2) {
  return day1.getFullYear() === day2.getFullYear();
}
/*
Private end
*/
