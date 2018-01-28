function getYearForRange(range) {
  if (range && range.start) {
    return range.start.getFullYear();
  }

  if (range && range.end) {
    return range.end.getFullYear();
  }

  return new Date().getFullYear();
}

module.exports = {
  getYearForRange
};
