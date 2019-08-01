const { Given, When, Then } = require("cucumber");

const { compose } = require("../utils");
const { getLocaleHeaders } = require("../support/locale");
const { getDevice } = require("../support/device");
const { getUrl } = require("../support/url");
const { getLocation } = require("../support/location");
const {
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
} = require("../support/actions");

// Given
Given(/a user on a (desktop|tablet|mobile) device/, async device =>
  compose(
    setDevice,
    getDevice
  )(device)
);

Given(/the (.+) domain and the (.*) path/, async (domain, path) =>
  compose(
    openPage,
    getUrl
  )(domain, path)
);

Given(/a user in the (en-us) locale/, async locale =>
  compose(
    setHeaders,
    getLocaleHeaders
  )(locale)
);

// When
When(/I go to (.+)/, async url => openPage(url));

When(/I click the (.+)/, async name => clickOn(name));

When(/I hover the (.+)/, async name => hoverOn(name));

When(/I set the user location to (.+)/, async location =>
  compose(
    setLocation,
    getLocation
  )(location)
);

When(/I focus the (.+) and type (.+)/, async (name, query) => {
  await clickOn(name);
  return typeIn(name, query);
});

When(/I save the HREF of the (.+)/, async name => saveHref(name));

// Then
Then(/the (.+) should be displayed/, async name => seeElement(name));

Then(/(\d+) (.+)s* should be displayed/, async (count, name) =>
  countElements(count, name)
);

Then(
  /(more|less) than (\d+) (.+)s* should be displayed/,
  async (operator, count, name) => compareElementCount(name, operator, count)
);

Then(/the HREF for the (.+) should be "(.+)"/, async (name, href) =>
  hrefEquals(name, href)
);

Then(/the HREF for the (.+) should include "(.+)"/, async (name, href) =>
  hrefIncludes(name, href)
);

Then(/the SRC for the (.+) should be "(.+)"/, async (name, src) =>
  srcEquals(name, src)
);

Then(/the text for the (.+) should be "(.+)"/, async => (name, text) =>
  textEquals(name, text)
);

Then(/the text for the (.+) should include "(.+)"/, async (name, text) =>
  textIncludes(name, text)
);

Then(/the (.+) style for the (.+) should be "(.+)"/, async (attr, name, val) =>
  styleEquals(attr, name, val)
);

Then(/the URL should equal the saved HREF/, async () => urlEquals());
