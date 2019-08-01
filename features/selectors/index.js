const SAMPLE_SELECTORS = require("./sample");

const SELECTORS = {
  ...SAMPLE_SELECTORS
};

const getSelector = name => SELECTORS[name];

module.exports = {
  getSelector
};
