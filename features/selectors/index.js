const COMMON_SELECTORS = require("./common");
const LOGIN_SELECTORS = require("./loginSelectors");

const SELECTORS = {
  ...COMMON_SELECTORS,
  ...LOGIN_SELECTORS
};

const getSelector = name => SELECTORS[name];

module.exports = {
  getSelector
};
