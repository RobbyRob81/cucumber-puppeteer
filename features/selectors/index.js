const LOGIN_SELECTORS = require("./loginSelectors");
const COMMON_SELECTORS = require("./common");

const SELECTORS = {
  ...COMMON_SELECTORS,
  ...LOGIN_SELECTORS
};

const getSelector = name => SELECTORS[name];

module.exports = {
  getSelector
};
