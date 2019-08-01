const { equal } = require("assert");

const scope = require("./scope");
const { getSelector } = require("../selectors");
const { DEFAULT_TIMEOUT } = require("./constants");

const openPage = async url => {
  scope.currentPage = await scope.context.newPage();
  scope.currentPage.setDefaultTimeout(DEFAULT_TIMEOUT);

  await scope.currentPage.goto(url);
  scope.origin = url.slice(0, url.indexOf("?"));
};

const closePage = async () => {
  await scope.browser.close();
};

const setDevice = async deviceDescriptor => {
  if (deviceDescriptor) return scope.currentPage.emulate(deviceDescriptor);
  return Promise.resolve();
};

const setLocation = async coords => {
  if (coords) {
    await scope.context.overridePermissions(scope.origin, ["geolocation"]);
    return scope.currentPage.setGeolocation(coords);
  }
  return Promise.resolve();
};

const setHeaders = async headers => {
  await scope.currentPage.setExtraHTTPHeaders(headers);
};

const clickOn = async name => {
  const selector = getSelector(name);
  await scope.currentPage.waitForSelector(selector);
  const elementHandle = await scope.currentPage.$(selector);
  await elementHandle.click();
};

const hoverOn = async name => {
  const selector = getSelector(name);
  await scope.currentPage.waitForSelector(selector);
  const elementHandle = await scope.currentPage.$(selector);
  await elementHandle.hover();
};

const typeIn = async (name, query) => {
  const selector = getSelector(name);
  await scope.currentPage.waitForSelector(selector);
  const elementHandle = await scope.currentPage.$(selector);
  await elementHandle.type(query);
};

const textEquals = async (name, text) => {
  const selector = getSelector(name);
  await scope.currentPage.waitForSelector(selector);
  equal(await scope.currentPage.$eval(selector, el => el.innerText), text);
};

const textIncludes = async (name, text) => {
  const selector = getSelector(name);
  await scope.currentPage.waitForSelector(selector);
  equal(
    await scope.currentPage.$eval(
      selector,
      (el, txt) => el.innerText.includes(txt),
      text
    ),
    true
  );
};

const hrefEquals = async (name, href) => {
  const selector = getSelector(name);
  await scope.currentPage.waitForSelector(selector);
  equal(await scope.currentPage.$eval(selector, el => el.href), href);
};

const hrefIncludes = async (name, href) => {
  const selector = getSelector(name);
  await scope.currentPage.waitForSelector(selector);
  equal(
    await scope.currentPage.$eval(
      selector,
      (el, h) => el.href.includes(h),
      href
    ),
    true
  );
};

const saveHref = async name => {
  const selector = getSelector(name);
  await scope.currentPage.waitForSelector(selector);
  scope.savedHref = await scope.currentPage.$eval(selector, el => el.href);
};

const srcEquals = async (name, src) => {
  const selector = getSelector(name);
  await scope.currentPage.waitForSelector(selector);
  equal(await scope.currentPage.$eval(selector, el => el.src), src);
};

const seeElement = async name => {
  const selector = getSelector(name);
  await scope.currentPage.waitForSelector(selector);
  equal(await scope.currentPage.$eval(selector, el => Boolean(el)), true);
};

const countElements = async (name, count) => {
  const selector = getSelector(name);
  await scope.currentPage.waitForSelector(selector);
  const elemLen = await scope.currentPage.$eval(selector, el => el.length);
  equal(elemLen, count);
};

const compareElementsCount = async (name, operator, count) => {
  const selector = getSelector(name);
  await scope.currentPage.waitForSelector(selector);
  const elemLen = await scope.currentPage.$eval(selector, el => el.length);
  equal(elemLen, count);

  if (operator === "more") {
    equal(elemLen > count, true);
  } else {
    equal(elemLen < count, true);
  }
};

const styleEquals = async (attr, name, val) => {
  const selector = getSelector(name);
  await scope.currentPage.waitForSelector(selector);
  equal(
    await scope.currentPage.$eval(selector, (el, key) => el.style[key], attr),
    val
  );
};

const urlEquals = async () => {
  await scope.currentPage.waitForNavigation();
  equal(scope.currentPage.url(), scope.savedHref);
};

module.exports = {
  openPage,
  closePage,
  setDevice,
  setLocation,
  setHeaders,
  clickOn,
  hoverOn,
  typeIn,
  textEquals,
  textIncludes,
  hrefEquals,
  hrefIncludes,
  saveHref,
  srcEquals,
  seeElement,
  countElements,
  compareElementsCount,
  styleEquals,
  urlEquals
};
