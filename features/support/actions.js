const { equal } = require("assert");

const scope = require("./scope");
const { getSelector } = require("../selectors");
const { DEFAULT_TIMEOUT } = require("./constants");
// const { PAGES } = require('./pages');

const pages = {
  calls: "/calls"
}

const delay = duration => new Promise(resolve => setTimeout(resolve, duration));
const reloadPage = async () => await scope.context.currentPage.reload();

const wait = async timeInSeconds => {
  console.log('wait:', timeInSeconds)
  const time = parseInt(timeInSeconds) * 1000;
  await delay(time);
};

const shouldBeOnPage = async pageName => {
    // console.log("window.locatiošn: ", window.location)
    // console.log("scope.currentPage: ", scope.currentPage)
    // console.log("pageName: ", pageName)
    // console.log('pages: ', pages)

    console.log()

  const url = scope.currentPage.host + pages[pageName];
    console.log("url: ", url)
  
  const urlMatched = await scope.currentPage.waitForFunction(
    `window.location.href === '${url}'`,
    { mutation: true }
  );

  console.log("urlMatched", urlMatched)
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
  console.log('selector:', selector);
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
  console.log('text: ', text)
  const selector = getSelector(name);
  await scope.currentPage.waitForSelector(selector);
  const item = await scope.currentPage.$eval(selector);

    console.log("ITEM::::: ", item)
  // equal(
  //   await scope.currentPage.$eval(
  //     selector,
  //     (el, txt) => el.innerText.includes(txt),
  //     text
  //   ),
  //   true
  // );
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

const getItemWithText = async (string) => {
  const selector = getSelector(string);
  await scope.currentPage.waitForSelector(selector);
  const data1 = await (await elements[i].getProperty('value')).jsonValue();
  console.log("data1: ", data1)
}

const getItemInnerText = async name => {
  const selector = getSelector(name);
  await scope.currentPage.waitForSelector(selector);
  const item = await scope.currentPage.$eval(selector, el => el);

  const element = await scope.currentPage.$eval(selector, el => el.textContent);

  console.log('element: ', element)
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
  clickOn,
  closePage,
  compareElementsCount,
  countElements,
  getItemWithText,
  delay,
  hoverOn,
  hrefEquals,
  hrefIncludes,
  openPage,
  reloadPage,
  saveHref,
  seeElement,
  setDevice,
  setHeaders,
  setLocation,
  getItemInnerText,
  shouldBeOnPage,
  srcEquals,
  styleEquals,
  textEquals,
  textIncludes,
  typeIn,
  urlEquals,
  wait
};
