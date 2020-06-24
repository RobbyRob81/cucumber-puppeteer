const { equal } = require("assert");
const { List, Box, Task} = require("immutable-ext");

const { DEFAULT_TIMEOUT } = require("./constants");
const { find, flow, flowArgs } = require("../utils");
const { getSelector } = require("../selectors");
const scope = require("./scope");

const pages = { 
  calls: "/calls",
  login: "/login",
  dashboard: "/dashboard/call-activity",
  "continuous monitoring": "/continuous-monitoring"
};

const delay = duration => new Promise(resolve => setTimeout(resolve, duration));
const reloadPage = async () => await scope.context.currentPage.reload();

const wait = async timeInSeconds => {
  const time = parseInt(timeInSeconds) * 1000;
  await delay(time);
};

const shouldBeOnPage = async pageName => {
  const url = await scope.currentPage.url().replace(/\/([^/]*)$/g,"") + pages[pageName];
  const urlMatched = scope.currentPage.waitForFunction(
    `window.location.href === '${url}'`,
    { mutation: true }
  );
  await urlMatched;
};

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
  const item = await scope.currentPage.$eval(selector);
 
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

const findMatchingText = async string => {
  var matchingNodes = await page.$$eval(".plan-features a",
  elements => elements.map(item=>item.textContent))
// prints a array of text
  await matchingNodes
}

const getItemWithText = async (string) => {
  const selector = getSelector(string);
  await scope.currentPage.waitForSelector(selector);
  const data1 = await (await elements[i].getProperty('value')).jsonValue();
}

const _getItemWithText = async string => {
  const selector = getSelector(name);
  await scope.currentPage.waitForSelector(selector);
  const item = await scope.currentPage.$eval(selector, el => el);
  const element = await scope.currentPage.$eval(selector, el => el.textContent === string);
  console.log("TCL: lement", element);
  return element;
}

const getItemInnerText = async name => {
  const selector = getSelector(name);
  await scope.currentPage.waitForSelector(selector);
  const item = await scope.currentPage.$eval(selector, el => el);
  const element = await scope.currentPage.$eval(selector, el => el.textContent);
  return element;
}

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
  const item = await scope.currentPage.$eval(selector, el => el);
  equal(await scope.currentPage.$eval(selector, el => Boolean(el)), true);
};

const missingElement = async name => {
  const selector = getSelector(name);
  await scope.currentPage.waitForSelector(selector);
  // equal(await scope.currentPage.$eval(selector, el => !!Boolean(el)), false);
}

const countElements = async (count, name) => {
  const selector = getSelector(name);
  await scope.currentPage.waitForSelector(selector);
  equal((await scope.currentPage.$$(selector)).length, count);
};

const compareElementsCount = async (name, operator, count) => {
  const selector = getSelector(name);
  await scope.currentPage.waitForSelector(selector);

  if (operator === "more") {
    equal((await scope.currentPage.$$(selector)).length > count, true);
  } else {
    equal((await scope.currentPage.$$(selector)).length < count, true);
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

const formatInputNumber = async str => await str.replace(/\W+/g,"");

// const findAllItems = async name => {
//   const selector = getSelector(name);
//   await page.$$eval(selector, el);
// }

module.exports = {
  clickOn,
  closePage,
  compareElementsCount,
  countElements,
  delay,
  formatInputNumber,
  getItemInnerText,
  getItemWithText,
  hoverOn,
  hrefEquals,
  hrefIncludes,
  missingElement,
  openPage,
  reloadPage,
  saveHref,
  seeElement,
  setDevice,
  setHeaders,
  setLocation,
  shouldBeOnPage,
  srcEquals,
  styleEquals,
  textEquals,
  textIncludes,
  typeIn,
  urlEquals,
  wait
};
